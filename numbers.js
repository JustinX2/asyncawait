const favNumber = 5;
const baseURL = "http://numbersapi.com";

//Fetching single fact about fav number
async function fetchSingleFact() {
  try {
    const res = await $.getJSON(`${baseURL}/${favNumber}?json`);
    console.log(res.text);
  } catch (err) {
    console.log(err);
  }
}

//fetching facts about multiple fav numbers
async function fetchMultipleFacts() {
  const favNumbers = [5, 7, 11];
  try {
    const res = await $.getJSON(`${baseURL}/${favNumbers}?json`);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

//fetching 4 facts about fav number
async function fetchFourFacts() {
  try {
    const facts = await Promise.all(
      Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
    );
    const factsContainer = document.getElementById("factsContainer");
    facts.forEach(data => {
      const elem = document.createElement("p");
      elem.innerText = data.text;
      factsContainer.appendChild(elem);
    });
  } catch (err) {
    console.log(err);
  }
}

fetchSingleFact();
fetchMultipleFacts();
fetchFourFacts();