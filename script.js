// search function
function search(){
    document.getElementById('main').style.backgroundImage="none";
    // get search value
    var ingredient= document.getElementById('find');
    // if value is not blank then fetch api
    if(ingredient.value!=''){
        // after getting array of meals call display function
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient.value}`).then(res => res.json()).then(data => display(data.meals)) .catch(error => console.log(error));
        ingredient.value="";
    }
}
function display(meals){
// get search_result in parentdiv and create new div for each meal and append them to parent div
    var parentdiv= document.getElementById('search_result');
    parentdiv.innerText="";
    // if no result is found show no result found
    if(meals==null){
        parentdiv.innerHTML=`<div style="font-size:x-large; font-weight:bolder; font-family:cursive;">Oops No Result Found!!!</div>`;
    }
    
    meals.forEach(meal => {
        var childDiv= document.createElement('div');
        // add details and favorite button in child div 
        childDiv.innerHTML=`<div class="card">
        <img src="${meal.strMealThumb}"  alt="error">
        <h3>${meal.strMeal}</h3>
        <button class="button" type="button" onclick="details(${meal.idMeal})" >Details</button>
        <button class="button" type="button" id="${meal.idMeal}" onclick="favorite(${meal.idMeal})" >Add Favorites</button>
        </div>`;
        parentdiv.appendChild(childDiv);
    });
}
// fetch api using id then call displayMealDetail function 
function details(id){
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url).then(res => res.json()).then(data => displayMealDetail(data.meals[0]));
}
function displayMealDetail(meal){

    document.getElementById('main').style.display="none";
    var parent= document.getElementById('meal_details');
    parent.innerText="";
    var child= document.createElement('div');
    child.classList.add("details");
    child.innerHTML=`<h1>${meal.strMeal}</h1>
    <div><img src="${meal.strMealThumb}" width="200px" alt="error"></div>
    <button onclick="back()" style="width:150px; font-size:large; position:absolute; top:20px;right:30px" class="button">Back</button>
    <div>${meal.strInstructions}</div>`;
    parent.appendChild(child);
}
// bach function is to remove details
function back(){
    document.getElementById('main').style.display="flex";
    document.getElementById('meal_details').innerText="";
}
// favorite function stores favorite meals id in local Storage
function favorite(id){
// get favorites from local storage or empty array
var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
var index= favorites.indexOf(id);
console.log(id);
if (index == -1) {
    favorites.push(id);
  // item is already favorite
  } else {
    favorites.splice(index, 1);
  }
// // store array in local storage
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
// this function shows the list of users favorites
function favorite_list(){
    document.getElementById('main').style.backgroundImage="none";
    var parentdiv= document.getElementById('search_result');
    parentdiv.innerHTML="";
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log(favorites);
    favorites.forEach(id=>{
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(url).then(res => res.json()).then(data=> list(data.meals[0]));
        function list(meal){
            var childDiv= document.createElement('div');
            childDiv.innerHTML=`<div class="card">
            <img src="${meal.strMealThumb}"  alt="error">
            <h3>${meal.strMeal}</h3>
            <button class="button"type="button" onclick="details(${meal.idMeal})" >Details</button>
            <button class="button"type="button" id="${meal.idMeal}" onclick="favorite(${meal.idMeal})" >Delete from Favorites</button>
            </div>`;
            parentdiv.appendChild(childDiv);
        }
        
    });
    
}