function Dancer(x, y, radius, options_) {
  var options = Object.assign({
    friction: 0.3,
    restitution: 0.6,
    frictionAir: 0.25
  }, options_);

  this.radius = radius;

  this.n_afraid = 30;
  this.n_likes = 1;

  this.afraid_force = 0.0001;
  this.likes_force = 0.0010;
  this.center_of_mass_force = 0.0001;
  this.center_of_room_force = 0.0003;

  //this.afraid_force = 0;
  //this.likes_force = 0;
  //this.center_of_mass_force = 0;
  //this.center_of_room_force = 0;

  this.afraid_radius = 75;
  this.likes_radius = 0;
  this.center_of_mass_radius = 200;
  this.center_of_room_radius = 200;

  this.afraid = [];
  this.likes = [];
  this.ticks = 0;

  this.center_of_the_room = createVector(width / 2, height / 2);

  if (options.color) {
    this.fill_color = options.color;
    this.border_color = options.border_color;
  } else {
    this.fill_color = color(
      random(255),
      random(127) + 127,
      random(155) + 100
    );

    this.border_color = this.fill_color;
  }

  this.body = Bodies.circle(x, y, radius, options);
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
    ellipse(0, 0, this.radius * 2);
    pop();
  };

  this.get_position_vector = function() {
    return createVector(this.body.position.x, this.body.position.y);
  };

  this.dance = function() {
    if (this.ticks > 0) {
      this.ticks -= 1;
    } else {
      this.ticks = int(550 + random(100));
      this.update_partners();
    }

    this.move();
    this.towards_center_of_the_room();
  };

  this.move = function() {
    for (var prop in this.likes) {
      this.dance_towards(this.likes[prop]);
    }

    for (prop in this.afraid) {
      this.dance_away_from(this.afraid[prop]);
    }
  };

  this.towards_center_of_mass = function(center) {
    var pos1 = this.get_position_vector();
    var pos2 = center.copy();
    var pos3 = pos2.sub(pos1);

    if (pos3.mag() < this.center_of_mass_radius) {
      return;
    }

    pos3.setMag(this.center_of_mass_force);

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

  this.check_bound = function() {
    var pos = this.body.position;

    if (pos.x < 0 || pos.x > width || pos.y < 0 || pos.y > height) {
      Body.setPosition(
        this.body,
        {
          x: random(100, width - 100),
          y: random(100, height - 100)
        }
      );

      Body.setVelocity(
        this.body,
        {
          x: 0,
          y: 0
        }
      );
    }
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

  this.towards = function(position, force, options) {
    var pos1 = this.get_position_vector();
    var pos2 = position.copy();
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
}

Dancer.prototype.dance_towards = function(dancer) {
  var pos1 = this.get_position_vector();
  var pos2 = dancer.get_position_vector();
  var pos3 = pos2.sub(pos1);

  if (pos3.mag() < this.likes_radius) {
    return;
  }

  pos3.setMag(this.likes_force);

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

Dancer.prototype.dance_away_from = function(dancer) {
  var pos1 = this.get_position_vector();
  var pos2 = dancer.get_position_vector();
  var pos3 = pos2.sub(pos1);

  if (pos3.mag() > this.afraid_radius) {
    return;
  }

  pos3.setMag(-this.afraid_force);

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
}

Dancer.prototype.towards_center_of_the_room = function() {
  var pos1 = this.get_position_vector();
  var pos2 = this.center_of_the_room.copy();
  var pos3 = pos2.sub(pos1);

  if (pos3.mag() < this.center_of_room_radius) {
    return;
  }

  pos3.setMag(this.center_of_room_force);

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
