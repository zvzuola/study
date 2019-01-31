var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

function spriteCanvas(options) {
  let { fps, loop, canvas, imgs, width, height, update } = options
  this.width = width || canvas.width
  this.height = height || canvas.height
  this.now = 0
  this.clock = null
  this.ctx = canvas.getContext('2d')
  this.img = imgs
  this.loop = loop == undefined ? true : loop
  this.cunt = 1
  this.max = imgs.length - 1
  this.from = null
  this.to = null
  this.startTime = 0
  this.lastTime = 0
  this.fps = fps || 20
  this.timeout = 1000 / this.fps
  this.stoped = false
  this.update = update
}
spriteCanvas.prototype = {
  setFPS: function(fps) {
    if (isNaN(fps)) return
    this.fps = Math.max(1, Math.min(100, fps))
    this.timeout = 1000 / this.fps
  },

  clear: function() {
    this.stop()
    this.ctx &&
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  },

  loopFromTo: function(v1, v2) {
    this.stop()
    this.from = Math.max(0, v1)
    this.to = Math.max(0, Math.min(this.max, v2))
    this.start(this.from)
  },

  play: function(index) {
    index = index || 0
    this.start(index)
  },

  start: function(index) {
    if (this.isValidIndex(index)) {
      this.now = index
    }
    this.draw(this.img)
  },

  draw: function(imgs) {
    this.stoped = false
    this.img = imgs
    this.handleRAF(imgs)
  },

  handleRAF: function(json) {
    var _ = this
    ;(function d() {
      _.startTime = Date.now() //_.getTime ();
      if (_.startTime - _.lastTime < _.timeout) {
        return (_.clock = requestAnimationFrame(d))
      }
      _.tick(json)
      _.clock = requestAnimationFrame(d)
      _.lastTime = _.startTime
    })()
  },

  tick: function(json) {
    if (this.stoped) return

    if (this.to != null) {
      if (this.now == this.to + 1) {
        this.now = this.from
        console.log('again')
      }
    }
    json[this.now] && this.drawImg(json[this.now])

    if (!json[this.now]) {
      if (this.loop) {
        this.now = 0
        this.drawImg(json[this.now])
      } else {
        this.stop()
      }
    }
    this.now += this.cunt
  },

  drawImg: function(img) {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.drawImage(img, 0, 0, this.width, this.height)
    this.update && this.update(this.now)
  },

  stop: function(index) {
    let _ = this
    _.stoped = true
    cancelAnimationFrame(_.clock)
    if (this.isValidIndex(index)) {
      _.now = index
      _.drawImg(_.img[index])
    }
  },

  isValidIndex(index) {
    return index != undefined && !isNaN(index) && index < this.max && index > -1
  },

  context: function() {
    return this.ctx
  }
}
