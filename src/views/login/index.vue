<template>
  <div class="login-box">
    <div class="login-form">
      <a-form :model="formState" ref="loginForm" :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }">
        <a-form-item>
          <h2 style="text-align: center;color: #fff;">后台管理系统</h2>
        </a-form-item>
        <a-form-item label="" name="userName" :rules="[{ required: true, message: '请输入用户名!', trigger: 'blur' }]">
          <a-input size="large" v-model:value="formState.userName" placeholder="Username">
            <template #prefix>
              <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="" name="password" :rules="[{ required: true, message: '请输入密码!', trigger: 'blur' }]">
          <a-input-password size="large" v-model:value="formState.password" placeholder="Password">
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template></a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button size="large" style="width: 100%;" type="primary" @click="handleLogin">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { adminLogin } from '@/api/index'

interface FormState {
  userName: string;
  password: string;
}

const formState = reactive<FormState>({
  userName: '',
  password: '',
});

const loginForm: Ref = ref(null)
const handleLogin = () => {
  loginForm.value?.validate().then(() => {
    adminLogin(formState).then((res: any) => {
      console.log(res.data);
      if (res.data.code == 200) {
        window.sessionStorage.setItem("token", res.data.token)
        window.sessionStorage.setItem("fullName", res.data.adminInfo.fullName)
        router.push('/')
      }
    })
  })
}
</script>

<style scoped>
.login-box {
  width: 100%;
  height: 100%;
  background-image: url('@/assets/images/bg.jpg');
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 500px;
  height: 400px;
  background-color: #fff;
  padding: 40px 40px;
  border-radius: 10px;
}
</style>