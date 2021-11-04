<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginPanel from './cpns/login-panel.vue';
export default defineComponent({
  components: { LoginPanel },
  setup() {
    return {};
  }
});
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/bg.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
