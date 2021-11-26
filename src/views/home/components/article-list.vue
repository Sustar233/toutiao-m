<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1200"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item 
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
      </van-list>

    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      typeof: Object,
      required: true
    }
  },
  data() {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的 loading 状态
      refreshSuccessText: ''  // 下拉刷新成功提示文本
    }
  },
  methods: {
    // 初始化或滚动到底部的时候触发
    async onLoad() {
      try {
        // 异步更新数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })

        const { results } = data.data
        this.list.push(...results)

        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，将finished设置为true，不再load加载更多
          this.finished = true
        }
        

      } catch (err) {
        // 展示错误提示状态
        this.error = true
        // 请求失败了，loading也需要关闭
        this.loading = false
      }

    },

    // 当下拉刷新的时候会触发调用该函数
    async onRefresh() {
      try {
        // 异步更新数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now() // 下拉刷新，每次请求获取最新数据，所以传递最新时间戳
        })

        // 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)

        // 关闭下拉刷新的loading状态
        this.isreFreshLoading = false

        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        this.isreFreshLoading = false
        this.refreshSuccessText = '刷新失败'
      }
      // 请求获取数据
      // 将数据追加到列表顶部
      // 关闭下拉刷新的loading状态
      this.isreFreshLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>