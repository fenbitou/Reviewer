<template>
  <div style="height:100%">
    <iframe :src='"/static/viewer/web/viewer.html?file=./testpdf/"+ getParams() +".pdf"' width="100%" height="100%" scrolling="no"></iframe>
  </div>
</template>

<script>
import store from "../vuex/store.js";

export default {
  name: "ShowPDF",
  data() {
    return {
    };
  },

  methods: {
    getParams () {
      console.log('showshowshow' + store.getters.temp);
      return store.getters.temp;
    }
  }
};
</script>

