document.querySelector("#Author_Info").addEventListener("click",displayInfo); //when the user clicks the button, bio and img will appear
document.querySelector("#Flags").addEventListener("click", displayFlag);
document.querySelector("#getQuotes").addEventListener("click", ShowQuotes);
getQuote();

randomLang();
displayRandomBackground();

let quoteData = undefined;

async function getQuote(){
    let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
    let response = await fetch(url);

    let data = await response.json(); //converts raw data into json format
    quoteData = data; 

    console.log(data); //displays the data
   

    document.querySelector("#random_quote").innerHTML =  `${data.quoteText}`;
    document.querySelector("#author_fullName").innerHTML =`${data.firstName} ${data.lastName}`; //displays the corresponding author's first and last name
     
}
async function displayInfo(){
   // let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
   // let response = await fetch(url);
  //  let data = await response.json(); //converts raw data into json format

  
   document.querySelector("#bioCol").innerHTML = `${quoteData.bio}`;
   document.querySelector("#imgCol").innerHTML = `<img src="${quoteData.picture}" width="200">`; //displays the image with custom sizing
}



function randomLang(){
    let languages = ["Esperanto", "English", "Spanish", "French"];  //shuflee
    languages  = _.shuffle(languages);
    document.querySelector("#languagesContainer").innerHTML = "";

    for (let i = 0; i < languages.length; i++) {
         document.querySelector("#languagesContainer").innerHTML += `<label>
        <input type="radio" name="language" value="${languages[i]}">
        ${languages[i]}
      </label>`
    }
}

async function displayFlag(){
    let corresponding_img = " ";
    let lang =  document.querySelector("input[name='language']:checked").value; //find the language that the user selected

    let abbr = ""; //two-letter abbreviation for the language
    if(lang === "English"){
        corresponding_img = "img/english_flag.png"; 
         abbr = "EN";
       
    }

    if (lang === "Esperanto") {
        corresponding_img = "img/esperanto_flag.png"; 
         abbr = "ES";
    }

    if (lang === "Spanish") {
        corresponding_img = "img/spanish_flag.png"; 
         abbr = "SP";
    }

    if (lang === "French") {
        corresponding_img = "img/french_flag.png"; 
         abbr = "FR";
    }

   document.querySelector("#flagContainer").innerHTML =`<img src="${corresponding_img}" width="200">`;
    let url = `https://csumb.space/api/famousQuotes/translateQuote.php?lang=${abbr}&quoteId=${quoteData.quoteId}`;
    let response = await fetch(url);

    let data = await response.json();

    document.querySelector("#translated").innerHTML = `${data.translation}`; //retrieve the translated qoute

}
async function ShowQuotes(){
  let number = document.querySelector("#Num").value;
  let value_result = document.querySelector("#value_result");
  let qList = document.querySelector("#quotesList");  //retrieve the qoutes 

    if(number === ""){ //if input is left empty 
    value_result.innerHTML = "Please enter a number, do not leave this area blank!";
    value_result.style.color = "red";
    return;
  }

  if(number < 1 || number > 5){ //input must be betwene 1 and 5
     value_result.innerHTML = "Please enter a number between 1 and 5!";
     value_result.style.color = "red";
     return;
  }

  value_result.innerHTML = "";
  qList.innerHTML = "";


  let url = `https://csumb.space/api/famousQuotes/getQuotes.php?n=${number}`;
  let response = await fetch(url);
  let data = await response.json();


    //do for loop display the qoute (s) and first name last name
     for (let i = 0; i < data.length; i++) {
     document.querySelector('#quotesList').innerHTML += `<div>
      ${data[i].quoteText} —
      ${data[i].firstName} ${data[i].lastName}
    </div>`;
  }
}

async function displayRandomBackground(){
  let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=flowers";
  let response = await fetch(url);
  let data = await response.json();
  
  let shuffled = _.shuffle(data.hits); 
  let randomImg = shuffled[0].largeImageURL; //first item is random 

  //styling
  document.body.style.backgroundImage = `url('${randomImg}')`;   //setting the background img 
  document.body.style.backgroundSize = "cover";  
  document.body.style.backgroundRepeat = "no-repeat";
}
//notess
// EVENT LISTENERS

// When user clicks a button → use "click"
// example: document.querySelector("#btn").addEventListener("click", fn);

// When user selects a radio button → use "change"
// example: document.querySelector("#languages").addEventListener("change", fn);

// When user checks/unchecks a checkbox → use "change"

// When user picks an option from a dropdown <select> → use "change"

// When user types in an input box → use "input"
// (but if you only need the final value, you can use "change")

// When user submits a form → use "submit"

// When the page loads and you want code to run immediately → just call the function
// example: getQuote();   // no event listener

// DO NOT use "click" for radio, checkbox, or dropdown.
// "change" is correct because the value is changing, not the click.

// LOOPS 

// Basic for-loop structure (MOST COMMON in your assignments)
// for (let i = 0; i < array.length; i++) {
//     // use array[i]
// }

// Used when displaying multiple quotes from an API
// Example:
// for (let i = 0; i < data.length; i++) {
//     quotesList.innerHTML += data[i].quoteText;
// }

// Looping through CHECKBOXES (NodeList)
// let choices = document.querySelectorAll("input[name='food']:checked");
// for (let i = 0; i < choices.length; i++) {
//     selected.push(choices[i].value);
// }

//  Looping through API results stored in data[]
// Always use: data[i].propertyName
// Example:
// data[i].firstName
// data[i].lastName
// data[i].quoteText

// Looping through shuffled arrays
// array = _.shuffle(array);
// for (let i = 0; i < array.length; i++) {
//     // display shuffled items
// }

//  MISTAKES TO AVOID 
//  Using .value on a NodeList → NodeLists do NOT have .value
//  Looping radio buttons (only one is selected, so no loop)
// Forgetting i++ → infinite loop
//  Using <= array.length → will go OUT OF RANGE, always use <

//  MEMORY TRICK 
// Use loops ONLY when you have MANY items to process (API list, checkboxes).
// If you only have ONE selected item (radio button), DO NOT use a loop.