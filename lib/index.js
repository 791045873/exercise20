!function (root, doc) {

  class Delegator {
    constructor (selector/* root选择器 */) {
      // TODO
      this.root = doc.querySelector(selector)
      this.uuid = 0
      this.eventObj = new Map()
    }

    on (event/* 绑定事件 */, selector/* 触发事件节点对应选择器 */, fn/* 出发函数 */) {
      // TODO
      Array.prototype.slice.call(this.root.querySelectorAll(selector)).forEach(
        ele => {
          let arr = this.eventObj.get(ele)
          if (arr === undefined) {
            arr = [{
              type: event,
              fn
            }]
          } else {
            arr.push({
              type: event,
              fn
            })
          }
          this.eventObj.set(ele, arr)
          ele.addEventListener(event, fn)
        }
      )
      return this
    }

    destroy () {
      // TODO
      this.eventObj.forEach((value, key) => {
        key.removeEventListener(value.type, value.fn)
      })

    }
  }

  root.Delegator = Delegator
}(window, document)