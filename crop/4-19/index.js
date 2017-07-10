(function () {
  let image = new Image()
  let canvas = document.querySelector('#canvas')
  let context = canvas.getContext('2d')
  let fadeBtn = document.querySelector('#fadeBtn')
  originalImageData = null
  interval = null

  canvas.width = 600
  canvas.height = 600

  function increaseTransparency (imageData, steps) {
    let alpha
    let currentAlpha
    let step
    let length = imageData.data.length
    
    for (let i = 3; i < length; i += 4) {
      alpha = originalImageData.data[i]

      if (alpha > 0 && imageData.data[i] > 0) {
        currentAlpha = imageData.data[i]
        step = Math.ceil(alpha/steps)
        
        if (currentAlpha - step > 0) {
          imageData.data[i] -= step
        } else {
          imageData.data[i] = 0
        }
      }
    }
  }

  function fadeOut (context, imageData, x, y, steps, millisecondsPerStep) {
    let frame = 0
    let length = imageData.data.length

    interval = setInterval(function () {
      frame ++

      if (frame > steps) {
        clearInterval(interval)
        animateCompleted()
      } else {
        increaseTransparency(imageData, steps)
        context.putImageData(imageData, x, y)
      }
    }, millisecondsPerStep)
  }

  function animateCompleted () {
    setTimeout(function () {
      context.drawImage(image, 0, 0, canvas.width, canvas.height)
    }, 1000)
  }

  fadeBtn.onclick = function () {
    fadeOut(context, context.getImageData(0, 0, canvas.width, canvas.height),
        0, 0, 20, 1000/60)
  }

  image.src = './favicon.png'
  image.onload = function () {
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
    originalImageData = context.getImageData(0, 0, canvas.width, canvas.height)
    console.log(originalImageData)
  }
})()