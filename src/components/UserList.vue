<template>
  <div class="chat-list">
    <h3>Usuarios</h3>

    <user-list-item
      class="selectUser"
      v-for="user in $store.state.user.list"
      :key="user._id"
      :id="user._id"
      :name="user.name"
    />
  </div>
</template>

<script>
import UserListItem from '@/components/UserListItem.vue';

export default {
  name: 'ChatList',
  components: {
    UserListItem,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  created() {
    this.$store.dispatch('user/getUsers');
  },
};
</script>

<style scoped>
h3 {
  text-align: left;
  padding-left: 16px;
}
.selectUser {
  cursor: pointer;
}
.selectUser:hover {
  background-color: #f1f1f1;
}
.chat-list {
  margin-top: 50px;
}
</style>
