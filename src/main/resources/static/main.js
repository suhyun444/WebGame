//한칸은 40x40
class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        return this.items.shift();
    }

    peek() {
        return this.items[0];
    }
}
function SetKeyDownEvent()
{
    document.addEventListener("keydown",function(e){
        if(e.key == "ArrowUp")
            direction = 0;
        else if (e.key == "ArrowRight") 
            direction = 1;
        else if (e.key == "ArrowDown") 
            direction = 2;
        else if (e.key == "ArrowLeft") 
            direction = 3;
    })
}
function Start()
{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d')
    canvas.width = 800;
    canvas.height = 800;

    DrawGrid();
    curPos = {
        x: 1,
        y: 1
    }
    snake.enqueue(curPos);
    DrawSnake(curPos.y,curPos.x);
    SpawnApple();
}
function DrawGrid()
{
    board = new Array(20);
    for(let i=0;i<20;++i)
    {
        board[i] = new Array(20);
        for(let j=0;j<20;++j)
        {
            board[i][j] = 0;
            ctx.fillStyle="black";
            ctx.fillRect(i * 40 + 17, j * 40 + 17, 6, 6);
        }
    }
}
function DrawSnake(y,x)
{
    board[y][x] = 1;
    ctx.fillStyle="Green";
    ctx.fillRect(x*40+5,y*40+5,30,30);
}
function RecoveryBlock(y,x)
{
    board[y][x] = 0;
    ctx.clearRect(x*40,y*40,40,40);
    ctx.fillStyle="black";
    ctx.fillRect(x*40+17,y*40+17,6,6);
}
function SpawnApple()
{
    let y,x;
    while(true)
    {
        y = Math.floor(Math.random() * 20);
        x = Math.floor(Math.random() * 20);
        if(board[y][x] == 0)break;
    }
    board[y][x] = 2;
    ctx.fillStyle="red";
    ctx.fillRect(x*40+5,y*40+5,30,30);
}
function Move()
{
    let nextX = curPos.x + dirX[direction];
    let nextY = curPos.y + dirY[direction];
    if(nextX < 0 || nextY < 0 || nextX >= 20 || nextY >= 20)
    {
        End();
        return;
    }
    else if(board[nextY][nextX] == 2)
    {
        SpawnApple();
    }
    else
    {
        let tail = snake.dequeue();
        RecoveryBlock(tail.y,tail.x);
        if(board[nextY][nextX] == 1)
        {
            End();
            return;
        }
    }
    curPos = {x:nextX,y:nextY};
    snake.enqueue(curPos);
    DrawSnake(curPos.y,curPos.x);
}
function End()
{

}
function Update()
{
    requestAnimationFrame(Update);
    const cur = Date.now();
    let deltaTime = cur - prev;
    if(deltaTime > fpsInterval)
    {
        prev = cur - (deltaTime % fpsInterval);
        Move();
    }
}

const fpsInterval = 200;
const snake = new Queue();
let dirX = [0,1,0,-1];
let dirY = [-1,0,1,0];
let curPos;
let direction = 0;
let prev = Date.now(); 
let snakeMoveTime = 0;
let board;
let canvas;
let ctx;
Start();
SetKeyDownEvent()
Update();
