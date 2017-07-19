(function () {
  class Sprite {
    constructor (name = '', painter = null, behaviors = []) {
      this.name = name
      this.painter = painter
      this.top = 0
      this.left = 0
      this.width = 10
      this.height = 10
      this.velocityX = 0
      this.velocityY = 0
      this.visiable = true
      this.animating = false
      this.behaviors = behaviors
    }

    paint (context) {
      if (this.painter) {
        this.painter.paint(this, context)
      }
    }

    update (context, time) {
      for (let i = 0; i < this.behaviors.length; i++) {
        this.behaviors[i].excute(this, context, time)
      }
    }
  }

  let canvas = document.querySelector('#canvas')
  let context = canvas.getContext('2d')

  canvas.width = 600
  canvas.height = 600

  const RADIUS = 75
  const ball = new Sprite('ball', {
    paint (sprite, context) {
      context.beginPath()
      context.arc(canvas.width / 2, canvas.height / 2, RADIUS, 0, Math.PI * 2, false)
      context.clip()

      context.shadowColor = 'rgb(0, 0, 0)'
      context.shadowOffsetX = -4
      context.shadowOffsetY = -4
      context.shadowBlur = 8

      context.lineWidth = 4
      context.strokeStyle = 'rgb(100, 100, 195)'
      context.fillStyle = 'rgba(30, 144, 255, .15)'
      context.fill()
      context.stroke()
    }
  })

  ball.paint(context)
})()