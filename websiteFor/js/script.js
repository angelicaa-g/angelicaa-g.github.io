//document.querySelector("#random_animal").addEventListener
//random_animal_image();

document.querySelector("#showBtn").addEventListener("click", showSelectedFoods);
document.querySelector("#pickBtn").addEventListener("click", showColor);
document.querySelector("#btt").addEventListener("click",showBioandImg);
document.querySelector("#lang").addEventListener("change", chosenLang);
document.querySelector("#color").addEventListener("change",showColors);

// ⭐ EVENT LISTENERS
// use click for buttons
// use change for radio buttons + checkboxes
// use input for typing
// use submit for forms

// ⭐ FETCH API (memorize this pattern)
// let url = `https://site.com/api?value=${variable}`;
// let response = await fetch(url);
// let data = await response.json();

// ⭐ READING USER INPUT
// let value = document.querySelector("#id").value;

// ⭐ READING RADIO VALUE
// let choice = document.querySelector("input[name='group']:checked").value;

// ⭐ READING CHECKBOX VALUES
// let choices = document.querySelectorAll("input[name='group']:checked");
// use a loop to push choices[i].value into an array

// ⭐ UPDATING HTML
// document.querySelector("#result").innerHTML = "text";

// ⭐ VALIDATIONS
// if (!value) → empty input
// if (value < 1 || value > 5) → range check
// if (choices.length === 0) → no checkboxes selected
// if (!data.city) → API returned nothing / invalid

// ⭐ TEMPLATE LITERALS (VERY IMPORTANT)
// use backticks for API variables: ` ... ${variable} ... `
// NEVER use quotes: " ... ${variable} ... " (won’t work)

// ⭐ SHUFFLING (randomizing)
// array = _.shuffle(array);

// ⭐ LOOPS (for multiple API items)
// for (let i = 0; i < data.length; i++) { ... }

// ⭐ GLOBAL VARIABLES FOR API DATA
// let quoteData;
// store data here so other functions can use it

// ⭐ TWO-COLUMN LAYOUT (HTML/CSS)
// <div class="row">
//     <div class="column"></div>
//     <div class="column"></div>
// </div>
// .row { display: flex; }
// .column { width: 50%; }




function showSelectedFoods(){
   let selectedChoices = document.querySelectorAll("input[name='food']:checked"); //used for checkbox input
   let foods = [];

     for (let i = 0; i < selectedChoices.length; i++) {
        foods.push(selectedChoices[i].value);
    }

   if(foods.length === 0){
     document.querySelector("#result").innerHTML = "please select food at least one";
   }
   if(foods.length === 1){
    document.querySelector("#result").innerHTML = "please select one more food";
   }

   else{
     document.querySelector("#result").innerHTML =
    "You selected: " + foods.join(", ");
   }
}

function showColor(){
   let selectedColor = document.querySelector("input[name='color']:checked");  //for radio input we dont use for loop cuz we only pick one value

   // validation
   if (!selectedColor) {
      document.querySelector("#answer").innerHTML = "Please select a color.";
      return;
   }

   // display result
   document.querySelector("#answer").innerHTML = 
      "You have selected " + selectedColor.value;
}

async function showBioandImg(){
   let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
   let response = await fetch(url);
   let data = await response.json();

   
   document.querySelector("#bio").innerHTML = `${data.bio}`;
   document.querySelector("#pic").innerHTML = `<img src="${data.picture}">`;


}
function chosenLang(){
   let lange = document.querySelector("#lang").value;
   document.querySelector("#reponse").innerHTML  = `You have selected ${lange}`;
}
function showColors(){
   let col = ["Red","White","Pink","Yellow"];
   col = _.shuffle(col);
   document.querySelector("#color").innerHTML = "";
   

   for(i=0; i < col.length; i++){
      document.querySelector("#color").innerHTML += `<option value="${col[i]}">${col[i]}</option>`;
   }
}


