// This JS file receives the data from socket channel and Updates the Stock table.

// SocketReciever
var ws = new WebSocket("ws://stocks.mnet.website");
ws.addEventListener('message', function({data}) {
	var socketData = JSON.parse(data);
	usingSocketData(socketData);
});

//Data Dispatcher Funtion
function usingSocketData(socketData){
	//console.log(typeof data); // I also need to send system time
	for(var props of socketData){
		var dateElem = new Date();
		var msgTime = dateElem.getTime();
		createTableEntry(props[0],props[1],msgTime); 
	}
}

//Populates the table
function createTableEntry(companyCode, price, msgTime){
	//var timeInfo = getTimeInfo(time);

	console.log("Company Code"+companyCode);
	console.log("Company Price"+price);
	console.log("CurrTime"+msgTime);
	var strHTML = 	"<tr id='"+companyCode+"'>\
                        <td id='"+companyCode+"c'>"+companyCode+"</td>\
                        <td id='"+companyCode+"p'>"+price+"</td>\
                        <td id='"+companyCode+"t'>"+msgTime+"</td>\
                    </tr>";
	

	if(document.getElementById(companyCode)){
		console.log("Yes");
		var strHTML2 = "<td id='"+companyCode+"c'>"+companyCode+"</td>\
                        <td id='"+companyCode+"p'>"+price+"</td>\
                        <td id='"+companyCode+"t'>"+msgTime+"</td>";
		$('#'+companyCode).html(strHTML2);
	}else{
		var iniData	= $('#stocksAppTable').html();
    	$('#stocksAppTable').html(iniData+strHTML);
	}

}

//function to maintain RealTime Time cal
function maintainRealTime(msgTime){
	setInterval(function(){
		// Need to write the code and alternative
	}, 60000);
} 