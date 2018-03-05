<template>
  <div style="height:100%">
    <iframe :src='"/static/viewer/web/viewer.html?file=./testpdf/"+ pdfURL +".pdf"' width="100%" height="100%" scrolling="no"></iframe>
  </div>
</template>

<script>
import store from "../vuex/store.js";

export default {
  name: "ShowPDF",
  data() {
    return {
      pdfURL : store.getters.temp
    };
  }
};
</script>

