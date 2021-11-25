<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
    >
      <van-icon slot="left" name="cross" @click="$router.back()"/>
    </van-nav-bar>

    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
    <van-field
      v-model="user.mobile"
      name="mobile"
      placeholder="请输入手机号"
      left-icon="smile-o"
      :rules="userFormRules.mobile"
      type="number"
      maxlength="11"
    >
      <i slot="left-icon" class="toutiao icon-shouji"></i>
    </van-field>
    <van-field
      v-model="user.code"
      name="code"
      placeholder="请输入验证码"
      :rules="userFormRules.code"
      type="number"
      maxlength="6"
    >
      <i slot="left-icon" class="toutiao icon-yanzhengma"></i>
      <template #button>
        <!-- time: 倒计时时间 -->
        <van-count-down
          v-if="isCountDownShow"
          :time="1000 * 60"
          format="ss s"
          @finish="isCountDownShow = false"
        />
        <van-button
          v-else
          class="send-sms-btn"
          native-type="button"
          round
          size="small"
          type="default"
          @click="onSendSms"
        >获取验证码</van-button>
      </template>
    </van-field>
    <div class="login-btn-wrap">
      <van-button
        class="login-btn"
        block
        type="info"
        native-type="submit"
      >登录
      </van-button>
    </div>
  </van-form>
  </div>
</template>
<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'loginIndex',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false // 是否展示倒计时
    }
  },
  computed: {},
  methods: {
    async onSubmit() {
      // 获取表单数据
      const user = this.user
      // 表单验证
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0  // 默认持续2000，如果为0则持续展示
      });
      // 提交表单请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')

        // 登录成功，跳转回原来页面
        // back 的方式不严谨，后面学功能优化的时候修改
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败', err)
        }
      }
      // 根据请求相应结果处理后续操作
    },
    async onSendSms() {
      // 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 验证通过，显示倒计时
      this.isCountDownShow = true
      // 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        // this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了, 请稍后重试')
        } else {
          this.$toast('服务器没钱发短信了，请使用万能验证码')
        }
      }
    }
  }
}
</script>

<style lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }

  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    white-space: nowrap;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #549fee;
      border: none;
    }
  }
}
</style>
