var gGame = new Game();
var gameTimer;

var gameCanvas = document.getElementById('ground');
var homeTitle = document.getElementById('title');
var startGameButton = document.getElementById('startGame');
var continueButton = document.getElementById('continueGame');
var helpButton = document.getElementById('help');
var exitButton = document.getElementById('exitGame');
var helpReturnButton = document.getElementById('helpReturn');
var helpPic = document.getElementById('helpPic');

var continueB = document.getElementById('continue');
var exitB = document.getElementById('exit');
var gamePause = document.getElementById('pause');
var restartButton = document.getElementById('restart');

var loseTip = document.getElementById('loseTip');

var nextLevelTip = document.getElementById('nextLevel');
var yesButton = document.getElementById('yes');
var noButton = document.getElementById('no');
var winTip = document.getElementById('win');

function startGame() {
    gGame.init();
    homeTitle.style.visibility = 'hidden';
    startGameButton.style.visibility = 'hidden';
    helpButton.style.visibility = 'hidden';
    exitButton.style.visibility = 'hidden';
    continueButton.style.visibility = 'hidden';

    gamePause.style.visibility = 'visible';
    gameCanvas.style.visibility = 'visible';
    gameTimer = setInterval(gGame.update,30);
}

function stop() {
    clearInterval(gameTimer);
    exitB.style.visibility = 'visible';
    continueB.style.visibility = 'visible';
    gamePause.style.visibility = 'hidden';
}

function goon() {
    exitB.style.visibility = 'hidden';
    continueB.style.visibility = 'hidden';
    homeTitle.style.visibility = 'hidden';
    startGameButton.style.visibility = 'hidden';
    helpButton.style.visibility = 'hidden';
    exitButton.style.visibility = 'hidden';
    continueButton.style.visibility = 'hidden';

    gamePause.style.visibility = 'visible';
    gameCanvas.style.visibility = 'visible';
    gameTimer = setInterval(gGame.update,30);
}

function returnHome() {
    homeTitle.style.visibility = 'visible';
    startGameButton.style.visibility = 'visible';
    helpButton.style.visibility = 'visible';
    exitButton.style.visibility = 'visible';
    if(gGame.UI.heartnum != 0){
        continueButton.style.visibility = 'visible';
    }
    if(gGame.boss1.bossHP <= 0){
        continueButton.style.visibility = 'hidden';
    }

    gamePause.style.visibility = 'hidden';
    gameCanvas.style.visibility = 'hidden';
    exitB.style.visibility = 'hidden';
    continueB.style.visibility = 'hidden';
    restartButton.style.visibility = 'hidden';
    loseTip.style.visibility = 'hidden';
    winTip.style.visibility = 'hidden';
}

function exit() {
    window.close();
}

function help() {
    homeTitle.style.visibility = 'hidden';
    startGameButton.style.visibility = 'hidden';
    helpButton.style.visibility = 'hidden';
    exitButton.style.visibility = 'hidden';

    helpReturnButton.style.visibility = 'visible';
    helpPic.style.visibility = 'visible';

}

function helpReturn() {
    homeTitle.style.visibility = 'visible';
    startGameButton.style.visibility = 'visible';
    helpButton.style.visibility = 'visible';
    exitButton.style.visibility = 'visible';

    helpReturnButton.style.visibility = 'hidden';
    helpPic.style.visibility = 'hidden';
}

function lose() {
    if(gGame.UI.heartnum == 0){
        clearInterval(gameTimer);
        gamePause.style.visibility = 'hidden';
        exitB.style.visibility = 'visible';
        restartButton.style.visibility = 'visible';
        loseTip.style.visibility = 'visible';
    }
}

function restart() {
    gamePause.style.visibility = 'visible';
    exitB.style.visibility = 'hidden';
    restartButton.style.visibility = 'hidden';
    loseTip.style.visibility = 'hidden';
    winTip.style.visibility = 'hidden';

    gGame.init();
    gameTimer = setInterval(gGame.update,30);
}

function nextLevel() {
    clearInterval(gameTimer);
    nextLevelTip.style.visibility =  'visible';
    yesButton.style.visibility = 'visible';
    noButton.style.visibility = 'visible';
}

function yes() {
    gameTimer = setInterval(gGame.update,30);

    nextLevelTip.style.visibility =  'hidden';
    yesButton.style.visibility = 'hidden';
    noButton.style.visibility = 'hidden';
}

function nobutton() {
    nextLevelTip.style.visibility =  'hidden';
    yesButton.style.visibility = 'hidden';
    noButton.style.visibility = 'hidden';

    homeTitle.style.visibility = 'visible';
    startGameButton.style.visibility = 'visible';
    helpButton.style.visibility = 'visible';
    exitButton.style.visibility = 'visible';
    if(gGame.UI.heartnum != 0){
        continueButton.style.visibility = 'visible';
    }

    gamePause.style.visibility = 'hidden';
    gameCanvas.style.visibility = 'hidden';
}

function win() {
    if(gGame.boss1.bossHP <= 0 && gGame.UI.heartnum > 0){
        clearInterval(gameTimer);
        winTip.style.visibility = 'visible';
        gamePause.style.visibility = 'hidden';
        exitB.style.visibility = 'visible';
        restartButton.style.visibility = 'visible';
    }
}