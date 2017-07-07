// This JS file receives the data from socket channel.
var ws = new WebSocket("ws://stocks.mnet.website");
ws.addEventListener('message', function({data}) {
    console.log(data);
});
