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
		// Method create an array and then push new entries to it.
		createGraph(props[0],props[1],msgTime);
	}
}

//Populates the table
function createTableEntry(companyCode, price, msgTime){
	// This condition checks if the data from socket channel is a new entry or not
	
	if(document.getElementById(companyCode+"r")){
		console.log("Yes");
		var strHTML2 = "<td id='"+companyCode+"c'><a href='http://www.nasdaq.com/symbol/"+companyCode+"' target='_blank'>"+companyCode.toUpperCase()+"</a></td>\
                        <td id='"+companyCode+"p'>"+price+"</td>\
                        <td class='msgTime' time='"+msgTime+"' id='"+companyCode+"t'>Just Now..</td>";
        //Time Uppdate Call
        maintainRealTime(msgTime);
        	var iniPrice = $('#'+companyCode+'p').html();
        	iniPrice = parseFloat(iniPrice);
        	var newPrice = parseFloat(price);
        	var diffPrice = newPrice - iniPrice;
        	$('#'+companyCode+'r').html(strHTML2);
        //Price Change finder
        	maintainColorCode(diffPrice,companyCode);
	}else{
		var strHTML = 	"<tr id='"+companyCode+"r'>\
                        	<td id='"+companyCode+"c'><a href='http://www.nasdaq.com/symbol/'"+companyCode+"'>"+companyCode.toUpperCase()+"</a></td>\
                        	<td id='"+companyCode+"p'>"+price+"</td>\
                        	<td class='msgTime' time='"+msgTime+"' id='"+companyCode+"t'>Just Now..</td>\
                    	</tr>";
		var iniData	= $('#stocksAppTable').html();
    	$('#stocksAppTable').html(iniData+strHTML);
	}

}

//function to maintain RealTime Time cal
function maintainRealTime(msgTime){
	//Updating time on every socket response Instead of using setInterval
	$('#stocksTable .msgTime').each(function()
	{
	  var tableData = $(this).attr('time');
	  var msg = "";
	  var timeDiff = Math.ceil((msgTime - tableData)/1000); // To Nearest Seconds
	  if(timeDiff<=(60)){
	  	msg = "Few Secs Ago..";
	  	$(this).html(msg);
	  }else if((60)<timeDiff<=(60*60)){
	  	var temp = Math.floor(timeDiff/60);
	  	msg = temp+" mins ago";
	  	$(this).html(msg);
	  }else if((60*60)<timeDiff<=(24*60*60)){
	  	var temp = Math.floor(timeDiff/3600);
	  	msg = temp+" hours ago";
	  	$(this).html(msg);
	  }else if((24*60*60)<timeDiff<=(30*24*60*60)){
	  	var temp = Math.floor(timeDiff/24*3600);
	  	msg = temp+" days ago";
	  	$(this).html(msg);
	  }

	});
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
	
var map = new Map();

function createGraph(companyCode,price,msgTime){
	var dps = [];
	var dataLength = 500;
	if(!document.getElementById(companyCode)){
 		var strHTML =  "<div class='row'><div class='chartdiv' id='"+companyCode+"'></div></div>";
		var iniData  =   $('#graphLayout').html();
		$('#graphLayout').html(iniData+strHTML);
	} else {
		dps = map.get(companyCode);
	}
	msgTime = new Date();
	console.log(msgTime);
	dps.push({
				x: msgTime,
				y: price
			});
	map.set(companyCode,dps);
	if (dps.length > dataLength)
		{
			dps.shift();				
		}
	(new CanvasJS.Chart(companyCode,{
		title :{
			text: companyCode
		},
		axisX:{
			valueFormatString  : "HH:mm:ss"
		},	
		data: [{
			type: "line",
			dataPoints: dps 
		}]
	})).render();
}