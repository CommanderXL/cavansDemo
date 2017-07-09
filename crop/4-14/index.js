(function () {
  let image = new Image()
  let canvas = document.querySelector('#app')
  let context = canvas.getContext('2d')
  let embossBtn = document.querySelector('#embossBtn')
  let embossed = false      

  canvas.width = 600
  canvas.height = 600

  function emboss () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    let data = imageData.data
    let width = imageData.width
    let length = data.length

    for (let i = 0; i < length; i++) {
      if (i <= length - width * 4) {
        if ((i+1) % 4 !== 0) {
          if ((i + 4) % (width * 4) === 0) {
            data[i + 3] = data[i - 1]
            data[i + 2] = data[i - 2]
            data[i + 1] = data[i - 3]
            data[i] = data[i - 4]
            i += 4
          } else {
            data[i] = 255 / 2 
                    + 2 * data[i]
                    - data[i + 4]
                    - data[i + width * 4]
          }
        }
      } else {
        if ((i + 1) % 4 !== 0) {
          data[i] = data[i - width * 4]
        }
      }
    }

    context.putImageData(imageData, 0, 0)
  }

  function drawOriginalImage () {
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height)
  }

  embossBtn.onclick = function () {
    if (embossed) {
      embossBtn.value = 'Emboss'
      drawOriginalImage()
      embossed = false
    } else {
      embossBtn.value = 'Original image'
      emboss()
      embossed = true
    }
  }

  image.src = './favicon.png'
  image.onload = function () {
    drawOriginalImage()
  }
})()