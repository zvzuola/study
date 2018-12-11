import React from "react";
const addEvent = (elem, type, eventHandle) => {
  if (elem === null || typeof elem === "undefined") {
    return;
  }
  if (elem.addEventListener) {
    elem.addEventListener(type, eventHandle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent("on" + type, eventHandle);
  } else {
    elem["on" + type] = eventHandle;
  }
};

const removeEvent = (elem, type, eventHandle) => {
  if (elem === null || typeof elem === "undefined") {
    return;
  }
  if (elem.removeEventListener) {
    elem.removeEventListener(type, eventHandle, false);
  } else if (elem.detachEvent) {
    elem.detachEvent("on" + type, eventHandle);
  } else {
    elem["on" + type] = null;
  }
};

export default class Carousel extends React.Component {
  static defaultProps = {
    width: "100%",
    cellSpacing: 0,
    vertical: false,
    framePadding: 0,
    frameOverflow: "hidden",
    wrapAround: false,
    autoplayInterval: 3000,
    speed: 500,
    autoplay: true
  };
  constructor(props) {
    super(props);
    this.slider = React.createRef();
    this.frame = React.createRef();
    this.list = React.createRef();
    const {
      vertical,
      initialSlideHeight,
      initialSlideWidth,
      children
    } = this.props;

    this.needTransition = true;
    this.moving = false
    this.isAnimating = false
    this.childrenCount = React.Children.count(children);
    this.touchObject = {}
    this.state = {
      frameWidth: 0,
      slideWidth: vertical ? initialSlideHeight || 0 : initialSlideWidth || 0,
      slideHeight: "auto",
      left: 0,
      dragging: false,
      currentSlide: 0
    };
  }

  bindEvents() {
    // if (ExecutionEnvironment.canUseDOM) {
    addEvent(window, "resize", this.onResize);
    addEvent(document, "readystatechange", this.onReadyStateChange);
    addEvent(this.list.current, "transitionend", this.animateEnd);
    addEvent(this.frame.current, 'touchmove', this.onTouchMove)
    // }
  }

  unbindEvents() {
    // if (ExecutionEnvironment.canUseDOM) {
    removeEvent(window, "resize", this.onResize);
    removeEvent(document, "readystatechange", this.onReadyStateChange);
    removeEvent(this.list.current, "transitionend", this.animateEnd);
    removeEvent(this.frame.current, 'touchmove', this.onTouchMove)
    // }
  }

  onResize = () => {
    this.setDimensions();
  };

  onReadyStateChange = () => {
    this.setDimensions();
  };

  onTouchStart = (e) => {
    if(this.isAnimating) return
    this.touchObject = {
      startX: e.touches[0].pageX,
      startY: e.touches[0].pageY,
    }
    this.handleMouseOver()
  }
  onTouchMove = (e) => {
    if(this.isAnimating) return
    this.moving = true
    
    const direction = this.swipeDirection(
      this.touchObject.startX,
      e.touches[0].pageX,
      this.touchObject.startY,
      e.touches[0].pageY,
    )

    if (direction !== 0) {
      e.preventDefault()
    }

    const length = this.props.vertical ? Math.round(
      Math.sqrt(Math.pow(e.touches[0].pageY - this.touchObject.startY, 2)),
    ) : Math.round(
      Math.sqrt(Math.pow(e.touches[0].pageX - this.touchObject.startX, 2)),
    )

    this.touchObject = {
      startX: this.touchObject.startX,
      startY: this.touchObject.startY,
      endX: e.touches[0].pageX,
      endY: e.touches[0].pageY,
      length,
      direction,
    }

    this.setState({
      left: this.props.vertical ? 0 : this.touchObject.length * this.touchObject.direction,
      top: this.props.vertical ? this.touchObject.length * this.touchObject.direction : 0,
    })
  }

  onTouchEnd = (e) => {
    if(this.isAnimating) return
    this.moving = false

    this.setState({
      left: 0,
      top: 0,
    })
    this.handleSwipe()
    this.handleMouseOut()
  }

  onTouchCancel = (e) => {
    this.handleSwipe()
  }

  handleMouseOver() {
    if (this.props.autoplay) {
      this.autoplayPaused = true
      this.stopAutoplay()
    }
  }

  handleMouseOut() {
    if (this.props.autoplay && this.autoplayPaused) {
      this.startAutoplay()
      this.autoplayPaused = null
    }
  }

  handleSwipe = () => {
    console.log(this.state.currentSlide, this.touchObject.direction)
    this.goToSlide(this.state.currentSlide + (this.touchObject.direction || 0))
  }

  swipeDirection(x1, x2, y1, y2) {
    const xDist = x1 - x2
    const yDist = y1 - y2
    const r = Math.atan2(yDist, xDist)
    let swipeAngle = Math.round(r * 180 / Math.PI)

    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle)
    }
    if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
      return 1
    }
    if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
      return 1
    }
    if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
      return -1
    }
    if (this.props.vertical === true) {
      if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
        return 1
      } else {
        return -1
      }
    }
    return 0

  }

  animateEnd = () => {
    const { currentSlide } = this.state;
    console.log(currentSlide, 1111)
    if (currentSlide > this.childrenCount - 1) {
      this.needTransition = false;
      this.goToSlide(0);
    } else if (currentSlide < 0) {
      this.needTransition = false;
      this.goToSlide(this.childrenCount - 1);
    }
    this.isAnimating = false
  };

  componentDidMount() {
    this.setDimensions();
    if(this.props.autoplay) {
      this.startAutoplay();
    }
    this.bindEvents();
  }

  componentWillUnmount() {
    this.stopAutoplay();
    this.unbindEvents();
  }

  startAutoplay() {
    if (this.childrenCount <= 1) {
      return;
    }
    this.autoplayID = setInterval(this.nextSlide, this.props.autoplayInterval);
  }

  stopAutoplay() {
    if (this.autoplayID) {
      clearInterval(this.autoplayID);
    }
  }

  nextSlide = () => {
    const { currentSlide } = this.state;
    this.goToSlide(
      currentSlide + 1 > this.childrenCount ? 0 : currentSlide + 1
    );
  };

  goToSlide(index) {
    console.log(index)
    if(this.needTransition) {
      this.isAnimating = true
    }
    this.setState({ currentSlide: index }, () => {
      this.needTransition = true;
    });
  }

  setDimensions() {
    let firstSlide = this.list.current.childNodes[0];
    let slideHeight = firstSlide ? firstSlide.offsetHeight : 100;
    let slideWidth = this.frame.current.offsetWidth;
    this.setState({
      slideWidth,
      slideHeight
    });
  }

  formatChildren(children) {
    return React.Children.map(children, (child, index) => {
      return (
        <li
          className="slider-slide"
          style={this.getSlideStyles(index)}
          key={index}
        >
          {child}
        </li>
      );
    });
  }

  getTweeningValue(path) {
    switch (path) {
      case "left":
        return -this.state.slideWidth * this.state.currentSlide - this.state.left;
      case "top":
        return 0;
    }
  }

  getSlideStyles(index) {
    const { vertical, cellSpacing } = this.props;
    const { slideWidth } = this.state;
    let targetPosition = this.getSlideTargetPosition(index);
    return {
      position: "absolute",
      left: vertical ? 0 : targetPosition,
      top: vertical ? targetPosition : 0,
      display: vertical ? "block" : "inline-block",
      listStyleType: "none",
      verticalAlign: "top",
      width: vertical ? "100%" : slideWidth,
      height: "auto",
      boxSizing: "border-box",
      MozBoxSizing: "border-box",
      marginLeft: vertical ? "auto" : cellSpacing / 2,
      marginRight: vertical ? "auto" : cellSpacing / 2,
      marginTop: vertical ? cellSpacing / 2 : "auto",
      marginBottom: vertical ? cellSpacing / 2 : "auto"
    };
  }

  getSlideTargetPosition(index) {
    const { cellSpacing } = this.props;
    const { currentSlide, slideWidth } = this.state;
    const childrenCount = this.childrenCount;

    if (currentSlide <= 0 && index === childrenCount - 1) {
      return -1 * slideWidth;
    }

    if (currentSlide >= childrenCount - 1 && index === 0) {
      return childrenCount * slideWidth;
    }

    return (slideWidth + cellSpacing) * index;
  }

  getSliderStyles() {
    const { width } = this.props;
    const { slideWidth } = this.state;
    return {
      position: "relative",
      display: "block",
      width,
      height: "auto",
      boxSizing: "border-box",
      MozBoxSizing: "border-box",
      visibility: slideWidth ? "visible" : "hidden"
    };
  }

  getFrameStyles() {
    const { frameOverflow, vertical, framePadding } = this.props;
    const { frameWidth } = this.state;
    return {
      position: "relative",
      display: "block",
      overflow: frameOverflow,
      height: vertical ? frameWidth || "initial" : "auto",
      margin: framePadding,
      padding: 0,
      transform: "translate3d(0, 0, 0)",
      WebkitTransform: "translate3d(0, 0, 0)",
      msTransform: "translate(0, 0)",
      boxSizing: "border-box",
      MozBoxSizing: "border-box"
    };
  }

  getListStyles() {
    const { vertical, cellSpacing, children } = this.props;
    const { slideWidth, slideHeight, dragging } = this.state;

    let listWidth = slideWidth * React.Children.count(children);
    let spacingOffset = cellSpacing * React.Children.count(children);
    let transform =
      "translate3d(" +
      this.getTweeningValue("left") +
      "px, " +
      this.getTweeningValue("top") +
      "px, 0)";

    const style = {
      transform,
      WebkitTransform: transform,
      msTransform:
        "translate(" +
        this.getTweeningValue("left") +
        "px, " +
        this.getTweeningValue("top") +
        "px)",
      position: "relative",
      display: "block",
      margin: vertical
        ? (cellSpacing / 2) * -1 + "px 0px"
        : "0px " + (cellSpacing / 2) * -1 + "px",
      padding: 0,
      height: vertical ? listWidth + spacingOffset : slideHeight,
      width: vertical ? "auto" : listWidth + spacingOffset,
      cursor: dragging === true ? "pointer" : "inherit",
      boxSizing: "border-box",
      MozBoxSizing: "border-box"
    };

    return this.needTransition && !this.moving
      ? {
          ...style,
          transition: `all ${this.props.speed}ms ease-in-out`
        }
      : style;
  }

  render() {
    const { style, className, children } = this.props;
    const formatChildren =
      React.Children.count(children) > 1
        ? this.formatChildren(children)
        : children;
    return (
      <div
        className={["slider", className || ""].join(" ")}
        ref={this.slider}
        style={{ ...this.getSliderStyles(), ...style }}
      >
        <div
          className="slider-frame"
          ref={this.frame}
          style={this.getFrameStyles()}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          onTouchCancel={this.onTouchCancel}
        >
          <ul
            className="slider-list"
            ref={this.list}
            style={this.getListStyles()}
          >
            {formatChildren}
          </ul>
        </div>
      </div>
    );
  }
}
