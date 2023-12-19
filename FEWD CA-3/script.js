document.addEventListener("DOMContentLoaded", getRandomMeal);

async function getRandomMeal() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();
        console.log(data);
        displayRandomMeal(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayRandomMeal(data) {
    const randomMeal = data.meals[0];
  
    // Create a container div
    const container = document.createElement("div");
    container.classList.add("meal-container1"); 
    container.style.textAlign = "left"; 
    container.style.marginTop = "20px";


    const randomMealLine = document.createElement("p");
  randomMealLine.textContent = "RANDOM MEAL";
  randomMealLine.style.fontWeight = "bold"; 
  container.appendChild(randomMealLine);
    // Create image element
    const img = document.createElement("img");
    img.src = randomMeal.strMealThumb;
    img.alt = randomMeal.strMeal;
    img.id = "Random";
    container.appendChild(img);
  
    // Create name element
    const name = document.createElement("p");
    name.textContent = randomMeal.strMeal;
    container.appendChild(name);
  
    // Get the random-meal container and append the container to it
    const randomMealContainer = document.getElementById("randomMealContainer");
    randomMealContainer.innerHTML = ''; 
    randomMealContainer.appendChild(container);
  
    // Add click event to image
    img.addEventListener("click", function () {
      getIngredients(randomMeal.idMeal);
    });
  }
  
async function getIngredients(id) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        console.log(data);
        displayIngredients(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayIngredients(data) {
    const ingredients = data.meals[0];
    const ingredientsList = [
        ingredients.strIngredient1,
        ingredients.strIngredient2,
        ingredients.strIngredient3,
        ingredients.strIngredient4,
        ingredients.strIngredient5,
        ingredients.strIngredient6,
        ingredients.strIngredient7,
        ingredients.strIngredient8,
        ingredients.strIngredient9,
        ingredients.strIngredient10,
        ingredients.strIngredient11,
        ingredients.strIngredient12,
        ingredients.strIngredient13,
        ingredients.strIngredient14,
        ingredients.strIngredient15,
        ingredients.strIngredient16,
        ingredients.strIngredient17,
        ingredients.strIngredient18,
        ingredients.strIngredient19,
        ingredients.strIngredient20,
    ].filter((ingredient) => ingredient);

    const modal = document.getElementById("myModal");
    const modalContent = document.querySelector(".modal-content");

    modalContent.innerHTML = `
        <h2>Ingredients</h2>
        <ul>
            ${ingredientsList.map((ingredient) => `<li>${ingredient}</li>`).join("")}
        </ul>
    `;

    modal.style.display = "block";
}

document.addEventListener("click", function (event) {
    if (event.target === document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
    }
});

document.getElementById("categoryInput").addEventListener("keyup", async function (event) {
    if (event.key === "Enter") {
        const category = event.target.value.trim();

        if (category !== "") {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
                const data = await response.json();

                if (data.meals) {
                    // Display the category-based meals in the result div
                    displayCategoryMeals(data.meals);
                } else {
                    console.error("No meals found for the entered category.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    }
});

// Function to display meals in the result div
function displayCategoryMeals(meals) {
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "";

    meals.forEach((meal) => {
        const mealContainer = document.createElement("div");
        mealContainer.classList.add("meal-container"); 

        const img = document.createElement("img");
        img.alt = meal.strMeal;
        img.src = meal.strMealThumb; 
        mealContainer.appendChild(img);

        const name = document.createElement("p");
        name.textContent = meal.strMeal;
        mealContainer.appendChild(name);

        resultDiv.appendChild(mealContainer);
    });
}
