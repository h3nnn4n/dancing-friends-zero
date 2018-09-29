p5.disableFriendlyErrors = true;

var fps_counter = 60;
var average_fps = 0;
var perf_update_interval = 30;
var debug = false;

function manage_dancer_count() {
  if (debug) {
    text(frameRate().toFixed(2), 50, 200);
    text(frameCount, 50, 250);
    text(dancers.length, 50, 300);
  }

  if (frameCount < perf_update_interval * 2 && frameCount % 4 == 0) {
    if (frameRate() > 58) {
      spawn_dancers(75);
      if (debug) {
        console.log('add 75, total: ' + dancers.length);
      }
    }
  }

  if (fps_counter > 0) {
    average_fps += frameRate() / perf_update_interval;
    fps_counter -= 1;
  } else {
    fps_counter = perf_update_interval;

    if (debug) {
      console.log(average_fps);
    }

    if (average_fps > 58) {
      spawn_dancers(10);
      if (debug) {
        console.log('add 10, total: ' + dancers.length);
      }
    } else if (average_fps <= 55 && average_fps > 40) {
      kill_dancers(23);
      if (debug) {
        console.log('kill 23, total: ' + dancers.length);
      }
    } else if (average_fps <= 40) {
      kill_dancers(100);
      if (debug) {
        console.log('kill 100, total: ' + dancers.length);
      }
    }

    average_fps = 0;
  }
}
