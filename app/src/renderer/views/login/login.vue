<template>
  <section class="login-wrap">
    <header-bar @child-refresh='reloadLogin'></header-bar>
      <Form ref='form' class="login-form">
        <h3 class="login-header">登录</h3>
        <Alert v-if="showMes" type="error" show-icon>{{checkMes}}</Alert>
        <div class="fields">
          <i class="fn-icon fn-icon-com"></i>
          <Input
            class="field"
            ref="comObj"
            v-model="login.comid"
            placeholder="请输入公司ID"
            width="320px"
            autofocus="autofocus"
            @keyup.native.enter="accObjFocus"
            @keyup.native.tab="accObjFocus"
            @click.native="inputFocus"
            @change.native="inputFocus"
          >
          </Input>
          <i class="fn-icon fn-icon-account"></i>
          <Input
            class="field"
            v-model="login.account"
            ref="accObj"
            placeholder="请输入账号"
            width="320px"
            @keyup.native.enter="passObjFocus"
            @keyup.native.tab="passObjFocus"
            @click.native="inputFocus"
            @change.native="inputFocus"
          >
          </Input>
          <i class="fn-icon fn-icon-pwd"></i>
          <Input
            class="field"
            ref="passObj"
            v-model="login.password"
            type="password"
            placeholder="请输入密码"
            width="320px"
            @keyup.native.enter="validate"
            @keyup.native.tab="validate"
            @click.native="inputFocus"
            @change.native="inputFocus"
          >
          </Input>
          <div class="check-line">
            <Checkbox label="savePwd" v-model="login.savePwd" class="checkbox" ref="savePwd">记住密码</Checkbox>
            <Checkbox label="autoLogin" v-model="login.autoLogin" class="checkbox" ref="autoLogin">自动登录</Checkbox>
            <Button type="text" class="btn-link" ref="forgetPwd" @click.native="forgetPwd" >忘记密码</Button>
          </div>
        </div>
        <div>
          <Button
            long
            class="submit"
            @click.native="validate"
            type="primary"
            :loading="loading"
          >
            {{ loading ? '登录中' : '登录' }}
          </Button>
        </div>
      </Form>
  </section>
</template>
<style src="./login.css"></style>
<script>
  import { loginData } from './loginData'
  export default { ...loginData }
</script>