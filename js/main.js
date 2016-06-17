var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = canvas.width / 16*9;

var Mouse = new Vec2();

var smoke = {
    direction: 270,
    direction_variance: 35,
    force: 1,
    force_variance: 0.5,
    lifespan: 250,
    lifespan_variance: 10,
    decay: 4,
    decay_variance: 1.5,
    size: 6,
    size_variance: 2,
    rate: 3,
    colour: {r:128, g:128, b:128},
    gravity: [0,0],
    alpha_start: 0.1
};

var flame = {
    direction: 270,
    direction_variance: 25,
    force: 3.2,
    force_variance: 0.5,
    lifespan: 80,
    lifespan_variance: 10,
    decay: 12,
    decay_variance: 1.5,
    size: 2,
    size_variance: 1,
    rate: 3,
    colour: {r:255, g:255, b:51},
    gravity: [0,0],
    alpha_start: 0.6
};

var pSmoke = new Particles(new Vec2(canvas.width/2, 160), smoke);
var pFlame = new Particles(new Vec2(canvas.width/2, 160), flame);

function init() {
    loop();
}

function update() {
    pSmoke.update();
    pFlame.update();
}

function draw() {
    Draw.clear(ctx, 'rgb(51,51,51)');
    pSmoke.draw(ctx);
    pFlame.draw(ctx);
    Draw.text(ctx, new Vec2(20, canvas.height-10), "Particles: " + (pSmoke.particles.length + pFlame.particles.length));
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

init();

canvas.onclick = function(e) {
};

canvas.onmousemove = function(event) {
    var rect = canvas.getBoundingClientRect();
    Mouse.x = event.clientX - rect.left;
    Mouse.y = event.clientY - rect.top;
};
