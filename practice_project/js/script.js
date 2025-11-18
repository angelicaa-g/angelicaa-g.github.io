document.querySelector("#Author_Info").addEventListener("click",displayInfo);
getQuote();

async function getQuote(){
    let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
    let response = await fetch(url);
    let data = await response.json(); //converts raw data into json format

    console.log(data); //displays the data
   

    document.querySelector("#random_quote").innerHTML =  `${data.quoteText}`;
    document.querySelector("#author_fullName").innerHTML =`${data.firstName} ${data.lastName}`; //displays the corresponding author's first and last name
}
async function displayInfo(){
    let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
    let response = await fetch(url);
    let data = await response.json(); //converts raw data into json format

    console.log(data); //displays the data
   document.querySelector("#bioCol").innerHTML = `${data.bio}`;
   document.querySelector("#imgCol").innerHTML = `<img src=${data.picture} width="200">`; //displays the image with custom sizing
}


