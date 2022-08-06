<template>
  <div>
    <!-- 头部区域 -->
    <header>
      <!-- 已登录 -->
      <div class="login" v-if="isShow">
        <div class="all">
          <div class="none"></div>
          <div class="top">
            <img :src="userInfo.photo" alt="" />
            <span>{{ userInfo.name }}</span>
            <button @click="$router.push('/user')">编辑资料</button>
          </div>
          <div class="main">
            <div>
              <p>0</p>
              <p>头条</p>
            </div>
            <div>
              <p>0</p>
              <p>粉丝</p>
            </div>
            <div>
              <p>0</p>
              <p>关注</p>
            </div>
            <div>
              <p>0</p>
              <p>获赞</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 未登录  -->
      <div class="logout" v-else>
        <div class="top">
          <div class="main" @click="$router.push('/login')">
            <img src="../../assets/images/mobile.png" alt="" />
            <span>登录 / 注册</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 中间共同区域 -->
    <main>
      <van-grid clickable :column-num="2">
        <van-grid-item icon="star-o" text="收藏" to="/" />
        <van-grid-item icon="clock-o" text="历史" url="/vant/mobile.html" />
      </van-grid>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </main>

    <!-- 底部退出区域 -->
    <footer>
      <button v-if="isShow" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
import { getUserInfoApi } from '@/api'
export default {
  name: 'My',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    isShow() {
      // 根据token
      return !!this.$store.state.tokenObj.token
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    // 退出按钮
    logout() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '确定要退出吗？'
        })
        .then(() => {
          // on confirm
          // 清除token 传入空对象{}
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        if (this.$store.state.tokenObj.token) {
          const { data } = await getUserInfoApi()
          // console.log(data)
          this.userInfo = data.data
        }
      } catch (error) {
        this.$toast.fail('获取用户信息失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.logout {
  .top {
    background: url('../../assets/images/banner.png') no-repeat 50% / cover;
    .main {
      width: 100%;
      height: 5.33333rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 1.76rem;
        height: 1.76rem;
      }
      span {
        color: #fff;
        font-size: 0.4rem;
        margin-top: 0.26667rem;
      }
    }
  }
}

main {
  :deep(.van-icon-star-o) {
    color: red;
  }
  :deep(.van-icon-clock-o) {
    color: orange;
  }
}

.login {
  width: 100%;
  height: 5.33333rem;
  background: url('../../assets/images/banner.png') no-repeat 50% / cover;
  .all {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .none,
    .top,
    .main {
      flex: 1;
      display: flex;
    }
    .top {
      align-items: center;
      width: 95%;
      img,
      button {
        flex: 1;
      }
      span {
        flex: 3;
        color: #fff;
        font-size: 0.4rem;
        margin-left: 50px;
      }
      button {
        border-radius: 26.64rem;
        width: 1.6rem;
        height: 0.42667rem;
        font-size: 0.26667rem;
        border: #fff;
        padding: 0 6px;
      }
      img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        margin-left: 30px;
      }
    }
    .main {
      justify-content: space-around;
      align-items: center;
      p {
        font-size: 15px;
        color: #fff;
        text-align: center;
        margin: 5px 0;
      }
    }
  }
}

footer {
  button {
    width: 100%;
    margin-top: 10px;
    background-color: #fff;
    border: #fff;
    color: red;
    font-size: 30px;
  }
}
</style>
