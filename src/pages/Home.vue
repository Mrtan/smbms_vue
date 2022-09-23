<template>
  <Header />
  <section class="publicMian">
    <div class="left">
      <Side />
    </div>
    <div class="right">
      <Welcome v-if="isHome"/>
      <router-view v-else></router-view>
    </div>
  </section>
  <Footer />
</template>

<script>
import Header from '../components/frame/Header.vue';
import Footer from '../components/frame/Footer.vue';
import Side from '../components/frame/Side.vue';
import Welcome from '../components/frame/Welcome.vue';
export default {
    name: "Home",
    components: { Header, Footer, Side, Welcome },
    data() {
      return {
        isHome: true,
        user: {},
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => vm.isHome = (to.path == '/'));
    },
    beforeRouteUpdate(to, from) {
      this.isHome = (to.path == '/');
    },
}
</script>