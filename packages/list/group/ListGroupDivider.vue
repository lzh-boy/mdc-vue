<template lang="pug">
hr.mdc-list-divider(:class="cssClasses")
</template>

<script>
export default {
  name: "MdcListGroupDivider",
  props: {
    inset: Boolean
  },
  computed: {
    cssClasses() {
      return {
        "mdc-list-divider--inset": this.inset
      };
    }
  }
};
</script>