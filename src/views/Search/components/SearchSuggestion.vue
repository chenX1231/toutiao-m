<template>
  <div>
    <van-cell
      v-for="(item, index) in lightHeightSuggestion"
      :key="index"
      icon="search"
    >
      <!-- 给建议列表对应的keywords高亮 -->
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionApi } from '@/api'
// lodash 库
import { debounce } from 'lodash'

// 1.动态正则  new RegExp(变量,'ig')
// 2.字面量正则 /asasas/ig

// 字符串的replace
// 第一个参数可以是‘正则’或者‘字符串’
// 第二个参数可以是‘函数’或‘字符串’，函数的返回值是要替换的字符串
// match：正则匹配上的字符
/*  'Auglar'.replace(/a/ig,function (match) { return
`<span>${match}</span>`
}) */
//    '<span>A</span>ugl<span>a</span>r'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestion: []
    }
  },
  computed: {
    // 让建议列表对应的关键词高亮
    lightHeightSuggestion() {
      // 设置正则匹配关键词
      const reg = new RegExp(this.keywords, 'ig')
      // 遍历每一项
      return this.suggestion.map((ele) => {
        return ele.replace(reg, (match) => {
          return `<span style="color:red">${match}</span>`
        })
      })
    }
  },
  watch: {
    // 监听keywords
    keywords: {
      // 一进入就触发
      immediate: true,
      handler() {
        this.getSearchSuggestion()
      }
    }
  },
  methods: {
    // 获取搜索建议
    // 防抖 1.设置延迟定时器  2.清除上一次
    // timer可以直接挂载在vue上
    // 完整写法
    getSearchSuggestion: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionApi(this.keywords)
        // console.log(data)
        // 等价于 this.suggestion = data.data.options.filter((str) => Boolean(str))
        // 过滤掉后台传过来的空数组里的null（后台报错问题）
        this.suggestion = data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('获取失败')
      }
    }, 500)
  }
}
</script>

<style></style>
