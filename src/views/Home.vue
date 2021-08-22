<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <top-bar>App de Mensajes</top-bar>
    <Mikepad class="sizeLoader center" :size="140" v-if="!isLoading" />
    <user-list v-if="isLoading" />
    <!-- <new-chat /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Mikepad from 'vue-loading-spinner/src/components/Mikepad.vue';
import TopBar from '@/components/TopBar.vue';
import UserList from '@/components/UserList.vue';
// import ChatList from '@/components/ChatList.vue';

export default {
  name: 'home',
  components: {
    TopBar,
    UserList,
    Mikepad,
    // ChatList,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    this.isLoading = false;
    setTimeout(() => {
      this.isLoading = !this.isLoading;
    }, 1000);
  },
};
</script>
<style scoped>
.center {
  display: flex;
  width: 100%;
  height: 400px;
  text-align: center;
}
.sizeLoader {
  margin: 0 auto;
}
</style>
