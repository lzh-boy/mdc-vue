<template lang="pug">
demo-template
  h1 MdcButton
  p MdcButton is a simple button wrapper for the material.io button

  template(slot="usage")
    demo-code(lang="markup", code=`
<mdc-button>...text</mdc-button>`)

  template(slot="props")
    tr
      td icon
      td String
      td ""
      td Add an icon according to the material-icons icon id
    tr
      td link
      td String
      td ""
      td Creates a link button using an anchor tag
    tr
      td raised
      td Boolean
      td false
      td Setting the button to be elevated upon the surface
    tr
      td unelevated
      td Boolean
      td false
      td Setting the button to be flush upon the surface
    tr
      td stroked
      td Boolean
      td false
      td Setting the button to be flush upon the surface and has a visible border
    tr
      td dense
      td Boolean
      td false
      td Compressing the buttons text to be slightly smaller
    tr
      td compact
      td Boolean
      td false
      td Reduces the horizontal padding on the button
</template>

<script>
import DemoTemplate from "../DemoTemplate.vue";

export default {
  name: "DemoButton",
  components: { DemoTemplate }
};
</script>
