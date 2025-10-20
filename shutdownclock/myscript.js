


const start_of_shutdown = new Date('2025-10-1 12:01AM EST')

var intervalID = window.setInterval(updateClock, 20)

const max_shutdown_time_ms = 35 * 24 * 60 * 60 * 1000

var use_ms = change_ms(document.getElementById("button"))

//var txt = ""

function formatTime(time_ms) {

    var set = Math.abs(time_ms)


    var ms = (set)%1000
    var seconds = (set/1000)%60
    var minutes = (set/60000)%60
    var hours = (set/3600000)%24
    var days = (set/86400000)

    ms = Math.floor(ms);
    seconds = Math.floor(seconds);
    minutes = Math.floor(minutes);
    hours = Math.floor(hours);
    days = Math.floor(days);

    if(seconds < 10) { seconds = `0${seconds}`; }

    if(minutes < 10) { minutes = `0${minutes}`;}

    if(hours < 10) {   hours = `0${hours}`; }

    if(ms < 10) {   ms = `00${ms}`; } else
    if(ms < 100) {   ms = `00${ms}`; } else
    if(ms < 1000) {   ms = `0${ms}`; }
    

    var txt = "... ."

    if(use_ms) {

        txt = `${days}d ${hours}h ${minutes}m ${seconds}s ${ms}ms`

    } else {

        txt = `${days}d ${hours}h ${minutes}m ${seconds}s`

    }
    


    if ( time_ms < 0 ) {

        //txt = "-" + txt

    }

    return txt

}


function updateClock() {

    var set = Date.now() - Date.parse(start_of_shutdown)

    var diff = set - max_shutdown_time_ms
    
    
    var txt = formatTime(set)
    var txt2 = formatTime(diff)

    if(diff > 0) {

        document.getElementById('label').innerHTML = `${txt2} longer than the previous longest shutdown.`

    } else {

        document.getElementById('label').innerHTML = `${txt2} until it's the longest shutdown.`

    }
    

    //document.getElementById('clock').innerHTML = txt

    document.getElementById('clock').innerHTML = txt

    //document.getElementById('clock2').innerHTML = txt2
    
    console.log(set)

    console.log(Date.now())
    console.log(Date.parse(start_of_shutdown))


    //document.getElementById('clock').innerHTML = start_of_shutdown

}

function change_ms(checkboxElem) {
    if (checkboxElem.checked) {
      use_ms = true
    } else {
      use_ms = false
    }
  }


updateClock()