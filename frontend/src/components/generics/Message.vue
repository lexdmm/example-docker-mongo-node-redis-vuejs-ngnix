<template lang="html">
  <div>
    <transition name="fade">
      <sui-message
        v-if="visible"        
        dismissable
        @dismiss="showAlertMessage"
        color="gray"
      >        
        <sui-message-header>{{contentTitle}}</sui-message-header>
        <p>{{contentMessage}}</p>
      </sui-message>
    </transition>    
  </div>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return { 
        visible: false,
        contentTitle: "",
        contentMessage: ""
    };
  },
  methods: {
    showAlertMessage(message, title) {
      this.contentTitle = title;
      this.contentMessage = message;

      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 7000);
    },
  },
};
</script>

<style media="screen" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>