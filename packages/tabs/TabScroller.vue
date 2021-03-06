<template lang="pug">
.mdc-tab-bar-scroller
  .mdc-tab-bar-scroller__indicator.mdc-tab-bar-scroller__indicator--back
    a.mdc-tab-bar-scroller__indicator__inner.material-icons(ref="backIndicator", href="#", aria-label="scroll back button") navigate_before
  .mdc-tab-bar-scroller__scroll-frame(ref="scrollFrame")
    mdc-tab-bar.mdc-tab-bar-scroller__scroll-frame__tabs(ref="tabBar")
      slot

  .mdc-tab-bar-scroller__indicator.mdc-tab-bar-scroller__indicator--forward
    a.mdc-tab-bar-scroller__indicator__inner.material-icons(ref="forwardIndicator" href="#", aria-label="scroll forward button") navigate_next 
</template>

<script>
import Foundation from "@material/tabs/tab-bar-scroller/foundation";
import { getCorrectPropertyName } from "@material/animation";
import MdcTabBar from "./TabBar.vue";

export default {
  name: "MdcTabScroller",
  inheritAttrs: false,
  components: { MdcTabBar },
  computed: {},

  mounted() {
    const { $el } = this;
    const { backIndicator, forwardIndicator, scrollFrame, tabBar } = this.$refs;

    const styles = getComputedStyle($el);
    const transformProp = getCorrectPropertyName(window, "transform");

    this.foundation = new Foundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),
      addClassToForwardIndicator: className => forwardIndicator.classList.add(className),
      removeClassFromForwardIndicator: className => forwardIndicator.classList.remove(className),
      addClassToBackIndicator: className => backIndicator.classList.add(className),
      removeClassFromBackIndicator: className => backIndicator.classList.remove(className),
      isRTL: () => styles.direction === "rtl",
      // Interaction handlers
      registerBackIndicatorClickHandler: (handler) => backIndicator.addEventListener("click", handler),
      deregisterBackIndicatorClickHandler: (handler) => backIndicator.removeEventListener("click", handler),
      registerForwardIndicatorClickHandler: (handler) => forwardIndicator.addEventListener("click", handler),
      deregisterForwardIndicatorClickHandler: (handler) => forwardIndicator.removeEventListener("click", handler),
      registerCapturedInteractionHandler: (evt, handler) => $el.addEventListener(evt, handler, true),
      deregisterCapturedInteractionHandler: (evt, handler) => $el.removeEventListener(evt, handler, true),
      registerWindowResizeHandler: (handler) => window.addEventListener("resize", handler),
      deregisterWindowResizeHandler: (handler) => window.removeEventListener("resize", handler),

      getNumberOfTabs: () => tabBar.tabs.length,
      getComputedWidthForTabAtIndex: index => tabBar.tabs[index].$el.computedWidth,
      getComputedLeftForTabAtIndex: index => tabBar.tabs[index].$el.computedLeft,
      getOffsetWidthForScrollFrame: () => scrollFrame.offsetWidth,
      getScrollLeftForScrollFrame: () => scrollFrame.scrollLeft,
      setScrollLeftForScrollFrame: value => {
        scrollFrame.scrollLeft = value
      },
      getOffsetWidthForTabBar: () => tabBar.$el.offsetWidth,
      setTransformStyleForTabBar: value => {
        tabBar.$el.style[transformProp] = value;
      },
      getOffsetLeftForEventTarget: target => target.offsetLeft,
      getOffsetWidthForEventTarget: target => target.offsetWidth
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  }
};
</script>