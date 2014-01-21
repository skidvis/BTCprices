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
        {'name' : 'coinbase', 'url' : 'https://coinbase.com/api/v1/prices/spot_rate'},
        {'name' : 'mtgox', 'url' : 'https://data.mtgox.com/api/2/BTCUSD/money/ticker_fast'},
        {'name' : 'localbitcoins', 'url' : 'https://localbitcoins.com/bitcoinaverage/ticker-all-currencies/'},
        {'name' : 'bitstamp', 'url' : 'https://www.bitstamp.net/api/ticker/'}
    ];

    var currentdate = new Date();
    var datetime = "Synced: "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    $("#myTime").text(datetime);

    exchanges.forEach(function(exchange){
        $.ajax({
            url: 'http://iceghost.com/igExchange.aspx?url=' + exchange.url ,
            dataType: "json",
            async: true,
            success: function (result) {
                ajax.parseJSONP(exchange.name, result);
            },
            error: function (request,error) {
                console.log('Network error has occurred please try again!');
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

        $('#ex-list').append('<li><h3>' + myName + '</h3><span class="ui-li-count">' + accounting.formatMoney(amount) + '</span></li>');
        $('#ex-list').listview('refresh');
    }
}