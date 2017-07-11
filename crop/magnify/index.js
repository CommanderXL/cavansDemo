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
    // 开始画图
    context.beginPath()
    context.arc(centerPoint.x, centerPoint.y, originalRadius, 0, Math.PI * 2, false)
    // 裁剪，作图区域都在这个范围内
    context.clip()

    context.drawImage(canvas, originalRectangle.x, originalRectangle.y, originalRectangle.width, originalRectangle.height,
        scaledMagnifyRectangle.x, scaledMagnifyRectangle.y, scaledMagnifyRectangle.width, scaledMagnifyRectangle.height)

    context.restore()

    context.beginPath();
    // createRadialGradient根据参数确定2个圆的坐标，绘制放射性渐变的方法，用以描边
    var gradient = context.createRadialGradient(
            centerPoint.x, centerPoint.y, originalRadius - 5,
            centerPoint.x, centerPoint.y, originalRadius);
    gradient.addColorStop(0, 'rgba(0,0,0,0.2)');
    gradient.addColorStop(0.80, 'silver');
    gradient.addColorStop(0.90, 'silver');
    gradient.addColorStop(1.0, 'rgba(150,150,150,0.9)');
    // 设置上下文的着色
    context.strokeStyle = gradient;
    context.lineWidth = 5;
    // 图形变化
    context.arc(centerPoint.x, centerPoint.y, originalRadius, 0, Math.PI * 2, false);
    context.stroke();
  }  
})()