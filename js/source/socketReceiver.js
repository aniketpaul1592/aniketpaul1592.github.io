// This JS file receives the data from socket channel and Updates the Stock table.
// Add try catch block
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

	// This condition checks if the data from socket channel is a new entry or not
	
	if(document.getElementById(companyCode)){
		console.log("Yes");
		var strHTML2 = "<td id='"+companyCode+"c'>"+companyCode.toUpperCase()+"</td>\
                        <td id='"+companyCode+"p'>"+price+"</td>\
                        <td id='"+companyCode+"t'>"+msgTime+"</td>";
        //Price Change finder
        	var iniPrice = $('#'+companyCode+'p').html();
        	iniPrice = parseFloat(iniPrice);
        	var newPrice = parseFloat(price);
        	var diffPrice = newPrice - iniPrice;
        	$('#'+companyCode).html(strHTML2);
        	maintainColorCode(diffPrice,companyCode);
	}else{
		var strHTML = 	"<tr id='"+companyCode+"'>\
                        	<td id='"+companyCode+"c'>"+companyCode.toUpperCase()+"</td>\
                        	<td id='"+companyCode+"p'>"+price+"</td>\
                        	<td id='"+companyCode+"t'>"+msgTime+"</td>\
                    	</tr>";
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

//function to update colors
function maintainColorCode(diffPrice,companyCode) {
	if(diffPrice<0){
		console.log("abcd"+diffPrice);
		if($('#'+companyCode+'p').hasClass("rateUp")){
			$('#'+companyCode+'p').removeClass("rateUp");
			$('#'+companyCode+'p').addClass("rateDown");
		}
		if(!($('#'+companyCode+'p').hasClass("rateDown"))){
			$('#'+companyCode+'p').addClass("rateDown");
		}		
	}else{
		if($('#'+companyCode+'p').hasClass("rateDown")){
			$('#'+companyCode+'p').removeClass("rateDown");
			$('#'+companyCode+'p').addClass("rateUp");
		}
		 if(!($('#'+companyCode+'p').hasClass("rateUp"))){
			$('#'+companyCode+'p').addClass("rateUp");
		}
	}
}