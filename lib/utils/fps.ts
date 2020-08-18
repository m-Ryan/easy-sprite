export const getFPS = (() => {
  let lastTime = 0;

  let fpsInterVal = 30; // fps监听间隔次数

  let fpsCount = 0; // fps监听间隔计数

  let fps = 0; // fps值
  const loop = (time: number) => {
    fpsCount++;

    let nowTime = performance.now();

    if (fpsCount >= fpsInterVal) {
      fps = Math.round((1000 * fpsCount) / (nowTime - lastTime));

      lastTime = nowTime;

      fpsCount = 0;
    }

    window.requestAnimationFrame(loop);
  };
  loop(0);
  return () => fps;
})();
