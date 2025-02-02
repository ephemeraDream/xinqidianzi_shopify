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

var CartDrawer =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(CartDrawer, _HTMLElement);

  function CartDrawer() {
    var _this;

    _classCallCheck(this, CartDrawer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CartDrawer).call(this));

    _this.addEventListener('keyup', function (evt) {
      return evt.code === 'Escape' && _this.close();
    });

    _this.querySelector('#CartDrawer-Overlay').addEventListener('click', _this.close.bind(_assertThisInitialized(_this)));

    _this.setHeaderCartIconAccessibility();

    return _this;
  }

  _createClass(CartDrawer, [{
    key: "setHeaderCartIconAccessibility",
    value: function setHeaderCartIconAccessibility() {
      var _this2 = this;

      var cartLink = document.querySelector('#cart-icon-bubble');
      if (!cartLink) return;
      cartLink.setAttribute('role', 'button');
      cartLink.setAttribute('aria-haspopup', 'dialog');
      cartLink.addEventListener('click', function (event) {
        event.preventDefault();

        _this2.open(cartLink);
      });
      cartLink.addEventListener('keydown', function (event) {
        if (event.code.toUpperCase() === 'SPACE') {
          event.preventDefault();

          _this2.open(cartLink);
        }
      });
    }
  }, {
    key: "open",
    value: function open(triggeredBy) {
      var _this3 = this;

      if (triggeredBy) this.setActiveElement(triggeredBy);
      var cartDrawerNote = this.querySelector('[id^="Details-"] summary');
      if (cartDrawerNote && !cartDrawerNote.hasAttribute('role')) this.setSummaryAccessibility(cartDrawerNote); // here the animation doesn't seem to always get triggered. A timeout seem to help

      setTimeout(function () {
        _this3.classList.add('animate', 'active');
      });
      this.addEventListener('transitionend', function () {
        var containerToTrapFocusOn = _this3.classList.contains('is-empty') ? _this3.querySelector('.drawer__inner-empty') : document.getElementById('CartDrawer');

        var focusElement = _this3.querySelector('.drawer__inner') || _this3.querySelector('.drawer__close');

        trapFocus(containerToTrapFocusOn, focusElement);
      }, {
        once: true
      });
      document.body.classList.add('overflow-hidden');
    }
  }, {
    key: "close",
    value: function close() {
      this.classList.remove('active');
      removeTrapFocus(this.activeElement);
      document.body.classList.remove('overflow-hidden');
    }
  }, {
    key: "setSummaryAccessibility",
    value: function setSummaryAccessibility(cartDrawerNote) {
      cartDrawerNote.setAttribute('role', 'button');
      cartDrawerNote.setAttribute('aria-expanded', 'false');

      if (cartDrawerNote.nextElementSibling.getAttribute('id')) {
        cartDrawerNote.setAttribute('aria-controls', cartDrawerNote.nextElementSibling.id);
      }

      cartDrawerNote.addEventListener('click', function (event) {
        event.currentTarget.setAttribute('aria-expanded', !event.currentTarget.closest('details').hasAttribute('open'));
      });
      cartDrawerNote.parentElement.addEventListener('keyup', onKeyUpEscape);
    }
  }, {
    key: "renderContents",
    value: function renderContents(parsedState) {
      var _this4 = this;

      this.querySelector('.drawer__inner').classList.contains('is-empty') && this.querySelector('.drawer__inner').classList.remove('is-empty');
      this.productId = parsedState.id;
      this.getSectionsToRender().forEach(function (section) {
        var sectionElement = section.selector ? document.querySelector(section.selector) : document.getElementById(section.id);
        if (!sectionElement) return;
        sectionElement.innerHTML = _this4.getSectionInnerHTML(parsedState.sections[section.id], section.selector);
      });
      setTimeout(function () {
        _this4.querySelector('#CartDrawer-Overlay').addEventListener('click', _this4.close.bind(_this4));

        _this4.open();
      });
    }
  }, {
    key: "getSectionInnerHTML",
    value: function getSectionInnerHTML(html) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.shopify-section';
      return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
    }
  }, {
    key: "getSectionsToRender",
    value: function getSectionsToRender() {
      return [{
        id: 'cart-drawer',
        selector: '#CartDrawer'
      }, {
        id: 'cart-icon-bubble'
      }];
    }
  }, {
    key: "getSectionDOM",
    value: function getSectionDOM(html) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.shopify-section';
      return new DOMParser().parseFromString(html, 'text/html').querySelector(selector);
    }
  }, {
    key: "setActiveElement",
    value: function setActiveElement(element) {
      this.activeElement = element;
    }
  }]);

  return CartDrawer;
}(_wrapNativeSuper(HTMLElement));

customElements.define('cart-drawer', CartDrawer);

var CartDrawerItems =
/*#__PURE__*/
function (_CartItems) {
  _inherits(CartDrawerItems, _CartItems);

  function CartDrawerItems() {
    _classCallCheck(this, CartDrawerItems);

    return _possibleConstructorReturn(this, _getPrototypeOf(CartDrawerItems).apply(this, arguments));
  }

  _createClass(CartDrawerItems, [{
    key: "getSectionsToRender",
    value: function getSectionsToRender() {
      return [{
        id: 'CartDrawer',
        section: 'cart-drawer',
        selector: '.drawer__inner'
      }, {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      }];
    }
  }]);

  return CartDrawerItems;
}(CartItems);

customElements.define('cart-drawer-items', CartDrawerItems);