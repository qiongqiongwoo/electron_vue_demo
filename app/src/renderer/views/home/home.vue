<template>
  <section class="home-section">
    <section class="web-section">
      <header-bar></header-bar>
      <webview id="my-webview" :src="src" class="content-view" allowpopups plugins></webview>
    </section>
  </section>
</template>
<script>
  import { webViewData } from './homeData.js'
  export default { ...webViewData }
</script>
<style>
  .home-section {
    height: 100%;
  }
  .web-section, .content-views {
    height: 100%;
  }
  .content-view {
    height: calc(100% - 30px);
  }
</style>