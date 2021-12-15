  // accelerateButton.addEventListener("mousedown", function () {
  //   startGame();
  //   accelerate = true;
  // });
  // decelerateButton.addEventListener("mousedown", function () {
  //   startGame();
  //   decelerate = true;
  // });
  // accelerateButton.addEventListener("mouseup", function () {
  //   accelerate = false;
  // });
  // decelerateButton.addEventListener("mouseup", function () {
  //   decelerate = false;
  // });
  window.addEventListener("keydown", function (event) {
    if (event.key == "s") {
      startGame();
      accelerate = true;
      return;
    }
    if (event.key == "d") {
      decelerate = true;
      return;
    }
    if (event.key == "R" || event.key == "r") {
      reset();
      return;
    }
  });
  window.addEventListener("keyup", function (event) {
    if (event.key == "s") {
      accelerate = false;
      return;
    }
    if (event.key == "d") {
      decelerate = false;
      return;
    }
  });
  
  window.addEventListener("resize", () => {
    console.log("resize", window.innerWidth, window.innerHeight);
  
    // Adjust camera
    const newAspectRatio = window.innerWidth / window.innerHeight;
    const adjustedCameraHeight = cameraWidth / newAspectRatio;
  
    camera.top = adjustedCameraHeight / 2;
    camera.bottom = adjustedCameraHeight / -2;
    camera.updateProjectionMatrix(); // Must be called after change
  
    positionScoreElement();
  
    // Reset renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  });