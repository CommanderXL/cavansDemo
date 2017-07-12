(function () {
  let canvas = document.querySelector('#canvas')
  let context = canvas.getContext('2d')
  let image = new Image()
  let clipBtn = document.querySelector('.op-li')
  let clipBox = document.querySelector('.clip-box')
  let clipCircleBtns = document.querySelectorAll('.clip-circle')

  let clipBoxStyle = {
    x: 10,
    y: 10,
    width: 100,
    height: 100
  }
  canvas.width = 600
  canvas.height = 600

  image.src = './favicon.png'
  image.onload = function () {
    drawOriginalImage()
  }

  function drawOriginalImage () {
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
  }

  function windowToCanvas (loc) {
    let cBox = canvas.getBoundingClientRect()
    return {
      x: loc.x - cBox.left,
      y: loc.y - cBox.top
    }
  }

  function initClip () {
    let target
    let startPointer
    let movingPointer

    setClipCircle(clipBoxStyle)

    clipBox.onmousedown = function (e) {
      target = e.target
      target.dragging = true
      startPointer = windowToCanvas({
        x: e.clientX,
        y: e.clientY
      })
    }

    clipBox.onmousemove = function (e) {
      if (target && target.dragging) {
        movingPointer = windowToCanvas({
          x: e.clientX,
          y: e.clientY
        })
        setClipCircle({
          x: clipBoxStyle.x + (movingPointer.x - startPointer.x),
          y: clipBoxStyle.y + (movingPointer.y - startPointer.y)
        })
      }
    }

    clipBox.onmouseup = function (e) {
      target.dragging = false
      setClipBoxStyle({
        x: clipBoxStyle.x + (movingPointer.x - startPointer.x),
        y: clipBoxStyle.y + (movingPointer.y - startPointer.y)
      })
    }
  }

  function setClipBoxStyle (options) {
    const { x, y, width, height } = options
    x && (clipBoxStyle.x = x)
    y && (clipBoxStyle.y = y)
    width && (clipBoxStyle.width = width)
    height && (clipBoxStyle.height = height)
  } 

  function setClipCircle (options) {
    const { x, y, width, height } = options
    x && (clipBox.style.left = `${x}px`)
    y && (clipBox.style.top = `${y}px`)
    width && (clipBox.style.width = `${width}px`)
    height && (clipBox.style.height = `${height}px`)
  }

  clipBtn.onclick = function () {
    initClip()
  }
})()