function Particle(position) {
    this.position = position.clone();
    this.velocity = new Vec2();
    this.acceleration = new Vec2();
    this.GRAVITY = new Vec2(0,0.05);
    this.lifespan_max = 100;
    this.lifespan = 100;
    this.decay = 1;
    this.size = 1;
    this.alphaFade = true;
}

Particle.prototype.addForce = function (angle, mag) {
    var f = Tools.angle2vector(Tools.degreesToRadians(angle)).multiply(mag);
    this.acceleration.add(f);
};

Particle.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.reset();

    this.acceleration.add(this.GRAVITY);

    this.lifespan -= this.decay;
};

Particle.prototype.draw = function (context) {
    var a = (this.alphaFade) ? Tools.map(this.lifespan, 0, this.lifespan_max, 0, 1) : 1;
    Draw.circle(context, this.position, this.size, 'rgba(255,255,255,' + a +')');
};

Particle.prototype.isDead = function () {
    return (this.lifespan < 0);
};





function Particles(position, options) {
    this.particles = [];
    this.origin = position.clone();
    this.GRAVITY = new Vec2(0, 0.1);
    this.velocity = new Vec2();
    this.active = true;
    this.direction = 270;
    this.direction_variance = 45;
    this.force = 2;
    this.force_variance = 0.75;
    this.lifespan = 150;
    this.lifespan_variance = 1;
    this.decay = 1;
    this.decay_variance = 0;
    this.size = 3;
    this.size_variance = 2;
    this.alphaFade = true;
    this.rate = 1;
}

Particles.prototype.setPosition = function (pos) { this.origin = pos; };

Particles.prototype.setRate = function (rate) { this.rate = rate; };

Particles.prototype.setDirection = function (deg, variance) {
    this.direction = deg;
    this.direction_variance = (typeof variance === 'undefined') ? this.direction_variance : variance;
};

Particles.prototype.setForce = function (force, variance) {
    this.force = force;
    this.force_variance = (typeof variance === 'undefined') ? this.force_variance : variance;
};

Particles.prototype.setLifespan = function (lifespan, variance) {
    this.lifespan = lifespan;
    this.lifespan_max = lifespan;
    this.lifespan_variance = (typeof variance === 'undefined') ? this.lifespan_variance : variance;
};

Particles.prototype.setDecay = function (decay, variance) {
    this.decay = decay;
    this.decay_variance = (typeof variance === 'undefined') ? this.decay_variance : variance;
};

Particles.prototype.setSize = function (size, variance) {
    this.size = size;
    this.size_variance = (typeof variance === 'undefined') ? this.size_variance : variance;
};

Particles.prototype.addParticle = function() {
    var p = new Particle(this.origin);

    var vMin = Tools.angle2vector(Tools.degreesToRadians(this.direction - (this.direction_variance/2))).unit();
    var vMax = Tools.angle2vector(Tools.degreesToRadians(this.direction + (this.direction_variance/2))).unit();
    var vForce = Tools.random(this.force-(this.force_variance/2), this.force+(this.force_variance/2));
    p.velocity = new Vec2(Tools.random(vMin.x, vMax.x), Tools.random(vMin.y, vMax.y)).multiply(vForce);

    p.GRAVITY = this.GRAVITY;

    p.lifespan = Tools.randomVariance(this.lifespan, this.lifespan_variance);
    p.decay = Tools.randomVariance(this.decay, this.decay_variance);

    p.size = Tools.randomVariance(this.size, this.size_variance);
    p.alphaFade = this.alphaFade;

    this.particles.push(p);
};

Particles.prototype.addForce = function (angle, mag) {
    for (var p in this.particles) { this.particles[p].addForce(angle, mag); }
};

Particles.prototype.update = function () {
    var self = this;
    (this.rate).times(function(){ self.addParticle(); });

    for (var p in this.particles) {
        this.particles[p].update();
        if (this.particles[p].isDead()) { this.particles.splice(p, 1); }
    }
};

Particles.prototype.draw = function(ctx) {
    for (var p in this.particles) { this.particles[p].draw(ctx); }
};
