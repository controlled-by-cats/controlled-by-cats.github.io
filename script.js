
//setInterval(updatePointer, 100)

// Create a canvas that extends the entire screen
// and it will draw right over the other html elements, like buttons, etc
console.log("laoded")

setInterval(update_clock, 30)

var points = []

window.onload = function() {

    /*const myCanvas = document.createElement("canvas");

    myCanvas.setAttribute("width", window.innerWidth);
    myCanvas.setAttribute("height", window.innerHeight);
    myCanvas.setAttribute("style", "position: absolute; x:0; y:0; transform: 1");
    myCanvas.setAttribute("id", "canv")
    //document.body.appendChild(canvas);

    document.body.appendChild(myCanvas);

   
    //myCanvas.width = 30
    //myCanvas.height = window.height
    const ctx = myCanvas.getContext("2d");
    
    
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(0, 0, 10000, 10000);
    
    console.log("laoded2")*/

}

document.onmousemove = function(e){

    /*var canvas = document.getElementById("canv")

    var ctx = canvas.getContext("2d")

    ctx.fillStyle = "#00ff00"
    ctx.fillRect(e.pageX, e.pageY, 1,1)

    console.log("test")

    //ctx.fillRect(0, 0, 150, 100);*/

}




window.onresize = function() {

    //myCanvas.setAttribute("width", window.innerWidth)

}



function update_clock() {

    var current_time = Date.now()
    var target = Date.parse("1-19-38 3:14:07 UTC")

    var difference = target-current_time

    var element = document.getElementById("clock")

    

    var ms = difference%1000
    var seconds = (difference/1000)%60
    var minutes = (difference/60000)%60
    var hours = (difference/3600000)%24
    var days = (difference/86400000)%365
    var years = (difference/31536000000)

    ms = Math.floor(ms);
    seconds = Math.floor(seconds);
    minutes = Math.floor(minutes);
    hours = Math.floor(hours);
    days = Math.floor(days);
    years = Math.floor(years)

    if (ms < 10) {

        ms = `00${ms}`

    } else if (ms < 100) {

        ms = `0${ms}`

    }

    if(seconds < 10) {

        seconds = `0${seconds}`

    }

    var txt = `${years}y ${days}d ${hours}h ${minutes}m ${seconds}.${ms}s`

    element.innerHTML = txt

}

