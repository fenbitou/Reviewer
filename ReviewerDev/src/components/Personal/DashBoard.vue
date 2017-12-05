<template>
  <div id="app">
    <el-container style="height: 100%">
      <el-header>
        <div class="logo">
          <h1>Reviewer</h1>
        </div>

        <!-- nav-bar -->
        <div class="header-nav">
          <el-menu mode="horizontal" background-color="#1976D2" text-color="#ffffff" active-text-color="#ffffff" :router="true">
           
            <el-submenu index="my">
              <template slot="title"><img src="../../assets/avatar.png" style="width:30px;"> Administrator</template>
              <el-menu-item index="/signOut"><i class="fa fa-fw fa-sign-out"></i>安全退出</el-menu-item>
            </el-submenu>

          </el-menu>
        </div>
      </el-header>

      <el-container>
        <!-- side-bar -->
        <el-aside width="200px">
          <el-menu default-active="private" :router="true">
            <el-menu-item index="private">
              <i class="fa fa-fw fa-list"></i>
              <span slot="title">公开论文</span>
            </el-menu-item>

            <el-menu-item index="">
              <i class="fa fa-fw fa-fire"></i>
              <span slot="title">热门批注</span>
            </el-menu-item>

            <el-submenu>
              <template slot="title">
                <i class="fa fa-fw fa-wpforms"></i>
                <span slot="title">我的论文</span>
              </template>
              <el-menu-item index="public">
                <i class="fa fa-fw fa-user"></i>
                <span slot="title">论文列表</span>
              </el-menu-item>
              <el-menu-item index="324234">
                <i class="fa fa-fw fa-quote-left"></i>
                <span slot="title">我的批注</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>

      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {};
  }
};
</script>

