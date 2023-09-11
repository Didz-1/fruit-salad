const fruitForm = document.querySelector("#inputSection form");

const fruitList = document.querySelector("#fruitSection ul");

const fruitNutrition = document.querySelector("#nutritionSection p");

function fetchFruitData(fruit) {
    fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
    .then((resp) => resp.json())
    .then(data => addFruit(data))
    .catch(e => console.error(e))  //error
}

// const fetchFruitData = fruit => {
//     fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
//     .then((resp) => resp.json())
//     .then(data => addFruit(data))
//     .catch(e => console.error(e))
// }

// const addFruit = fruit => {
//     const li = document.createElement("li");
//     li.textContent = fruit;
//     fruitList.appendChild(li);
// }


let totalCarb = 0;
let totalProtein = 0;
let totalFat = 0;
let totalCal = 0;
let totalSugar = 0;

function addFruit(fruit) {
    if (fruit) {
        const li = document.createElement("li");
        li.textContent = fruit.name;
        fruitList.appendChild(li);

      
        totalCal += fruit.nutritions.calories;
        totalProtein += fruit.nutritions.protein;
        totalFat += fruit.nutritions.fat;
        totalSugar += fruit.nutritions.sugar;
        totalCarb += fruit.nutritions.carbohydrates;

        fruitNutrition.textContent = `Calories: ${totalCal}\n
                                    Protein: ${totalProtein}\n
                                    Fat: ${totalFat}\n
                                    Sugar: ${totalSugar}\n
                                    Carbs: ${totalCarb}`;
       
    }
}



fruitForm.addEventListener("submit", e => {
    e.preventDefault();
    fetchFruitData(e.target.fruitInput.value);
    e.target.fruitInput.value = "";


});


fruitList.addEventListener("click", e => {
    fruitList.removeChild(e.target);
});


