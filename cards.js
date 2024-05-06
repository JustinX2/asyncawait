const baseURL = "http://deckofcardsapi.com/api/deck";
let deckId;
let remainingCards;

//fetching a single card
async function fetchSingleCard() {
  try {
    const res = await $.getJSON(`${baseURL}/new/draw/?count=1`);
    console.log(res.cards[0].value, res.cards[0].suit);
  } catch (err) {
    console.log(err);
  }
}

//fetching two cards
async function fetchTwoCards() {
  try {
    const firstres = await $.getJSON(`${baseURL}/new/draw/?count=1`);
    const firstCard = firstres.cards[0];
    const deckId = firstres.deck_id;

    const secondres = await $.getJSON(`${baseURL}/${deckId}/draw/?count=1`);
    const secondCard = secondres.cards[0];

    [firstCard, secondCard].forEach(card => {
      console.log(card.value, card.suit);
    });
  } catch (err) {
    console.log(err);
  }
}

//creating a new deck of cards
async function createDeck() {
  try {
    const res = await $.getJSON(`${baseURL}/new/shuffle/`);
    deckId = res.deck_id;
    remainingCards = res.remaining;
    $("#drawCardButton").on("click", handleDrawCardClick);
  } catch (err) {
    console.log(err);
  }
}

//drawing a single card from deck
async function drawCard() {
  try {
    const res = await $.getJSON(`${baseURL}/${deckId}/draw/?count=1`);
    return res;
  } catch (err) {
    console.log(err);
  }
}


//handling draw card button click
async function handleDrawCardClick() {
  if (remainingCards > 0) {
    const data= await drawCard();
    displayCard(data.cards[0], "card-area");
    remainingCards = data.remaining;
    if(remainingCards === 0) {
        displayMessage("No cards remaining in deck!", "card-area");
        $("#drawCardButton").off("click");
    }
    } else {
    displayMessage("No cards remaining in deck!", "card-area");
}
}

//displaying card
function displayCard(card, elementId) {
  const cardArea = document.getElementById(elementId);
  const cardDiv= document.createElement("div");
  cardDiv.textContent = `${card.value} of ${card.suit}`;
  cardArea.appendChild(cardDiv);
}

//displaying message
function displayMessage(message, elementId) {
  const cardArea = document.getElementById(elementId);
  const messageDiv = document.createElement("div");
  messageDiv.textContent = message;
  cardArea.appendChild(messageDiv);
}

$(document).ready(async function() {
    await fetchSingleCard();
    await fetchTwoCards();
    await createDeck();
});
