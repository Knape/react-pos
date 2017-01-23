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
        this.__react_pos.ownerDocument.defaultView.addEventListener('resize', this.resizeListener);
        setTimeout(() => {
        this.setState({
          container: getContainer(this),
        });
        }, 10);
      }

      componentWillUnmount() {
        this.__react_pos.ownerDocument.defaultView.removeEventListener('resize', this.resizeListener);
      }

      onResize() {
        this.setState({
          container: getContainer(this),
        });
      }

      getWindow() {
        return this.refs.container ? (this.refs.container.ownerDocument.defaultView || window) : window;
      }

      requestFrame(fn) {
        const window = this.getWindow();
        const raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function callback(cb) {
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

      render() {
        return (
          <div className="react_pos-wrapper">
            {(this.state.container) && <DecoratedComponent {...this.props} {...this.state} />}
            <object
              ref={(__hoc) => { this.__react_pos = __hoc; }}
              data="about:blank"
              className="react-pos"
              style={{
                display: 'block',
                position: 'absolute',
                top: 0, left: 0, height: '100%', width: '100%',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: -1,
                visibility: 'hidden',
              }}
            />
          </div>
        );
      }
    }

    ReactPosComp.propTypes = {};
    ReactPosComp.displayName = 'ReactPosComp';

    return ReactPosComp;
  };
};

export default ReactPos;
