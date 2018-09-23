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
  createCanvas(800, 800);
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
        12,
        12
      )
    );
  }
}

function draw() {
  background(0, 0, 0);

  for (var p in walls) {
    walls[p].show();
  }

  for (p in dancers) {
    dancers[p].dance();
    dancers[p].show();
  }

  Engine.update(engine, 1000 / 60);
}
