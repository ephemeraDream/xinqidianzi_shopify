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

if (!customElements.get('product-form')) {
  customElements.define('product-form',
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(ProductForm, _HTMLElement);

    function ProductForm() {
      var _this;

      _classCallCheck(this, ProductForm);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ProductForm).call(this));
      _this.form = _this.querySelector('form');
      _this.variantIdInput.disabled = false;

      _this.form.addEventListener('submit', _this.onSubmitHandler.bind(_assertThisInitialized(_this)));

      _this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
      _this.submitButton = _this.querySelector('[type="submit"]');
      _this.submitButtonText = _this.submitButton.querySelector('span');
      if (document.querySelector('cart-drawer')) _this.submitButton.setAttribute('aria-haspopup', 'dialog');
      _this.hideErrors = _this.dataset.hideErrors === 'true';
      return _this;
    }

    _createClass(ProductForm, [{
      key: "onSubmitHandler",
      value: function onSubmitHandler(evt) {
        var _this2 = this;

        evt.preventDefault();
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;
        this.handleErrorMessage();
        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        this.querySelector('.loading__spinner').classList.remove('hidden');
        var config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];
        var formData = new FormData(this.form);

        if (this.cart) {
          formData.append('sections', this.cart.getSectionsToRender().map(function (section) {
            return section.id;
          }));
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }

        config.body = formData;
        fetch("".concat(routes.cart_add_url), config).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.status) {
            publish(PUB_SUB_EVENTS.cartError, {
              source: 'product-form',
              productVariantId: formData.get('id'),
              errors: response.errors || response.description,
              message: response.message
            });

            _this2.handleErrorMessage(response.description);

            var soldOutMessage = _this2.submitButton.querySelector('.sold-out-message');

            if (!soldOutMessage) return;

            _this2.submitButton.setAttribute('aria-disabled', true);

            _this2.submitButtonText.classList.add('hidden');

            soldOutMessage.classList.remove('hidden');
            _this2.error = true;
            return;
          } else if (!_this2.cart) {
            window.location = window.routes.cart_url;
            return;
          }

          if (!_this2.error) publish(PUB_SUB_EVENTS.cartUpdate, {
            source: 'product-form',
            productVariantId: formData.get('id'),
            cartData: response
          });
          _this2.error = false;

          var quickAddModal = _this2.closest('quick-add-modal');

          if (quickAddModal) {
            document.body.addEventListener('modalClosed', function () {
              setTimeout(function () {
                _this2.cart.renderContents(response);
              });
            }, {
              once: true
            });
            quickAddModal.hide(true);
          } else {
            _this2.cart.renderContents(response);
          }
        })["catch"](function (e) {
          console.error(e);
        })["finally"](function () {
          _this2.submitButton.classList.remove('loading');

          if (_this2.cart && _this2.cart.classList.contains('is-empty')) _this2.cart.classList.remove('is-empty');
          if (!_this2.error) _this2.submitButton.removeAttribute('aria-disabled');

          _this2.querySelector('.loading__spinner').classList.add('hidden');
        });
      }
    }, {
      key: "handleErrorMessage",
      value: function handleErrorMessage() {
        var errorMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        if (this.hideErrors) return;
        this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');
        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }
    }, {
      key: "toggleSubmitButton",
      value: function toggleSubmitButton() {
        var disable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var text = arguments.length > 1 ? arguments[1] : undefined;

        if (disable) {
          this.submitButton.setAttribute('disabled', 'disabled');
          if (text) this.submitButtonText.textContent = text;
        } else {
          this.submitButton.removeAttribute('disabled');
          this.submitButtonText.textContent = window.variantStrings.addToCart;
        }
      }
    }, {
      key: "variantIdInput",
      get: function get() {
        return this.form.querySelector('[name=id]');
      }
    }]);

    return ProductForm;
  }(_wrapNativeSuper(HTMLElement)));
}