document.querySelector("#Author_Info").addEventListener("click",displayInfo); //when the user clicks the button, bio and img will appear
document.querySelector("#Flags").addEventListener("click", displayFlag);
getQuote();
displayInfo();
randomLang();
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
   document.querySelector("#imgCol").innerHTML = `<img src=${quoteData.picture} width="200">`; //displays the image with custom sizing
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
    if(lang === "English"){
        corresponding_img = "img/english_flag.png"; 
       
    }

    if (lang === "Esperanto") {
        corresponding_img = "img/esperanto_flag.png"; 
    }

    if (lang === "Spanish") {
        corresponding_img = "img/spanish_flag.png"; 
    }

    if (lang === "French") {
        corresponding_img = "img/french_flag.png"; 
    }

    document.querySelector("#Flags").innerHTML = `<img src="${corresponding_img}" width="200">`
    let url = "https://csumb.space/api/famousQuotes/translateQuote.php?lang=ES&quoteId=2";
    let response = await fetch(url);

    let data = await response.json();
}