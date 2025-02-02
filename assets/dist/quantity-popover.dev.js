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

if (!customElements.get('quantity-popover')) {
  customElements.define('quantity-popover',
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(QuantityPopover, _HTMLElement);

    function QuantityPopover() {
      var _this;

      _classCallCheck(this, QuantityPopover);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(QuantityPopover).call(this));
      _this.mql = window.matchMedia('(min-width: 990px)');
      _this.mqlTablet = window.matchMedia('(min-width: 750px)');
      _this.infoButtonDesktop = _this.querySelector('.quantity-popover__info-button--icon-only');
      _this.infoButtonMobile = _this.querySelector('.quantity-popover__info-button--icon-with-label');
      _this.popoverInfo = _this.querySelector('.quantity-popover__info');
      _this.closeButton = _this.querySelector('.button-close');
      _this.eventMouseEnterHappened = false;

      if (_this.closeButton) {
        _this.closeButton.addEventListener('click', _this.closePopover.bind(_assertThisInitialized(_this)));
      }

      if (_this.popoverInfo && _this.infoButtonDesktop && _this.mqlTablet.matches) {
        _this.popoverInfo.addEventListener('mouseleave', _this.closePopover.bind(_assertThisInitialized(_this)));
      }

      if (_this.infoButtonDesktop) {
        _this.infoButtonDesktop.addEventListener('click', _this.togglePopover.bind(_assertThisInitialized(_this)));

        _this.infoButtonDesktop.addEventListener('focusout', _this.closePopover.bind(_assertThisInitialized(_this)));
      }

      if (_this.infoButtonMobile) {
        _this.infoButtonMobile.addEventListener('click', _this.togglePopover.bind(_assertThisInitialized(_this)));
      }

      if (_this.infoButtonDesktop && _this.mqlTablet.matches) {
        _this.infoButtonDesktop.addEventListener('mouseenter', _this.togglePopover.bind(_assertThisInitialized(_this)));

        _this.infoButtonDesktop.addEventListener('mouseleave', _this.closePopover.bind(_assertThisInitialized(_this)));
      }

      return _this;
    }

    _createClass(QuantityPopover, [{
      key: "togglePopover",
      value: function togglePopover(event) {
        var _this2 = this;

        event.preventDefault();

        if (event.type === 'mouseenter') {
          this.eventMouseEnterHappened = true;
        }

        if (event.type === 'click' && this.eventMouseEnterHappened) return;
        var button = this.infoButtonDesktop && this.mql.matches ? this.infoButtonDesktop : this.infoButtonMobile;
        var isExpanded = button.getAttribute('aria-expanded') === 'true';

        if (this.mql.matches && !isExpanded || event.type === 'click') {
          button.setAttribute('aria-expanded', !isExpanded);
          this.popoverInfo.toggleAttribute('hidden');
          button.classList.toggle('quantity-popover__info-button--open');
          this.infoButtonDesktop.classList.add('quantity-popover__info-button--icon-only--animation');
        }

        var isOpen = button.getAttribute('aria-expanded') === 'true';

        if (isOpen && event.type !== 'mouseenter') {
          button.focus();
          button.addEventListener('keyup', function (e) {
            if (e.key === 'Escape') {
              _this2.closePopover(e);
            }
          });
        }
      }
    }, {
      key: "closePopover",
      value: function closePopover(event) {
        event.preventDefault();
        var isButtonChild = this.infoButtonDesktop.contains(event.relatedTarget);
        var isPopoverChild = this.popoverInfo.contains(event.relatedTarget);
        var button = this.infoButtonDesktop && this.mql.matches ? this.infoButtonDesktop : this.infoButtonMobile;

        if (!isButtonChild && !isPopoverChild) {
          button.setAttribute('aria-expanded', 'false');
          button.classList.remove('quantity-popover__info-button--open');
          this.popoverInfo.setAttribute('hidden', '');
          this.infoButtonDesktop.classList.remove('quantity-popover__info-button--icon-only--animation');
        }

        this.eventMouseEnterHappened = false;
      }
    }]);

    return QuantityPopover;
  }(_wrapNativeSuper(HTMLElement)));
}