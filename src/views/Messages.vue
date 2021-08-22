<template>
  <div>
    <div class="chat">
      <top-bar back :user="user">
        {{ userChat }}
      </top-bar>

      <div class="messages spacing">
        <div
          class="spaceMessages"
          v-for="message in $store.state.messages.list"
          :key="message._id"
        >
          <b v-if="userChat === message.user.name || userChat === ''"
            >{{ message.user.name }} :
          </b>
          <b v-if="userChat !== message.user.name && userChat !== ''">Tú : </b
          >{{ message.message }}
        </div>
      </div>
    </div>
    <div class="composer">
      <input type="text" v-model="newMessage" />
      <button @click="sendMessage()">></button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TopBar from "@/components/TopBar.vue";
// import ChatList from '@/components/ChatList.vue';

export default {
  name: "Chat",
  components: {
    TopBar,
    // ChatList,
  },
  data: () => ({
    chatId: null,
    newMessage: "",
    userChat: "",
    isLoading: false,
    user: "",
  }),
  computed: {
    chat() {
      let chat = [];
      if (this.chatId !== null) {
        chat = this.$store.state.chat.list[this.chatId];
      }

      return chat;
    },
  },
  methods: {
    sendMessage() {
      // console.log(this.$store.state.user);
      this.$store.dispatch("messages/sendMessage", {
        message: this.newMessage,
        chat: this.$route.params.id,
        user: this.$store.state.user.selected,
        // user: {
        //   id: 'aaaaaaa',
        //   name: this.$store.state.user.selected.name
        // }
      });
      this.newMessage = "";
    },
    renameChat(userChatName) {
      if (userChatName.length === 1) {
        this.userChat = userChatName[0].name;
      } else if (userChatName.length > 1) {
        let grupo = "";
        const users = this.userChat.map((user) => {
          grupo = `${grupo}, ${user.name}`;
          return grupo;
        });
        this.userChat = `Grupo : ${users}`;
      }
    },
  },
  created() {
    this.$store.dispatch("messages/getMessages", this.$route.params.id);
    this.renameChat(this.$route.params.userWichID || []);
    setTimeout(() => {
      this.isLoading = !this.isLoading;
    }, 1000);
    this.user = this.$route.params.userLogin[0].name || "";
  },
};
</script>

<style scoped>
.messages {
  margin-bottom: 32px;
  padding: 0px 10%;
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.spaceMessages {
  word-wrap: break-word;
  height: auto;
  margin: 10px 0px;
  background: rgb(183, 208, 255);
  border-radius: 5px;
  padding: 5px;
}

.composer {
  background-color: #fff;
  display: flex;
  height: 32px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  justify-content: center;
}
.composer input {
  width: 90%;
}
.composer button {
  width: 10%;
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
.spacing {
  margin-top: 50px;
}
@media (min-width: 1000px) {
  .messages {
    padding: 0px 30%;
  }
  .composer input {
    width: 50%;
  }
  .composer button {
    width: 10%;
  }
}
</style>
