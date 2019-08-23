<template>
  <div id="app">
    <router-view v-if="RouterState" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      RouterState: true,
      
    };
  },
  methods: {
    reload() {
      this.RouterState = false;
      this.$nextTick(() => {
        this.RouterState = true;
      });
    },
  },
  created() {
   
  },
  destroyed(){
   
  }
};
</script>

<style>
html,
body {
  background-color: #fff;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
