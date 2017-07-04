(function () {
  let canvas = document.querySelector('#box')
  let ctx = canvas.getContext('2d')
  let ocanvas = document.createElement('canvas')
  let octx = ocanvas.getContext('2d')
  let scaleInput = document.querySelector('.scale')
  let fileInput = document.querySelector('.file')

  let rubberRec = {}
  let mouseDown = {}
  let dragging = false
  let imageData = null
  let preRect = {}

  const CANVAS_WIDTH = 600
  const CANVAS_HEIGHT = 600

  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT
  ocanvas.width = CANVAS_WIDTH
  ocanvas.height = CANVAS_HEIGHT

  ctx.shadowColor = 'rgba(50, 50, 50, 1.0)'
  ctx.shadowOffX = 5
  ctx.shadowOffY = 5
  ctx.shadowBlur = 10
  ctx.strokeStyle = 'navy'
  ctx.lineWidth = 1.0

  let img = new Image()
  img.src = './favicon.png'
  img.onload = function () {
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    // octx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    // drawWatermark(ctx)
    // drawWatermark(octx)
  }
  
  scaleInput.addEventListener('', e => {
    let val = e.target.value
    // reDrawImage(val)
    drawScaled(val)
    // drawWatermark()
  })

  fileInput.addEventListener('change', e => {
    console.log(e)
  })

  function drawScaled (num) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    const resetWidth = CANVAS_WIDTH / num
    const resetHeight = CANVAS_HEIGHT / num
    ctx.drawImage(img, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT,
      CANVAS_WIDTH / 2 - resetWidth / 2, CANVAS_HEIGHT / 2 - resetHeight / 2, resetWidth, resetHeight)
  }

  // 图片缩放
  function reDrawImage (num) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    const resetWidth = CANVAS_WIDTH / num
    const resetHeight = CANVAS_HEIGHT / num
    ctx.drawImage(img, CANVAS_WIDTH / 2 - resetWidth / 2, CANVAS_HEIGHT / 2 - resetHeight / 2, resetWidth, resetHeight)
  }

  function drawWatermark (content) {
    let lineOne = 'Copyright'
    let lineTwo = 'Acme, Inc'
    let textMetrics = null
    let FONT_HEIGHT = 128

    content.save()
    content.fillStyle = 'rgba(100, 140, 230, .5)'
    content.strokeStyle = 'yellow'
    content.font = FONT_HEIGHT + 'px Arial'
    textMetrics = ctx.measureText(lineOne)
    content.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2)
    content.fillText(lineOne, -textMetrics.width/2, 0)
    content.strokeText(lineOne, -textMetrics.width / 2, FONT_HEIGHT)

    textMetrics = ctx.measureText(lineTwo)
    content.fillText(lineTwo, -textMetrics.width / 2, FONT_HEIGHT)
    content.strokeText(lineTwo, -textMetrics.width / 2, FONT_HEIGHT)
    content.restore()
  }

  canvas.addEventListener('mousedown', e => {
    e.preventDefault()
    const canvasRect = canvas.getBoundingClientRect()
    setRubberStartPointer({
      x: e.clientX - canvasRect.left,
      y: e.clientY - canvasRect.top
    })
  })

  canvas.addEventListener('mousemove', e => {
    if (dragging) {
      const canvasRect = canvas.getBoundingClientRect()
      const w = Math.abs(e.clientX - canvasRect.left - mouseDown.x)
      const h = Math.abs(e.clientY - canvasRect.top - mouseDown.y)
      drawRubberRect(w, h)
      // captureRubberPixels(w, h)
    }
  })

  canvas.addEventListener('mouseup', e => {
    ctx.drawImage(canvas, rubberRec.left + ctx.lineWidth * 2, rubberRec.top - ctx.lineWidth * 2, preRect.w - 4 * ctx.lineWidth, preRect.h - 4 * ctx.lineWidth, 0, 0, canvas.width, canvas.height)
    dragging = false
    imageData = undefined
  })

  function setRubberStartPointer (loc) {
    mouseDown = loc
    rubberRec.left = loc.x
    rubberRec.top = loc.y
    
    dragging = true
  }

  function drawRubberRect (w, h) {
    // const rWidth = e.clientX - mouseDown.x
    // const rHeight = e.clientY - mouseDown.y
    // ctx.clearRect(rubberRec.left, rubberRec.top, preRect.w, preRect.h)
    if (w > 2 * ctx.lineWidth && h > 2 * ctx.lineWidth) {
      if (imageData) restoreRubberPixels()
    }

    preRect = { w, h }

    if (w > 2 * ctx.lineWidth && h > 2 * ctx.lineWidth) {
      updateRubber(w, h)
    }
  }

  function updateRubber (w, h) {
    // 存储数据
    captureRubberPixels(w, h)
    // 画图
    ctx.strokeRect(rubberRec.left + ctx.lineWidth, rubberRec.top + ctx.lineWidth, w - 2 * ctx.lineWidth, h - 2 * ctx.lineWidth)
  }

  function captureRubberPixels (w, h) {
    imageData = ctx.getImageData(rubberRec.left, rubberRec.top, w, h)
  }

  function restoreRubberPixels () {
    ctx.putImageData(imageData, rubberRec.left, rubberRec.top)
  }
})()