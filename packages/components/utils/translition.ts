function enter(el: any, done: () => void) {
  el.style.height = 'auto'
  //进入的动画
  const { height } = el.getBoundingClientRect()
  el.style.height = 0 + 'px'
  el.getBoundingClientRect()
  el.style.height = `${height}px`
  el.addEventListener('transitionend', () => {
    done()
  })
}
function afterEnter(el: any) {
  el.style.height = 'auto'
}
function leave(el: any, done: () => void) {
  const { height } = el.getBoundingClientRect()
  el.style.height = `${height}px`
  el.getBoundingClientRect()
  el.style.height = 0 + 'px'
  el.addEventListener('transitionend', () => {
    //防止 done后直接关闭动画,所以结束后再关闭动画
    done()
  })
}
function afterLeave(el: any) {
  el.style.height = 'auto'
}

export { enter, leave, afterEnter, afterLeave }
