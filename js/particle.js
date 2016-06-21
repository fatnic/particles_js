function Particle(position) {
    this.position = position.clone();
    this.velocity = new Vec2();
    this.acceleration = new Vec2();
    this.gravity = new Vec2(0,0.05);
    this.colour = {r:255,g:255,b:255,a:1};
}

Particle.prototype.addForce = function (angle, mag) {
    var f = Tools.angle2vector(Tools.degreesToRadians(angle)).multiply(mag);
    this.acceleration.add(f);
};

Particle.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.reset();

    this.acceleration.add(this.gravity);

    this.lifespan -= this.decay;
};

Particle.prototype.draw = function (context) {
    var alpha = (this.alphaFade) ? Tools.map(this.lifespan, 0, this.lifespan_max, 0, this.alpha_start) : this.alpha_start;
    var col = Object.assign(this.colour, {a: alpha});
    Draw.circle(context, this.position, this.size, Colours.obj2rgba(col));
};

Particle.prototype.isDead = function () {
    return (this.lifespan < 0);
};





function Particles(position, config) {
    this.particles = [];
    this.origin = position.clone();
    this.velocity = new Vec2();
    this.active = true;
    this.default = {
        direction: 270,
        direction_variance: 25,
        force: 2,
        force_variance: 0.75,
        lifespan: 150,
        lifespan_variance: 1,
        decay: 1,
        decay_variance: 0,
        size: 3,
        size_variance: 2,
        rate: 1,
        gravity: [0.0, 0.1],
        alphaFade: true,
        alpha_start: 1,
        colour: {r:255,g:255,b:255,a:1},
    };
    this.config = Object.assign(this.default, config);
}

Particles.prototype.setConfig = function (config) {
    this.config = Object.assign(this.config, config);
};

Particles.prototype.addParticle = function() {
    var p = new Particle(this.origin);
    var vMin = Tools.angle2vector(Tools.degreesToRadians(this.config.direction - (this.config.direction_variance/2))).unit();
    var vMax = Tools.angle2vector(Tools.degreesToRadians(this.config.direction + (this.config.direction_variance/2))).unit();
    var vForce = Tools.random(this.config.force-(this.config.force_variance/2), this.config.force+(this.config.force_variance/2));
    p.velocity = new Vec2(Tools.random(vMin.x, vMax.x), Tools.random(vMin.y, vMax.y)).multiply(vForce);
    p.gravity = new Vec2(this.config.gravity[0], this.config.gravity[1]);
    p.lifespan = Tools.randomVariance(this.config.lifespan, this.config.lifespan_variance);
    p.lifespan_max = p.lifespan;
    p.decay = Tools.randomVariance(this.config.decay, this.config.decay_variance);
    p.size = Tools.randomVariance(this.config.size, this.config.size_variance);
    p.colour = Object.assign(p.colour, this.config.colour);
    p.alphaFade = this.config.alphaFade;
    p.alpha_start = this.config.alpha_start;
    this.particles.push(p);
};

Particles.prototype.update = function () {
    var self = this;
    (this.config.rate).times(function(){ self.addParticle(); });

    for (var p in this.particles) {
        this.particles[p].update();
        if (this.particles[p].isDead()) { this.particles.splice(p, 1); }
    }
};

Particles.prototype.draw = function(ctx) {
    for (var p in this.particles) { this.particles[p].draw(ctx); }
};
