"use strict";

function hideProductModal() {
  var productModal = document.querySelectorAll('product-modal[open]');
  productModal && productModal.forEach(function (modal) {
    return modal.hide();
  });
}

document.addEventListener('shopify:block:select', function (event) {
  hideProductModal();
  var blockSelectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockSelectedIsSlide) return;
  var parentSlideshowComponent = event.target.closest('slideshow-component');
  parentSlideshowComponent.pause();
  setTimeout(function () {
    parentSlideshowComponent.slider.scrollTo({
      left: event.target.offsetLeft
    });
  }, 200);
});
document.addEventListener('shopify:block:deselect', function (event) {
  var blockDeselectedIsSlide = event.target.classList.contains('slideshow__slide');
  if (!blockDeselectedIsSlide) return;
  var parentSlideshowComponent = event.target.closest('slideshow-component');
  if (parentSlideshowComponent.autoplayButtonIsSetToPlay) parentSlideshowComponent.play();
});
document.addEventListener('shopify:section:load', function () {
  hideProductModal();
  var zoomOnHoverScript = document.querySelector('[id^=EnableZoomOnHover]');
  if (!zoomOnHoverScript) return;

  if (zoomOnHoverScript) {
    var newScriptTag = document.createElement('script');
    newScriptTag.src = zoomOnHoverScript.src;
    zoomOnHoverScript.parentNode.replaceChild(newScriptTag, zoomOnHoverScript);
  }
});
document.addEventListener('shopify:section:unload', function (event) {
  document.querySelectorAll("[data-section=\"".concat(event.detail.sectionId, "\"]")).forEach(function (element) {
    element.remove();
    document.body.classList.remove('overflow-hidden');
  });
});
document.addEventListener('shopify:section:reorder', function () {
  return hideProductModal();
});
document.addEventListener('shopify:section:select', function () {
  return hideProductModal();
});
document.addEventListener('shopify:section:deselect', function () {
  return hideProductModal();
});
document.addEventListener('shopify:inspector:activate', function () {
  return hideProductModal();
});
document.addEventListener('shopify:inspector:deactivate', function () {
  return hideProductModal();
});