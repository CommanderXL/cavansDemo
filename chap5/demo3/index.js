(function () {
  let canvas = document.querySelector('#canvas')
  let context = canvas.getContext('2d')
  let lastTime = startTime = +new Date()
  let radiusVelocity = 2 * Math.PI / (30 * 1000)

  canvas.width = 600
  canvas.height = 600

  const CENTER_X = canvas.width / 2
  const CENTER_Y = canvas.height / 2
  const RADIUS = 100

  function calFps () {
    let nowTime = +new Date()
    let fps = 1000 / (nowTime - lastTime)
    lastTime = nowTime
    return fps
  }

  function draw () {
    let now = +new Date()
    let fps = calFps()
    context.save()
    context.beginPath()
    context.strokeStyle = '#fc9153'
    context.lineWidth = 3
    let interval = (now - startTime) * radiusVelocity
    if (interval > 2 * Math.PI) interval = interval % (2 * Math.PI)
    context.arc(CENTER_X, CENTER_Y, RADIUS, - 0.5 * Math.PI, - 0.5 * Math.PI + interval, false)
    context.stroke()
    context.restore()
    context.save()
    context.beginPath()
    context.strokeStyle = 'lightgray'
    context.arc(CENTER_X, CENTER_Y, RADIUS, - 0.5 * Math.PI + interval, 1.5 * Math.PI, false) 
    context.stroke()
    context.restore()
    context.save()
    context.beginPath()
    context.fillStyle = '#fc9153'
    let circleX = CENTER_X + RADIUS * Math.sin(interval)
    let circleY = CENTER_Y - (RADIUS * Math.cos(interval))
    context.arc(circleX, circleY, 5, 0, 2 * Math.PI, false)
    context.fill()
    context.restore()
  }

  function earse () {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  function animate () {
    earse()
    draw()

    window.requestAnimationFrame(animate)
  }

  window.requestAnimationFrame(animate)
})()