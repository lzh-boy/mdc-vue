<template lang="pug">
aside.mdc-dialog(role="alertdialog")
  .mdc-dialog__surface(ref="surface")
    header.mdc-dialog__header(v-if="title")
      h2.mdc-dialog__header__title {{ title }}
    section.mdc-dialog__body(v-if="hasContent", :class="cssBodyClasses")
      slot
    footer.mdc-dialog__footer
      mdc-button.mdc-dialog__footer__button.mdc-dialog__footer__button--cancel(ref="cancel") {{ cancelText }}
      mdc-button.mdc-dialog__footer__button.mdc-dialog__footer__button--accept(ref="accept", raised) {{ acceptText }}
  .mdc-dialog__backdrop
</template>

<script>
import Foundation from "@material/dialog/foundation";
import { createFocusTrapInstance } from "@material/dialog/util";

import { getCorrectEventName } from "@material/animation";
const transitionEnd = getCorrectEventName(window, "transitionend");

export default {
  name: "MdcDialog",
  props: {
    title: String,
    scrollable: Boolean,
    acceptText: {
      type: String,
      default: "Ok"
    },
    cancelText: {
      type: String,
      default: "Cancel"
    }
  },
  computed: {
    cssBodyClasses() {
      return this.scrollable && "mdc-dialog__body--scrollable";
    },
    hasContent() {
      return !!this.$slots.default;
    }
  },
  mounted() {
    const { $el } = this;
    const { cancel, accept, surface } = this.$refs;
    const focusTrap = createFocusTrapInstance(surface, accept);

    this.foundation = new Foundation({
      addClass: className => $el.classList.add(className),
      removeClass: className => $el.classList.remove(className),
      addBodyClass: className => document.body.classList.add(className),
      removeBodyClass: className => document.body.classList.remove(className),
      eventTargetHasClass: (target, className) => target.classList.contains(className),

      registerInteractionHandler: (evt, handler) => $el.addEventListener(evt, handler),
      deregisterInteractionHandler: (evt, handler) => $el.removeEventListener(evt, handler),
      registerSurfaceInteractionHandler: (evt, handler) => surface.addEventListener(evt, handler),
      deregisterSurfaceInteractionHandler: (evt, handler) => surface.removeEventListener(evt, handler),
      registerDocumentKeydownHandler: handler => document.addEventListener("keydown", handler),
      deregisterDocumentKeydownHandler: handler => document.removeEventListener("keydown", handler),
      registerTransitionEndHandler: handler => surface.addEventListener(transitionEnd, handler),
      deregisterTransitionEndHandler: handler => surface.removeEventListener(transitionEnd, handler),

      notifyAccept: () => {
        this.$emit("action", "accept");
        this.$emit("accept");
      },
      notifyCancel: () => {
        this.$emit("action", "cancel");
        this.$emit("cancel");
      },
      trapFocusOnSurface: () => focusTrap.activate(),
      untrapFocusOnSurface: () => focusTrap.deactivate(),
      isDialog: el => el === surface,
      layoutFooterRipples: () => {
        accept._ripple.layout();
        cancel._ripple.layout();
      }
    });
    this.foundation.init();
  },
  beforeDestroy() {
    this.foundation.destroy();
  },
  methods: {
    open() {
      if(!this.foundation.isOpen()) {
        this.foundation.open();
        return true;
      }
      return false;
    },
    close() {
      if(this.foundation.isOpen()) {
        this.foundation.close();
        return true;
      }
      return false;
    }
  }
};
</script>