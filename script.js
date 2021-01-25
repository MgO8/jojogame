const jojo = document.getElementById('jojo');
const dio = document.getElementById('dio');

const jumpCb = function(event){
    if (event.code === 'Space') {
        jump();
    }
}

document.addEventListener('keydown', jumpCb);

let scoreCount = 0;
let jojoX = 0;

function jump () {
    if(jojo.classList != 'jump'){
        jojo.classList.add('jump')
    }
    setTimeout(function() {
        jojo.classList.remove('jump')
    }, 300) 
    
    scoreCount  = scoreCount + 1;
    document.getElementById('score').textContent = scoreCount
}

let gameover = false

let isAlive = setInterval ( function() {
    let jojoY = parseInt(window.getComputedStyle(jojo).getPropertyValue('top'));
    let dioX = parseInt(window.getComputedStyle(dio).getPropertyValue('left'));

    let dioPenetratedJojo = dioX < 50 && dioX > 0 && jojoY >= 100

    if (dioPenetratedJojo && !gameover) {
        document.removeEventListener('keydown', jumpCb);
        gameover = true
        scoreCount = 0;

        // Stop time
        jojo.classList.add('paused')
        dio.classList.add('paused')

        // Play sounds
        var voiceline = new Audio('snd/zawarudo_voiceline.mp3');
        voiceline.volume = 0.4
        voiceline.play();

        var zawarudoEffect = new Audio('snd/zawarudo_timestop_effect.mp3');
        zawarudoEffect.volume = 0.2
        zawarudoEffect.play();

        zawarudoEffect.addEventListener('ended', () => {
            jojo.style.backgroundImage = 'url(img/boom1.gif)';
        })

        const resetGameOver = function(event){
            if (event.code === 'Space') {
                document.removeEventListener('keydown', resetGameOver);
                // Reset jojo img
                jojo.style.backgroundImage = 'url(img/jojo.png)';

                // Reset dio position
                dio.style.left = '570px'

                // Stop audio
                voiceline.pause()
                zawarudoEffect.pause()

                // Start time
                jojo.classList.remove('paused')
                dio.classList.remove('paused')

                document.addEventListener('keydown', function(event){
                    if (event.code === 'Space') {
                        jump();
                    }
                });

                gameover = false;
            }
        }

        document.addEventListener('keydown', resetGameOver);

        // alert(`GAME OVER. YOUR SCORE IS ${scoreCount} `)
    }
}, 1)
