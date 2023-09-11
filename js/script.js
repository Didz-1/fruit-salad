const fruitForm = document.querySelector("#inputSection form");

const fruitList = document.querySelector("#fruitSection ul");

// const addFruit = fruit => {
//     const li = document.createElement("li");
//     li.textContent = fruit;
//     fruitList.appendChild(li);
// }

function addFruit(fruit) {
    if (fruit) {
        const li = document.createElement("li");
        li.textContent = fruit;
        fruitList.appendChild(li);
    }
}



fruitForm.addEventListener("submit", e => {
    e.preventDefault();
    addFruit(e.target.fruitInput.value);
    e.target.fruitInput.value = "";


});


fruitList.addEventListener("click", e => {
    fruitList.removeChild(e.target);
});


