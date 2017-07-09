(function () {
  let image = new Image()
  let canvas = document.querySelector('#app')
  let context = canvas.getContext('2d')
  let negativeBtn = document.querySelector('#btn')

  canvas.width = 600
  canvas.height = 600

  negativeBtn.onclick = function () {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    let data = imageData.data
    for (let i = 0; i <= data.length - 4; i += 4) {
      data[i] = 255 - data[i]
      data[i + 1] = 255 - data[i + 1]
      data[i + 2] = 255 - data[i + 2]
    }
    context.putImageData(imageData, 0, 0)
  }

  image.src = './favicon.png'
  image.onload = function () {
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height)
  }
})()