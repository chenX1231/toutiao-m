<template>
  <div>
    <!-- 头部栏 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 个人信息区域 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image width="0.8rem" height="0.8rem" :src="userInfo.photo" round />
      <!-- hidden:隐藏属性 -->
      <!-- accept:限制文件类型，后缀名，多个用,分隔 -->
      <input
        type="file"
        hidden
        accept=".png,.jpg"
        ref="file"
        @change="changePhoto"
      />
    </van-cell>
    <!-- 展示图片弹出层 -->
    <van-popup
      class="avator-popup"
      v-model="isShowPhoto"
      :style="{ height: '100%', width: '100%' }"
      position="bottom"
      closeable
    >
      <!-- 弹层内容 -->
      <avator-popup
        :photo="photo"
        v-if="isShowPhoto"
        @update-avator="userInfo.photo = $event"
      ></avator-popup>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfoApi } from '@/api'
import AvatorPopup from './components/AvatorPopup.vue'
import { fileReaderByBase64 } from '@/utils/fileReader'
export default {
  name: 'User',
  data() {
    return {
      userInfo: {},
      isShowPhoto: false,
      photo: ''
    }
  },
  components: {
    AvatorPopup
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      try {
        const { data } = await getUserInfoApi()
        this.userInfo = data.data
        // console.log(data)
      } catch (error) {
        this.$toast.fail('获取信息失败，请重新刷新')
      }
    },
    // 用户改变图片
    async changePhoto(e) {
      // 获取用户选择的图片的对象文件
      // e.target 触发事件的元素
      // HTMLInputeElement.files 伪数组，存储用户选择的所有文件对象

      // console.dir(e.target.files)

      const file = e.target.files[0]

      // 把file文件对象处理成img标签可识别的url
      // URL.createObjectURL(file对象)

      // const url = window.URL.createObjectURL(file)
      // console.log(e.target.value)

      // console.log(url)

      // const fr = new FileReader()
      // fr.readAsDataURL(file)

      // fr.onload = (e) => {
      //   this.photo = e.target.result

      //   // 清除value,防止多次重复选择不会显示弹框
      //   e.target.value = ''
      // }

      const url = await fileReaderByBase64(file)
      this.photo = url

      // 清除value,防止多次重复选择不会显示弹框
      e.target.value = ''

      this.isShowPhoto = true
    }
  }
}
</script>

<style scoped lang="less">
:deep(.navbar) {
  background-color: #3296fa;
  .van-nav-bar__title,
  .van-icon-arrow-left {
    color: #fff;
  }
}
.avator-popup {
  background-color: #000;
}
</style>
