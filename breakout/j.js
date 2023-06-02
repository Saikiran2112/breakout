let grid = document.querySelector('.grid')
let blockwidth = 100
let blockheight = 50
let userstart = [230, 10]
let current = userstart
let ballstart = [280, 30]
let x = -2
let y = 2
let cbp = ballstart
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.topLeft = [xAxis, yAxis + blockheight]
        this.bottomRight = [xAxis + blockwidth, yAxis]
        this.topRight = [xAxis + blockwidth, yAxis + blockheight]
    }
}
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
]
function addblock() {
    for (let i = 0; i < blocks.length; i++) {
        const ele = document.createElement('div')
        ele.setAttribute('class', 'block')
        ele.style.left = blocks[i].bottomLeft[0] + 'px'
        ele.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(ele)
    }


}
addblock()
let user = document.createElement('div')
user.setAttribute('class', 'user')
drawuser()
grid.appendChild(user)
function drawuser() {
    user.style.left = current[0] + 'px'
    user.style.bottom = current[1] + 'px'
}
//move
function moveuser(e) {
    switch (e.key) {
        case 'ArrowLeft':


            if (current[0] > 0) {
                current[0] -= 10
                drawuser()

            }

            break;
        case 'ArrowRight':


            if (current[0] < 460) {
                current[0] += 10
                drawuser()

            }

            break;
    }
}

document.addEventListener('keydown', moveuser)
let ball = document.createElement('div')

ball.setAttribute('class', 'ball')


function drawball() {

    ball.style.left = cbp[0] + 'px'
    ball.style.bottom = cbp[1] + 'px'
    grid.appendChild(ball)



}


function moveball() {
    cbp[0] += x
    cbp[1] += y
    drawball()
    checkforcollision()

}
let score=document.getElementById('score')
function checkforcollision() {
    //usercollision
    if(cbp[0]>=current[0] && cbp[0]<=(current[0]+100) && cbp[1]<=30 && cbp[1]>10){
        changedirection()
    }
    //block collisions
    for (let i=0;i<blocks.length;i++){
        if(cbp[0]>=blocks[i].bottomLeft[0] && cbp[0]<=blocks[i].bottomRight[0] && cbp[1]>=(blocks[i].bottomRight[1]-20) && cbp[1]<=(blocks[i].topRight[1])){
            const b=Array.from(document.querySelectorAll('.block'))
            b[i].classList.remove('block')
            blocks.splice(i,1)
            changedirection()
            
        }
    }

    if (cbp[0] >= 540 || cbp[1] >= 280 || cbp[0]<=0) {
        changedirection()

    }
    if(cbp[1]<=0){
        score.innerText="You Lose"
        clearInterval(timeid)
        document.removeEventListener('keydown',moveuser)

    }
}
function changedirection() {
    if (x === 2 && y === 2) {
        y = -2

        return
    }
    if (x === 2 && y === -2) {
        x = -2

        return
    }
    if (x === -2 && y === 2) {
        x = 2

        return
    }
    if (x === -2 && y === -2) {
        y = 2

        return
    }
}
let timeid=setInterval(moveball, 30)