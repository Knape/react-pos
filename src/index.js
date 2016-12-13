import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const defaultGetContainer = (el) => (
  ReactDOM.findDOMNode(el).getBoundingClientRect()
);

const ReactPos = ({ getContainer = defaultGetContainer } = {}) => {
  return (DecoratedComponent) => {
    class ReactPosComp extends Component {

      constructor(props) {
        super(props);
        this.state = {
          container: null,
        };
        this.resizeListener = this.resizeListener.bind(this);
      }

      componentDidMount() {
        this.__react_pos.contentDocument.defaultView.addEventListener('resize', this.resizeListener);

        this.setState({
          container: getContainer(this),
        });
      }

      componentWillUnmount() {
        this.__react_pos.contentDocument.defaultView.removeEventListener('resize', this.resizeListener);
      }

      getWindow() {
        return this.refs.container ? (this.refs.container.ownerDocument.defaultView || window) : window;
      }

      requestFrame(fn) {
        const window = this.getWindow();
        const raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (cb) {
          return window.setTimeout(cb, 20);
        };
        return raf(fn);
      }

      cancelFrame(id) {
        const cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
          window.clearTimeout;
        return cancel(id);
      }

      resizeListener() {
        if (this._animationFrame) {
          this.cancelFrame(this._animationFrame);
        }
        this._animationFrame = this.requestFrame(() => {
          this.onResize();
        });
      }

      onResize() {
        this.setState({
          container: getContainer(this),
        });
      }

      render() {
        return (
          <span>
            {(this.state.container) && <DecoratedComponent {...this.props} {...this.state} />}
            <object
              ref={(__hoc) => { this.__react_pos = __hoc; }}
              data="about:blank"
              className="react-pos"
              style={{display: 'block', position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: -1}}
              />
          </span>
        );
      }
    }

    ReactPosComp.propTypes = {};
    ReactPosComp.displayName = 'ReactPosComp';

    return ReactPosComp;
  };
};

export default ReactPos;
