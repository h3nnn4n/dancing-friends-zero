function Dancer(x, y, radius) {
  this.radius = radius;
  this.x = x;
  this.y = y;

  this.n_afraid = 1;
  this.n_likes = 1;

  this.afraid_force = 0.03;
  this.likes_force = 0.08;
  this.center_of_mass_force = 0.01;
  this.center_of_room_force = 0.01;

  this.scale = 12.5;

  this.afraid_force *= this.scale;
  this.likes_force *= this.scale;
  this.center_of_mass_force *= this.scale;
  this.center_of_room_force *= this.scale;

  //this.afraid_force *= 0;
  //this.likes_force *= 0;
  //this.center_of_mass_force *= 0;
  //this.center_of_room_force *= 0;

  this.afraid_radius = this.radius * 2;
  this.likes_radius = this.radius * 2;
  this.center_of_mass_radius = 200;
  this.center_of_room_radius = 200;

  this.afraid = [];
  this.likes = [];
  this.ticks = 0;

  this.center_of_the_room = createVector(width / 2, height / 2);

  this.fill_color = color(
    0, 0, 0
  );

  this.border_color = this.fill_color;

  this.show = function() {
    push();
    translate(this.x, this.y);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(this.border_color);
    fill(this.fill_color);
    ellipse(0, 0, this.radius * 2);
    pop();
  };

  this.get_position_vector = function() {
    return createVector(this.x, this.y);
  };

  this.dance = function() {
    if (this.ticks > 0) {
      //this.ticks -= 1;
    } else {
      if (random() < 0.5) {
        this.ticks = int(2400);
      } else {
        this.ticks = int(4800);
      }

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

    this.x += pos3.x;
    this.y += pos3.y;
  };

  this.check_bound = function() {
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      var p = random(dancers);

      this.x = p.x;
      this.y = p.y;
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

    this.x += pos3.x;
    this.y += pos3.y;
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

  this.x += pos3.x;
  this.y += pos3.y;
};

Dancer.prototype.dance_away_from = function(dancer) {
  var pos1 = this.get_position_vector();
  var pos2 = dancer.get_position_vector();
  var pos3 = pos2.sub(pos1);

  if (pos3.mag() < this.afraid_radius) {
    return;
  }

  pos3.setMag(-this.afraid_force);

  this.x += pos3.x;
  this.y += pos3.y;
};

Dancer.prototype.towards_center_of_the_room = function() {
  var pos1 = this.get_position_vector();
  var pos2 = this.center_of_the_room.copy();
  var pos3 = pos2.sub(pos1);

  if (pos3.mag() < this.center_of_room_radius) {
    return;
  }

  pos3.setMag(this.center_of_room_force);

  this.x += pos3.x;
  this.y += pos3.y;
};

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
