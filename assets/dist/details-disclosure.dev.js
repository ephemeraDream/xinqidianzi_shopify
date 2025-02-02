"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DetailsDisclosure =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(DetailsDisclosure, _HTMLElement);

  function DetailsDisclosure() {
    var _this;

    _classCallCheck(this, DetailsDisclosure);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DetailsDisclosure).call(this));
    _this.mainDetailsToggle = _this.querySelector('details');
    _this.content = _this.mainDetailsToggle.querySelector('summary').nextElementSibling;

    _this.mainDetailsToggle.addEventListener('focusout', _this.onFocusOut.bind(_assertThisInitialized(_this)));

    _this.mainDetailsToggle.addEventListener('toggle', _this.onToggle.bind(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(DetailsDisclosure, [{
    key: "onFocusOut",
    value: function onFocusOut() {
      var _this2 = this;

      setTimeout(function () {
        if (!_this2.contains(document.activeElement)) _this2.close();
      });
    }
  }, {
    key: "onToggle",
    value: function onToggle() {
      if (!this.animations) this.animations = this.content.getAnimations();

      if (this.mainDetailsToggle.hasAttribute('open')) {
        this.animations.forEach(function (animation) {
          return animation.play();
        });
      } else {
        this.animations.forEach(function (animation) {
          return animation.cancel();
        });
      }
    }
  }, {
    key: "close",
    value: function close() {
      this.mainDetailsToggle.removeAttribute('open');
      this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
    }
  }]);

  return DetailsDisclosure;
}(_wrapNativeSuper(HTMLElement));

customElements.define('details-disclosure', DetailsDisclosure);

var HeaderMenu =
/*#__PURE__*/
function (_DetailsDisclosure) {
  _inherits(HeaderMenu, _DetailsDisclosure);

  function HeaderMenu() {
    var _this3;

    _classCallCheck(this, HeaderMenu);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(HeaderMenu).call(this));
    _this3.header = document.querySelector('.header-wrapper');
    return _this3;
  }

  _createClass(HeaderMenu, [{
    key: "onToggle",
    value: function onToggle() {
      if (!this.header) return;
      this.header.preventHide = this.mainDetailsToggle.open;
      if (document.documentElement.style.getPropertyValue('--header-bottom-position-desktop') !== '') return;
      document.documentElement.style.setProperty('--header-bottom-position-desktop', "".concat(Math.floor(this.header.getBoundingClientRect().bottom), "px"));
    }
  }]);

  return HeaderMenu;
}(DetailsDisclosure);

customElements.define('header-menu', HeaderMenu);