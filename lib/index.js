'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultGetContainer = function defaultGetContainer(el) {
  return _reactDom2.default.findDOMNode(el).getBoundingClientRect();
};

var ReactPos = function ReactPos() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$getContainer = _ref.getContainer,
      getContainer = _ref$getContainer === undefined ? defaultGetContainer : _ref$getContainer;

  return function (DecoratedComponent) {
    var ReactPosComp = function (_Component) {
      _inherits(ReactPosComp, _Component);

      function ReactPosComp(props) {
        _classCallCheck(this, ReactPosComp);

        var _this = _possibleConstructorReturn(this, (ReactPosComp.__proto__ || Object.getPrototypeOf(ReactPosComp)).call(this, props));

        _this.state = {
          container: null
        };
        _this.resizeListener = _this.resizeListener.bind(_this);
        return _this;
      }

      _createClass(ReactPosComp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var _this2 = this;

          this.__react_pos.ownerDocument.defaultView.addEventListener('resize', this.resizeListener);
          setTimeout(function () {
            _this2.setState({
              container: getContainer(_this2)
            });
          }, 10);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.__react_pos.ownerDocument.defaultView.removeEventListener('resize', this.resizeListener);
        }
      }, {
        key: 'onResize',
        value: function onResize() {
          this.setState({
            container: getContainer(this)
          });
        }
      }, {
        key: 'getWindow',
        value: function getWindow() {
          return this.refs.container ? this.refs.container.ownerDocument.defaultView || window : window;
        }
      }, {
        key: 'requestFrame',
        value: function requestFrame(fn) {
          var window = this.getWindow();
          var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function callback(cb) {
            return window.setTimeout(cb, 20);
          };
          return raf(fn);
        }
      }, {
        key: 'cancelFrame',
        value: function cancelFrame(id) {
          var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
          return cancel(id);
        }
      }, {
        key: 'resizeListener',
        value: function resizeListener() {
          var _this3 = this;

          if (this._animationFrame) {
            this.cancelFrame(this._animationFrame);
          }
          this._animationFrame = this.requestFrame(function () {
            _this3.onResize();
          });
        }
      }, {
        key: 'render',
        value: function render() {
          var _this4 = this;

          return _react2.default.createElement(
            'div',
            { className: 'react_pos-wrapper' },
            this.state.container && _react2.default.createElement(DecoratedComponent, _extends({}, this.props, this.state)),
            _react2.default.createElement('object', {
              ref: function ref(__hoc) {
                _this4.__react_pos = __hoc;
              },
              data: 'about:blank',
              className: 'react-pos',
              style: {
                display: 'block',
                position: 'absolute',
                top: 0, left: 0, height: '100%', width: '100%',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: -1,
                visibility: 'hidden'
              }
            })
          );
        }
      }]);

      return ReactPosComp;
    }(_react.Component);

    ReactPosComp.propTypes = {};
    ReactPosComp.displayName = 'ReactPosComp';

    return ReactPosComp;
  };
};

exports.default = ReactPos;