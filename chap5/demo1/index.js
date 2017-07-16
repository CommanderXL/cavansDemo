(function () {
  let canvas = document.querySelector('#canvas')
  let context = canvas.getContext('2d')
  let paused = true
  let discs = [{
    x: 150,
    y: 250,
    lastX: 150,
    lastY: 250,
    velocityX: -3.2,
    velocityY: 3.5,
    radius: 25,
    innerColor: 'rgba(255, 255, 0, 1)',
    middleColor: 'rgba(255, 255, 0, .7)',
    outerColor: 'rgba(255, 255, 0, .5)',
    strokeStyle: 'gray'
  }, {
    x: 50,
    y: 150,
    lastX: 50,
    lastY: 150,
    velocityX: 2.2,
    velocityY: 2.5,
    radius: 25,
    innerColor: 'rgba(100, 145, 230, 1)',
    middleColor: 'rgba(100, 145, 230, .7)',
    outerColor: 'rgba(100, 145, 230, .5)',
    strokeStyle: 'blue'
  }, {
    x: 150,
    y: 75,
    lastX: 150,
    lastY: 75,
    velocityX: 1.2,
    velocityY: 1.5,
    radius: 25,
    innerColor: 'rgba(255, 0, 0, 1.0)',
    middleColor: 'rgba(255, 0, 0, 0.7)',
    outerColor: 'rgba(255, 0, 0, 0.5)',
    strokeStyle: 'orange'
  }]
  let TEXT_LOC = {
    x: 20,
    y: 60
  }
  let numDisc = discs.length
  let animateBtn = document.querySelector('.animate-btn')

  function drawBackground () {
    const STEP_Y = 12
    const TOP_MARGIN = STEP_Y * 4
    const LEFT_MARGIN = STEP_Y * 3
    let i = canvas.height

    context.strokeStyle = 'lightgray'
    context.lineWidth = .5

    while(i > TOP_MARGIN) {
      context.beginPath()
      context.moveTo(0, i)
      context.lineTo(canvas.width, i)
      context.stroke()
      i -= STEP_Y
    }

    context.strokeStyle = 'rgba(0, 0, 0, 1)'
    context.lineWidth = 1
    context.beginPath()
    context.moveTo(LEFT_MARGIN, 0)
    context.lineTo(LEFT_MARGIN, canvas.height)
    context.stroke()
  }

  function drawDiscBackground (disc) {
    context.save()
    context.beginPath()
    context.arc(disc.x, disc.y, disc.radius + 2, 0, Math.PI * 2, false)
    context.clip()

    context.clearRect(0, 0, canvas.width, canvas.height)
    drawBackground()
    context.restore()
  }

  let lastTime = new Date().valueOf()

  // 帧速率是1s内帧的数量，即使用 1000ms / (每一帧数)
  function calculateFps () {
    let now = new Date().valueOf()
    let fps = 1000 / (now - lastTime)
    lastTime = now
    
    return fps
  }

  function update () {
    let disc = null
    for (let i = 0; i < numDisc; i++) {
      drawDiscBackground(discs[i])
      disc = discs[i]
      if (disc.x + disc.radius + disc.velocityX > canvas.width
        || disc.x - disc.radius + disc.velocityX < 0 ) 
        disc.velocityX = -disc.velocityX

      if (disc.y + disc.radius + disc.velocityY > canvas.height 
        || disc.y - disc.radius + disc.velocityY < 0)
        disc.velocityY = -disc.velocityY
      
      disc.x += disc.velocityX
      disc.y += disc.velocityY
    }
  }

  function draw () {
    for (let i = 0; i < numDisc; i++) {
      drawDisc(discs[i])
    }
  }

  function drawDisc (disc) {
    let gradient = context.createRadialGradient(disc.x, disc.y, 0, disc.x, disc.y, disc.radius)
    gradient.addColorStop(0.3, disc.innerColor)
    gradient.addColorStop(0.6, disc.middleColor)
    gradient.addColorStop(1.0, disc.outerColor)

    context.save()
    context.beginPath()
    context.arc(disc.x, disc.y, disc.radius, 0, disc.x, disc.y, disc.radius)
    context.fillStyle = gradient
    context.strokeStyle = disc.strokeStyle
    context.fill()
    context.stroke()
    context.restore()
  }

  function animate (time) {
    if (!paused) {
      // context.clearRect(0, 0, canvas.width, canvas.height)
      // drawBackground()
      update()
      draw()

      context.fillStyle = 'cornflowerblue'
      let text = calculateFps().toFixed()
      let textWidth = context.measureText(text).width
      context.save()
      context.beginPath()
      // context.rect(0, 0, canvas.width, canvas.height)
      context.rect(20, 20, textWidth, 48)
      context.clip()
      context.clearRect(20, 20, canvas.width, canvas.height)
      context.fillText(text, TEXT_LOC.x, TEXT_LOC.y)
      context.restore()
      window.requestAnimationFrame(animate)
    } 
  }

  animateBtn.onclick = function () {
    paused = paused ? false : true
    if (paused) {
      animateBtn.value = 'Animate'
    } else {
      window.requestAnimationFrame(animate)
      animateBtn.value = 'Pause'
    }
  }

  context.font = '48px Helvetica'
})()