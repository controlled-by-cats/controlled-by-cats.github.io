
columns = [0,0,0,0,0]
column_count = 5
column_width = 350

post_padding = 10

loading_content = false

const randomElement = (array) => { return array[Math.floor(Math.random() * array.length)]; }

function find_smallest_column(cols, count) {

    let min = cols[0]
    let min_i = 0

    for (var i = 0; i <= count-1; i++) {

        if(min > cols[i]) {

            min = cols[i]
            min_i = i

        }

    }

    return min_i

}

const randomId = function(length = 10) {
    return Math.random().toString(36).substring(2, length+2);
  };

function update_height() {

    tallest_column = Math.floor(Math.max(columns[0], columns[1], columns[2], columns[3], columns[4]))

    //console.debug(tallest_column)

    tallest_column = Math.max(tallest_column, window.innerHeight+200)

    document.getElementById("content").style.paddingBottom = `${tallest_column}px`

}

function update_display() {

    column_count = Math.floor(window.innerWidth/column_width)

    let elements = document.getElementsByClassName("content_box")
    col_count = column_count

    columns = [0,0,0,0,0]

    let n = elements.length -1

    console.log(n)

   // document.getElementById("content").innerHTML = ""

    if(elements.length != 0) {

        for (var i = 0; i < n; i++) {

            let lowest = find_smallest_column(columns, col_count)

            let z =  elements[i]
            
            z.style.transform = `translate(${lowest*350}px, ${columns[lowest]}px)`

            z.style.background_color = "black"

            columns[lowest] +=  Math.abs(Number(z.scrollHeight)) + post_padding
        
        };

    }

    update_height()

}



const calculateSum = (arr) => {
    return arr.reduce((total, current) => {
        return total + current;
    }, 0);
}


function htmlToNode(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    const nNodes = template.content.childNodes.length;
    if (nNodes !== 1) {
        throw new Error(
            `html parameter must represent a single node; got ${nNodes}. ` +
            'Note that leading or trailing spaces around an element in your ' +
            'HTML, like " <img/> ", get parsed as text nodes neighbouring ' +
            'the element; call .trim() on your input to avoid this.'
        );
    }
    return template.content.firstChild;
}

function get_new_element() {

    let types = ["ai_slop", "gem", "advert"]
    let weights = [100, 1, 300]

    total_weight = calculateSum(weights)

    val = Math.floor(Math.random()*total_weight)

    o_val = val

    i = 0

    while (o_val > 0) {

        o_val -= weights[i]

        if(o_val <= 0) {
            break;
        }

        i += 1

    }

    i = Math.min(i, 2)

    type = types[i]

    let image = "image.png"
    let title = ["test"]
    let tags = ["#epic post", "#wow"]

    if(type == "ai_slop") {

        i = Math.min(Math.floor(Math.random() * 1),0)

        image = `ai_slop/${i}.png`

        title = ["ai slop", "i hate artists", "never draw again!", "fixed your pencil slop", "i drained a lake to make this image"]
        tags = ["#ai #gen-ai", "#ai-art",]

    } else if (type=="gem") {

        title = "actually good post"

        tags = "#yay!!"

        image = `image.png`

    } else if (type=="advert") {

        if(Math.random() > 0.1) {

            i = Math.min(Math.floor(Math.random() * 7),6)
            title = ["BUY MY PRODUCT", "hello i am a salesman buy my products", "if you dont buy my stuff, you should DIE!"]
            tags = ["www.sketchyproduct.com" ]
            image = `advert/${i}.png`

        } else {

            i = Math.min(Math.floor(Math.random() * 2),1)

            title = ["Goncharov on Poob", "Poob has it for you", "All your favorites in one place"]
            tags = "#poob #poobingit"
            image = `advert/poob${i}.png`

        }

    }

    if(title instanceof Array) {

        title = randomElement(title)

    }

    if(tags instanceof Array) {

        tags = randomElement(tags)

    }
    
    let lowest = find_smallest_column(columns, column_count)
    
    let stl =`transform:translate(${lowest*350}px, ${columns[lowest]}px)`

    random_id = randomId()

    //console.debug(random_id)

    txt = `
    <div class="content_box" style="${stl}" id="${random_id}">

        <img src="${image}"></img><br>

        <div class ="content_text">
            <h><b>${title}</b></h><br>
            <t>${tags}</t>
        </div>
        

    </div>`

    return [txt, random_id, lowest]
    
}

function stop_loading() {

    loading_content = false

}


function load_more_content() {
    

    ret =  get_new_element()

    txt = ret[0]

    document.getElementById("content").insertAdjacentHTML("beforeend", txt)

    id = ret[1]
    col = ret[2]

    elem = document.getElementById(id)

    //console.debug(elem)

    columns[col] += elem.scrollHeight + post_padding

    update_height()

}

window.onload = function(ev) {

    i = 0

    while ((window.innerHeight >= document.body.clientHeight) && (i < 3)) {

        break
        
        load_more_content()
        i += 1;
    
    }


    for (let i = 0; i < 30; i++) {

        load_more_content()

    }
    

    update_display()

}

window.onresize = update_display

window.onscroll = function(ev) {

    console.log(`INNER HEIGHT: ${window.innerHeight}`)
    console.log(`SCROLL Y: ${window.scrollY}`)
    console.log(`CLIENT HEIGHT: ${document.body.scrollHeight}`)

    if(loading_content) {

        console.debug("LOADING")

    } else {

        //console.debug("NOT LOADING")

    }

    if (((window.innerHeight + window.scrollY) >= document.body.scrollHeight) && !loading_content) {

        loading_content = true
        
        for (let i = 0; i < 10; i++) {


            load_more_content()


        }

        setTimeout(stop_loading, 30)
    

        //update_display()

    }

};


