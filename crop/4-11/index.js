(function () {
  const canvas = document.querySelector('#box')
  const ctx = canvas.getContext('2d')
  
  canvas.width = 600
  canvas.height = 600

  let image = new Image()
  let imageData
  let imageDataCopy = ctx.createImageData(canvas.width, canvas.height)

  let mouseDown = {}
  let rubberbandRectangle = {}
  let dragging = false

  function windowToCanvas (canvas, x, y) {
    let canvasRect = canvas.getBoundingClientRect()
    return {
      x: x - canvasRect.left,
      y: y - canvasRect.top
    }
  }

  function copyCanvasPixels () {
    let i = 0
    // 改变当前的imageData的alpha通道后copy到新的imageData数据当中
    for (i = 0; i < 3; i++) {
      imageDataCopy.data[i] = imageData.data[i]
    }

    for (i = 3; i < imageData.data.length - 4; i +=4) {
      // 透明度为之前的1/2
      imageDataCopy.data[i] = imageData.data[i] / 2     // alpha通道
      imageDataCopy.data[i + 1] = imageData.data[i + 1] // red
      imageDataCopy.data[i + 2] = imageData.data[i + 2] // green
      imageDataCopy.data[i + 3] = imageData.data[i + 3] // blue
    }
  }

  function captureCanvasPixels () {
    // imageData保存原始cavans的像素数据
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    copyCanvasPixels() 
  }

  function restoreRubberbandPixels () {
    let deviceWidthOverCSSPixels = imageData.width / canvas.width
    let deviceHeightOverCSSPixels = imageData.height / canvas.height

    // 
    ctx.putImageData(imageData, 0, 0)

    ctx.putImageData(imageDataCopy, 0, 0, rubberbandRectangle.left + ctx.lineWidth, rubberbandRectangle.top + ctx.lineWidth,
      (rubberbandRectangle.width - 2) * ctx.lineWidth * deviceWidthOverCSSPixels,
      (rubberbandRectangle.height - 2) * ctx.lineWidth * deviceHeightOverCSSPixels)
  }

  function setRubberbandRectangle (x, y) {
    rubberbandRectangle.left = Math.min(x, mouseDown.x)
    rubberbandRectangle.top = Math.min(y, mouseDown.y)

    rubberbandRectangle.width = Math.abs(x - mouseDown.x)
    rubberbandRectangle.height = Math.abs(y - mouseDown.y)
  }

  function drawRubberBand () {
    // 矩形的线框图
    ctx.strokeRect(rubberbandRectangle.left + ctx.lineWidth,
      rubberbandRectangle.top + ctx.lineWidth,
      rubberbandRectangle.width - 2 * ctx.lineWidth,
      rubberbandRectangle.height - 2 * ctx.lineWidth)
  }

  function rubberbandStart (x, y) {
    mouseDown.x = x 
    mouseDown.y = y

    rubberbandRectangle.left = mouseDown.x
    rubberbandRectangle.top = mouseDown.y
    rubberbandRectangle.width = 0
    rubberbandRectangle.height = 0

    dragging = true

    captureCanvasPixels()
  }

  function rubberbandStretch (x, y) {
    if (rubberbandRectangle.width > 2 * ctx.lineWidth &&
        rubberbandRectangle.height > 2 * ctx.lineWidth) {
          if (imageData !== undefined) {
            restoreRubberbandPixels()
          }
        }
    
    setRubberbandRectangle(x, y)

    if (rubberbandRectangle.width > 2 * ctx.lineWidth && 
        rubberbandRectangle.height > 2 * ctx.lineWidth) {
          // 画矩形
          drawRubberBand()
        }
  }

  function rubberbandEnd () {
    ctx.putImageData(imageData, 0, 0)
    ctx.drawImage(canvas,
      rubberbandRectangle.left + ctx.lineWidth * 2,
      rubberbandRectangle.top + ctx.lineWidth * 2,
      rubberbandRectangle.width - 4 * ctx.lineWidth,
      rubberbandRectangle.height - 4 * ctx.lineWidth,
      0, 0, canvas.width, canvas.height)
    
    dragging = false
    imageData = undefined
  }

  canvas.onmousedown = function (e) {
    let loc = windowToCanvas(canvas, e.clientX, e.clientY)
    e.preventDefault()
    rubberbandStart(loc.x, loc.y)
  }

  canvas.onmousemove = function (e) {
    let loc
    if (dragging) {
      loc = windowToCanvas(canvas, e.clientX, e.clientY)
      rubberbandStretch(loc.x, loc.y)
    }
  }

  canvas.onmouseup = function (e) {
    rubberbandEnd()
  }

  image.src = './favicon.png'
  image.onload = function () {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  }

  ctx.strokeStyle = 'navy'
  ctx.lineWidth = 1.0
})()