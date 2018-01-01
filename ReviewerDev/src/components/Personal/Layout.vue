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
           
            <el-submenu index="">
              <template slot="title">
                <img src="../../assets/avatar.png" style="width:30px;">&nbsp;Administrator
              </template>
              <el-menu-item index=""><i class="fa fa-fw fa-sign-out"></i>安全退出</el-menu-item>
            </el-submenu>

          </el-menu>
        </div>
      </el-header>

      <el-container>
        <!-- side-bar -->
        <el-aside width="160px">
          <el-menu default-active="public" :router="true" :collapse="false">
            
            <el-menu-item index="/public">
              <i class="fa fa-fw fa-list"></i>
              <span slot="title">公开论文</span>
            </el-menu-item>

            <el-menu-item-group>
              <template slot="title">个人中心</template>
              <el-menu-item index="">
                <i class="fa fa-fw fa-info-circle"></i>
                <span slot="title">通知</span>
                <el-badge class="badge-mark" :value="12" />
              </el-menu-item>
              <el-menu-item index="/private">
                <i class="fa fa-fw fa-star"></i>
                <span>收藏论文</span>
              </el-menu-item>
              <el-menu-item index="">
                <i class="fa fa-fw fa-quote-left"></i>
                <span>我的批注</span>
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <template slot="title">我的论文</template>
              <el-menu-item index="/mypaper_init">
                <i class="fa fa-fw fa-pencil-square-o"></i>
                <span>未评审</span>
              </el-menu-item>
              <el-menu-item index="/mypaper_commit">
                <i class="fa fa-fw fa-circle-o"></i>
                <span>正在评审</span>
              </el-menu-item>
              <el-menu-item index="/mypaper_final">
              <i class="fa fa-fw fa-check"></i>
                <span>已定稿</span>
              </el-menu-item>
              <el-menu-item index="/addpaper">
                <i class="fa fa-fw fa-plus"></i>
                <span>新建论文</span>
              </el-menu-item>
            </el-menu-item-group>

          </el-menu>
        </el-aside>

        <!-- 右侧操作部分 -->

        <el-main>
          <router-view/>
        </el-main>

      </el-container>

    </el-container>

  </div>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {};
  }
};
</script>

