<template>
  <div id="head-bar">
    <div class="left-content">
      <div href="#" id="logo" class="fn-icon"></div>
      <div>后台管理系统</div>
    </div>
    <div class="right-content">
      <div id="net-latency">网络延迟:<Tooltip placement="bottom">
        <div class="latency font-red" v-if="latency == 0">0</div>
        <div class="latency" v-else>{{latency}}</div>ms
        <div class="tips-content" slot="content">
            <div>0-50:网络正常</div>
            <div>50-200:网络有点慢，请检查是否开启了占用网速的软件</div>
            <div>200-1000:网络非常慢，请检查是否在下载资源等</div>
            <div>0:网络掉线</div>
          </div>
        </Tooltip>
      </div>
      <hr class="sep-line" style="right:170px;">
      <div id="refresh" class="fn-icon" @click="refresh"></div>
      <hr class="sep-line" style="right:136px;">
      <div id="setting" class="fn-icon" @click="setting"></div>
      <hr class="sep-line" style="right:102px;">
      <div id="minimize" class="fn-icon" @click="minimize"></div>
      <hr class="sep-line" style="right:68px;">
      <div v-if="!isMaximized" id="restore" class="fn-icon" @click="maximize"></div>
      <div v-if="isMaximized" id="maximize" class="fn-icon" @click="maximize"></div>
      <hr class="sep-line" style="right:34px;">
      <div id="close" class="fn-icon" @click="close"></div>
    </div>
    <Modal v-model="settingModel" title="设置" @on-ok="saveSetting"
      :mask-closable="false" @on-cancel="cancelSetting">
      <section>
        <h3>通用设置</h3>
        <label>点击关闭按钮时：</label>
        <RadioGroup v-model="closeClick">
          <Radio label="close">
            <span>关闭应用程序</span>
          </Radio>
          <Radio label="minimize">
              <span>最小化</span>
          </Radio>
        </RadioGroup>
        <div class="channel-wrap">
          <Label>当前通道：</Label>
          <Input id="channelSetting" v-model="channelValue"></Input>
        </div>
      </section>
      <section class="about-sec">
        <h3>关于</h3>
        <div>
          <Label>当前版本：</Label><div class="version-div" id="currVersion">1.0.1</div>
          <Button @click="checkUpdate" class="update-btn">检查更新</Button>
        </div>
      </section>
    </Modal>
    <Modal v-model="autoUpdater" title="系统更新" @on-ok="confirmUpdate" @on-cancel="cancelUpdate"
      :mask-closable="false" :closable="false">
      <section>
        <h3>{{updateMessage}}</h3>
      </section>
    </Modal>
    <Modal v-model="downloadModal" title="系统更新" @on-ok="confirmInstall" @on-cancel="cancelUpdate"
      :mask-closable="false" :closable="false">
      <section>
        <h3>{{downloadText}}</h3>
        <div class="spin-div">
          <Spin fix>
            <Icon type="load-c" size=30 class="spin-icon-load"></Icon>
          </Spin>
        </div>
      </section>
    </Modal>
  </div>
</template>
<style src="./headerBar.css"></style>
<script>
  import { headerData } from './headerData.js'
  export default { ...headerData }
</script>
