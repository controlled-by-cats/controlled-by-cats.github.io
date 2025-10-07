


const start_of_shutdown = new Date('2025-10-1 12:01AM EST')

var intervalID = window.setInterval(updateClock, 1000)


function updateClock() {

    var set = Date.now() - Date.parse(start_of_shutdown)
    
    var seconds = (set/1000)%60
    var minutes = (set/60000)%60
    var hours = (set/3600000)%24
    var days = (set/86400000)


    document.getElementById('clock').innerHTML = `${Math.floor(days)}d ${Math.floor(hours)}h ${Math.floor(minutes)}m ${Math.floor(seconds)}s`
    
    console.log(set)

    console.log(Date.now())
    console.log(Date.parse(start_of_shutdown))


    //document.getElementById('clock').innerHTML = start_of_shutdown

}



updateClock()