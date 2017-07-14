function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return
  }

  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
  el.className = el.className.replace(reg, ' ')
}


function throttle (fn, interval) {
  let timer 
  let firstTime = true

  // 返回的函数接受到的函数传入fn
  return function () {
    let args = arguments

    // 如果是第一次调用的话就立即执行
    if (firstTime) {
      fn.apply(this, args)
      return firstTime = false
    }

    // timer定时器还存在的情况
    if (timer) {
      return false
    }

    timer = setTimeout(function () {
      clearTimeout(timer)
      timer = null
      fn.apply(this, args)
    }, interval || 500)
  }
}

// 马赛克算法
function mosaic (imageData) {
  const { data, width, height } = imageData
  const len = data.length
  const step = 4
  const hStep = 4
  const hw = width / 2
  const hh = height / 2
  const rd = width * 4
  const perPixel = 8 
  
  const dw = 20
  const dh = 20
  const I = Math.ceil(width / dw)
  const J = Math.ceil(height / dh)
  const Kw = width % dw
  const Kh = height % dh
  let a = 0
  for (let j1 = 0; j1 < J; j1++) {
    if (j1 !== J) {
      for (let i1 = 0; i1 < I; i1++) {
        let baseIndex = j1 * dh * width * 4 + i1 * dw * 4 
        for (let j2 = 0; j2 < dh; j2++) {
          if (i1 !== I) {
            for (let i2 = 0; i2 < dw; i2++) {
              let _baseIndex = j1 * dh * width * 4 + j2 * width * 4 + i1 * dw * 4 + i2 * 4
              data[_baseIndex] = data[baseIndex]
              data[_baseIndex + 1] = data[baseIndex + 1]
              data[_baseIndex + 2] = data[baseIndex + 2]
              data[_baseIndex + 3] = data[baseIndex + 3]
            }
          } else {
            if (Kw > 0) {
              for (let i3 = 0; i3 < Kw; i3++) {
                let _baseIndex = j1 * dh * width * 4 + j2 * width * 4 + i1 * dw * 4 + i3 * 4
                data[_baseIndex] = data[baseIndex]
                data[_baseIndex + 1] = data[baseIndex + 1]
                data[_baseIndex + 2] = data[baseIndex + 2]
                data[_baseIndex + 3] = data[baseIndex + 3]
              }
            }
          }
        }
      }
    } else {
      // 如果竖向有多余
      if (Kh > 0) {

      }
    }
  }
  return imageData
}