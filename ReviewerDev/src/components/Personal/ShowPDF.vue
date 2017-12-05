<template>
  <div style="height:100%">
    <!-- <iframe :src='"/static/viewer/web/viewer.html?file="+PDFUrl' width="100%" height="100%" scrolling="no"></iframe> -->
    <iframe :src='"/static/viewer/web/viewer.html?file=test.pdf"' width="100%" height="100%" scrolling="no"></iframe>
  </div>
</template>

<script>
export default {
  name: "ShowPDF",
  data() {
    return {};
  }
};
</script>

