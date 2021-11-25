<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- route 开启路由模式 -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item icon="home-o" to="/">
        <i slot="icon" class="toutiao icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item icon="search" to="/qa">
        <i slot="icon" class="toutiao icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/video">
        <i slot="icon" class="toutiao icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my">
        <i slot="icon" class="toutiao icon-wode"></i>
        <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>