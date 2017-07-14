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
function mosaic (imageData, options) {
  const { data, width, height } = imageData
  const { dw, dh } = options
  const len = data.length
  const step = 4
  const hStep = 4
  const hw = width / 2
  const hh = height / 2
  const rd = width * 4
  const perPixel = 8 
  
  const I = Math.ceil(width / dw)
  const J = Math.ceil(height / dh)
  const Kw = width % dw
  const Kh = height % dh

  function setImageData (data, newIndex, preIndex) {
    for (let i = 0; i < 4; i++) {
      data[newIndex + i] = data[preIndex + i]
    }
  }

  for (let j1 = 0; j1 < J; j1++) {
    for (let i1 = 0; i1 < I; i1++) {
      let baseIndex = j1 * dh * width * 4 + i1 * dw * 4 
      if (j1 !== J) {
        for (let j2 = 0; j2 < dh; j2++) {
          if (i1 !== I) {
            for (let i2 = 0; i2 < dw; i2++) {
              let _baseIndex = j1 * dh * width * 4 + j2 * width * 4 + i1 * dw * 4 + i2 * 4
              setImageData(data, _baseIndex, baseIndex)
            }
          } else {
            if (Kw > 0) {
              for (let i3 = 0; i3 < Kw; i3++) {
                let _baseIndex = j1 * dh * width * 4 + j2 * width * 4 + i1 * dw * 4 + i3 * 4
                setImageData(data, _baseIndex, baseIndex)
              }
            }
          }
        }
      } else {
        if (Kh > 0) {
          for (let j3 = 0; j3 < Kh; j3++) {
            if (i1 !== I) {
              for (let i4 = 0; i4 < dw; i4++) {
                let _baseIndex = j1 * dh * width * 4 + j3 * width * 4 + i1 * dw * 4 + i4 * 4
                setImageData(data, _baseIndex, baseIndex)
              }
            } else {
              if (Kw > 0) {
                for (let i5 = 0; i5 < Kw; i5++) {
                  let _baseIndex = j1 * dh * width * 4 + j3 * width * 4 + i1 * dw * 4 + i5 * 4
                  setImageData(data, _baseIndex, baseIndex)
                }
              }
            }
          }
        }
      }
    }
  }
  return imageData
}