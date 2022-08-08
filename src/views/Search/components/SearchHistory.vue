<template>
  <div>
    <van-cell title="搜索历史">
      <van-icon name="delete-o" @click="del" v-if="!isShow" />
      <div v-else>
        <span style="margin-right: 10px" @click="delAll">全部删除</span>
        <span @click="isShow = !isShow">完成</span>
      </div>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in SearchHistoryList"
      :key="index"
      @click="searchHistory(item)"
    >
      <van-icon name="close" v-show="isShow" @click="delOne(index)" />
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SearchHistoryList: JSON.parse(
        localStorage.getItem('TOUTIAO_SEARCH_RESULT')
      ),
      isShow: false
    }
  },
  methods: {
    // 删除按钮
    del() {
      this.isShow = true
    },
    // 删除单个
    delOne(i) {
      // 根据索引号进行删除一个
      this.SearchHistoryList.splice(i, 1)
      // 重新进行本地存储
      localStorage.setItem(
        'TOUTIAO_SEARCH_RESULT',
        JSON.stringify(this.SearchHistoryList)
      )
    },
    // 全部删除
    delAll() {
      localStorage.removeItem('TOUTIAO_SEARCH_RESULT')
      this.SearchHistoryList = []
    },
    // 点击历史记录进行对应搜索
    searchHistory(val) {
      // console.log(val)
      // 判断是否小叉号显示。如果显示则不触发搜索事件
      if (this.isShow) {
        return
      }
      this.$parent.keywords = val
      this.$parent.onSearch()
    }
  }
}
</script>

<style></style>
