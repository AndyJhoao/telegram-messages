<template>
  <div>
    <top-bar back :user="user">App de Mensajes</top-bar>
    <router-link
      :to="{ name: 'messages', params: { id, userWichID, userLogin } }"
      tag="div"
      class="chat-list-item"
    >
      <strong v-for="user in userWichID" :key="user._id">{{ user.name }}</strong>
      <!-- <strong>{{ users[0].name }}</strong>
    <strong>{{ users[1].name }}</strong> -->
      <div>{{ message }}</div>
    </router-link>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue';

export default {
  name: 'ChatListItem',
  components: { TopBar },
  props: {
    id: {
      type: String,
      default: '',
    },
    users: {
      type: Array,
    },
    message: {
      type: String,
      default: '',
    },
    user: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      userWichID: {},
      userLogin: '',
    };
  },
  created() {
    this.getUserChat();
  },
  methods: {
    getUserChat() {
      this.userWichID = this.users.filter(user => user._id !== this.$route.params.id);
      this.userLogin = this.users.filter(user => user._id === this.$route.params.id);
    },
  },
};
</script>

<style scope>
.chat-list-item {
  text-align: left;
  padding: 8px 16px;
  border-top: 1px solid #d4d4d4;
}
.chat-list-item:hover,
.chat-list-item:active {
  background-color: #f1f1f1;
}
</style>
