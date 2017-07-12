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
  let clipParams = {
    dragging: false,
    activeCorner: false
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
    let activeCorner
    let params

    setClipCircle(clipBoxStyle)

    clipBox.onmousedown = function (e) {
      target = e.target
      clipParams.dragging = true
      startPointer = windowToCanvas({
        x: e.clientX,
        y: e.clientY
      })
      if (hasClass(target, 'clip-circle')) {
        clipParams.activeCorner = true
      }
    }

    document.onmousemove = function (e) {
      e.preventDefault()
      if (clipParams.dragging) {
        params = {}

        movingPointer = windowToCanvas({
          x: e.clientX,
          y: e.clientY
        })

        if (clipParams.activeCorner) {
          let dx = movingPointer.x - startPointer.x
          let dy = movingPointer.y - startPointer.y
          if (hasClass(target, 'first-circle')) {
            dx = -dx
            dy = -dy
            params.x = clipBoxStyle.x + (movingPointer.x - startPointer.x)
            params.y = clipBoxStyle.y + (movingPointer.y - startPointer.y)
          } else if (hasClass(target, 'second-circle')) {
            dy = -dy
            params.y = clipBoxStyle.y + (movingPointer.y - startPointer.y)
          } else if (hasClass(target, 'third-circle')) {

          } else if (hasClass(target, 'fourth-circle')) {
            dx = -dx
            params.x = clipBoxStyle.x + (movingPointer.x - startPointer.x)
          }
          params.width = clipBoxStyle.width + dx
          params.height = clipBoxStyle.height + dy
        } else {
          params.x = clipBoxStyle.x + (movingPointer.x - startPointer.x)
          params.y = clipBoxStyle.y + (movingPointer.y - startPointer.y)
        }       
        setClipCircle(params)
        return false
      }
    }

    document.onmouseup = function (e) {
      clipParams.dragging = false
      if (clipParams.activeCorner) {
        setClipBoxStyle({
          width: params.width,
          height: params.height
        })
      } else {
        setClipBoxStyle({
          x: params.x,
          y: params.y
        })
      }
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