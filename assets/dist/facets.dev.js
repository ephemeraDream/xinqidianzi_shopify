"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var FacetFiltersForm =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(FacetFiltersForm, _HTMLElement);

  function FacetFiltersForm() {
    var _this;

    _classCallCheck(this, FacetFiltersForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FacetFiltersForm).call(this));
    _this.onActiveFilterClick = _this.onActiveFilterClick.bind(_assertThisInitialized(_this));
    _this.debouncedOnSubmit = debounce(function (event) {
      _this.onSubmitHandler(event);
    }, 800);

    var facetForm = _this.querySelector('form');

    facetForm.addEventListener('input', _this.debouncedOnSubmit.bind(_assertThisInitialized(_this)));

    var facetWrapper = _this.querySelector('#FacetsWrapperDesktop');

    if (facetWrapper) facetWrapper.addEventListener('keyup', onKeyUpEscape);
    return _this;
  }

  _createClass(FacetFiltersForm, [{
    key: "createSearchParams",
    value: function createSearchParams(form) {
      var formData = new FormData(form);
      return new URLSearchParams(formData).toString();
    }
  }, {
    key: "onSubmitForm",
    value: function onSubmitForm(searchParams, event) {
      FacetFiltersForm.renderPage(searchParams, event);
    }
  }, {
    key: "onSubmitHandler",
    value: function onSubmitHandler(event) {
      var _this2 = this;

      event.preventDefault();
      var sortFilterForms = document.querySelectorAll('facet-filters-form form');

      if (event.srcElement.className == 'mobile-facets__checkbox') {
        var searchParams = this.createSearchParams(event.target.closest('form'));
        this.onSubmitForm(searchParams, event);
      } else {
        var forms = [];
        var isMobile = event.target.closest('form').id === 'FacetFiltersFormMobile';
        sortFilterForms.forEach(function (form) {
          if (!isMobile) {
            if (form.id === 'FacetSortForm' || form.id === 'FacetFiltersForm' || form.id === 'FacetSortDrawerForm') {
              forms.push(_this2.createSearchParams(form));
            }
          } else if (form.id === 'FacetFiltersFormMobile') {
            forms.push(_this2.createSearchParams(form));
          }
        });
        this.onSubmitForm(forms.join('&'), event);
      }
    }
  }, {
    key: "onActiveFilterClick",
    value: function onActiveFilterClick(event) {
      event.preventDefault();
      FacetFiltersForm.toggleActiveFacets();
      var url = event.currentTarget.href.indexOf('?') == -1 ? '' : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);
      FacetFiltersForm.renderPage(url);
    }
  }], [{
    key: "setListeners",
    value: function setListeners() {
      var onHistoryChange = function onHistoryChange(event) {
        var searchParams = event.state ? event.state.searchParams : FacetFiltersForm.searchParamsInitial;
        if (searchParams === FacetFiltersForm.searchParamsPrev) return;
        FacetFiltersForm.renderPage(searchParams, null, false);
      };

      window.addEventListener('popstate', onHistoryChange);
    }
  }, {
    key: "toggleActiveFacets",
    value: function toggleActiveFacets() {
      var disable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      document.querySelectorAll('.js-facet-remove').forEach(function (element) {
        element.classList.toggle('disabled', disable);
      });
    }
  }, {
    key: "renderPage",
    value: function renderPage(searchParams, event) {
      var updateURLHash = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      FacetFiltersForm.searchParamsPrev = searchParams;
      var sections = FacetFiltersForm.getSections();
      var countContainer = document.getElementById('ProductCount');
      var countContainerDesktop = document.getElementById('ProductCountDesktop');
      var loadingSpinners = document.querySelectorAll('.facets-container .loading__spinner, facet-filters-form .loading__spinner');
      loadingSpinners.forEach(function (spinner) {
        return spinner.classList.remove('hidden');
      });
      document.getElementById('ProductGridContainer').querySelector('.collection').classList.add('loading');

      if (countContainer) {
        countContainer.classList.add('loading');
      }

      if (countContainerDesktop) {
        countContainerDesktop.classList.add('loading');
      }

      sections.forEach(function (section) {
        var url = "".concat(window.location.pathname, "?section_id=").concat(section.section, "&").concat(searchParams);

        var filterDataUrl = function filterDataUrl(element) {
          return element.url === url;
        };

        FacetFiltersForm.filterData.some(filterDataUrl) ? FacetFiltersForm.renderSectionFromCache(filterDataUrl, event) : FacetFiltersForm.renderSectionFromFetch(url, event);
      });
      if (updateURLHash) FacetFiltersForm.updateURLHash(searchParams);
    }
  }, {
    key: "renderSectionFromFetch",
    value: function renderSectionFromFetch(url, event) {
      fetch(url).then(function (response) {
        return response.text();
      }).then(function (responseText) {
        var html = responseText;
        FacetFiltersForm.filterData = [].concat(_toConsumableArray(FacetFiltersForm.filterData), [{
          html: html,
          url: url
        }]);
        FacetFiltersForm.renderFilters(html, event);
        FacetFiltersForm.renderProductGridContainer(html);
        FacetFiltersForm.renderProductCount(html);
        if (typeof initializeScrollAnimationTrigger === 'function') initializeScrollAnimationTrigger(html.innerHTML);
      });
    }
  }, {
    key: "renderSectionFromCache",
    value: function renderSectionFromCache(filterDataUrl, event) {
      var html = FacetFiltersForm.filterData.find(filterDataUrl).html;
      FacetFiltersForm.renderFilters(html, event);
      FacetFiltersForm.renderProductGridContainer(html);
      FacetFiltersForm.renderProductCount(html);
      if (typeof initializeScrollAnimationTrigger === 'function') initializeScrollAnimationTrigger(html.innerHTML);
    }
  }, {
    key: "renderProductGridContainer",
    value: function renderProductGridContainer(html) {
      document.getElementById('ProductGridContainer').innerHTML = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductGridContainer').innerHTML;
      document.getElementById('ProductGridContainer').querySelectorAll('.scroll-trigger').forEach(function (element) {
        element.classList.add('scroll-trigger--cancel');
      });
    }
  }, {
    key: "renderProductCount",
    value: function renderProductCount(html) {
      var count = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductCount').innerHTML;
      var container = document.getElementById('ProductCount');
      var containerDesktop = document.getElementById('ProductCountDesktop');
      container.innerHTML = count;
      container.classList.remove('loading');

      if (containerDesktop) {
        containerDesktop.innerHTML = count;
        containerDesktop.classList.remove('loading');
      }

      var loadingSpinners = document.querySelectorAll('.facets-container .loading__spinner, facet-filters-form .loading__spinner');
      loadingSpinners.forEach(function (spinner) {
        return spinner.classList.add('hidden');
      });
    }
  }, {
    key: "renderFilters",
    value: function renderFilters(html, event) {
      var parsedHTML = new DOMParser().parseFromString(html, 'text/html');
      var facetDetailsElementsFromFetch = parsedHTML.querySelectorAll('#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter');
      var facetDetailsElementsFromDom = document.querySelectorAll('#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter'); // Remove facets that are no longer returned from the server

      Array.from(facetDetailsElementsFromDom).forEach(function (currentElement) {
        if (!Array.from(facetDetailsElementsFromFetch).some(function (_ref) {
          var id = _ref.id;
          return currentElement.id === id;
        })) {
          currentElement.remove();
        }
      });

      var matchesId = function matchesId(element) {
        var jsFilter = event ? event.target.closest('.js-filter') : undefined;
        return jsFilter ? element.id === jsFilter.id : false;
      };

      var facetsToRender = Array.from(facetDetailsElementsFromFetch).filter(function (element) {
        return !matchesId(element);
      });
      var countsToRender = Array.from(facetDetailsElementsFromFetch).find(matchesId);
      facetsToRender.forEach(function (elementToRender, index) {
        var currentElement = document.getElementById(elementToRender.id); // Element already rendered in the DOM so just update the innerHTML

        if (currentElement) {
          document.getElementById(elementToRender.id).innerHTML = elementToRender.innerHTML;
        } else {
          if (index > 0) {
            var _facetsToRender = facetsToRender[index - 1],
                previousElementClassName = _facetsToRender.className,
                previousElementId = _facetsToRender.id; // Same facet type (eg horizontal/vertical or drawer/mobile)

            if (elementToRender.className === previousElementClassName) {
              document.getElementById(previousElementId).after(elementToRender);
              return;
            }
          }

          if (elementToRender.parentElement) {
            document.querySelector("#".concat(elementToRender.parentElement.id, " .js-filter")).before(elementToRender);
          }
        }
      });
      FacetFiltersForm.renderActiveFacets(parsedHTML);
      FacetFiltersForm.renderAdditionalElements(parsedHTML);

      if (countsToRender) {
        var closestJSFilterID = event.target.closest('.js-filter').id;

        if (closestJSFilterID) {
          FacetFiltersForm.renderCounts(countsToRender, event.target.closest('.js-filter'));
          FacetFiltersForm.renderMobileCounts(countsToRender, document.getElementById(closestJSFilterID));
          var newFacetDetailsElement = document.getElementById(closestJSFilterID);
          var newElementSelector = newFacetDetailsElement.classList.contains('mobile-facets__details') ? ".mobile-facets__close-button" : ".facets__summary";
          var newElementToActivate = newFacetDetailsElement.querySelector(newElementSelector);
          var isTextInput = event.target.getAttribute('type') === 'text';
          if (newElementToActivate && !isTextInput) newElementToActivate.focus();
        }
      }
    }
  }, {
    key: "renderActiveFacets",
    value: function renderActiveFacets(html) {
      var activeFacetElementSelectors = ['.active-facets-mobile', '.active-facets-desktop'];
      activeFacetElementSelectors.forEach(function (selector) {
        var activeFacetsElement = html.querySelector(selector);
        if (!activeFacetsElement) return;
        document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
      });
      FacetFiltersForm.toggleActiveFacets(false);
    }
  }, {
    key: "renderAdditionalElements",
    value: function renderAdditionalElements(html) {
      var mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count', '.sorting'];
      mobileElementSelectors.forEach(function (selector) {
        if (!html.querySelector(selector)) return;
        document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
      });
      document.getElementById('FacetFiltersFormMobile').closest('menu-drawer').bindEvents();
    }
  }, {
    key: "renderCounts",
    value: function renderCounts(source, target) {
      var targetSummary = target.querySelector('.facets__summary');
      var sourceSummary = source.querySelector('.facets__summary');

      if (sourceSummary && targetSummary) {
        targetSummary.outerHTML = sourceSummary.outerHTML;
      }

      var targetHeaderElement = target.querySelector('.facets__header');
      var sourceHeaderElement = source.querySelector('.facets__header');

      if (sourceHeaderElement && targetHeaderElement) {
        targetHeaderElement.outerHTML = sourceHeaderElement.outerHTML;
      }

      var targetWrapElement = target.querySelector('.facets-wrap');
      var sourceWrapElement = source.querySelector('.facets-wrap');

      if (sourceWrapElement && targetWrapElement) {
        var isShowingMore = Boolean(target.querySelector('show-more-button .label-show-more.hidden'));

        if (isShowingMore) {
          sourceWrapElement.querySelectorAll('.facets__item.hidden').forEach(function (hiddenItem) {
            return hiddenItem.classList.replace('hidden', 'show-more-item');
          });
        }

        targetWrapElement.outerHTML = sourceWrapElement.outerHTML;
      }
    }
  }, {
    key: "renderMobileCounts",
    value: function renderMobileCounts(source, target) {
      var targetFacetsList = target.querySelector('.mobile-facets__list');
      var sourceFacetsList = source.querySelector('.mobile-facets__list');

      if (sourceFacetsList && targetFacetsList) {
        targetFacetsList.outerHTML = sourceFacetsList.outerHTML;
      }
    }
  }, {
    key: "updateURLHash",
    value: function updateURLHash(searchParams) {
      history.pushState({
        searchParams: searchParams
      }, '', "".concat(window.location.pathname).concat(searchParams && '?'.concat(searchParams)));
    }
  }, {
    key: "getSections",
    value: function getSections() {
      return [{
        section: document.getElementById('product-grid').dataset.id
      }];
    }
  }]);

  return FacetFiltersForm;
}(_wrapNativeSuper(HTMLElement));

FacetFiltersForm.filterData = [];
FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
customElements.define('facet-filters-form', FacetFiltersForm);
FacetFiltersForm.setListeners();

var PriceRange =
/*#__PURE__*/
function (_HTMLElement2) {
  _inherits(PriceRange, _HTMLElement2);

  function PriceRange() {
    var _this3;

    _classCallCheck(this, PriceRange);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(PriceRange).call(this));

    _this3.querySelectorAll('input').forEach(function (element) {
      element.addEventListener('change', _this3.onRangeChange.bind(_assertThisInitialized(_this3)));
      element.addEventListener('keydown', _this3.onKeyDown.bind(_assertThisInitialized(_this3)));
    });

    _this3.setMinAndMaxValues();

    return _this3;
  }

  _createClass(PriceRange, [{
    key: "onRangeChange",
    value: function onRangeChange(event) {
      this.adjustToValidValues(event.currentTarget);
      this.setMinAndMaxValues();
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (event.metaKey) return;
      var pattern = /[0-9]|\.|,|'| |Tab|Backspace|Enter|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Delete|Escape/;
      if (!event.key.match(pattern)) event.preventDefault();
    }
  }, {
    key: "setMinAndMaxValues",
    value: function setMinAndMaxValues() {
      var inputs = this.querySelectorAll('input');
      var minInput = inputs[0];
      var maxInput = inputs[1];
      if (maxInput.value) minInput.setAttribute('data-max', maxInput.value);
      if (minInput.value) maxInput.setAttribute('data-min', minInput.value);
      if (minInput.value === '') maxInput.setAttribute('data-min', 0);
      if (maxInput.value === '') minInput.setAttribute('data-max', maxInput.getAttribute('data-max'));
    }
  }, {
    key: "adjustToValidValues",
    value: function adjustToValidValues(input) {
      var value = Number(input.value);
      var min = Number(input.getAttribute('data-min'));
      var max = Number(input.getAttribute('data-max'));
      if (value < min) input.value = min;
      if (value > max) input.value = max;
    }
  }]);

  return PriceRange;
}(_wrapNativeSuper(HTMLElement));

customElements.define('price-range', PriceRange);

var FacetRemove =
/*#__PURE__*/
function (_HTMLElement3) {
  _inherits(FacetRemove, _HTMLElement3);

  function FacetRemove() {
    var _this4;

    _classCallCheck(this, FacetRemove);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(FacetRemove).call(this));

    var facetLink = _this4.querySelector('a');

    facetLink.setAttribute('role', 'button');
    facetLink.addEventListener('click', _this4.closeFilter.bind(_assertThisInitialized(_this4)));
    facetLink.addEventListener('keyup', function (event) {
      event.preventDefault();
      if (event.code.toUpperCase() === 'SPACE') _this4.closeFilter(event);
    });
    return _this4;
  }

  _createClass(FacetRemove, [{
    key: "closeFilter",
    value: function closeFilter(event) {
      event.preventDefault();
      var form = this.closest('facet-filters-form') || document.querySelector('facet-filters-form');
      form.onActiveFilterClick(event);
    }
  }]);

  return FacetRemove;
}(_wrapNativeSuper(HTMLElement));

customElements.define('facet-remove', FacetRemove);