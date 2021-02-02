const jojo = document.getElementById('jojo');
const dio = document.getElementById('dio');
const scoreboard = document.getElementById('scoreboard');
const modal = document.getElementById('modal');

let scoreCount = 0;
let jojoX = 0;
let gameover = false;
let jojoBackground = 'url(img/jojo.png)';

// Play sounds
const voiceline = new Audio('snd/zawarudo_voiceline.mp3');
voiceline.volume = 0.4

const zawarudoEffect = new Audio('snd/zawarudo_timestop_effect.mp3');
zawarudoEffect.volume = 0.2

const jumpCb = function (event) {
    if (event.code === 'Space') {
        event.preventDefault()
         
        if (!jojo.classList.contains('jump')) {      
            jojo.classList.add('jump')
            scoreCount = scoreCount + 1;

            setTimeout(function () {
                jojo.classList.remove('jump')
            }, 400)
        }
    }
}

setJojoBoomGif = () => {
    jojo.style.backgroundImage = 'url(img/boom1.gif)';
}

const resetGameOver = function (event) {
    if (gameover && event.code === 'Space') {
        console.log('Game Reset')
        scoreCount = 0;

        // Remove active listeners
        voiceline.removeEventListener('ended', setJojoBoomGif)
        zawarudoEffect.removeEventListener('ended', setJojoBoomGif)

        // Reset jojo img
        jojo.style.backgroundImage = jojoBackground;

        // Start time
        jojo.classList.remove('paused')
        dio.classList.remove('paused')

        // Reset dio position
        dio.style.animation = 'none'

        setTimeout(() => {
            dio.style.animation = 'dioMov 2s infinite linear'
        })

        // Stop audio
        voiceline.pause()
        zawarudoEffect.pause()

        gameover = false
    }
}

const refreshScoreBoard = function () {
    if (!gameover)
        scoreboard.textContent = `YOUR SCORE IS ${scoreCount}`
}

setInterval(refreshScoreBoard, 50)

let isAlive = setInterval(function () {
    let jojoY = parseInt(window.getComputedStyle(jojo).getPropertyValue('top'));
    let dioX = parseInt(window.getComputedStyle(dio).getPropertyValue('left'));

    let dioPenetratedJojo = dioX < 50 && dioX > 0 && jojoY >= 100

    if (!gameover) {
        refreshScoreBoard()
    }

    if (dioPenetratedJojo && !gameover) {
        console.log('Game Over')
        gameover = true

        // Stop time
        jojo.classList.add('paused')
        dio.classList.add('paused')

        // Play sounds
        voiceline.play()
        zawarudoEffect.play();

        // Boom after effect
        zawarudoEffect.addEventListener('ended', setJojoBoomGif)
    }
}, 1)

document.addEventListener('keydown', jumpCb);
document.addEventListener('keydown', resetGameOver);

zawarudoEffect.addEventListener('ended', setJojoBoomGif)

let currentFighter = jojo;
let currentEnemy = dio;

const chooseYourFighter = function (fighterName) {
    if (fighterName === 'dio') {
        currentFighter = dio;
        currentEnemy = jojo;

        jojoBackground = 'url(img/dio.png)';
        jojo.style.backgroundImage = 'url(img/dio.png)';
        dio.style.backgroundImage = 'url(img/jojo.png)';
        jojo.classList.add('reverse')
        bodyid.style.backgroundImage = 'url(img/wall-dio.png)';
        scoreboard.style.background = 'rgb(209, 80, 18)';

    }
    if (fighterName === 'jojo') {
        currentFighter = jojo;
        currentEnemy = dio;

        jojoBackground = 'url(img/jojo.png)'; 
        jojo.classList.remove('reverse')
        jojo.style.backgroundImage = 'url(img/jojo.png)';
        dio.style.backgroundImage = 'url(img/dio.png)';
        bodyid.style.backgroundImage = 'url(img/wall.jpeg)';
        scoreboard.style.background = '#eb008b70';
    }

    console.log(`
    Fighter picked!
    Current Fighter: ${currentFighter.id}
    Current Enemy: ${currentEnemy.id}
    `)
}

const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

updateScoretable = () => {
    scoretable.innerHTML = highScores
    .map( score => {
        return(`<li class='scoreentry'>${score.name} - ${score.score} points!</li>`)
    })
    .join("");     
}

saveHighScore = (e) => {
    console.log('clicked the save button!');
    e.preventDefault();

    const score = {
        score: scoreCount,
        name: username.value
    };
    highScores.push(score);

    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 10);
    console.log(highScores);

    updateScoretable()
};

showModal = (e) => {
    modal.classList.remove('hidden')
    window.scrollTo(0, 0);
    document.getElementById('bodyid').classList.add('stop-scrolling')
}

const hideModal = (e) => {
    modal.classList.add('hidden')
    document.getElementById('bodyid').classList.remove('stop-scrolling')
}

modal.addEventListener('click', hideModal)