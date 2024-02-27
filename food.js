let stopDefault= document.getElementById("form");


document.getElementById("button").addEventListener('click', () => {
    event.preventDefault();
    let inputValue= document.getElementById('inputName').value;
   fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`).then(
    response=> response.json()
   ).then(data => {
    const items= document.getElementById("items");
    items.innerHTML="";
    console.log(data.meals);
    const bres= document.getElementById("bres");

    if(data.meals === null) {
        bres.textContent="Not Available";
    } else{
     data.meals.forEach(meal=> {
        bres.style.display='none';
        let itemDiv = document.createElement('div');
        itemDiv.className="cool";
        itemDiv.setAttribute('onclick', `details('${meal.idMeal}')`)
        let itemInfo= `
            <div class="card">
        <img src="${meal.strMealThumb}" alt="">
        <div class="card-body">
            <h5 class="card-text">${meal.strMeal}</h5>
        </div>
    </div>
        `

        itemDiv.innerHTML= itemInfo;
        items.appendChild(itemDiv)
     })
    }
   })
   .catch(error=> console.log(error));
})

function details(id) {
    console.log(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(response=> response.json()).then(data=> {
        let meal = data.meals[0];
        console.log(meal)

        let details = document.getElementById("details");

        details.innerHTML="";
        let detailsDiv= document.createElement("div");
        let detailsInfo= `
            <div class="card">
        <img src="${meal.strMealThumb}" alt="">
        <div class="card-body">
            <h5 class="card-text">${meal.strMeal}</h5>
            <h6>Ingredients</h6>
        <ul>
            <li>${meal.strArea}</li>
            <li>${meal.strCategory}</li>
            <li>${meal.strIngredient1}</li>
            <li>${meal.strIngredient2}</li>
            <li>${meal.strIngredient3}</li>
            <li>${meal.strIngredient4}</li>
            <li>${meal.strIngredient5}</li>
            <li>${meal.strIngredient6}</li>
            <li>${meal.strIngredient7}</li>
            <h3>Wanna Watch it On youtube?? <br/>
            <a href="${meal.strYoutube}">Click here</a>
            </h3>
            <blockquote id="savrecipe">From SavRecipe</blockquote>

           
        </ul>
        </div>
    </div>
        `


        detailsDiv.innerHTML=detailsInfo;
        details.appendChild(detailsDiv)
    })
    .catch(error => console.log(error))
}

