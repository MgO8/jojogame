const jojo = document.getElementById('jojo');
const dio = document.getElementById('dio');

document.addEventListener('mousedown', function(event){
    jump();
});

let scoreCount = 0;

class Char {
 constructor(init) {
    this.x = init.x
    this.y = init.y

    this.width = init.width
    this.height = init.height
 }

 doCollideWith(otherChar) {
    let otherCharToTheLeft = otherChar.x + otherChar.width < this.x + this.width
    let otherCharToTheRight = otherChar.x > this.x
   
    let xCollision = otherCharToTheLeft && otherCharToTheRight;

    let xHigherHitboxEdge = this.y;
    let xLowerHitboxEdge = this.y + this.height;
   
    let otherCharLowerThanHigherHitboxEdge = xLowerHitboxEdge >= otherChar.y
    let otherCharHigherThanLowerHitboxEdge = xHigherHitboxEdge >= otherChar.y + otherChar.height
   
    let yCollision = otherCharHigherThanLowerHitboxEdge && otherCharLowerThanHigherHitboxEdge

    return xCollision && yCollision
 }
 
 x = 0
 y = 0
 
 width = 0
 height = 0
}

let jojoChar = new Char({
    x: 0,
    y: 0,
    width: 80,
    height: 80
})

let dioChar = new Char({
    x: 570,
    y: 0,
    width: 30,
    height: 50
})

function jump () {
    if(jojo.classList != 'jump'){
        jojo.classList.add('jump')
    }
    setTimeout(function() {
        jojo.classList.remove('jump')
    }, 300) 
    
    scoreCount  = scoreCount + 1;
}

let isAlive = setInterval ( function() {
    jojoChar.y = parseInt(window.getComputedStyle(jojo).getPropertyValue('top'));
    dioChar.x = parseInt(window.getComputedStyle(dio).getPropertyValue('left'));

    if (jojoChar.doCollideWith(dioChar) && jojoChar.y >= dioChar.y + dioChar.height) {
        scoreCount = 0;
        alert(`jojoChar ${JSON.stringify(jojoChar)}\ndioChar${JSON.stringify(dioChar)}`)
    } else if (dioChar.x < jojoChar.x) {
        scoreCount  = scoreCount + 1;
    }
    document.getElementById('score').textContent = scoreCount
    
}, 1)
