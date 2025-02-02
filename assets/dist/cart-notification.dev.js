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

var CartNotification =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(CartNotification, _HTMLElement);

  function CartNotification() {
    var _this;

    _classCallCheck(this, CartNotification);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CartNotification).call(this));
    _this.notification = document.getElementById('cart-notification');
    _this.header = document.querySelector('sticky-header');
    _this.onBodyClick = _this.handleBodyClick.bind(_assertThisInitialized(_this));

    _this.notification.addEventListener('keyup', function (evt) {
      return evt.code === 'Escape' && _this.close();
    });

    _this.querySelectorAll('button[type="button"]').forEach(function (closeButton) {
      return closeButton.addEventListener('click', _this.close.bind(_assertThisInitialized(_this)));
    });

    return _this;
  }

  _createClass(CartNotification, [{
    key: "open",
    value: function open() {
      var _this2 = this;

      this.notification.classList.add('animate', 'active');
      this.notification.addEventListener('transitionend', function () {
        _this2.notification.focus();

        trapFocus(_this2.notification);
      }, {
        once: true
      });
      document.body.addEventListener('click', this.onBodyClick);
    }
  }, {
    key: "close",
    value: function close() {
      this.notification.classList.remove('active');
      document.body.removeEventListener('click', this.onBodyClick);
      removeTrapFocus(this.activeElement);
    }
  }, {
    key: "renderContents",
    value: function renderContents(parsedState) {
      var _this3 = this;

      this.cartItemKey = parsedState.key;
      this.getSectionsToRender().forEach(function (section) {
        document.getElementById(section.id).innerHTML = _this3.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
      });
      if (this.header) this.header.reveal();
      this.open();
    }
  }, {
    key: "getSectionsToRender",
    value: function getSectionsToRender() {
      return [{
        id: 'cart-notification-product',
        selector: "[id=\"cart-notification-product-".concat(this.cartItemKey, "\"]")
      }, {
        id: 'cart-notification-button'
      }, {
        id: 'cart-icon-bubble'
      }];
    }
  }, {
    key: "getSectionInnerHTML",
    value: function getSectionInnerHTML(html) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.shopify-section';
      return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
    }
  }, {
    key: "handleBodyClick",
    value: function handleBodyClick(evt) {
      var target = evt.target;

      if (target !== this.notification && !target.closest('cart-notification')) {
        var disclosure = target.closest('details-disclosure, header-menu');
        this.activeElement = disclosure ? disclosure.querySelector('summary') : null;
        this.close();
      }
    }
  }, {
    key: "setActiveElement",
    value: function setActiveElement(element) {
      this.activeElement = element;
    }
  }]);

  return CartNotification;
}(_wrapNativeSuper(HTMLElement));

customElements.define('cart-notification', CartNotification);