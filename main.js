var displayModel;
var sessionText; 
var sessionTime;
var breakTime;
var endTime;
var counter = null;
var isCounting = false;
var onBreak = false;

function startTimer(lengthInMinutes){
	var startTime = new Date();
	endTime = new Date(startTime.getTime() + lengthInMinutes * 60000);
	clearInterval(counter);
	isCounting = true;
	counter = setInterval(function(){
		now = new Date();
		interval = Math.max(0, endTime.getTime() - now.getTime() + 1000);

		var minutes = interval / 60000;
		var seconds = (interval / 1000) % 60;

		displayModel.text(Math.floor(minutes) + ":" + Math.floor(seconds));

		if (interval <= 0) {resetTimer();}
	}, 1000);
}

function stopTimer(){
	clearInterval(counter);
	isCounting = false;
	equateTimers();
}

function resetTimer(){
	clearInterval(counter);
	isCounting = false;

	onBreak = !onBreak;

	if (onBreak) {
		sessionText.text("Break");
		startTimer(breakTime);
	} else {
		sessionText.text("Pomodoro");
		startTimer(sessionTime);
	}

}

function equateTimers(){
	displayModel.text(sessionTime+":00");
}

function increaseSession(){
	sessionTime += 1;
	$("#pomodoro-length").text(sessionTime);
	equateTimers()
}

function decreaseSession(){
	sessionTime -= 1;
	$("#pomodoro-length").text(sessionTime);
	equateTimers()
}

function increaseBreak(){
	breakTime += 1;
	$("#break-length").text(breakTime);
	equateTimers()
}

function decreaseBreak(){
	breakTime -= 1;
	$("#break-length").text(breakTime);
	equateTimers()
}

$(document).ready(function(){
	breakTime =  parseInt($("#break-length").text());
	sessionTime = parseInt($("#pomodoro-length").text());
	displayModel = $("#display");
	sessionText = $("#session-type");
	equateTimers()


	$( "#play-button" ).click(function() {
		if (!isCounting) {
			onBreak = false;
			sessionText.text("Pomodoro");
			startTimer(sessionTime);
		}
	});

	$( "#stop-button" ).click(function() {
		sessionText.text("Session");
		stopTimer();
	});

	$( "#up-session-button" ).click(function() {
		if (!isCounting) {increaseSession();}
	});

	$( "#down-session-button" ).click(function() {
		if (!isCounting) {decreaseSession();}
	});

	$( "#up-break-button" ).click(function() {
		if (!isCounting) {increaseBreak();}
	});

	$( "#down-break-button" ).click(function() {
		if (!isCounting) {decreaseBreak();}
	});
});