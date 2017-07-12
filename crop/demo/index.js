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
    dragging: false
  }

  let ACTIVE_CORNER = ['lt', 'rt', 'rb', 'lb']
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

    setClipCircle(clipBoxStyle)

    clipBox.onmousedown = function (e) {
      target = e.target
      clipParams.dragging = true
      startPointer = windowToCanvas({
        x: e.clientX,
        y: e.clientY
      })
      if (hasClass(target, 'first-circle')) {
        activeCorner = ACTIVE_CORNER[0]
      } else if (hasClass(target, 'second-circle')) {
        activeCorner = ACTIVE_CORNER[1]
      } else if (hasClass(target, 'third-circle')) {
        activeCorner = ACTIVE_CORNER[2]
      } else if (hasClass(target, 'fourth-circle')) {
        activeCorner = ACTIVE_CORNER[3]
      }
    }

    document.onmousemove = function (e) {
      e.preventDefault()
      if (clipParams.dragging) {
        let params = {}
        movingPointer = windowToCanvas({
          x: e.clientX,
          y: e.clientY
        })
        params.x = clipBoxStyle.x + (movingPointer.x - startPointer.x)
        params.y = clipBoxStyle.y + (movingPointer.y - startPointer.y)
        if (activeCorner === 'lt') {
          params.width = clipBoxStyle.width - (movingPointer.x - startPointer.x)
          params.height = clipBoxStyle.height - (movingPointer.y - startPointer.y)
        } else if (activeCorner === 'rt') {
          
        } else if (activeCorner === 'rb') {

        } else if (activeCorner === 'lb') {

        }
        setClipCircle(params)
        return false
      }
    }

    document.onmouseup = function (e) {
      clipParams.dragging = false
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