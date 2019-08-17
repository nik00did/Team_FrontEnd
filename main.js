let canvas;
let ctx;
let itemBall;
let time;

const addBallInArray = ball => {
    if (!ball || typeof ball !== 'object') {
        return;
    }

    balls.push(ball);
};

const drawBall = ball => {
    ctx.beginPath();
    ctx.fillStyle = ball.color;
    ctx.lineWidth = ball.borderWidth;
    ctx.strokeStyle = ball.borderColor;
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
};

const onClick = event => {
    itemBall = new Ball(event.layerX, event.layerY, (Math.random() * 150 + 50) / 2, Math.random() * 40 + 10, Math.round(Math.random() * (2* Math.PI)));

    if (itemBall.x < itemBall.radius || itemBall.y < itemBall.radius || itemBall.x > canvas.width - itemBall.radius || itemBall.y > canvas.height - itemBall.radius) {
        return;
    }

    if (balls.length > 1) {
        let distanceBetweenPoints;

        for (let i = 0; i < balls.length; i++) {
            distanceBetweenPoints = Math.sqrt(Math.pow(itemBall.x - balls[i].x,2) + Math.pow( itemBall.y - balls[i].y,2));

            if (distanceBetweenPoints < itemBall.radius + balls[i].radius) {
                return;
            }
        }
    }

    addBallInArray(itemBall);

    drawBall(balls[balls.length - 1]);


};

let moveOneBall = ball => {
    ball.x += Math.cos(ball.startAngel);
    ball.y += Math.sin(ball.startAngel);
};

const moving = balls => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {//think about random way
        moveOneBall(balls[i]);
        drawBall(balls[i]);
    }
};

const init = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.onclick = onClick;
    setInterval(moving, 20, balls);
};

init();