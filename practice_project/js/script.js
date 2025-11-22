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
  let number = document.querySelector("#Num").value; //collect user input
  let value_result = document.querySelector("#value_result");
  let qList = document.querySelector("#quotesList");  //retrieve the qoutes 

    if(number === ""){ //if input is left empty 
    value_result.innerHTML = "Please enter a number, do not leave this area blank!";
    value_result.style.color = "red";
    return;
  }

  if(number < 1 || number > 5){ //input must be betwene 1 and 5! 
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
//notes
// EVENT LISTENERS
// click → buttons
// change → radio + checkbox + <select>
// input → typing in box
// submit → forms

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

//HOW TO BUILD HTML IN A LOOP
// 1. Copy ONE example of the HTML element
// 2. Replace changing parts with ${array[i]} or ${data[i].property}
// 3. Wrap it in backticks `...`
// 4. Put it inside a for loop
// 5. Add to container with innerHTML +=
// 6. Clear container first: container.innerHTML = "";
// change ONLY:
// - value="${arr[i]}"
// - text ${arr[i]} or ${data[i].property}
//let animals = ["Cat", "Dog", "Fox", "Panda"];
//for(i = 0; i< animals.length; i++){
// document.querySelector("#animalsContainer").innerHTML +=  `<label>
 // <input type="radio" name="animal" value="${animals[i]}">
 //${animals[i]}
//</label>`;
//}

//HTML ATTRIBUTES ALWAYS USE QUOTES
// in ANY HTML you generate (inside backticks):
// value="..."
// id="..."
// class="..."
// name="..."

// DO NOT change:
// - <label>, <div>, <input>, etc (structure)
// - name="group"
// - container id

// if (!value) → empty textbox
// if (value < 1 || value > 5) → number range
// if (choices.length === 0) → checkbox none selected
// if (!selectedRadio) → radio not selected
// if (!data.property) → API returned nothing

// TEXTBOX INPUT  (HTML: <input type="text" id="userText">)
// ------------------------------------------------------------

// get textbox value
// let value = document.querySelector("#userText").value;

// check if empty
// if (!value) { /* show error */ }

// number range check example
// if (value < 1 || value > 5) { /* show error */ }



// ------------------------------------------------------------
// NUMBER INPUT  (HTML: <input type="number" id="numBox">)
// ------------------------------------------------------------
//add return after validation 
// get number value
// let num = document.querySelector("#numBox").value;

// validate number range
// if (num < 1 || num > 5) { /* show error */ }



// ------------------------------------------------------------
// RADIO BUTTONS  (HTML: <input type="radio" name="color" value="Red">)
// ------------------------------------------------------------

// get selected radio button
// let selected = document.querySelector("input[name='color']:checked").value;;

// validate nothing selected
// if (!selected) { /* show error */ }

// get selected value
// selected.value;



// ------------------------------------------------------------
// CHECKBOXES  (HTML: <input type="checkbox" name="food" value="Pizza">)
// ------------------------------------------------------------

// get all checked boxes
// let items = document.querySelectorAll("input[name='food']:checked");

// build array of selected values
// let arr = [];
// for (let i = 0; i < items.length; i++) {
//     arr.push(items[i].value);
// }

// validate if none selected
// if (arr.length === 0) { /* show error */ }



// ------------------------------------------------------------
// DROPDOWN / SELECT MENU  (HTML: <select id="lang"> ... </select>)
// ------------------------------------------------------------

// get selected dropdown value
// let choice = document.querySelector("#lang").value;

// validate (only if there is a blank option)
// if (!choice) { /* show error */ }

// ------------------------------------------------------------
// WHEN TO USE A FOR LOOP
// ------------------------------------------------------------

// 1) When displaying MULTIPLE items from an ARRAY
//    (example: shuffled languages, shuffled animals)
//    → loop through array and append HTML

// 2) When an API returns MULTIPLE objects (data.length > 1)
//    (example: getQuotes.php?n=5)
//    → loop through data[i] to display each item

// 3) When collecting MULTIPLE checkbox values
//    (querySelectorAll → NodeList)
//    → loop to push each .value into an array



// ------------------------------------------------------------
// WHEN YOU DO NOT USE A LOOP
// ------------------------------------------------------------

// 1) Radio buttons (only ONE selected)
//    document.querySelector("input[name='x']:checked").value

// 2) Textbox input (only ONE value)
//    document.querySelector("#input").value

// 3) Dropdown/select (only ONE selected option)
//    document.querySelector("#select").value

// 4) API returns a SINGLE object
//    (example: getRandomQuote.php → one quote)
//    Just display it → no loop
// ------------------------------------------------------
// WHEN TO USE "return" IN VALIDATION
// ------------------------------------------------------

// 1) Use return when the function MUST stop
//    (because using the next line would cause an error)
//
// Example: radio button not selected
// let selected = document.querySelector("input[name='color']:checked");
// if (!selected) {
//     result.innerHTML = "Select a color";
//     return;   // STOP because selected.value would break
// }

// 2) Use return when input is invalid AND you don't want to continue
//
// let num = document.querySelector("#numBox").value;
// if (num < 1 || num > 5) {
//     msg.innerHTML = "Must be 1-5";
//     return;   // STOP because API call shouldn't run with bad input
// }

// 3) DO NOT use multiple returns for the same input check
//
// Bad:
// if (num < 1) return;
// if (num > 5) return;
//
// Good:
// if (num < 1 || num > 5) { return; }

// 4) FOR FORMS: do NOT use return to block submission
//    If using <form>, use e.preventDefault() instead.
//
// if (!isValid) {
//     e.preventDefault();
// }

// 5) Do NOT use return inside loops (unless you want to exit entire function)
// ------------------------------------------------------s



