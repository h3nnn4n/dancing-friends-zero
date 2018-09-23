var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Composites = Matter.Composites,
  Bodies = Matter.Bodies,
  Body = Matter.Body;

var engine;
var world;
var dancers = [];
var walls = [];

function setup() {
  createCanvas(700, 600);
  engine = Engine.create();
  world = engine.world;

  engine.world.gravity.y = 0;

  set_walls();
  spawn_dancers();
}

function set_walls() {
  walls.push(new Dancer(width / 2, height, width, 50, {isStatic: true}));
  walls.push(new Dancer(width / 2, 0, width, 50, {isStatic: true}));
  walls.push(new Dancer(0, height / 2, 50, height, {isStatic: true}));
  walls.push(new Dancer(width, height / 2, 50, height, {isStatic: true}));
}

function spawn_dancers() {
  for (var i = 0; i < 50; i++) {
    dancers.push(
      new Dancer(
        random(100, 500),
        random(100, 500),
        random(10, 15),
        random(10, 15)
      )
    );
  }
}

function draw() {
  background(0, 0, 0);

  for (var p in walls) {
    walls[p].show();
  }

  var center = get_center();

  for (p in dancers) {
    dancers[p].away_from_center(center);
    dancers[p].dance();
    dancers[p].show();
  }

  Engine.update(engine, 1000 / 60);
}

function get_center() {
  var l = dancers.length;
  var x = 0;
  var y = 0;

  for (var prop in dancers) {
    var d = dancers[prop];
    x += d.body.position.x;
    y += d.body.position.y;
  }

  return createVector(
    x / l,
    y / l
  );
}

