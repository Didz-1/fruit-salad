const fruitForm = document.querySelector("#inputSection form");

const fruitList = document.querySelector("#fruitSection ul");

const fruitNutrition = document.querySelector("#nutritionSection p");

const pictures = document.querySelector("#pictureSection");

let del;



async function fetchFruitData(fruit) {
    try {
        const resp = await fetch(`https://fruitapi-f0ps.onrender.com/fruits/${fruit}`);
        const data = await resp.json();
        addFruit(data);
    
    } catch (err) {
        console.log(err);
    }
}

// const fetchFruitData = async fruit => {
    
//     try {
//         const resp = await fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`);
//         const data = await resp.json();
//         addFruit(data);
    
//     } catch (err) {
//         console.log(err);
//     }
    
    
// }

// const addFruit = fruit => {
//     const li = document.createElement("li");
//     li.textContent = fruit;
//     fruitList.appendChild(li);
// }

const getPicture = async fruit => {
    try {
        const resp = await fetch(`https://pixabay.com/api/?q=${fruit}+fruit&key=39374521-7ad282203a3bc184cc938bbc7`);
        const data = await resp.json();
        displayPic(data);
    } catch (err) {
        console.error(err);
    }
}


const displayPic = data => {
    const pic = document.createElement("img");
    pic.src = data.hits[0].webformatURL;
    pictures.appendChild(pic);
}


let totalCarb = 0;
let totalProtein = 0;
let totalFat = 0;
let totalCal = 0;
let totalSugar = 0;

function addFruit(fruit) {
    if (fruit && !del) {
        console.log(del);
        const li = document.createElement("li");
        li.textContent = fruit.name;
        fruitList.appendChild(li);
        getPicture(fruit.name);
      
        totalCal += fruit.nutritions.calories;
        totalProtein += fruit.nutritions.protein.toFixed(2);
        totalFat += fruit.nutritions.fat;
        totalSugar += fruit.nutritions.sugar;
        totalCarb += fruit.nutritions.carbohydrates;

        fruitNutrition.textContent = `Calories: ${totalCal}\n
                                    Protein: ${totalProtein}\n
                                    Fat: ${totalFat}\n
                                    Sugar: ${totalSugar}\n
                                    Carbs: ${totalCarb}`;
    
       
    } else if (del) {
        totalCal -= fruit.nutritions.calories;
        totalProtein -= fruit.nutritions.protein;
        totalFat -= fruit.nutritions.fat;
        totalSugar -= fruit.nutritions.sugar;
        totalCarb -= fruit.nutritions.carbohydrates;

        fruitNutrition.textContent = `Calories: ${totalCal}\n
                                    Protein: ${totalProtein}\n
                                    Fat: ${totalFat}\n
                                    Sugar: ${totalSugar}\n
                                    Carbs: ${totalCarb}`;

        del = false;



    } else {
        console.log(5);
    }
}

async function removeFruit(fruit) {
    console.log(fruit); //prints fruit name deleted
    

}



fruitForm.addEventListener("submit", e => {
    e.preventDefault();
    fetchFruitData(e.target.fruitInput.value);
    e.target.fruitInput.value = "";


});


fruitList.addEventListener("click", e => {
    fruitList.removeChild(e.target);
    del = true;
    fetchFruitData(e.target.textContent);
});


