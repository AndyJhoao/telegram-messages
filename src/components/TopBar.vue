<template>
  <div>
    <div class="topbar">
      <a class="back" v-if="back" @click="$router.back()">
        ⬅ Volver
      </a>
      <span class="title">
        <slot />
      </span>
      <span class="userProps">
        {{ user }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    back: {
      type: Boolean,
      default: false,
    },
    user: {
      type: String,
      default: '',
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topbar {
  display: flex;
  align-items: center;
  background-color: #638bff;
  justify-content: space-between;
  color: #fff;
  height: 42px;
  text-transform: uppercase;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
.topbar > * {
  padding-left: 16px;
}

.topbar-spacing {
  height: 42px;
  width: 100%;
}
.back {
  cursor: pointer;
}
.userProps {
  margin-right: 16px;
}
</style>
