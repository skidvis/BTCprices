/**
 * Created by skidvis on 1/20/14.
 */
var mySettings = window.localStorage;

var exchanges = [
    {'name' : 'bitstamp', 'url' : 'https://www.bitstamp.net/api/ticker/'},
    {'name' : 'coinbase', 'url' : 'https://coinbase.com/api/v1/prices/spot_rate'},
    {'name' : 'localbitcoins', 'url' : 'https://localbitcoins.com/bitcoinaverage/ticker-all-currencies/'},
    {'name' : 'mtgox', 'url' : 'https://data.mtgox.com/api/2/BTCUSD/money/ticker_fast'}
];

function onLoad(){
    document.addEventListener("deviceready", function(){
        if(mySettings.getItem("ex-default") === null)
            mySettings.setItem("ex-default", "coinbase");

        document.addEventListener("resume", getData, false);

        var Fetcher = window.plugins.backgroundFetch;

        // Your background-fetch handler.
        var fetchCallback = function() {
            getData();
            Fetcher.finish();
        }
        Fetcher.configure(fetchCallback);

    });
};

$(document).on('pageinit', '#home', function(){
    getData();
});

$(document).on('pageinit', '#about', function(){
    $(".footerText").text('&copy;2014 IceGhost');
})

$(document).on('pageinit', '#settings', function(){
    var exdefault = mySettings.getItem("ex-default");
    var isChecked = '';

    exchanges.forEach(function(exchange){
        if(exchange.name === exdefault)
            isChecked = 'checked="checked"';
        else
            isChecked = '';
        $('fieldset').append('<input type="radio" name="radio-choice" id="' + exchange.name + '" value="' + exchange.name + '" ' + isChecked + '" onClick="setDefault(\'' + exchange.name +  '\')" /><label for="' + exchange.name + '">' + exchange.name +'</label>');
    });
    $("div").trigger('create');

    $(".footerText").text('<a href="#about" data-transition="slide">U like? Donate!</a>');
});

function setDefault(exchangeName){
    mySettings.setItem('ex-default',exchangeName);
    getData();
};

function getData(){
    $("#ex-list").text('');

    var currentdate = new Date();
    var datetime = "Synced: "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    $(".footerText").text(datetime);

    exchanges.forEach(function(exchange){
        $('#ex-list').append('<li><h3>' + exchange.name + '</h3><span id="' + exchange.name +'" class="ui-li-count">Loading</span></li>');
        $('#ex-list').listview('refresh');

        $.ajax({
            url: 'http://iceghost.com/igExchange.aspx?url=' + exchange.url ,
            dataType: "json",
            async: true,
            success: function (result) {
                ajax.parseJSONP(exchange.name, result);
            },
            error: function (request,error) {
                $("#" + exchange.name).text("Unavailable");
            }
        });
    });
};
var ajax = {
    parseJSONP:function(myName, result){
        var amount = 0;
        switch(myName){
            case 'coinbase':
                amount = result.amount;
                break;
            case 'mtgox':
                amount = result.data.last_local.value;
                break;
            case 'localbitcoins':
                amount = result.USD.avg_1h;
                break;
            case 'bitstamp':
                amount = result.ask;
                break;
        }
        $("#" + myName).text(accounting.formatMoney(amount));

        if(myName === mySettings.getItem("ex-default") && amount > 0)
            window.plugins.pushNotification.setApplicationIconBadgeNumber(function(){}, function(){}, parseInt(amount));
    }
}