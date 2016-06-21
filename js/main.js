var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = canvas.width / 16*9;

var Mouse = new Vec2();

var particle_configs = {
    smoke: {
        direction: 270,
        direction_variance: 35,
        force: 0.9,
        force_variance: 0.5,
        lifespan: 200,
        lifespan_variance: 10,
        decay: 4,
        decay_variance: 1.5,
        size: 8,
        size_variance: 2,
        rate: 1,
        colour: {r:100, g:100, b:100},
        gravity: [0,0],
        alpha_start: 0.1
    },
    flame: {
        direction: 270,
        direction_variance: 25,
        force: 2.5,
        force_variance: 0.5,
        lifespan: 80,
        lifespan_variance: 10,
        decay: 12,
        decay_variance: 1.5,
        size: 2,
        size_variance: 1,
        rate: 2,
        colour: {r:246, g:207, b:1},
        gravity: [0,0],
        alpha_start: 0.6
    },
    colours:
        {
            copper: {r:60, g:127, b:253},
            standard: {r:246, g:207, b:1},
            potassium: {r:181, g:79, b:173},
            barium: {r:127,g:249,b:106},
        }
};

var pSmoke = new Particles(new Vec2(canvas.width/2, 154), particle_configs.smoke);
var pFlame = new Particles(new Vec2(canvas.width/2, 160), particle_configs.flame);

function init() {
    pFlame.setConfig({colour: particle_configs.colours.standard});
    loop();
}

function update() {
    pFlame.origin.set(Mouse.x, Mouse.y);
    pSmoke.origin.set(Mouse.x, Mouse.y - 10);

    if (Key.isDown(Key.X)) {
        pFlame.setConfig({lifespan:0, alpha_start:0, rate: 0});
        pSmoke.setConfig({lifespan:0, alpha_start:0, rate: 0});
     }
    if (Key.isDown(Key.G)) {
        pFlame.setConfig({size:5, force:4});
        pSmoke.setConfig({size:10, force:4});
     }
    if (Key.isDown(Key.R)) {
        pFlame.setConfig(particle_configs.flame);
        pSmoke.setConfig(particle_configs.smoke);
     }
    if (Key.isDown(Key.L)) {
        pFlame.setConfig({size:2, lifespan: 50, force: 1.4});
        pSmoke.setConfig({size:6, force:2});
     }

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
    var r = Tools.random(0,255,0);
    var g = Tools.random(0,255,0);
    var b = Tools.random(0,255,0);
    pFlame.setConfig({colour: {r:r,g:g,b:b}});
    console.log(pFlame.config.colour);
};

canvas.onmousemove = function(event) {
    var rect = canvas.getBoundingClientRect();
    Mouse.x = event.clientX - rect.left;
    Mouse.y = event.clientY - rect.top;
};
