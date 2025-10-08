
//setInterval(updatePointer, 100)

// Create a canvas that extends the entire screen
// and it will draw right over the other html elements, like buttons, etc

setInterval(update_clock, 30)

var points = []

const start_time = Date.now()


//perlin noise innit
let perlin = {
    rand_vect: function(){
        let theta = Math.random() * 2 * Math.PI;
        return {x: Math.cos(theta), y: Math.sin(theta)};
    },
    dot_prod_grid: function(x, y, vx, vy){
        let g_vect;
        let d_vect = {x: x - vx, y: y - vy};
        if (this.gradients[[vx,vy]]){
            g_vect = this.gradients[[vx,vy]];
        } else {
            g_vect = this.rand_vect();
            this.gradients[[vx, vy]] = g_vect;
        }
        return d_vect.x * g_vect.x + d_vect.y * g_vect.y;
    },
    smootherstep: function(x){
        return 6*x**5 - 15*x**4 + 10*x**3;
    },
    interp: function(x, a, b){
        return a + this.smootherstep(x) * (b-a);
    },
    seed: function(){
        this.gradients = {};
        this.memory = {};
    },
    get: function(x, y) {
        if (this.memory.hasOwnProperty([x,y]))
            return this.memory[[x,y]];
        let xf = Math.floor(x);
        let yf = Math.floor(y);
        //interpolate
        let tl = this.dot_prod_grid(x, y, xf,   yf);
        let tr = this.dot_prod_grid(x, y, xf+1, yf);
        let bl = this.dot_prod_grid(x, y, xf,   yf+1);
        let br = this.dot_prod_grid(x, y, xf+1, yf+1);
        let xt = this.interp(x-xf, tl, tr);
        let xb = this.interp(x-xf, bl, br);
        let v = this.interp(y-yf, xt, xb);
        this.memory[[x,y]] = v;
        return v;
    }
}
perlin.seed();

setInterval(update_grid, 100)


function update_grid() {

    let chars = ['.','.','-','=','+','*','%','&','#','#']

    var ms_since_opened = Date.now() - start_time

    var scale = 2

    let xres = (window.outerWidth)/5
    let yres = 10

    //xres = 200

    let  output = ""

    //debug stuff
    let min = 10000
    let max = -1000

    for(let y = 0; y < yres; y++) {

        let  line = ""

        for(let x=0; x < xres; x++) {

            let dist = (perlin.get(
                
                x/50*scale+ms_since_opened/5000 + Math.sin((ms_since_opened+3000)/15000),
                y/50*scale + Math.sin(ms_since_opened/5000) + ms_since_opened/10000
            
            )+.6)/1.1

            let dist2 = (perlin.get(
                
                x/-25*scale+ms_since_opened/5000 + Math.sin((ms_since_opened+3000)/15000),
                y/-25*scale + Math.sin(ms_since_opened/5000) + ms_since_opened/10000
            
            )+.6)/1.1

            dist = (dist+dist2)/2

            dist = Math.min(dist, 1)
            dist = Math.max(dist, 0)

            let cur_char = chars[Math.round(dist*9)]
            console.log(dist)

            line = line+cur_char

            max = Math.max(max, dist)
            min = Math.min(min, dist)

        }

        output = output + line + "<br>"

    }

    console.log("MAX: " + max)
    console.log("MIN: " + min)

    document.getElementById("grid").innerHTML = output

}

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

