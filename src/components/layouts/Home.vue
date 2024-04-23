<template>
  <a-layout>
    <a-layout-sider class="sider-style" v-model:collapsed="collapsed" collapsible :trigger="null">
      <div class="nav-box">
        <div class="nav-top">
          <div class="logo" />
        </div>
        <div class="nav-bottom">
          <a-menu v-model:selectedKeys="selectedKeys" theme="light" mode="inline">
            <a-menu-item :key="item" v-for="item in 10">
              <pie-chart-outlined />
              <span>Option {{ item }}</span>
            </a-menu-item>
          </a-menu>
        </div>
      </div>
    </a-layout-sider>
    <a-layout style="height: 100vh">
      <a-layout-header :style="headerStyle">
        <div class="collapsed-btn">
          <div style="width: 50px; height: 50px" v-if="!collapsed" @click="collapsed = !collapsed">
            <MenuFoldOutlined style="font-size: 26px" />
          </div>
          <div style="width: 50px; height: 50px" v-else @click="collapsed = !collapsed">
            <MenuUnfoldOutlined style="font-size: 26px" />
          </div>
        </div>
        <div class="title">
          <h2>后台管理系统</h2>
        </div>
        <div class="user-info">
          <div style="display: flex; align-items: center; margin-right: 30px" @click="openUpdAdminInfo">
            <UserOutlined style="font-size: 24px; margin-right: 6px" />
            <a-button type="text"><span style="color: #fff">{{ fullName }}</span></a-button>
          </div>
          <a-popconfirm title="你确定要退出登录吗?" ok-text="确定" cancel-text="取消" @confirm="exitLogin">
            <div style="display: flex; align-items: center">
              <PoweroffOutlined style="font-size: 18px" />
            </div>
          </a-popconfirm>
        </div>
      </a-layout-header>
      <a-layout-content :style="contentStyle">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer :style="footerStyle">Footer</a-layout-footer>
    </a-layout>
  </a-layout>

  <a-modal v-model:open="updAdminInfo" title="更新信息" :maskClosable="false" :keyboard="false" :destroyOnClose="true">
    <a-form :model="adminForm" ref="adminFormRef" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }"
      autocomplete="no">
      <a-form-item label="姓名" name="fullName" :rules="[
      {
        required: true,
        message: '请输入你的真实姓名！',
        trigger: 'change',
      },
      { max: 10, message: '姓名应在10个字符内！', trigger: 'change' },
    ]">
        <a-input v-model:value="adminForm.fullName" />
      </a-form-item>

      <a-form-item label="旧密码" name="password">
        <a-input-password v-model:value="adminForm.password" />
      </a-form-item>

      <a-form-item label="新密码" name="newPassword">
        <a-input-password v-model:value="adminForm.newPassword" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button type="primary" @click="submitAdminInfo">保存</a-button>
      <a-button @click="updAdminInfo = false">取消</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import {
  PieChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PoweroffOutlined,
} from "@ant-design/icons-vue";
import type { CSSProperties } from "vue";
import router from "@/router";
import { message } from "ant-design-vue";

const headerStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: "5%",
  paddingInline: 0,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
  display: "flex",
};

const contentStyle: CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
};

const footerStyle: CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

const collapsed = ref<boolean>(false);
const selectedKeys = ref([2]);

const fullName = ref<any>();
onMounted(() => {
  fullName.value = window.sessionStorage.getItem("fullName");
});

const exitLogin = () => {
  window.sessionStorage.removeItem("token");
  window.sessionStorage.removeItem("fullName");
  router.push("/login");
};

const adminForm = reactive({
  fullName: "",
  password: "",
  newPassword: "",
});

const updAdminInfo = ref(false);
const openUpdAdminInfo = () => {
  updAdminInfo.value = true;
  let fullName = window.sessionStorage.getItem("fullName") || "";
  adminForm.fullName = fullName;
};

const adminFormRef: Ref = ref(null);
const submitAdminInfo = () => {
  adminFormRef.value?.validate().then(() => {
    fullName.value = adminForm.fullName;
    message.success("更新成功");
    updAdminInfo.value = false;
  });
};

</script>

<style scoped>
.sider-style {
  text-align: center;
  line-height: 120px;
  color: #fff;
  height: 100vh;
  overflow-y: auto;
  background-color: #fff;
}

.nav-box {
  width: 100%;
  height: 100%;
}

.nav-top {
  height: 5%;
  width: 100%;
  float: left;
  background-color: #ccc;
}

.nav-bottom {
  height: 95%;
  width: 100%;
  overflow-y: auto;
}

.logo {
  height: 32px;
  margin: 16px;
  background: #000;
}

.collapsed-btn {
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
}

.title {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-info {
  width: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 40px;
}
</style>
