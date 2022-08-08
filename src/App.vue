<template>
  <div>
    <transition name="bounce" mode="out-in">
      <router-view></router-view>
    </transition>

    <!-- <h1>{{ $store.state.num }}</h1>
    <button @click="btn">点击</button> -->
  </div>
</template>

<script>
export default {
  // created() {
  //   console.log(this)
  // },
  // methods: {
  //   btn() {
  //     console.log(this)
  //     // 调用vuex里的commit方法（'方法名',payLoad接受的实参）
  //     this.$store.commit('SET_NUM', 2)
  //   }
  // }
}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.4s;
}
.bounce-leave-active {
  animation: bounce-in 0.4s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
