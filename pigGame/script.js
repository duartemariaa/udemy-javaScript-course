const score0El = document.querySelector('#score-0');
const score1El = document.querySelector('#score-1');
const current0EL = document.querySelector('#current-0');
const current1EL = document.querySelector('#current-1');
const diceEl = document.querySelector('.img-dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const player0EL = document.querySelector('.player-0');
const player1EL = document.querySelector('.player-1');

let scores, currentScore, activePlayer, playing;

const init = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;

    diceEl.classList.add('hidden');
    player0EL.classList.remove('player-winner');
    player1EL.classList.remove('player-winner');
    player0EL.classList.add('player-active');
    player1EL.classList.remove('player-active');
};

init();

const switchPlayer = function(){
    document.querySelector(`#current-${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player-active');
    player1EL.classList.toggle('player-active');
}

btnRoll.addEventListener('click', function() {
    if(playing){
        let randomDice = Math.floor(Math.random() * 6) + 1;
        diceEl.classList.remove('hidden');
        diceEl.src = `images/dice-${randomDice}.png`

        if(randomDice === 1){
            switchPlayer();
        }else {
            currentScore += randomDice;
            document.querySelector(`#current-${activePlayer}`).textContent = currentScore;
        }
    }
});

btnHold.addEventListener('click', function(){
    if(playing){
        scores[activePlayer] += currentScore;
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    
        if(scores[activePlayer] >= 100){
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
            document.querySelector(`.player-${activePlayer}`).classList.remove('player-active');
        }else {
            switchPlayer();
        }
    } 
});

btnNew.addEventListener('click', init);