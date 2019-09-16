<template>
  <div class="login-container">
    <!--登录面板内容部分-->
    <div class="login-inner">
      <!--面板头部-->
      <div class="login-header">
        <div class="login-logo">
          <img src="./images/lk_logo_sm.png" alt="" width="300">
        </div>
        <!--面板标题-->
        <div class="login-header-title">
          <a href="javascript:;" :class="{current: loginMode}" @click="dealLoginMode(true)">手机登录</a>
          <a href="javascript:;" :class="{current: !loginMode}" @click="dealLoginMode(false)">密码登录(测试)</a>
        </div>
      </div>
      <!--面板表单部分-->
      <div class="login-content">
        <form>
          <!--手机验证码登录部分-->
          <div :class="{current: loginMode}">
            <section class="login-message">
              <input type="number" maxlength="11" placeholder="手机号" v-model="phone">
              <button v-if="!countDown" class="get-verification" :class="{'phone_right': phoneRight}" @click.prevent="getVerifyCode">获取验证码</button>
              <button v-if="countDown" disabled="disabled" class="get-verification">已发送({{countDown}}秒)</button>
            </section>
            <section class="login-verification">
              <input type="number" maxlength="8" placeholder="验证码" v-model="phoneCode.code"/>
            </section>
            <section class="login-hint">
              温馨提示：测试账号请输入手机号码，获取验证码，验证码均为666666
              <a href="javascript:;">采用微信扫码支付</a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current: !loginMode}">
            <section>
              <section class="login-message">
                <input type="tel" maxlength="11" placeholder="用户名" v-model="user_name">
              </section>
              <section class="login-verification">
                <input v-if="pwdMode" v-model="pwd" type="password" maxlength="20" placeholder="密码" autocomplete="off"/>
                <input  v-else type="text" v-model="pwd" maxlength="20" placeholder="密码" autocomplete="off"/>
                <div class="switch-show">
                  <img :class="{on: pwdMode}" @click.prevent="dealPwdMode(false)" src="./images/hide_pwd.png" alt="" width="20">
                  <img :class="{on: !pwdMode}" @click.prevent="dealPwdMode(true)" src="./images/show_pwd.png" alt="" width="20">
                </div>
              </section>
              <section class="login-message">
                <input type="text" maxlength="4" placeholder="验证码" v-model="captcha">
                <img
                    class="get-verification"
                    src="http://demo.itlike.com/web/xlmc/api/captcha"
                    @click.prevent="getCaptcha"
                    ref="captcha"
                >
              </section>
            </section>
          </div>
          <button class="login-submit" @click.prevent="login">登录</button>
        </form>
        <button class="login-back" @click.prevent="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {Toast} from 'vant'
  import {LoginModel} from "../../service/login";
  const loginModel = new LoginModel();
  export default {
    name: "Login",
    computed: {
      // 验证手机号码是否正确
      phoneRight() {
        return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)
      }
    },
    data() {
      return {
        loginMode: true,  // 登陆模式  手机登陆 or 密码登陆  true：手机登陆
        phone: null,    // 手机号码
        countDown: 0,   // 发送验证码后的倒计时时长
        phoneCode: '',  // 手机验证码
        userInfo: null,  // 接受用户登录成功后的信息
        user_name: null, //  用户名
        pwd: null,  // 密码
        pwdMode: true,  // true 密文  false 明文
        captcha: null, // 图形验证码
      }
    },
    methods: {
      ...mapActions(['syncUserInfo']),
      // 处理登陆模式
      dealLoginMode(mode) {
        this.loginMode = mode
      },
      // 得到手机验证码
      async getVerifyCode() {
        // 过滤 只有手机号码正确时 点击按钮才会发送请求
        if (this.phoneRight) {
          this.countDown = 60;
          // 发送验证码后的倒计时
          this.intervalId = setInterval(()=>{
            this.countDown--;
            if (this.countDown === 0) {
              clearInterval(this.intervalId)
            }
          },1000);
          // 获取手机短信验证码
          let phoneCode = await loginModel.getPhoneCode(this.phone);
          this.phoneCode = {...phoneCode};
          // console.log(this.phoneCode);
        }
      },
      // 登录 分模式
      async login() {
        if (this.loginMode) { // 手机登录
          // 输入数据校验
          if (!this.phone.trim()) {
            Toast({
              message: '请输入手机号码',
              duration: 500
            });
            return
          } else if (!this.phoneRight) {
            Toast({
              message: '请输入正确的手机号码',
              duration: 500
            });
            return
          }

          // 输入的验证码校验
          if (!this.phoneCode.code.trim()) {
            Toast({
              message: '请输入验证码',
              duration: 500
            });
            return
          } else if (!(/^\d{6}$/gi.test(this.phoneCode.code))) {
            Toast({
              message: '请输入正确的验证码',
              duration: 500
            });
            return
          }
          // 发送登录请求
          const loginData = await loginModel.phoneCodeLogin(this.phone,this.phoneCode.code);
          // console.log(loginData);
          if (loginData.success_code === 200) {
            this.userInfo = loginData.data;
            console.log(this.userInfo);
          } else {
            this.userInfo = {
              message: '登录失败，手机或者验证码不正确'
            }
          }
          // 后续处理
          if (!this.userInfo.token) {  // 失败的提示
            Toast({
              message: this.userInfo.message,
              duration: 500
            })
          } else {    // 登录成功
            this.syncUserInfo(this.userInfo);  // 保存用户信息
            // debugger
            this.$router.back()  // 回到主面板
          }
        } else {  // 用户名和密码登录
          // 3.2 用户名和密码登录
          if(!this.user_name){
            Toast({
              message: '请输入用户名！',
              duration: 500
            });
            return;
          }else if(!this.pwd){
            Toast({
              message: '请输入密码！',
              duration: 500
            });
            return;
          } else if(!this.captcha){
            Toast({
              message: '请输入验证码！',
              duration: 500
            });
            return;
          }
          // 发起请求
          console.log(this.user_name);
          console.log(this.pwd);
          console.log(this.captcha);
          const loginData = await loginModel.pwdLogin(this.user_name, this.pwd, this.captcha);
          console.log(loginData);
          if(loginData.success_code === 200){
            // 4.1 保存用户信息
            this.syncUserInfo(loginData.data);
            // 4.2 回到主面板
            this.$router.back();
          }else {
            Toast({
              message: '登录失败，用户名或者密码不正确！',
              duration: 500
            });
          }
        }

      },
      // 处理密码的显示模式
      dealPwdMode(pwdMode){
        this.pwdMode = pwdMode
      },
      // 获取随机图形验证码
      getCaptcha() {
        // 拿到图片节点
        let captchaEle = this.$refs.captcha;
        // 为了防止服务器以为请求没有发生改变而返回同样的数据
        this.$set(captchaEle,'src','http://demo.itlike.com/web/xlmc/api/captcha?time=' + new Date())
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-container {
    width: 100%;
    height: 100%;
    background: #fff;
  }

  .login-container .login-inner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;
  }

  .login-container .login-inner .login-header .login-logo {
    font-size: 40px;
    font-weight: bold;
    color: #75a342;
    text-align: center
  }

  .login-container .login-inner .login-header .login-header-title {
    padding-top: 40px;
    padding-bottom: 10px;
    text-align: center;
  }

  .login-container .login-inner .login-header .login-header-title > a {
    color: #333;
    font-size: 14px;
    padding-bottom: 4px;
  }

  .login-container .login-inner .login-header .login-header-title > a:first-child {
    margin-right: 40px
  }

  .login-container .login-inner .login-header .login-header-title > a.current {
    color: #75a342;
    font-weight: 700;
    border-bottom: 2px solid #75a342
  }

  .login-container .login-inner .login-content > form > div {
    display: none;
  }

  .login-container .login-inner .login-content > form > div.current {
    display: block
  }

  .login-container .login-inner .login-content > form > div input {
    width: 100%;
    height: 100%;
    padding-left: 8px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: 0;
    font: 400 14px Arial;
  }

  .login-container .login-inner .login-content > form > div input:focus {
    border: 1px solid #75a342
  }

  .login-container .login-inner .login-content > form > div .login-message {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #fff;
  }

  .login-container .login-inner .login-content > form > div .login-message .get-verification {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    border: 0;
    color: #ccc;
    font-size: 14px;
    background: transparent;
  }

  .login-container .login-inner .login-content > form > div .login-message .get-verification.phone_right {
    color: #75a342
  }

  .login-container .login-inner .login-content > form > div .login-verification {
    position: relative;
    margin-top: 16px;
    height: 48px;
    font-size: 14px;
    background: #fff;
  }

  .login-container .login-inner .login-content > form > div .login-verification .switch-show {
    position: absolute;
    right: 10px;
    top: 12px;
  }

  .login-container .login-inner .login-content > form > div .login-verification .switch-show img {
    display: none
  }

  .login-container .login-inner .login-content > form > div .login-verification .switch-show img.on {
    display: block
  }

  .login-container .login-inner .login-content > form > div .login-hint {
    margin-top: 12px;
    color: #999;
    font-size: 12px;
    line-height: 20px;
  }

  .login-container .login-inner .login-content > form > div .login-hint > a {
    color: #75a342
  }

  .login-container .login-inner .login-content > form .login-submit {
    display: block;
    width: 100%;
    height: 42px;
    margin-top: 30px;
    border-radius: 4px;
    background: #75a342;
    color: #fff;
    text-align: center;
    font-size: 16px;
    line-height: 42px;
    border: 0
  }

  .login-container .login-inner .login-content .login-back {
    display: block;
    width: 100%;
    height: 42px;
    margin-top: 15px;
    border-radius: 4px;
    background: transparent;
    border: 1px solid #75a342;
    color: #75a342;
    text-align: center;
    font-size: 16px;
    line-height: 42px
  }
</style>