let blockSize =25;
let rows = 20;
let cols = 20;
let board;
let context;

let velocityX = 0;
let velocityY = 0;
//snake head

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
//body
let snakeBody = [];
//food
let foodX;
let foodY;
let gameOver = false;
let gameStart = false;


window.onload = function(){
    board = document.getElementById("board");
    board.height  = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup",changeDirection);
    const counter  = document.querySelector("#counter");
    // update();
    setInterval(update,1000/10)
}
const changeDirection = (e) => {
    switch(e.code){
        case "ArrowLeft":
            if(velocityX == 1) return;
            velocityX = -1;
            velocityY = 0;
            break;
        case "ArrowRight":
            if(velocityX == -1) return;
            velocityX = 1;
            velocityY = 0;
            break;
        case "ArrowDown":
            if(velocityY == -1) return;
            velocityX = 0;
            velocityY = 1;
            break;
        case "ArrowUp":
            if(velocityY == 1) return;
            velocityX = 0;
            velocityY = -1;
            break;
    }
}

const update= () =>{
    console.log(snakeBody.length)
    if(gameStart)
    {
        counter.innerText = "Score: " + (snakeBody.length>0?snakeBody.length:0) +  " 🍏";
    }

    if(gameOver)
    {
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

    context.fillStyle = "red";
    context.fillRect(foodX,foodY,blockSize,blockSize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX,foodY])
        placeFood();
    }

    for(let i =snakeBody.length-1;i>0;i--){
        snakeBody[i] = snakeBody[i-1];

    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY]
    }

    checkCollision();
    context.fillStyle = "lime";
    snakeX += velocityX *blockSize;
    snakeY += velocityY *blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);

    for(let i=0;i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }


    for(let i=0; i<snakeBody.length;i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over");
        }
    }
    gameStart = true;

}
const placeFood = () => {
    foodX = Math.floor(Math.random() * rows) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}
const checkCollision = () => {
    if (snakeX < 0) {
        snakeX = board.width - blockSize;
    } else if (snakeX >= board.width) {
        snakeX = 0;
    }

    if (snakeY < 0) {
        snakeY = board.height - blockSize;
    } else if (snakeY >= board.height) {
        snakeY = 0;
    }
}
