<template>
  <div>
    <Mikepad class="sizeLoader center" :size="140" v-if="!isLoading" />
    <div class="chat-list spacing" v-if="isLoading">
      <h3>Chats</h3>
      <chat-list-item
        v-for="chat in $store.state.chat.list"
        :user="user"
        :key="chat._id"
        :id="chat._id"
        :users="chat.users"
        :message="chat.message"
      />
    </div>
  </div>
</template>

<script>
import Mikepad from 'vue-loading-spinner/src/components/Mikepad.vue';
import ChatListItem from '@/components/ChatListItem.vue';

export default {
  name: 'ChatList',
  components: {
    ChatListItem,
    Mikepad,
  },
  data() {
    return {
      isLoading: false,
      user: '',
    };
  },
  created() {
    this.$store.dispatch('chat/getChats', this.$route.params.id);
    this.isLoading = false;
    setTimeout(() => {
      this.isLoading = !this.isLoading;
    }, 1000);
    this.user = this.$route.params.user;
  },
};
</script>

<style scoped>
h3 {
  text-align: left;
  padding-left: 16px;
  margin-top: 50px;
}
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
