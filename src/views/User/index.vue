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
    <!-- 头像区域 -->
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
    <!-- 昵称区域 -->
    <van-cell title="昵称" is-link @click="showNickNamePopup">
      <template>{{ userInfo.name }}</template>
    </van-cell>
    <van-popup
      v-model="showNickName"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <van-nav-bar
        title="更新昵称"
        left-text="取消"
        right-text="保存"
        left-arrow
        @click-left="onClickLeftNickName"
        @click-right="onClickRightNickName"
      />
      <van-field
        v-model="nickName"
        rows="2"
        autosize
        type="textarea"
        maxlength="11"
        placeholder="请输入昵称"
        show-word-limit
      />
    </van-popup>

    <!-- 性别区域 -->
    <van-cell title="性别" is-link @click="showPopupGender">
      <template>{{ userInfo.gender ? '女' : '男' }}</template>
    </van-cell>
    <van-popup
      v-model="showGender"
      position="bottom"
      :style="{ height: '50%', width: '100%' }"
    >
      <van-picker
        title="更新性别"
        show-toolbar
        :default-index="userInfo.gender"
        :columns="gender"
        @confirm="onClickRightGender"
        @cancel="onClickLeftGender"
      />
    </van-popup>

    <!-- 生日区域 -->
    <van-cell title="生日" is-link @click="showPopupBirthday">
      <template>{{ userInfo.birthday }}</template>
    </van-cell>
    <van-popup
      v-model="showBirthday"
      position="bottom"
      :style="{ height: '50%', width: '100%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onBirthday"
        @cancel="cancelBirthday"
      />
    </van-popup>

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
import { getUserInfoApi, getUserProfile } from '@/api'
import AvatorPopup from './components/AvatorPopup.vue'
import { fileReaderByBase64 } from '@/utils/fileReader'
import dayjs from 'dayjs'
export default {
  name: 'User',
  data() {
    return {
      userInfo: {},
      isShowPhoto: false,
      photo: '',
      showNickName: false,
      nickName: '',
      showGender: false,
      gender: ['男', '女'],
      showBirthday: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2100, 11, 31),
      currentDate: new Date(),
      birthday: ''
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
        this.nickName = this.userInfo.name
        this.birthday = data.data.birthday.split('-').join(',')
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
    },
    // 展示昵称弹出层
    showNickNamePopup() {
      this.showNickName = true
    },
    // 取消关闭弹层
    onClickLeftNickName() {
      this.showNickName = false
    },
    // 修改昵称
    async onClickRightNickName() {
      try {
        await getUserProfile({ name: this.nickName })
        this.getUserInfo()
        this.$toast.success('修改成功')
        this.showNickName = false
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    },
    // 展示性别弹出层
    showPopupGender() {
      this.showGender = true
    },
    // 取消关闭弹层
    onClickLeftGender() {
      this.showGender = false
    },
    // 修改性别
    async onClickRightGender(val) {
      if (val === '男') {
        val = 0
      } else {
        val = 1
      }
      try {
        await getUserProfile({ gender: val })
        this.getUserInfo()
        this.$toast.success('修改成功')
        this.showGender = false
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    },
    // 展示生日弹出层
    showPopupBirthday() {
      this.showBirthday = true
      this.currentDate = new Date(this.birthday)
    },
    // 关闭生日弹出层
    cancelBirthday() {
      this.showBirthday = false
    },
    // 修改生日
    async onBirthday(val) {
      try {
        await getUserProfile({ birthday: dayjs(val).format('YYYY-MM-DD') })
        this.getUserInfo()
        this.$toast.success('修改成功')
        this.showBirthday = false
      } catch (error) {
        this.$toast.fail('修改失败')
      }
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
