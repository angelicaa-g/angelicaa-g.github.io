document.querySelector("#submitBtn").addEventListener("click", getCharacter);

async function getCharacter() {
    let char_name = document.querySelector("#char_name").value;  //collects user input
    let char_result = document.querySelector("#char_result");
    let spec_result = document.querySelector("#spec_result");
    let location = document.querySelector("#location");

    // Validate character name
    if (char_name.length === 0) {
        char_result.innerHTML = "Character name is required!";
        char_result.style.color = "red";
        spec_result.innerHTML = "";
        location.innerHTML = "";
        document.querySelector("#imageResult").src = "";
        return;
    }

    // Fetch API data
    let url = `https://rickandmortyapi.com/api/character/?name=${char_name}`; 
    let response = await fetch(url);
    let data = await response.json();

    // If character not found
    if (!data.results) {
        char_result.innerHTML = "Character not found!";
        char_result.style.color = "purple";
        spec_result.innerHTML = "";
        location.innerHTML = "";
        document.querySelector("#imageResult").src = "";
        return;
    }

    // update display
    let character = data.results[0];

    char_result.style.color = "darkblue";
    spec_result.style.color = "darkblue";
    location.style.color = "darkblue";

    char_result.innerHTML = "Name: " + character.name;
    spec_result.innerHTML = "Species Type: " + character.species;
    location.innerHTML = "Location: " + character.location.name;
    document.querySelector("#imageResult").src = character.image;
}