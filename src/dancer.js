function Dancer(x, y, w, h, options_) {
  var options = Object.assign({
    friction: 0.3,
    restitution: 0.6
  }, options_);

  this.n_afraid = 10;
  this.n_likes = 25;

  this.afraid_force = -0.000025;
  this.likes_force = 0.0001;
  this.center_force = -0.0001;

  this.afraid = [];
  this.likes = [];
  this.ticks = 0;

  if (options.color) {
    this.fill_color = options.color;
    this.border_color = options.border_color;
  } else {
    this.fill_color = color(random() * 255, random() * 255, random() * 255);
    this.border_color = color(255);
  }

  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(this.border_color);
    fill(this.fill_color);
    rect(0, 0, this.w, this.h);
    pop();
  };

  this.get_position_vector = function() {
    return createVector(this.body.position.x, this.body.position.y);
  };

  this.dance = function() {
    if (this.ticks > 0) {
      this.ticks -= 1;
      this.move();
    } else {
      this.ticks = int(500 + random(100));
      this.update_partners();
    }
  };

  this.move = function() {
    for (var prop in this.likes) {
      this.dance_towards(this.likes[prop], this.likes_force);
    }

    for (prop in this.afraid) {
      this.dance_towards(this.afraid[prop], this.afraid_force);
    }
  };

  this.away_from_center = function(center) {
    var pos1 = this.get_position_vector();
    var pos2 = center.copy();
    var pos3 = pos2.sub(pos1);

    pos3.setMag(this.center_force);

    Body.applyForce(
      this.body, {
        x: pos1.x,
        y: pos1.y
      },
      {
        x: pos3.x,
        y: pos3.y
      }
    );
  };

  this.dance_towards = function(dancer, force) {
    var pos1 = this.get_position_vector();
    var pos2 = dancer.get_position_vector();
    var pos3 = pos2.sub(pos1);

    pos3.setMag(force);

    Body.applyForce(
      this.body, {
        x: pos1.x,
        y: pos1.y
      },
      {
        x: pos3.x,
        y: pos3.y
      }
    );
  };

  this.update_partners = function() {
    this.afraid = [];
    this.likes = [];

    this.used = [];

    var i, index;

    for (i = 0, len = this.n_afraid; i < len; i++) {
      index = int(random(1, dancers.length));
      this.afraid.push(dancers[index]);
    }

    for (i = 0, len = this.n_likes; i < len; i++) {
      index = int(random(1, dancers.length));
      this.likes.push(dancers[index]);
    }
  };
}

function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  var arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
