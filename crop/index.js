(function () {
  let canvas = document.querySelector('#box')
  let ctx = canvas.getContext('2d')
  let scaleInput = document.querySelector('.scale')
  let fileInput = document.querySelector('.file')

  const CANVAS_WIDTH = 600
  const CANVAS_HEIGHT = 600

  canvas.width = CANVAS_WIDTH
  canvas.height = CANVAS_HEIGHT

  let img = new Image()
  img.src = './favicon.png'
  img.onload = function () {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  }
  
  scaleInput.addEventListener('input', e => {
    let val = e.target.value
    console.log(val)
    reDrawImage(val)
  })

  fileInput.addEventListener('change', e => {
    console.log(e)
  })

  // 图片缩放
  function reDrawImage (num) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    const resetWidth = CANVAS_WIDTH / num
    const resetHeight = CANVAS_HEIGHT / num
    ctx.drawImage(img, CANVAS_WIDTH / 2 - resetWidth / 2, CANVAS_HEIGHT / 2 - resetHeight / 2, resetWidth, resetHeight)
  }

})()