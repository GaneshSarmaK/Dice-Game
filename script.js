'use strict';

//Html player elemetns
let p0ScoreEl = document.querySelector('#score--0');
let p1ScoreEl = document.querySelector('#score--1');
let p0CurrScoreEl = document.querySelector('#current--0');
let p1CurrScoreEl = document.querySelector('#current--1');
let p0SectionEl = document.querySelector('.player--0');
let p1SectionEl = document.querySelector('.player--1');
let activePlayer = 0;
let currentScore = 0;

//Html buttons
const btnNewGame = document.querySelector('.btn--new');
const btnHoldScore = document.querySelector('.btn--hold');
const btnRollDice = document.querySelector('.btn--roll');

//Html dice image element
let diceEl = document.querySelector('.dice');

//init or reset
const reset = function () {
  p0ScoreEl.textContent = p1ScoreEl.textContent = 0;
  diceEl.classList.add('hidden');
  p0SectionEl.classList.add('player--active');
  p1SectionEl.classList.remove('player--active');
  p0SectionEl.classList.remove('player--winner');
  p1SectionEl.classList.remove('player--winner');
  p0CurrScoreEl.textContent = p1CurrScoreEl.textContent = 0;
};
reset();

//Display dice image on screen according to the dice value
const showDiceImage = function (diceRollValue) {
  diceEl.src = String(`images/dice-${diceRollValue}.png`);
};

//Toggle active player
const shiftPlayer = function (score) {
  //Change the active player
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  document.querySelector(`.player--${Number(!activePlayer)}`).classList.add('player--active');
  activePlayer = Number(!activePlayer);

  //Set current and player current scores to 0
  currentScore = 0;
  p0CurrScoreEl.textContent = p1CurrScoreEl.textContent = 0;
};

//Update the current score for every dice roll
const updateCurrentScore = function () {
  if (activePlayer === 0) {
    p0CurrScoreEl.textContent = currentScore;
  } else {
    p1CurrScoreEl.textContent = currentScore;
  }
};

//Dice roll button event listener
btnRollDice.addEventListener('click', function () {
  //Random dice roll and show the dice image
  let diceRollValue = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  showDiceImage(diceRollValue);

  //If dice roll is 1 then disregard the current score and toggle active player
  //Else add the dice roll to current score and update player's current score
  if (diceRollValue === 1) {
    shiftPlayer(0);
  } else {
    currentScore += diceRollValue;
    updateCurrentScore();
  }
});

//Hold the rolled score button event listener
btnHoldScore.addEventListener('click', function () {
  //Compute the active player's total score
  const activePlayerScore = (document.getElementById(`score--${activePlayer}`).textContent =
    Number(document.getElementById(`score--${activePlayer}`).textContent) + currentScore);

  //If totoal score is more then 100 then he wins
  //Else toggle the player
  if (activePlayerScore >= 100) {
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  } else {
    shiftPlayer(currentScore);
  }
});

//Reset or New Game button event listener
btnNewGame.addEventListener('click', reset);
