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