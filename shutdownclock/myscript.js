


const start_of_shutdown = new Date('2025-10-1 12:01AM EST')

var intervalID = window.setInterval(updateClock, 1000)

//var txt = ""

function updateClock() {

    var set = Date.now() - Date.parse(start_of_shutdown)
    
    var seconds = (set/1000)%60
    var minutes = (set/60000)%60
    var hours = (set/3600000)%24
    var days = (set/86400000)

    seconds = Math.floor(seconds);
    minutes = Math.floor(minutes);
    hours = Math.floor(hours);
    days = Math.floor(days);

    if(seconds < 10) {

        seconds = `0${seconds}`;

    }

    if(minutes < 10) {

        minutes = `0${minutes}`;

    }

    if(hours < 10) {

        hours = `0${hours}`;

    }
    
    txt = `${days}d ${hours}h ${minutes}m ${seconds}s`

    //document.getElementById('clock').innerHTML = txt

    document.getElementById('clock').innerHTML = txt
    
    console.log(set)

    console.log(Date.now())
    console.log(Date.parse(start_of_shutdown))


    //document.getElementById('clock').innerHTML = start_of_shutdown

}



updateClock()