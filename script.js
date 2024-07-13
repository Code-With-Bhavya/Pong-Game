let result = false;
let levelpaddle = "easy";
let randomNumber = 40;

function gameStart() {
    const upbutton = document.querySelector("#upbutton");
    const downbutton = document.querySelector("#downbutton");
    const upbuttonleft = document.querySelector("#upbuttonleft");
    const downbuttonleft = document.querySelector("#downbuttonleft");
    const bouncesound = document.getElementById('bouncesound');
    const gamearea = document.querySelector("#gamearea");
    const ctx = gamearea.getContext("2d");
    const scoretext = document.querySelector("#scoretext");
    const resetbutton = document.querySelector("#resetbutton");
    const gamewidth = gamearea.width;
    const gameheight = gamearea.height;
    const boardbackground = "forestgreen";
    const paddle1color = "lightblue";
    const paddle2color = "red";
    const paddleborder = "black";
    const ballcolor = "yellow";
    const ballbordercolor = "black";
    const ballradius = 12.5;
    const paddlespeed =50;
    let automaticpaddlespeed = 0
    let intervalid;
    let ballspeed = 4;
    let ballx = gamewidth / 2;
    let bally = gameheight / 2;
    let ballxdirection = 0;
    let ballydirection = 0;
    let player1score = 0;
    let player2score = 0;
    let paddle1 = {
        width: 25,
        height: 100,
        x: 0,
        y: 0

    }
    let paddle2 = {
        width: 25,
        height: 100,
        x: gamewidth - 25,
        y: gameheight - 100

    }
   
    window.addEventListener("keydown", changedirection);
    resetbutton.addEventListener("click", resetgame);
    upbutton.addEventListener("click" , moveup);
    downbutton.addEventListener("click" , movedown);
    upbuttonleft.addEventListener("click" , moveupleft);
    downbuttonleft.addEventListener("click" , movedownleft);
    gamestart();
    function gamestart() {
        createball();
        nexttick();
    };
    function nexttick() {
        intervalid = setTimeout(() => {
            movepaddle();
            clearboard();
            drawpaddles();
            moveball();
            drawball(ballx, bally);
            checkcollision();
            nexttick();

        }, 10)
    };
    function clearboard() {
        ctx.fillStyle = boardbackground;
        ctx.fillRect(0, 0, gamewidth, gameheight)
    };
    
    function drawpaddles() {
        ctx.strokeStyle = paddleborder;
        //paddle1 draw:
        ctx.fillStyle = paddle1color;
        ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)
        ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height)
        //paddle 2 draw:
        ctx.fillStyle = paddle2color;
        ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
        ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height)
    };
    function createball() {
        ballspeed = 6;
        if (Math.round(Math.random()) == 1) {
            ballxdirection = 1;
        }
        else {
            ballxdirection = -1;
        }
        if (Math.round(Math.random()) == 1) {
            ballydirection = 1;
        }
        else {
            ballydirection = -1;
        }
        ballx = gamewidth / 2;
        bally = gameheight / 2;
        drawball(ballx, bally);
    };
    function moveball() {
        movepaddle();
        ballx += ballspeed * ballxdirection;
        bally += ballspeed * ballydirection;
    };
    function drawball(ballx, bally) {
        ctx.fillStyle = ballcolor;
        ctx.strokeStyle = ballbordercolor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ballx, bally, ballradius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    };
    function checkcollision() {
        if (bally <= 0 + ballradius) {
            ballydirection *= -1;
        }
        if (bally >= gameheight - ballradius) {
            ballydirection *= -1;
        }
        if (ballx <= 0) {
            player2score += 1;
            updatescore();
            createball();
            return;
        }
        if (ballx >= gamewidth) {
            player1score += 1;
            updatescore();
            createball();
            return;
        }
        if (ballx <= (paddle1.x + paddle1.width + ballradius)) {
            if (bally > paddle1.y && bally < paddle1.y + paddle1.height) {
                ballx = paddle1.x + paddle1.width + ballradius;//if ball stucks
                bouncesound.play();
                ballxdirection *= -1;
                ballspeed += 0.4;
            }
        }
        if (ballx >= (paddle2.x - ballradius)) {
            if (bally > paddle2.y && bally < paddle2.y + paddle2.height) {
                ballx = paddle2.x - ballradius;//if ball stucks
                bouncesound.play();
                ballxdirection *= -1;
                ballspeed += 0.4;
            }
        }
    };
    function changedirection(event) {
        const keypressed = event.keyCode;
        const paddle1up = 87;
        const paddle1down = 83;
        const paddle2up = 38;
        const paddle2down = 40;
        switch (keypressed) {
            case (paddle1up):
                if (result) {
                    if (paddle1.y > 0) {
                        paddle1.y -= paddlespeed;
                    };
                    
                    
                }
                break;
            case (paddle1down):
                if (result) {
                    if (paddle1.y < gameheight - paddle1.height) {
                        paddle1.y += paddlespeed;
                    }
                    
                }
                break;
            case (paddle2up):
                if (paddle2.y > 0) {
                    paddle2.y -= paddlespeed;
                }
                break;
            case (paddle2down):
                if (paddle2.y < gameheight - paddle2.height) {
                    paddle2.y += paddlespeed;
                }
                break;
        }
    };
    function updatescore() {
        scoretext.textContent = `${player1score} : ${player2score}`;
        if (player1score == winnerscore){
            alert("Player 1 is Winner");
            window.location.reload();
        }
        if (player2score == winnerscore){
            alert("Player 2 is Winner");
            window.location.reload();
        }
    };
    function resetgame() {
        window.location.reload();
    };
    function movepaddle() {
        
        
        if(!result){
           
            if(levelpaddle == 'easy'){
                if (Math.abs(ballx - gamewidth / 2) <= ballspeed ){
                    randomNumber = Math.floor(Math.random() * 100) + 1;
                };
                if(ballx < gamewidth/2){
                
                    if(randomNumber>15){
                        paddle1.y = bally - (paddle1.height/2);
                    }
                    else{
                        paddle1.y = bally - 200;
                    };
                };
            };   
            if(levelpaddle == 'medium'){
                if (Math.abs(ballx - gamewidth / 2) <= ballspeed ){
                    randomNumber = Math.floor(Math.random() * 100) + 1;
                };
                if (randomNumber>10){
                    if(ballx < gamewidth/2){
                    paddle1.y = bally - (paddle1.height/2);
                    };
                }
                else{
                    if(ballx < gamewidth/2){
                        paddle1.y = bally - 100;
                    };
                };
            };   
            if(levelpaddle == 'hard'){
                if (Math.abs(ballx - gamewidth / 2) <= ballspeed){
                    randomNumber = Math.floor(Math.random() * 100) + 1;
                };
                if (randomNumber>5){
                    if(ballx < gamewidth/2){
                    paddle1.y = bally - (paddle1.height/2);
                    };
                }
                else{
                    if(ballx < gamewidth/2){
                        paddle1.y = bally - 110;
                    };
                };
            };   
           
        }
    }
    function moveup(){
        if (paddle2.y > 0){
            paddle2.y -= paddlespeed;
        };
    }
    function movedown(){
        if (paddle2.y < gameheight/2 + paddle2.height ){
            paddle2.y += paddlespeed;
        }
    }
    function moveupleft(){
        if (result){
            if (paddle1.y > 0){
                paddle1.y -= paddlespeed;
            };
        };   
    };
    function movedownleft(){
        if (result){
            if (paddle1.y < gameheight/2 + paddle1.height ){
                paddle1.y += paddlespeed;
            };
        };
    };
    
};
