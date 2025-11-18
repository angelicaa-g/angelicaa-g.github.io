getQuote();

async function getQuote(){
    let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
    let response = await fetch(url);
    let data = await response.json(); //converts raw data into json format

    console.log(data); //displays the data
    console.log("JS is running!");

    document.querySelector("#random_quote").innerHTML =  `${data.quoteText}`;
    document.querySelector("#author_firstName").innerHTML = `${data.firstName}`; //displays the corresponding author's first name 
    document.querySelector("#author_lastName").innerHTML = `${data.lastName}`; //displays the corresponding author's last name 
   
}


