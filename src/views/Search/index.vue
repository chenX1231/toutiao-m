<template>
  <div>
    <!-- 搜索框 -->
    <!-- form的作用。在ios系统上会显示搜索按钮 兼容-->
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
        @cancel="$router.back()"
      />
    </form>

    <!-- 搜索历史、搜索建议、搜索列表 -->
    <!-- <search-history></search-history>
    <search-suggestion></search-suggestion>
    <search-result></search-result> -->
    <!-- 动态组件进行显示 -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'

export default {
  name: 'Search',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data() {
    return {
      keywords: '',
      // 记录用户是否按搜索了
      isShowSearchResult: false,
      keywordsArr:
        JSON.parse(localStorage.getItem('TOUTIAO_SEARCH_RESULT')) || []
    }
  },
  computed: {
    componentName() {
      // 判断输入框是否有内容
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      // 判断是否按搜索
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      // 建议
      return 'SearchSuggestion'
    }
  },
  methods: {
    onSearch() {
      // 用户按了搜索
      this.isShowSearchResult = true
      // 按了回车将搜索关键词存入本地
      // console.log(this.keywords)
      // 找到有无相同的keywords，如果有返回true
      const flag = this.keywordsArr.some((ele) => ele === this.keywords)
      if (flag) {
        // 找到对应的索引号
        const index = this.keywordsArr.indexOf(this.keywords)
        // console.log(index)
        this.keywordsArr.splice(index, 1)
      }
      this.keywordsArr.unshift(this.keywords)
      // 存入本地
      localStorage.setItem(
        'TOUTIAO_SEARCH_RESULT',
        JSON.stringify(this.keywordsArr)
      )
    },
    onSearchFocus() {
      // 用户聚焦输入框,获取焦点
      // 如果keywords为 '' 显示搜索历史
      // 如果keywords有内容， 显示搜索建议
      this.isShowSearchResult = false
    }
  }
}
</script>

<style scpoed lang="less">
.search {
  // 属性选择器
  [role='button'] {
    color: #fff;
  }
}
</style>
