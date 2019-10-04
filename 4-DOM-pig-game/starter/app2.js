/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying, prevRoll,winValue;
var dice = [0,0];
var diceDOM0 = document.getElementById('dice0')
var diceDOM1 = document.getElementById('dice1');

initGame();

document.querySelector('.btn-roll').addEventListener('click', function(){
	if (gamePlaying){
	// 1. Random number
	dice[0] = Math.floor(Math.random() * 6) + 1;
	dice[1] = Math.floor(Math.random() * 6) + 1;
	// 2. display the results
	
	diceDOM0.style.display = 'block';
	diceDOM1.style.display = 'block';
	
	diceDOM0.src = 'dice-' + dice[0] + '.png';
	diceDOM1.src = 'dice-' + dice[1] + '.png';
    //3. Update the round score IF the rolled number was NOT a 1
	
	if (prevRoll[0] === 6 && dice[0] === 6 || prevRoll[1] === 6 && dice[1] === 6){
		scores[activePlayer] = 0;
		document.getElementById('score-' + activePlayer).textContent = '0';
		changePlayer();
	} else if (dice[0] !== 1 && dice[1] !== 1){
		prevRoll[0] = dice[0];
		prevRoll[1] = dice[1];
		roundScore += (dice[0] + dice[1]) ;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	} else{
		changePlayer();
	} }
	
	
});
function initGame(){
	winValue = document.getElementById("win-value").value;
    gamePlaying = true;
    prevRoll = [-1,-1];
	scores = [0,0];
    roundScore = 0;
    activePlayer = 0;


    document.querySelector('#current-' + activePlayer).textContent = 0;

// html setter for text
//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// html getter
//var x = document.querySelector('#score-0').textContent;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
	

    document.getElementById('dice0').style.display = 'none';
	diceDOM1.style.display = 'none';
}
function changePlayer(){
	prevRoll[0,1] = -1;
	diceDOM0.style.display = 'none';
	diceDOM1.style.display = 'none';
	roundScore = 0;
	document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	document.getElementById('current-' + activePlayer).textContent = '0';
	activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
	document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
	
}
document.querySelector('.btn-hold').addEventListener('click', function(){
	if (gamePlaying){
	if (roundScore !== 0){
	scores[activePlayer] += roundScore;
	roundScore = 0;
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	
	if (scores[activePlayer] >= winValue){
		document.querySelector('#name-' + activePlayer).textContent = 'WINNER';
		diceDOM0.style.display = 'none';
		diceDOM1.style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
	    gamePlaying = false;
	} else {
		changePlayer();
	    }
      }
	}
})

document.querySelector('.btn-new').addEventListener('click', initGame);

