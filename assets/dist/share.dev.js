"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

if (!customElements.get('share-button')) {
  customElements.define('share-button',
  /*#__PURE__*/
  function (_DetailsDisclosure) {
    _inherits(ShareButton, _DetailsDisclosure);

    function ShareButton() {
      var _this;

      _classCallCheck(this, ShareButton);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(ShareButton).call(this));
      _this.elements = {
        shareButton: _this.querySelector('button'),
        shareSummary: _this.querySelector('summary'),
        closeButton: _this.querySelector('.share-button__close'),
        successMessage: _this.querySelector('[id^="ShareMessage"]'),
        urlInput: _this.querySelector('input')
      };
      _this.urlToShare = _this.elements.urlInput ? _this.elements.urlInput.value : document.location.href;

      if (navigator.share) {
        _this.mainDetailsToggle.setAttribute('hidden', '');

        _this.elements.shareButton.classList.remove('hidden');

        _this.elements.shareButton.addEventListener('click', function () {
          navigator.share({
            url: _this.urlToShare,
            title: document.title
          });
        });
      } else {
        _this.mainDetailsToggle.addEventListener('toggle', _this.toggleDetails.bind(_assertThisInitialized(_this)));

        _this.mainDetailsToggle.querySelector('.share-button__copy').addEventListener('click', _this.copyToClipboard.bind(_assertThisInitialized(_this)));

        _this.mainDetailsToggle.querySelector('.share-button__close').addEventListener('click', _this.close.bind(_assertThisInitialized(_this)));
      }

      return _this;
    }

    _createClass(ShareButton, [{
      key: "toggleDetails",
      value: function toggleDetails() {
        if (!this.mainDetailsToggle.open) {
          this.elements.successMessage.classList.add('hidden');
          this.elements.successMessage.textContent = '';
          this.elements.closeButton.classList.add('hidden');
          this.elements.shareSummary.focus();
        }
      }
    }, {
      key: "copyToClipboard",
      value: function copyToClipboard() {
        var _this2 = this;

        navigator.clipboard.writeText(this.elements.urlInput.value).then(function () {
          _this2.elements.successMessage.classList.remove('hidden');

          _this2.elements.successMessage.textContent = window.accessibilityStrings.shareSuccess;

          _this2.elements.closeButton.classList.remove('hidden');

          _this2.elements.closeButton.focus();
        });
      }
    }, {
      key: "updateUrl",
      value: function updateUrl(url) {
        this.urlToShare = url;
        this.elements.urlInput.value = url;
      }
    }]);

    return ShareButton;
  }(DetailsDisclosure));
}