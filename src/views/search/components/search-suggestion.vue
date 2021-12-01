<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: [], // 联想建议数据列表
      htmlStr: 'Hello <span style="color: red">World</span>'
    }
  },
  watch: {
    searchText: {
      // 当searchText发生改变的时候会调用handler函数
      // handler函数名称是固定的

      // debounce防抖处理
      handler: debounce(function(value) {
        this.loadSearchSuggestions(value)
      }, 200),
      // handler(value) {
      //   this.loadSearchSuggestions(value)
      // },
      immediate: true // 侦听开始之后立即调用
    }
  },
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 如果需要根据变量动态创建正则表达式，则手动 new RegExp
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>