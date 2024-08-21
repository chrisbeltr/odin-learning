let list = document.querySelector("ul");
let input = document.querySelector("input");
let button = document.querySelector("button");

function buttonPushed() {
    let value = input.value;
    input.value = "";

    let item = document.createElement("li");
    let span = document.createElement("span");
    span.textContent = value;
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        list.removeChild(item);
    });

    item.appendChild(span);
    item.appendChild(deleteButton);
    list.appendChild(item);
}

button.addEventListener("click", buttonPushed);

input.focus();