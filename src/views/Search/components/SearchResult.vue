<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        :title="item.title"
        v-for="item in searchResultList"
        :key="item.art_id"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultApi } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchResultList: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  created() {
    this.getSearchResult()
  },
  methods: {
    // 获取搜索结果
    async getSearchResult() {
      try {
        const { data } = await getSearchResultApi(this.keywords)
        this.searchResultList = data.data.results
        // console.log(data)
      } catch (error) {
        this.$toast.fail('加载失败')
      }
    },
    // 加载更多
    async onLoad() {
      // 异步更新数据
      // 页数增加
      this.page++
      try {
        // 重新获取数据
        const { data } = await getSearchResultApi(this.keywords, this.page)
        // 解构拼接上去数据列表
        this.searchResultList = [...this.searchResultList, ...data.data.results]
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.searchResultList.length >= data.data.total_count) {
          this.finished = true
        }
      } catch (error) {
        this.$toast.fail('加载失败')
      }
    }
  }
}
</script>

<style></style>
