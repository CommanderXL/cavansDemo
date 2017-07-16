(function () {
  let canvas = document.querySelector('#canvas')
  let context = canvas.getContext('2d')
  let animateBtn = document.querySelector('#animate-btn')
  let image = new Image()

  let paused = true
  let lastTime = +new Date()
  let fps = 0
  let skyOffset = 0
  const SKY_VELOCITY = 30

  function erase () {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  function draw () {
    context.save()

    // 让图像以稳定的速率移动，那么需要使用基于时间的运动时间
    skyOffset = skyOffset < canvas.width ? skyOffset + SKY_VELOCITY/fps : 0

    context.translate(-skyOffset, 0)
    context.drawImage(image, 0, 0)
    context.drawImage(image, canvas.width - 2, 0)
    context.restore()
  }

  function calFps (now) {
    let fps = 1000 / (now - lastTime)
    lastTime = now
    return fps
  }

  function animate () {

    fps = calFps(+new Date())

    if (!paused) {
      erase()
      draw()
    }

    window.requestAnimationFrame(animate)
  }

  animateBtn.onclick = function () {
    paused = paused ? false : true
    if (paused) {
      animateBtn.value = 'Animate'
    } else {
      animateBtn.value = 'Pause'
    }
  }

  image.src = './favicon.png'
  image.onload = function () {
    draw()
  }

  window.requestAnimationFrame(animate)
})()