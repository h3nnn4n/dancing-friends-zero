function collapse() {
  var center = get_center();

  for (var p in dancers) {
    dancers[p].towards(center, 0.01);
  }
}

function explode() {
  var center = get_center();

  for (var p in dancers) {
    dancers[p].towards(center, -0.025);
  }
}
