"use strict";

var SCROLL_ANIMATION_TRIGGER_CLASSNAME = 'scroll-trigger';
var SCROLL_ANIMATION_OFFSCREEN_CLASSNAME = 'scroll-trigger--offscreen';
var SCROLL_ZOOM_IN_TRIGGER_CLASSNAME = 'animate--zoom-in';
var SCROLL_ANIMATION_CANCEL_CLASSNAME = 'scroll-trigger--cancel'; // Scroll in animation logic

function onIntersection(elements, observer) {
  elements.forEach(function (element, index) {
    if (element.isIntersecting) {
      var elementTarget = element.target;

      if (elementTarget.classList.contains(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME)) {
        elementTarget.classList.remove(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
        if (elementTarget.hasAttribute('data-cascade')) elementTarget.setAttribute('style', "--animation-order: ".concat(index, ";"));
      }

      observer.unobserve(elementTarget);
    } else {
      element.target.classList.add(SCROLL_ANIMATION_OFFSCREEN_CLASSNAME);
      element.target.classList.remove(SCROLL_ANIMATION_CANCEL_CLASSNAME);
    }
  });
}

function initializeScrollAnimationTrigger() {
  var rootEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
  var isDesignModeEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var animationTriggerElements = Array.from(rootEl.getElementsByClassName(SCROLL_ANIMATION_TRIGGER_CLASSNAME));
  if (animationTriggerElements.length === 0) return;

  if (isDesignModeEvent) {
    animationTriggerElements.forEach(function (element) {
      element.classList.add('scroll-trigger--design-mode');
    });
    return;
  }

  var observer = new IntersectionObserver(onIntersection, {
    rootMargin: '0px 0px -50px 0px'
  });
  animationTriggerElements.forEach(function (element) {
    return observer.observe(element);
  });
} // Zoom in animation logic


function initializeScrollZoomAnimationTrigger() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var animationTriggerElements = Array.from(document.getElementsByClassName(SCROLL_ZOOM_IN_TRIGGER_CLASSNAME));
  if (animationTriggerElements.length === 0) return;
  var scaleAmount = 0.2 / 100;
  animationTriggerElements.forEach(function (element) {
    var elementIsVisible = false;
    var observer = new IntersectionObserver(function (elements) {
      elements.forEach(function (entry) {
        elementIsVisible = entry.isIntersecting;
      });
    });
    observer.observe(element);
    element.style.setProperty('--zoom-in-ratio', 1 + scaleAmount * percentageSeen(element));
    window.addEventListener('scroll', throttle(function () {
      if (!elementIsVisible) return;
      element.style.setProperty('--zoom-in-ratio', 1 + scaleAmount * percentageSeen(element));
    }), {
      passive: true
    });
  });
}

function percentageSeen(element) {
  var viewportHeight = window.innerHeight;
  var scrollY = window.scrollY;
  var elementPositionY = element.getBoundingClientRect().top + scrollY;
  var elementHeight = element.offsetHeight;

  if (elementPositionY > scrollY + viewportHeight) {
    // If we haven't reached the image yet
    return 0;
  } else if (elementPositionY + elementHeight < scrollY) {
    // If we've completely scrolled past the image
    return 100;
  } // When the image is in the viewport


  var distance = scrollY + viewportHeight - elementPositionY;
  var percentage = distance / ((viewportHeight + elementHeight) / 100);
  return Math.round(percentage);
}

window.addEventListener('DOMContentLoaded', function () {
  initializeScrollAnimationTrigger();
  initializeScrollZoomAnimationTrigger();
});

if (Shopify.designMode) {
  document.addEventListener('shopify:section:load', function (event) {
    return initializeScrollAnimationTrigger(event.target, true);
  });
  document.addEventListener('shopify:section:reorder', function () {
    return initializeScrollAnimationTrigger(document, true);
  });
}