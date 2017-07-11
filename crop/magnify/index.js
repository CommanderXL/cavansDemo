(function () {
  let image = new Image()
  let canvas = document.querySelector('#app')
  let context = canvas.getContext('2d')
  let centerPoint = {}
  let scaled = 2
  let originalRadius = 100
  let originalRectangle = {}
  let scaledMagnifyRectangle = {}

  centerPoint.x = 150
  centerPoint.y = 150

  canvas.width = 600
  canvas.height = 600

  window.onload = function () {
    image.src = './favicon.png'
    image.onload = function () {
      draw()
    }
  }

  canvas.onmousemove = function (e) {
    centerPoint = windowToCanvas(e)
    draw()
  }

  function draw () {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawBackground()
    calOriginalRectangle(centerPoint)
    drawMagnifyingGlass()
  }

  function drawBackground () {
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
  }

  function windowToCanvas (e) {
    let cBox = canvas.getBoundingClientRect()
    return {
      x: e.clientX - cBox.left,
      y: e.clientY- cBox.top
    }
  }

  function calOriginalRectangle (loc) {
    originalRectangle = {
      x: loc.x - originalRadius,
      y: loc.y - originalRadius,
      width: originalRadius * 2,
      height: originalRadius * 2
    }
  }

  function drawMagnifyingGlass () {
    scaledMagnifyRectangle = {
      x: centerPoint.x - originalRectangle.width * scaled / 2,
      y: centerPoint.y - originalRectangle.height * scaled / 2,
      width: originalRectangle.width * scaled,
      height: originalRectangle.height * scaled
    }

    context.save()
    context.beginPath()
    context.arc(centerPoint.x, centerPoint.y, originalRadius, 0, Math.PI * 2, false)
    context.clip()

    context.drawImage(canvas, originalRectangle.x, originalRectangle.y, originalRectangle.width, originalRectangle.height,
        scaledMagnifyRectangle.x, scaledMagnifyRectangle.y, scaledMagnifyRectangle.width, scaledMagnifyRectangle.height)

    context.restore()

    context.beginPath();
    var gradient = context.createRadialGradient(
            centerPoint.x, centerPoint.y, originalRadius - 5,
            centerPoint.x, centerPoint.y, originalRadius);
    gradient.addColorStop(0, 'rgba(0,0,0,0.2)');
    gradient.addColorStop(0.80, 'silver');
    gradient.addColorStop(0.90, 'silver');
    gradient.addColorStop(1.0, 'rgba(150,150,150,0.9)');
    context.strokeStyle = gradient;
    context.lineWidth = 5;
    context.arc(centerPoint.x, centerPoint.y, originalRadius, 0, Math.PI * 2, false);
    context.stroke();
  }  
})()