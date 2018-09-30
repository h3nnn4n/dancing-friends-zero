var steps_per_frame = 4;

var dancers = [];
var walls = [];

function setup() {
  createCanvas(700, 600);
  colorMode(HSB);

  //set_walls();
  spawn_dancers(200, true);
  //setControls();
}

function set_walls() {
  walls.push(new Dancer(width / 2 , height     , width , 50    ));
  walls.push(new Dancer(width / 2 , 0          , width , 50    ));
  walls.push(new Dancer(0         , height / 2 , 50    , height));
  walls.push(new Dancer(width     , height / 2 , 50    , height));
}

function spawn_dancers(n, do_random) {
  for (var i = 0; i < n; i++) {
    spawn_dancer(do_random);
  }
}

function spawn_dancer(do_random) {
  var x;
  var y;

  if (do_random || dancers.length == 0) {
    x = random(100, width - 100);
    y = random(100, height - 100);
  } else {
    var p = random(dancers);

    x = p.x;
    y = p.y;
  }

  dancers.push(
    new Dancer(
      x,
      y,
      2
    )
  );
}

function kill_dancers(n) {
  for (var i = 0; i < n; i++) {
    dancers.pop();
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

function mousePressed() {
  for (var p in dancers) {
    dancers[p].update_partners();
  }
}

function draw() {
  background(255);

  var p;

  for (var i = 0; i < steps_per_frame; i++) {
    var center = get_center();

    for (p in dancers) {
      dancers[p].towards_center_of_mass(center);
      dancers[p].dance();
      dancers[p].check_bound();
    }
  }

  for (p in walls) {
    walls[p].show();
  }

  for (p in dancers) {
    dancers[p].show();
  }

  manage_dancer_count();
}
