var timers = {

}
const GeneralFunctions = {
  RandomGenerator(min, max) {
    return (Math.random() * (max - min + 1) + min)
  },
  Timer(key, set){
    const d = new Date()
    if(set){
      timers[key] = d
    }
    else{
      const result = d - timers[key]
      console.log(`${key}: ${result}ms` )
      return result
    }
    
  },
  fpsMeter() {
    let prevTime = Date.now(),
        frames = 0;

    requestAnimationFrame(function loop() {
      const time = Date.now();
      frames++;
      if (time > prevTime + 1000) {
        let fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
        prevTime = time;
        frames = 0;

        console.info('FPS: ', fps);
      }

      requestAnimationFrame(loop);
    });
  }, 
}

export { GeneralFunctions }