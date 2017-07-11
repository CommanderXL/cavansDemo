(function () {
  let app = document.querySelector('#app')
  let context = app.getContext('2d')

  function drawRect(ctx, color) {
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 100, 30)
  }

  function rotateDeg (ctx, deg) {
    let rad = deg * Math.PI / 180
    ctx.rotate(rad)
  }

  drawRect(context, 'red')

  context.save()
  context.translate(100, 30)
  rotateDeg(context, 45)
  drawRect(context, 'blue')
  context.restore()

  context.save()
  context.translate(300, 50)
  rotateDeg(context, 90)
  drawRect(context, 'green')
  context.restore()
})()