/**
 * Created by skidvis on 1/20/14.
 */
function onLoad(){
    document.addEventListener("deviceready", function(){
        document.addEventListener("resume", getData, false);
    });
};

$(document).on('pageinit', '#home', function(){
    getData();
});

function getData(){
    $("#ex-list").text('');
    var exchanges = [
        {'name' : 'bitstamp', 'url' : 'https://www.bitstamp.net/api/ticker/'},
        {'name' : 'coinbase', 'url' : 'https://coinbase.com/api/v1/prices/spot_rate'},
        {'name' : 'localbitcoins', 'url' : 'https://localbitcoins.com/bitcoinaverage/ticker-all-currencies/'},
        {'name' : 'mtgox', 'url' : 'https://data.mtgox.com/api/2/BTCUSD/money/ticker_fast'}
    ];

    var currentdate = new Date();
    var datetime = "Synced: "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    $("#myTime").text(datetime);

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
    }
}