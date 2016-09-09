function initializeCountdownClock(targetDateString, arrivalMessage) {

  var convertSecondsToClockTime = function(totalSeconds) {
    var secondsReadout = totalSeconds % 60;
    var totalMinutes = Math.floor(totalSeconds / 60);
    var minutesReadout = totalMinutes % 60;
    var totalHours = Math.floor(totalMinutes / 60);
    var hoursReadout = totalHours;
    return { hours: hoursReadout,
             minutes: minutesReadout,
             seconds: secondsReadout }
  };

  // This function puts a leading 0 before a number if it only has one digit
  var normalize = function(number) {
    if (number.toString().length === 1) {
      return '0' + number;
    }
    else {
      return number;
    }
  }; 

  var currentDate;
  var timeRemaining;
  var timeData;
  var targetDate = new Date(targetDateString);
  var countdownClockDiv = document.getElementById("countdown_clock");
  var secondsDiv = document.getElementById("seconds");
  var minutesDiv = document.getElementById("minutes");
  var hoursDiv = document.getElementById("hours");
  var messageDiv = document.getElementById("countdown_message");
  var countdownTimer;

  currentDate = new Date();
  timeRemaining = Math.ceil((targetDate.getTime() - currentDate.getTime())/1000);
  timeData = convertSecondsToClockTime(timeRemaining);

  if (timeRemaining <= 0) {
    secondsDiv.innerHTML = "00";
    minutesDiv.innerHTML = "00";
    hoursDiv.innerHTML = "00";
    messageDiv.innerHTML = arrivalMessage;
    countdownClockDiv.style.display = "block";
  } else
  {
    secondsDiv.innerHTML = normalize(timeData.seconds);
    minutesDiv.innerHTML = normalize(timeData.minutes);
    hoursDiv.innerHTML = normalize(timeData.hours);
    countdownClockDiv.style.display = "block";

    // Because the time argument passed to setInterval is only the MINIMUM time
    // between function invocations, we need to recalculate the actual time
    // remaining to the target date from scratch with each invocation.
    // I set the callback to be called every half second to minimize the probability
    // that the readout display will skip a second
    countDownTimer = setInterval(function() {
      currentDate = new Date();
      timeRemaining = Math.ceil((targetDate.getTime() - currentDate.getTime())/1000);
      timeData = convertSecondsToClockTime(timeRemaining);
      secondsDiv.innerHTML = normalize(timeData.seconds);
      minutesDiv.innerHTML = normalize(timeData.minutes);
      hoursDiv.innerHTML = normalize(timeData.hours);
      if (timeRemaining === 0) {
        clearInterval(countDownTimer);
        messageDiv.innerHTML = arrivalMessage;
      }
    }, 500);
  }
};

