// setup variables
let gridSize = 4;
let border = true;
let random = false;
let color = "black";
let mode = "draw";

// container initialization
let body = document.querySelector("body");
let container = document.querySelector("#container");
container.style.border = "1px solid black";
let dimensions = 0;
function resizeContainer() {
    container.style.removeProperty("height");
    container.style.removeProperty("width");
    container.style.flexGrow = 1;
    dimensions = Math.min(container.offsetHeight, body.offsetWidth - 20);
    container.style.height = `${dimensions}px`;
    container.style.width = `${dimensions}px`;
    container.style.flexGrow = 0;
    resizeGrid();
}
function resizeGrid() {
    let children = container.children;
    for (let i = 0; i < children.length; i++) {
        let square = children[i];
        let squareDimensions = dimensions / gridSize;
        square.style.height = `${squareDimensions}px`;
        square.style.width = `${squareDimensions}px`;
    }
}
resizeContainer();
window.addEventListener("resize", resizeContainer);

// event listener initialization
let sizeButton = document.querySelector("#sizeButton");
sizeButton.addEventListener("click", () => {
    do {
        gridSize = Number.parseInt(window.prompt("Please input the new box dimensions. (max. 100)", "4"));
    } while (gridSize > 100);
    makeGrid(gridSize);
});

let borderButton = document.querySelector("#borderButton");
borderButton.addEventListener("click", () => {
    let children = container.children;
    for (let i = 0; i < children.length; i++) {
        if (border) {
            children[i].style.removeProperty("border");
            borderButton.textContent = "Show grid lines";
        } else {
            children[i].style.border = "1px solid lightgray";
            borderButton.textContent = "Hide grid lines";
        }
    }
    border = !border;
});

let clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", () => {
    let children = container.children;
    for (let i = 0; i < children.length; i++) {
        children[i].style.removeProperty("background-color");
    }
});

let colorPicker = document.querySelector("#colorPicker");
colorPicker.addEventListener("change", () => {
    color = colorPicker.value;
});

let randomCheckbox = document.querySelector("#randomCheckbox");
randomCheckbox.addEventListener("change", () => {
    random = randomCheckbox.checked;
    colorPicker.disabled = random;
});

let drawButton = document.querySelector("#drawButton");
drawButton.disabled = true;
let eraseButton = document.querySelector("#eraseButton");
let colorpickButton = document.querySelector("#colorpickButton");
drawButton.addEventListener("click", () => { mode = "draw"; drawButton.disabled = true; eraseButton.disabled = false; colorpickButton.disabled = false; });
eraseButton.addEventListener("click", () => { mode = "erase"; drawButton.disabled = false; eraseButton.disabled = true; colorpickButton.disabled = false; });
colorpickButton.addEventListener("click", () => { mode = "colorpick"; drawButton.disabled = false; eraseButton.disabled = false; colorpickButton.disabled = true; });

// grid functionality
function gridClickHandler(event, square) {
    if (event.buttons != 1) return;
    if (mode == "draw") {
        if (random) square.style.backgroundColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`; else square.style.backgroundColor = color;
    } else if (mode == "erase") {
        square.style.removeProperty("background-color");
    } else if (mode == "colorpick") {
        color = square.style.getPropertyValue("background-color");
        if (color == "") color = "#ffffff";
        else if (color[0] == "r") color = rgbToHex(color);
        else if (color[0] != "#") color = colourNameToHex(color);
        colorPicker.value = color;
    }
}

function makeGrid(size) {
    container.replaceChildren([]);
    for (let i = 0; i < size * size; i++) {
        let square = document.createElement("div");
        let squareDimensions = dimensions / size;
        square.style.height = `${squareDimensions}px`;
        square.style.width = `${squareDimensions}px`;
        if (border) square.style.border = "1px solid lightgray";
        square.style.userSelect = "none";
        square.setAttribute("class", "grid-square");
        // function returnColor() {
        //     return `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
        //     // unpleasant gradient: #25d529, #fe32f0, #9f5101
        //     // return "linear-gradient(#25d529 0%, #fe32f0 50%, #9f5101 100%";
        // }
        square.addEventListener("mouseover", (event) => {
            if (event.buttons == 1) {
                gridClickHandler(event, square);
            }
        });
        square.addEventListener("mousedown", (event) => {
            if (event.buttons ==  1) {
                gridClickHandler(event, square);
            }
        });
        container.appendChild(square);
    }
}

// default grid
makeGrid(gridSize);

// helpers
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
    rgb = rgb.substring(4, rgb.length - 1);
    rgb = rgb.split(",");
    rgb.forEach(element => element.trim());
    var [r, g, b] = rgb;
    return "#" + componentToHex(Number.parseInt(r)) + componentToHex(Number.parseInt(g)) + componentToHex(Number.parseInt(b));
}

function colourNameToHex(colour)
{
    var colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
    "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
    "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
    "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
    "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
    "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
    "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
    "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
    "honeydew":"#f0fff0","hotpink":"#ff69b4",
    "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
    "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
    "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
    "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
    "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
    "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
    "navajowhite":"#ffdead","navy":"#000080",
    "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
    "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
    "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
    "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
    "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
    "violet":"#ee82ee",
    "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
    "yellow":"#ffff00","yellowgreen":"#9acd32"};

    if (typeof colours[colour.toLowerCase()] != 'undefined')
        return colours[colour.toLowerCase()];

    return false;
}