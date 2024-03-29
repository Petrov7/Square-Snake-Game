const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext('2d');
const size = Math.round(canvas.width / 10.5 && canvas.height / 10.8);
let score = 0;

const xEnd = Math.round(canvas.width / size) * size;
const yEnd = Math.round(canvas.height / size) * size;
let directionLock = false;

const snake = [{
    x: 0,
    y: 0
}];

const apple = {};
let direction = 'right';
let speed = 200;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function setApple() {
    apple.x = Math.round(random(size, canvas.width - size) / size) * size;
    apple.y = Math.round(random(size, canvas.height - size) / size) * size;
}

console.log(window.innerHeight);
function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, size, size);
    
    for (let i = 0; i < snake.length; i++){
        const s = snake[i];
        context.fillStyle = 'green';
        context.fillRect(s.x, s.y, size - 1, size - 1);
    }

    window.requestAnimationFrame(draw);
}

function tick() {
    for (let i = snake.length - 1; i >= 0; i--){
        if (i === 0 && snake[i].x === apple.x && snake[i].y === apple.y){
            snake.push({});
            speed *= 0.99;
            score++;
            document.getElementById('score').textContent = `Score: ${score}`;
            setApple();
        }
        
        const s = snake[i];
        
        if (i === 0){
            switch (direction) {
                case "right":
                    if (s.x > canvas.width) s.x = 0;
                    else s.x += size;
                    break;
                case "down":
                    if (s.y > canvas.height) s.y = 0;
                    else s.y += size;
                    break;
                case "left":
                    if (s.x < 0) s.x = xEnd;
                    else s.x -= size;
                    break;
                case "up":
                    if (s.y < 0) s.y = yEnd;
                    else s.y -= size;
                    break;
            }
            
            for (let j = 1; j < snake.length; j += 1){
                if (snake[0].x === snake[j].x && snake[0].y === snake[j].y){
                    alert('Game Over');
                    window.location.reload();
                }
            }
            
            
        } else {
            snake[i].x = snake[i - 1].x;
            snake[i].y = snake[i - 1].y;
        }
    }

    window.setTimeout(tick, speed);
    directionLock = false;
}

function onKeyDown(e) {
    if (!directionLock){
        directionLock = true;

        const dir = e.key.substr(5).toLowerCase();

        if (direction === 'left' && dir !== 'right') direction = dir;
        if (direction === 'right' && dir !== 'left') direction = dir;
        if (direction === 'up' && dir !== 'down') direction = dir;
        if (direction === 'down' && dir !== 'up') direction = dir;

    }
}

setApple();
window.addEventListener('keydown', onKeyDown);
window.setTimeout(tick, speed);
window.requestAnimationFrame(draw);