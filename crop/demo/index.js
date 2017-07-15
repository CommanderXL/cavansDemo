(function () {
  let canvas = document.querySelector('#canvas')
  let context = canvas.getContext('2d')
  let image = new Image()
  let clipBtn = document.querySelectorAll('.op-li')[0]
  let mosaicBtn = document.querySelectorAll('.op-li')[1]
  let clipBox = document.querySelector('.clip-box')
  let clipCircleBtns = document.querySelectorAll('.clip-circle')
  let wrapperMask = document.querySelector('.wrapper-mask')
  let imageData = null
  let oCanvas = document.createElement('canvas')
  let oContext = oCanvas.getContext('2d')
  
  const OP_CLIP = 'clip'
  const OP_MOSAIC = 'mosaic'

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
    resetContext()
  }

  function resetContext () {
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(image, 0, 0, canvas.width, canvas.height)
  }

  function windowToCanvas (loc) {
    let cBox = canvas.getBoundingClientRect()
    return {
      x: loc.x - cBox.left,
      y: loc.y - cBox.top
    }
  }

  function initClip (options) {
    const { op } = options
    let target
    let startPointer
    let movingPointer
    let activeCorner
    let params

    showClip()
    setClipCircle(clipBoxStyle)
    setClipBoxBg(clipBoxStyle, op)
    if (op === OP_CLIP) showMask()

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

    // 避免鼠标移动太快，将事件绑定到document上
    document.onmousemove = function (e) {
      e.preventDefault()
      if (clipParams.dragging) {
        params = {}

        movingPointer = windowToCanvas({
          x: e.clientX,
          y: e.clientY
        })
        let dw = movingPointer.x - startPointer.x
        let dh = movingPointer.y - startPointer.y
        let dx = movingPointer.x - startPointer.x
        let dy = movingPointer.y - startPointer.y
        let distW = clipBoxStyle.width
        let distH = clipBoxStyle.height
        let distX = clipBoxStyle.x
        let distY = clipBoxStyle.y

        if (clipParams.activeCorner) {
          if (hasClass(target, 'first-circle')) {
            dw = -dw
            dh = -dh
            distX = params.x = clipBoxStyle.x + dx
            distY = params.y = clipBoxStyle.y + dy
          } else if (hasClass(target, 'second-circle')) {
            dh = -dh
            distY = params.y = clipBoxStyle.y + dy
          } else if (hasClass(target, 'third-circle')) {

          } else if (hasClass(target, 'fourth-circle')) {
            dw = -dw
            distX = params.x = clipBoxStyle.x + dx
          }
          distW = params.width = clipBoxStyle.width + dw
          distH = params.height = clipBoxStyle.height + dh
        } else {
          distX = params.x = clipBoxStyle.x + dx
          distY = params.y = clipBoxStyle.y + dy
        }       
        setClipCircle(params)
        setClipBoxBg({
          x: distX,
          y: distY,
          width: distW,
          height: distH
        }, op)
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
        clipParams.activeCorner = false
      } else {
        setClipBoxStyle({
          x: params.x,
          y: params.y
        })
      }
    }
  }

  function setClipBoxBg (params, op) {
    const { x, y, width, height } = params
    let clipBoxBg = null
    oCanvas.width = width
    oCanvas.height = height
    if (op === OP_MOSAIC) {
      let imageData = context.getImageData(x, y, width, height)
      imageData = mosaic(imageData, {
        dw: 10,
        dh: 10
      })
      oContext.putImageData(imageData, 0, 0)
    } else if (op === OP_CLIP) {
      // TODO: 性能优化，避免滑动的缓慢
      oContext.drawImage(canvas, x, y, width, height, 0, 0, width, height)
    }
    clipBoxBg = oCanvas.toDataURL()
    clipBox.style.backgroundImage = `url(${clipBoxBg})`
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

  function showMask () {
    wrapperMask.style.display = 'block'
  }

  function hideMask () {
    wrapperMask.style.display = 'none'
  }

  function showClip () {
    clipBox.style.display = 'block'
  }

  function hideClip () {
    clipBox.style.display = 'none'
  }

  clipBtn.onclick = function () {
    initClip()
  }

  mosaicBtn.onclick = function () {
    resetContext()
    hideMask()

    initClip({
      op: OP_MOSAIC
    })
  }
})()