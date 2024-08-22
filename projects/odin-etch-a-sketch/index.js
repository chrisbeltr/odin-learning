let body = document.querySelector("body");
let container = document.querySelector("#container");
container.style.border = "1px solid black";
let dimensions = Math.min(container.offsetHeight, body.offsetWidth - 20);
container.style.height = `${dimensions}px`;
container.style.width = `${dimensions}px`;

function makeGrid(size) {
    container.replaceChildren([]);
    for (let i = 0; i < size * size; i++) {
        let square = document.createElement("div");
        let squareDimensions = dimensions / size;
        square.style.height = `${squareDimensions}px`;
        square.style.width = `${squareDimensions}px`;
        square.style.userSelect = "none";
        square.setAttribute("class", "grid-square");
        // function returnColor() {
        //     return `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
        //     // unpleasant gradient: #25d529, #fe32f0, #9f5101
        //     // return "linear-gradient(#25d529 0%, #fe32f0 50%, #9f5101 100%";
        // }
        square.addEventListener("mouseover", (event) => {
            if (event.buttons == 1) {
                square.style.backgroundColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
            }
        });
        square.addEventListener("mousedown", () => {
            square.style.backgroundColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
        });
        container.appendChild(square);
    }
}

makeGrid(4);

let sizeButton = document.querySelector("#sizeButton");
sizeButton.addEventListener("click", () => {
    let size = 0;
    do {
        size = Number.parseInt(window.prompt("Please input the new box dimensions. (max. 100)", "4"));
    } while (size > 100);
    makeGrid(size);
})

let clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", () => {
    let children = container.children;
    for (let i = 0; i < children.length; i++) {
        children[i].style.removeProperty("background-color");
    }
});
