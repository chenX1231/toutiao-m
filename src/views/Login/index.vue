<template>
  <div>
    <!-- 头部标签 -->
    <van-nav-bar title="登录" />
    <!-- 表单区域 -->
    <van-form @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
      </van-field>
      <div style="margin: 0.43rem">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rules'
import { login } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules
    }
  },
  methods: {
    async onSubmit() {
      // 如果表单校验不通过。不会触发这个方法

      // res 是axios封装的对象，他把服务器端返回的数据放在res.data里面
      // res 是Promise的resolve的值
      // e 是Promise的reject的结果，axios封装的e，e.response.data是服务器端返回的数据，e.response.status是服务端返回的状态码
      try {
        const res = await login(this.mobile, this.code)
        console.log(res)
        this.$toast.success('登录成功')
      } catch (e) {
        // console.log(e)
        const status = e.response.status
        let message = '请重新刷新'
        if (status === 400) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #4493f8;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
.van-button--info {
  background-color: #74b2fa;
}
.toutiao {
  font-size: 40px;
}

:deep(.form) {
  .van-field__label {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
}
</style>
