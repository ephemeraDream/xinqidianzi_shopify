"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

if (!customElements.get('quick-add-bulk')) {
  customElements.define('quick-add-bulk',
  /*#__PURE__*/
  function (_BulkAdd) {
    _inherits(QuickAddBulk, _BulkAdd);

    function QuickAddBulk() {
      var _this;

      _classCallCheck(this, QuickAddBulk);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(QuickAddBulk).call(this));
      _this.quantity = _this.querySelector('quantity-input');
      var debouncedOnChange = debounce(function (event) {
        if (parseInt(event.target.value) === 0) {
          _this.startQueue(event.target.dataset.index, parseInt(event.target.value));
        } else {
          _this.validateQuantity(event);
        }
      }, ON_CHANGE_DEBOUNCE_TIMER);

      _this.addEventListener('change', debouncedOnChange.bind(_assertThisInitialized(_this)));

      _this.listenForActiveInput();

      _this.listenForKeydown();

      _this.lastActiveInputId = null;
      var pageParams = new URLSearchParams(window.location.search);
      window.pageNumber = decodeURIComponent(pageParams.get('page') || '');
      return _this;
    }

    _createClass(QuickAddBulk, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;

        this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, function (event) {
          if (event.source === 'quick-add' || event.cartData.items && !event.cartData.items.some(function (item) {
            return item.id === parseInt(_this2.dataset.index);
          }) || event.cartData.variant_id && !(event.cartData.variant_id === parseInt(_this2.dataset.index))) {
            return;
          } // If its another section that made the update


          _this2.onCartUpdate().then(function () {
            _this2.listenForActiveInput();

            _this2.listenForKeydown();
          });
        });
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (this.cartUpdateUnsubscriber) {
          this.cartUpdateUnsubscriber();
        }
      }
    }, {
      key: "getInput",
      value: function getInput() {
        return this.querySelector('quantity-input input');
      }
    }, {
      key: "selectProgressBar",
      value: function selectProgressBar() {
        return this.querySelector('.progress-bar-container');
      }
    }, {
      key: "listenForActiveInput",
      value: function listenForActiveInput() {
        if (!this.classList.contains('hidden')) {
          this.getInput().addEventListener('focusin', function (event) {
            return event.target.select();
          });
        }

        this.isEnterPressed = false;
      }
    }, {
      key: "listenForKeydown",
      value: function listenForKeydown() {
        var _this3 = this;

        this.getInput().addEventListener('keydown', function (event) {
          if (event.key === 'Enter') {
            _this3.getInput().blur();

            _this3.isEnterPressed = true;
          }
        });
      }
    }, {
      key: "cleanErrorMessageOnType",
      value: function cleanErrorMessageOnType(event) {
        event.target.addEventListener('keypress', function () {
          event.target.setCustomValidity('');
        }, {
          once: true
        });
      }
    }, {
      key: "onCartUpdate",
      value: function onCartUpdate() {
        var _this4 = this;

        return new Promise(function (resolve, reject) {
          fetch("".concat(_this4.getSectionsUrl(), "?section_id=").concat(_this4.closest('.collection').dataset.id)).then(function (response) {
            return response.text();
          }).then(function (responseText) {
            var html = new DOMParser().parseFromString(responseText, 'text/html');
            var sourceQty = html.querySelector("#quick-add-bulk-".concat(_this4.dataset.id, "-").concat(_this4.closest('.collection').dataset.id));

            if (sourceQty) {
              _this4.innerHTML = sourceQty.innerHTML;
            }

            resolve();
          })["catch"](function (e) {
            console.error(e);
            reject(e);
          });
        });
      }
    }, {
      key: "updateMultipleQty",
      value: function updateMultipleQty(items) {
        var _this5 = this;

        this.selectProgressBar().classList.remove('hidden');
        var ids = Object.keys(items);
        var body = JSON.stringify({
          updates: items,
          sections: this.getSectionsToRender().map(function (section) {
            return section.section;
          }),
          sections_url: this.getSectionsUrl()
        });
        fetch("".concat(routes.cart_update_url), _objectSpread({}, fetchConfig(), {}, {
          body: body
        })).then(function (response) {
          return response.text();
        }).then(function (state) {
          var parsedState = JSON.parse(state);

          _this5.renderSections(parsedState, ids);

          publish(PUB_SUB_EVENTS.cartUpdate, {
            source: 'quick-add',
            cartData: parsedState
          });
        })["catch"](function () {// Commented out for now and will be fixed when BE issue is done https://github.com/Shopify/shopify/issues/440605
          // e.target.setCustomValidity(error);
          // e.target.reportValidity();
          // this.resetQuantityInput(ids[index]);
          // this.selectProgressBar().classList.add('hidden');
          // e.target.select();
          // this.cleanErrorMessageOnType(e);
        })["finally"](function () {
          _this5.selectProgressBar().classList.add('hidden');

          _this5.requestStarted = false;
        });
      }
    }, {
      key: "getSectionsToRender",
      value: function getSectionsToRender() {
        return [{
          id: "quick-add-bulk-".concat(this.dataset.id, "-").concat(this.closest('.collection-quick-add-bulk').dataset.id),
          section: this.closest('.collection-quick-add-bulk').dataset.id,
          selector: "#quick-add-bulk-".concat(this.dataset.id, "-").concat(this.closest('.collection-quick-add-bulk').dataset.id)
        }, {
          id: 'cart-icon-bubble',
          section: 'cart-icon-bubble',
          selector: '.shopify-section'
        }, {
          id: 'CartDrawer',
          selector: '#CartDrawer',
          section: 'cart-drawer'
        }];
      }
    }, {
      key: "renderSections",
      value: function renderSections(parsedState, ids) {
        var _this6 = this;

        var intersection = this.queue.filter(function (element) {
          return ids.includes(element.id);
        });
        if (intersection.length !== 0) return;
        this.getSectionsToRender().forEach(function (section) {
          var sectionElement = document.getElementById(section.id);

          if (sectionElement && sectionElement.parentElement && sectionElement.parentElement.classList.contains('drawer')) {
            parsedState.items.length > 0 ? sectionElement.parentElement.classList.remove('is-empty') : sectionElement.parentElement.classList.add('is-empty');
            setTimeout(function () {
              document.querySelector('#CartDrawer-Overlay').addEventListener('click', _this6.cart.close.bind(_this6.cart));
            });
          }

          var elementToReplace = sectionElement && sectionElement.querySelector(section.selector) ? sectionElement.querySelector(section.selector) : sectionElement;

          if (elementToReplace) {
            elementToReplace.innerHTML = _this6.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
          }
        });

        if (this.isEnterPressed) {
          this.querySelector("#Quantity-".concat(this.lastActiveInputId)).select();
        }

        this.listenForActiveInput();
        this.listenForKeydown();
      }
    }]);

    return QuickAddBulk;
  }(BulkAdd));
}