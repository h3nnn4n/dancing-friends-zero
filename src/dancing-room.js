var steps_per_frame = 4;

var dancers = [];
var walls = [];

function setup() {
  createCanvas(700, 600);
  colorMode(HSB);

  //set_walls();
  spawn_dancers();
  setControls();
}

function set_walls() {
  walls.push(new Dancer(width / 2 , height     , width , 50    ));
  walls.push(new Dancer(width / 2 , 0          , width , 50    ));
  walls.push(new Dancer(0         , height / 2 , 50    , height));
  walls.push(new Dancer(width     , height / 2 , 50    , height));
}

function spawn_dancers() {
  for (var i = 0; i < 500; i++) {
    dancers.push(
      new Dancer(
        random(100, width - 100),
        random(100, height - 100),
        1.2
      )
    );
  }
}

function get_center() {
  var l = dancers.length;
  var x = 0;
  var y = 0;

  for (var prop in dancers) {
    var d = dancers[prop];
    x += d.x;
    y += d.y;
  }

  return createVector(
    x / l,
    y / l
  );
}

function draw() {
  background(255);

  for (var i = 0; i < steps_per_frame; i++) {
    var center = get_center();

    for (p in dancers) {
      dancers[p].check_bound();
      dancers[p].towards_center_of_mass(center);
      dancers[p].dance();
    }
  }

  for (var p in walls) {
    walls[p].show();
  }

  for (p in dancers) {
    dancers[p].show();
  }

  text(frameRate().toFixed(2), 50, 200);
}

