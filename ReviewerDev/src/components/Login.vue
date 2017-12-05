<template>
 <div class="content-wrapper">
   <div class="login-container">
      <div class="login-meta">
        <img src="../assets/blue@200.png">
        <p>Reviewer - 文档评阅系统</p>
      </div>
      <div class="login-form" @keyup.enter="doLogin">
        <p>系统登录</p>
        <label>
          <input type="text" v-model="username" placeholder="用户名">
        </label>
        <label>
          <input type="password" v-model="password" placeholder="密码">
        </label>
        <button @click="doRegister">注册</button>
        <button @click="doLogin">登陆</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    checkValidity() {
      let isValid = true;
      if (!this.username || !this.password) {
        this.$message.error({ message: this.username ? "密码不能为空" : "用户名不能为空" });
        return false;
      }

      if (!/^[-a-zA-Z0-9_]{2,30}$/.test(this.username)) {
        this.$message.error({ message: "奇怪的用户名" });
        isValid = false;
      }

      if (this.password.legend < 3) {
        this.$message.error({ message: "密码长度太短" });
        isValid = false;
      }

      return isValid;
    },
    doLogin() {
      if (this.checkValidity()) {
        window.localStorage.setItem("username", this.username);
        this.$router.push({ path: "/home" });
      }
    },
    doRegister() {
      this.$router.push({ path: "/register" });
    }
  }
};
</script>


<style rel="stylesheet/less" lang="less" scoped>
@import "../style/login.less";
</style>
