<template>
  <div class="general-vip">
    <div class="vip">
      <div class="vip_title">充值余额</div>
      <div class="vip_content">
        <div class="vip_box" tabindex="1" @click="get68()">
          <span class="card-tips">赠</span>
          <p class="t1">余额68元</p>
          <p class="t3">68.00</p>
          <div class="card-foot">¥68.00</div>
        </div>
        <div class="vip_box" tabindex="2" @click="get128()">
          <span class="card-tips">赠</span>
          <p class="t1">余额128元</p>
          <p class="t3">128.00</p>
          <div class="card-foot">¥128.00</div>
        </div>
        <div class="vip_box" tabindex="3" @click="get328()">
          <span class="card-tips">赠</span>
          <p class="t1">余额328元</p>
          <p class="t3">328.00</p>
          <div class="card-foot">¥328.00</div>
        </div>
        <div class="vip_box last" tabindex="4" @click="get648()">
          <span class="card-tips">赠</span>
          <p class="t1">余额648元</p>
          <p class="t3">648.00</p>
          <div class="card-foot">¥648.00</div>
        </div>
        <p>可购买全站付费商品</p>
      </div>

      <div class="pay">
        <div class="pay-box">
          <div class="qr_code">
            <!-- <img :src="qr_code" alt=""> -->
            <img src="../../img/payCode.png" alt="">
          </div>
          <div class="scan_code">
            <img src="../../img/zfb.png" alt="alipay" class="icon_item" style="width: 20px;">
            <img src="../../img/wx.png" alt="wechatpay" class="icon_item" style="width: 20px;">
            <img src="../../img/jd.png" alt="jdpay" class="icon_item" style="width: 20px;">
            <span class="pay_intro">扫码支付</span>
          </div>
        </div>

        <div class="price-info">
          <breeding-rhombus-spinner
        :animation-duration="2000"
        :size="65"
        :color="'#ff1d5e'"
          />
          <div class="price-msg">
            实付：
            <span class="now-price c-red">{{money}}</span>
            <span class="c-red" >元 </span>
          </div>
        </div>
      </div>
    </div>
    <div class="vip">
      <div class="vip_title">余额使用规则</div>
      <div class="vip_rule" >
        <p style="line-height: 1em;">购买即同意<a href="https://www.bilibili.com/video/BV1GJ411x7h7/?spm_id_from=333.337.search-card.all.click&vd_source=5d0d94a002e978dbc6eefa991bcaf90a" target="_self">《OpenCurve余额充值协议》</a> </p> 
        <p style="line-height: 1em;">     1. 余额可以在PC端、Android端和WAP端购买全站付费商品 </p> 
        <p style="line-height: 1em;">     2. 充值成功后，余额可能存在延迟现象，一般1到5分钟内到账，如有问题，请咨询客服；<br> </p>
        <p style="line-height: 1em;">     3. 收益可以转入余额进行消费，但是一旦收益转入余额不可退款； </p>
        <p style="line-height: 1em;">     5. 充值完成后，您可以进入账户充值记录页面进行查看余额充值状态； </p> 
        <p style="line-height: 1em;">     6. 一旦充值成功不可退款。 </p> 
        <p style="line-height: 1em;">     7. 充值赠会员，活动规则说明: </p> 
        <p style="line-height: 1em;">     &nbsp;&nbsp;&nbsp;&nbsp;（1）一旦充值成功不可退款 </p> 
        <p style="line-height: 1em;">     &nbsp;&nbsp;&nbsp;&nbsp;（2）此活动最终解释权归OpenCurve官方所有 </p>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import {BreedingRhombusSpinner} from 'epic-spinners'
export default {
  components: {
    BreedingRhombusSpinner,
    
  },
  data() {
    return {
      deadline: Date.now() + 34 * 60 * 30,
      money: 0.0,
      qr_code:"../../img/payCode.png"
    }
  },
  methods: {
    hilarity() {
      this.$notify({
        title: '提示',
        message: '支付码失效',
        duration: 0
      });
    },
    get68() {
      this.money = 64
      this.qr_code = null
    },
    get128() {
      this.money = 128
      this.qr_code = null
    },
    get328() {
      this.money = 328
      this.qr_code = null
    },
    get648() {
      this.money = 648
      this.qr_code = null
    }
  }
}
</script>

<style>
.general-vip{
    width:80%;
    color: #000;
    margin:0 auto;
}
.vip {
  width: 100%;
  background-color: #fff;
}
.vip_title {
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  font-weight: 600;
  color: #000;
  
  padding-left: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f2;
}
.vip_content {
  width: 90%;
  margin: 0 auto;
  text-align: center;
}
.vip_box {
  position:relative;
  display: inline-block;
  width: 150px;
  height: 100px;
  border-radius: 8px;
  border: 2px solid #fae8d0;
  text-align: center;
  cursor:pointer;
  margin: 0 20px;
}
.vip_box:hover {
  border-color: #b87100;
  background-color: #fff9f1;
}
.vip_box:focus {
  border-color: #b87100;
  background-color: #fff9f1;
}
.last {
  margin-right: 0;
}
.card-tips{
  position: absolute;
  padding: 0 4px;
  height: 24px;
  width: 24px;
  line-height: 24px;
  border-radius: 6px 0 8px 0;
  background: linear-gradient(90deg, #fc5531, #fc1944);
  color:#fff;
  left: -2px;
  top: -2px;
}

.t1 {
  font-size: 16px;
  height: 22px;
  line-height: 22px;
  color: #222226;
  font-weight: 700;
  margin:24px 0 12px;
  position:relative;
  z-index: 2;
}

.t3{
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: #b87100;
}

.card-foot {
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 32px;
  background-color: #fae8d0;
  font-size: 12px;
  line-height: 32px;
  color: #69421b;
  font-weight: 500;
  bottom: 0;
  border-radius: 0 0 6px 6px;
  overflow: hidden;
}
.pay {
  width: 80%;
  margin: 0 auto;
}
.pay-box{
  display: inline-block;
  margin-right: 20px;
}
.qr_code img {
  width: 165px;
  height: 165px;
  border-radius: 4px;
  background: #f0f0f0;
}
.price-info{
  height: 100%;
  display: inline-block;
}
.price-msg {
  font-size: 12px;
  height: 37px;
  margin: 106px 0 12px;
}
.now-price{
  line-height: 48px;
  font-weight: 700;
  font-size: 32px;
  font-family: DINCondensed-Bold,DINCondensed;
}

.c-red {
  color:#fc5531;
}
.vip_rule {
  font-size: 14px!important;
  min-height: 80px;
  line-height: 0;
  padding: 18px 10px 0;
  background: transparent!important;
}
</style>