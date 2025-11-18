document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
    validateForm(event);
});
document.querySelector("#pwd1").addEventListener("click", suggestPassword);

async function displayCity(){
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response= await fetch(url);
    let data = await response.json();

  if (!data.city) {
        document.querySelector("#city").innerHTML = "Zip code not found";
        document.querySelector("#latitude").innerHTML = "Latitude not found";
        document.querySelector("#longitude").innerHTML = "Longitude not found";
        return; 
    }

    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
}

async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = ""; 

    for(let i = 0; i < data.length; i++) {
    countyList.innerHTML += `<option>${data[i].county}</option>`;
    
 }
} 

async function checkUsername(){
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response= await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");

    if (data.available) {
        usernameError.innerHTML = "Username available!";
        usernameError.style.color = "green";
    } else {
        usernameError.innerHTML = "Username taken";
        usernameError.style.color = "red";
    }
}
function validateForm(e) {
    let isValid = true;

    let username = document.querySelector("#username").value;
    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username Required!";
        usernameError.style.color = "red";
        isValid = false;
    }

    let password = document.querySelector("#pwd1").value;
    if (password.length < 6) {
        document.querySelector("#passwordError").innerHTML = "Password Required! <br> Password must be at least 6 characters";
        passwordError.style.color = "red";
        isValid = false;
    }
    let password2 = document.querySelector("#pwd2").value;
    if (password !== password2) {
        document.querySelector("#passwordError").innerHTML = "Passwords do not match.";
        isValid = false;
    }


    
    if (!isValid) {
        e.preventDefault();
    }
}
function suggestPassword() {
    let password = "";
    let letters = "abcdefg123456789";

    for (let i = 0; i < 6; i++) {
        password += letters[Math.floor(Math.random() * letters.length)];
    }

    document.querySelector("#suggestedPwd").innerHTML = "Suggested: " + password;
}

