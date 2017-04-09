var minutes = 0;
var seconds = 0;
var milliseconds = 0;
$('html').keydown(function(eventObject){
	function pad (str, max) {
  		str = str.toString();
  		return str.length < max ? pad("0" + str, max) : str;
	}
	function timer(){
		milliseconds += 1;
		if (milliseconds >= 100){
			milliseconds = 0;
			seconds += 1;
		}
		if (seconds >= 60) {
			seconds = 0;
			minutes += 1;
		}
		$('#minutes').text(pad(minutes,1));
    	$('#seconds').text(pad(seconds,2));
    	$('#milliseconds').text(pad(milliseconds,2));
  	}


  	function start_timer(){
  		setInterval(timer, 10);
  	}	
  	if (event.keyCode == 32) { //если нажали Enter, то true	
  		start_timer();
  	}  	
});