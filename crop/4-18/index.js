(function () {
  let canvas = document.querySelector('#app')
  let context = canvas.getContext('2d')
  let offscreenCanvas = document.createElement('canvas')
  let offscreenContext = offscreenCanvas.getContext('2d')
  let image = new Image()
  let btn = document.querySelector('#btn')
  let sunglassOn = false
  let radius = 50
  let sunglassFilter = new Worker('./subglass.js')

  canvas.width = 600
  canvas.height = 600
  offscreenCanvas.width = canvas.width
  offscreenCanvas.height = canvas.height

  image.src = './favicon.png'
  image.onload = function () {
    drawOriginalImage()
  }

  btn.onclick = function () {
    if (sunglassOn) {
      btn.innerHTML = 'sunglass'
      drawOriginalImage()
      sunglassOn = false
    } else {
      btn.innerHTML = 'original pic'
      sunglassOn = true
      putSunglassOn()
    }
  }

  function drawOriginalImage () {
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
  }

  function putSunglassOn () {
    let centerPointer = {
      x: canvas.width / 2,
      y: canvas.height / 2
    }
    let leftGlass = {
      x: centerPointer.x - radius - 10,
      y: centerPointer.y
    }

    let rightGlass = {
      x: centerPointer.x + radius + 10,
      y: centerPointer.y
    }

    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    sunglassFilter.postMessage(imageData)
    sunglassFilter.onmessage = function (e) {
      offscreenContext.putImageData(e.data, 0, 0)
      drawLens(leftGlass, rightGlass)
      // drawWire(center)
      // drawConnectors(center)
    }
  }

  function drawLens (leftGlass, rightGlass) {
    context.save()
    context.beginPath()
    // context.moveTo(leftGlass.x, leftGlass.y)
    context.arc(leftGlass.x, leftGlass.y, radius, 0, 2 * Math.PI, false)
    context.stroke()

    context.moveTo(rightGlass.x, rightGlass.y)
    context.arc(rightGlass.x, rightGlass.y, radius, 0, 2 * Math.PI, false)
    context.stroke()

    context.clip()

    context.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height)

    context.restore()
  }

})()