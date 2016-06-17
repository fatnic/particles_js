var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = canvas.width / 16*9;

var Mouse = new Vec2();

var pConfig = {
    direction: 270,
    direction_variance: 25,
    force: 2.2,
    force_variance: 0.5,
    lifespan: 25,
    lifespan_variance: 1,
    decay: 2,
    decay_variance: 1,
    size: 2,
    size_variance: 1,
    rate: 3,
};

var particles = new Particles(new Vec2(canvas.width/2, 160), pConfig);

function init() {
    loop();
}

function update() {
    // particles.origin.set(Mouse.x, Mouse.y);
    particles.update();
}

function draw() {
    Draw.clear(ctx, 'rgb(51,51,51)');
    particles.draw(ctx);
    Draw.text(ctx, new Vec2(20, canvas.height-10), "Particles: " + particles.particles.length);
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
