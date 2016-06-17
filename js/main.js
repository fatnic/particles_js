var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = canvas.width / 16*9;

var Mouse = new Vec2();

var particles = new Particles(new Vec2(canvas.width/2, 160));

function init() {
    loop();
}

function update() {

    particles.setDirection(270, 25);
    particles.setForce(3.5, 0.5);
    particles.setLifespan(150, 50);
    particles.setDecay(4, 2);
    particles.setSize(2, 1);
    particles.setRate(1);

    particles.update();

    for (var p in particles.particles) { if (particles.particles[p].position.y > canvas.height) { particles.particles.splice(p, 1); } }
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
