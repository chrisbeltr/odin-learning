let body = document.querySelector("body");

let red = document.createElement("p");
red.style.color = "red";
red.textContent = "Hey I'm red!";
let blue = document.createElement("h3");
blue.style.color = "blue";
blue.textContent = "I'm a blue h3!";
let div = document.createElement("div");
div.style.border = "2px solid black";
div.style.backgroundColor = "pink";
let innerh1 = document.createElement("h1");
innerh1.textContent = "I'm in a div";
let innerp = document.createElement("p");
innerp.textContent = "ME TOO!";

div.append(innerh1, innerp);
body.append(red, blue, div);