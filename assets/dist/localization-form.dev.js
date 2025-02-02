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

if (!customElements.get('localization-form')) {
  customElements.define('localization-form',
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(LocalizationForm, _HTMLElement);

    function LocalizationForm() {
      var _this;

      _classCallCheck(this, LocalizationForm);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(LocalizationForm).call(this));
      _this.mql = window.matchMedia('(min-width: 750px)');
      _this.header = document.querySelector('.header-wrapper');
      _this.elements = {
        input: _this.querySelector('input[name="locale_code"], input[name="country_code"]'),
        button: _this.querySelector('button.localization-form__select'),
        panel: _this.querySelector('.disclosure__list-wrapper'),
        search: _this.querySelector('input[name="country_filter"]'),
        closeButton: _this.querySelector('.country-selector__close-button'),
        resetButton: _this.querySelector('.country-filter__reset-button'),
        searchIcon: _this.querySelector('.country-filter__search-icon'),
        liveRegion: _this.querySelector('#sr-country-search-results')
      };

      _this.addEventListener('keyup', _this.onContainerKeyUp.bind(_assertThisInitialized(_this)));

      _this.addEventListener('keydown', _this.onContainerKeyDown.bind(_assertThisInitialized(_this)));

      _this.addEventListener('focusout', _this.closeSelector.bind(_assertThisInitialized(_this)));

      _this.elements.button.addEventListener('click', _this.openSelector.bind(_assertThisInitialized(_this)));

      if (_this.elements.search) {
        _this.elements.search.addEventListener('keyup', _this.filterCountries.bind(_assertThisInitialized(_this)));

        _this.elements.search.addEventListener('focus', _this.onSearchFocus.bind(_assertThisInitialized(_this)));

        _this.elements.search.addEventListener('blur', _this.onSearchBlur.bind(_assertThisInitialized(_this)));

        _this.elements.search.addEventListener('keydown', _this.onSearchKeyDown.bind(_assertThisInitialized(_this)));
      }

      if (_this.elements.closeButton) {
        _this.elements.closeButton.addEventListener('click', _this.hidePanel.bind(_assertThisInitialized(_this)));
      }

      if (_this.elements.resetButton) {
        _this.elements.resetButton.addEventListener('click', _this.resetFilter.bind(_assertThisInitialized(_this)));

        _this.elements.resetButton.addEventListener('mousedown', function (event) {
          return event.preventDefault();
        });
      }

      _this.querySelectorAll('a').forEach(function (item) {
        return item.addEventListener('click', _this.onItemClick.bind(_assertThisInitialized(_this)));
      });

      return _this;
    }

    _createClass(LocalizationForm, [{
      key: "hidePanel",
      value: function hidePanel() {
        this.elements.button.setAttribute('aria-expanded', 'false');
        this.elements.panel.setAttribute('hidden', true);

        if (this.elements.search) {
          this.elements.search.value = '';
          this.filterCountries();
          this.elements.search.setAttribute('aria-activedescendant', '');
        }

        document.body.classList.remove('overflow-hidden-mobile');
        document.querySelector('.menu-drawer').classList.remove('country-selector-open');
        this.header.preventHide = false;
      }
    }, {
      key: "onContainerKeyDown",
      value: function onContainerKeyDown(event) {
        var _this2 = this;

        var focusableItems = Array.from(this.querySelectorAll('a')).filter(function (item) {
          return !item.parentElement.classList.contains('hidden');
        });
        var focusedItemIndex = focusableItems.findIndex(function (item) {
          return item === document.activeElement;
        });
        var itemToFocus;

        switch (event.code.toUpperCase()) {
          case 'ARROWUP':
            event.preventDefault();
            itemToFocus = focusedItemIndex > 0 ? focusableItems[focusedItemIndex - 1] : focusableItems[focusableItems.length - 1];
            itemToFocus.focus();
            break;

          case 'ARROWDOWN':
            event.preventDefault();
            itemToFocus = focusedItemIndex < focusableItems.length - 1 ? focusableItems[focusedItemIndex + 1] : focusableItems[0];
            itemToFocus.focus();
            break;
        }

        if (!this.elements.search) return;
        setTimeout(function () {
          focusedItemIndex = focusableItems.findIndex(function (item) {
            return item === document.activeElement;
          });

          if (focusedItemIndex > -1) {
            _this2.elements.search.setAttribute('aria-activedescendant', focusableItems[focusedItemIndex].id);
          } else {
            _this2.elements.search.setAttribute('aria-activedescendant', '');
          }
        });
      }
    }, {
      key: "onContainerKeyUp",
      value: function onContainerKeyUp(event) {
        event.preventDefault();

        switch (event.code.toUpperCase()) {
          case 'ESCAPE':
            if (this.elements.button.getAttribute('aria-expanded') == 'false') return;
            this.hidePanel();
            event.stopPropagation();
            this.elements.button.focus();
            break;

          case 'SPACE':
            if (this.elements.button.getAttribute('aria-expanded') == 'true') return;
            this.openSelector();
            break;
        }
      }
    }, {
      key: "onItemClick",
      value: function onItemClick(event) {
        event.preventDefault();
        var form = this.querySelector('form');
        this.elements.input.value = event.currentTarget.dataset.value;
        if (form) form.submit();
      }
    }, {
      key: "openSelector",
      value: function openSelector() {
        this.elements.button.focus();
        this.elements.panel.toggleAttribute('hidden');
        this.elements.button.setAttribute('aria-expanded', (this.elements.button.getAttribute('aria-expanded') === 'false').toString());

        if (!document.body.classList.contains('overflow-hidden-tablet')) {
          document.body.classList.add('overflow-hidden-mobile');
        }

        if (this.elements.search && this.mql.matches) {
          this.elements.search.focus();
        }

        if (this.hasAttribute('data-prevent-hide')) {
          this.header.preventHide = true;
        }

        document.querySelector('.menu-drawer').classList.add('country-selector-open');
      }
    }, {
      key: "closeSelector",
      value: function closeSelector(event) {
        if (event.target.classList.contains('country-selector__overlay') || !this.contains(event.target) || !this.contains(event.relatedTarget)) {
          this.hidePanel();
        }
      }
    }, {
      key: "normalizeString",
      value: function normalizeString(str) {
        return str.normalize('NFD').replace(/(?:[\^`\xA8\xAF\xB4\xB7\xB8\u02B0-\u034E\u0350-\u0357\u035D-\u0362\u0374\u0375\u037A\u0384\u0385\u0483-\u0487\u0559\u0591-\u05A1\u05A3-\u05BD\u05BF\u05C1\u05C2\u05C4\u064B-\u0652\u0657\u0658\u06DF\u06E0\u06E5\u06E6\u06EA-\u06EC\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F5\u0818\u0819\u08E3-\u08FE\u093C\u094D\u0951-\u0954\u0971\u09BC\u09CD\u0A3C\u0A4D\u0ABC\u0ACD\u0AFD-\u0AFF\u0B3C\u0B4D\u0BCD\u0C4D\u0CBC\u0CCD\u0D3B\u0D3C\u0D4D\u0DCA\u0E47-\u0E4C\u0E4E\u0EBA\u0EC8-\u0ECC\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F82-\u0F84\u0F86\u0F87\u0FC6\u1037\u1039\u103A\u1063\u1064\u1069-\u106D\u1087-\u108D\u108F\u109A\u109B\u135D-\u135F\u17C9-\u17D3\u17DD\u1939-\u193B\u1A75-\u1A7C\u1A7F\u1AB0-\u1ABD\u1B34\u1B44\u1B6B-\u1B73\u1BAA\u1BAB\u1C36\u1C37\u1C78-\u1C7D\u1CD0-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1D2C-\u1D6A\u1DC4-\u1DCF\u1DF5-\u1DF9\u1DFD-\u1DFF\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2CEF-\u2CF1\u2E2F\u302A-\u302F\u3099-\u309C\u30FC\uA66F\uA67C\uA67D\uA67F\uA69C\uA69D\uA6F0\uA6F1\uA700-\uA721\uA788-\uA78A\uA7F8\uA7F9\uA8C4\uA8E0-\uA8F1\uA92B-\uA92E\uA953\uA9B3\uA9C0\uA9E5\uAA7B-\uAA7D\uAABF-\uAAC2\uAAF6\uAB5B-\uAB5F\uABEC\uABED\uFB1E\uFE20-\uFE2F\uFF3E\uFF40\uFF70\uFF9E\uFF9F\uFFE3]|\uD800\uDEE0|\uD802[\uDEE5\uDEE6]|\uD803[\uDD22-\uDD27\uDF46-\uDF50]|\uD804[\uDCB9\uDCBA\uDD33\uDD34\uDD73\uDDC0\uDDCA-\uDDCC\uDE35\uDE36\uDEE9\uDEEA\uDF3C\uDF4D\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC42\uDC46\uDCC2\uDCC3\uDDBF\uDDC0\uDE3F\uDEB6\uDEB7\uDF2B]|\uD806[\uDC39\uDC3A\uDDE0\uDE34\uDE47\uDE99]|\uD807[\uDC3F\uDD42\uDD44\uDD45\uDD97]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF9F]|\uD834[\uDD67-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD]|\uD838[\uDD30-\uDD36\uDEEC-\uDEEF]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD46\uDD48-\uDD4A])/g, '').toLowerCase();
      }
    }, {
      key: "filterCountries",
      value: function filterCountries() {
        var _this3 = this;

        var searchValue = this.normalizeString(this.elements.search.value);
        var popularCountries = this.querySelector('.popular-countries');
        var allCountries = this.querySelectorAll('a');
        var visibleCountries = allCountries.length;
        this.elements.resetButton.classList.toggle('hidden', !searchValue);

        if (popularCountries) {
          popularCountries.classList.toggle('hidden', searchValue);
        }

        allCountries.forEach(function (item) {
          var countryName = _this3.normalizeString(item.querySelector('.country').textContent);

          if (countryName.indexOf(searchValue) > -1) {
            item.parentElement.classList.remove('hidden');
            visibleCountries++;
          } else {
            item.parentElement.classList.add('hidden');
            visibleCountries--;
          }
        });

        if (this.elements.liveRegion) {
          this.elements.liveRegion.innerHTML = window.accessibilityStrings.countrySelectorSearchCount.replace('[count]', visibleCountries);
        }

        this.querySelector('.country-selector').scrollTop = 0;
        this.querySelector('.country-selector__list').scrollTop = 0;
      }
    }, {
      key: "resetFilter",
      value: function resetFilter(event) {
        event.stopPropagation();
        this.elements.search.value = '';
        this.filterCountries();
        this.elements.search.focus();
      }
    }, {
      key: "onSearchFocus",
      value: function onSearchFocus() {
        this.elements.searchIcon.classList.add('country-filter__search-icon--hidden');
      }
    }, {
      key: "onSearchBlur",
      value: function onSearchBlur() {
        if (!this.elements.search.value) {
          this.elements.searchIcon.classList.remove('country-filter__search-icon--hidden');
        }
      }
    }, {
      key: "onSearchKeyDown",
      value: function onSearchKeyDown(event) {
        if (event.code.toUpperCase() === 'ENTER') {
          event.preventDefault();
        }
      }
    }]);

    return LocalizationForm;
  }(_wrapNativeSuper(HTMLElement)));
}