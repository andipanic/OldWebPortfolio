// Var's and such
var canvas = document.getElementById("canvas"),
    c = canvas.getContext('2d'),
    canvColor = randomColor(),
    score = 0,
    tscore = 1,
    text = document.getElementById("text");
    WIDTH = canvas.width,
    HEIGHT = canvas.height;

// Player object
var player = {
    x: 200,
    y: 200,
    width: 64,
    height: 64,
    speed: 200,
    state: 0,
    color: '#'+Math.floor(Math.random()*16777215).toString(16)

};

// Item Object
var item = {
    x: Math.random() * WIDTH,
    y: Math.random() * HEIGHT / 2,
    width: 10,
    height: 10,
    color: '#fff',
    direction: 1,
    speed: 5 
};

function itemUpdate(){
    item.x = (WIDTH / 4) + (Math.random() * (WIDTH / 2));
    item.y = (HEIGHT / 4) + (Math.random() * (HEIGHT / 2));
    //item.color = '#'+Math.floor(Math.random()*16777215).toString(16);
    item.direction = Math.floor(Math.random() * 4);
    canvColor = randomColor();
}


// Player image(s)
var playerTiles = {
    loaded: false,
    image: new Image(),
    tileWidth: 64,
    tileHeight: 64 
};

playerTiles.image.onload = function(){
    playerTiles.loaded = true;
}

playerTiles.image.src = 'player.png';

// Key listener stuff
var keysDown = {};
window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
    console.log(e.keyCode);
});
window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});

function update(mod) {
    // Item updates
    //var speed = (score + tscore) * .01;
    if(item.speed <= 0) {
        item.speed = 0;
    }

    item.speed = item.speed - (tscore * .01);

    if(item.direction == 0) item.x += item.speed;
    if(item.direction == 1) item.y += item.speed;
    if(item.direction == 2) item.x -= item.speed;
    if(item.direction == 3) item.y -= item.speed;

    // Player updates
    if(37 in keysDown || 65 in keysDown) {
        player.state = 2; //left
        player.x -= player.speed * mod;
    }
    if(38 in keysDown || 87 in keysDown) {
        player.state = 3; //up
        player.y -= player.speed * mod;
    }
    if(39 in keysDown || 68 in keysDown) {
        player.state = 0; //right
        player.x += player.speed * mod;
    }
    if(40 in keysDown || 83 in keysDown) {
        player.state = 1; //down
        player.y += player.speed * mod;
    }
    // console.log("X: " + player.x + "\nY: " + player.y + "\nMod: " + mod + "\nkeysDown: " + keysDown);
    
    // Collisions
    // Player and item
    if(
        player.x < item.x + item.width &&
        player.x + player.width > item.x &&
        player.y < item.y + item.height &&
        player.y + player.height > item.y
    ){
        itemUpdate();
        score++;
    }

    // Player and wall
    if(player.x >= WIDTH - player.width) player.x = WIDTH - player.width;
    if(player.x <= 0) player.x = 0;
    if(player.y >= HEIGHT - player.height) player.y = HEIGHT - player.height;
    if(player.y <= 0) player.y = 0;

    // Item and wall
    if(
        item.y >= HEIGHT || 
        item.y <= 0 - item.height || 
        item.x >= WIDTH || 
        item.x <= 0 - item.width
    ){
        itemUpdate();
    }
}

// Render
function render() {
    // black background
    c.fillStyle = canvColor;
    c.fillRect(0, 0, WIDTH, HEIGHT);
   
    // font stuff 
    //c.font = "10px Georgia";
    //c.fillStyle = "white";
    //c.fillText("Mini Strobe Speed: " + item.speed, 5, HEIGHT - 10);

    // player square
    c.fillStyle = player.color;
    c.fillRect(player.x, player.y, player.width, player.height);
    
    // player picture
    /*if (playerTiles.loaded) {
        c.drawImage(
            playerTiles.image,
            player.state * playerTiles.tileWidth,
            0,
            player.width,
            player.height,
            Math.round(player.x),
            Math.round(player.y),
            player.width,
            player.height
        );
    }*/
    
    // item square
    c.fillStyle = item.color;
    c.fillRect(item.x, item.y, item.width, item.height);
}

//testing stuff
function bgChanger() {
    document.body.style.background = '#'+Math.floor(Math.random()*16777215).toString(16);
}

function randomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

// Run
function run() {
    update((Date.now() - time) / 1000);
    render();
    time = Date.now();
    setScore();
    item.color = randomColor();
}

var time = Date.now();
setInterval(run, 10);
setInterval(function() {
    player.color = randomColor();
}, 100);

setInterval(function() {
    document.body.style.background = randomColor();
}, 1000);

setInterval(function() {
    text.style.color = randomColor();
}, 50);

// INCREMENTAL STUFF (A.k.a. button crap)
function setScore(){
    tscore = tscore + score;
    score = 0;
}


