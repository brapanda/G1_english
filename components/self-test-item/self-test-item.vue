<template>
  <view class="hm-reply-card">
    <view class="box">
		<text class="question-text" v-if="info.type == 'rule'">{{ info.question }}</text>
		<image class="sign-image" mode="aspectFit" lazy-load="true" :src="info.showImg?'https://youju.nyc3.digitaloceanspaces.com/G1/sign-en/'+info.question + '.jpg':''" v-else></image>
		
      
      <view class="bd" :class="[isCorrectAndSelected(0,info)]" @click="selectedAnswer(0,info)">
        <view class="shopCreditWrap">
          <image mode='aspectFill' class="shopCreditLv1" :src="'/static/images/a.png'" />
          <text class="desc" :class="[isOversize(info.options[0].text),whiteText[0]? 'white-text':'']">{{ info.options[0].text }}</text>
        </view>
      </view>
      <view class="bd" :class="[isCorrectAndSelected(1,info)]" @click="selectedAnswer(1,info)">
        <view class="shopCreditWrap">
          <image mode='aspectFill' class="shopCreditLv1" :src="'/static/images/b.png'" />
          <text class="desc" :class="[isOversize(info.options[1].text),whiteText[1]? 'white-text':'']">{{ info.options[1].text }}</text>
        </view>
      </view>
      <view class="bd" :class="[isCorrectAndSelected(2,info)]" @click="selectedAnswer(2,info)">
        <view class="shopCreditWrap">
          <image mode='aspectFill' class="shopCreditLv1" :src="'/static/images/c.png'" />
          <text class="desc" :class="[isOversize(info.options[2].text),whiteText[2]? 'white-text':'']">{{ info.options[2].text }}</text>
        </view>
      </view>
      <view class="bd" :class="[isCorrectAndSelected(3,info),whiteText[3]? 'white-text':'']" @click="selectedAnswer(3,info)">
        <view class="shopCreditWrap">
          <image mode='aspectFill' class="shopCreditLv1" :src="'/static/images/d.png'" />
          <text class="desc" :class="[isOversize(info.options[3].text),whiteText[3]? 'white-text':'']">{{ info.options[3].text }}</text>
        </view>
      </view>
    </view>
	
  </view>
</template>
<script>
export default {
  name: 'HmReplyCard',
  
  data() {
    return {
		options: [],
		isSelected: false,
		isCorrect: false,
		selected: -1,
		loaded: false,
		whiteText: [false,false,false]
	};
  },
  methods: {
		isCorrectAndSelected(e,info){
			var _this = this
			if (info.isSelected){
				if (info.selected == e){
					if (info.isCorrect){
						_this.whiteText[e] = true
						return 'selected-correct'
					}else{
						_this.whiteText[e] = true
						return 'selected-wrong'
					}
				}else{
					if (info.options[e].correct == 'true'){
						_this.whiteText[e] = true
						return 'selected-correct'
					}
				}
			}else{
				_this.whiteText[e] = false
			}
		},
		
		selectedAnswer(e,info){
			if (!info.isSelected){
				this.isSelected = true
				this.isCorrect = info.options[e].correct == 'true'
				this.selected = e
				
				var newInfo = {}
				
				newInfo.id = info.id
				newInfo.options = info.options
				newInfo.question = info.question
				newInfo.showImg = info.showImg
				newInfo.type = info.type
				newInfo.selected = e
				newInfo.isCorrect = info.options[e].correct == 'true'
				newInfo.isSelected = true
				info = newInfo
				this.$emit('questionSelected',newInfo)
			}
		},
		isOversize(e){
			if (e.length > 30 && e.length <= 60){
				return 'oversizeFont'
			}else if(e.length > 60 && e.length <= 90){
				return 'oversizeExtra'
			}else if(e.length >= 90 && e.length<120){
				return 'oversizeExtraL'
			}else if(e.length >= 120){
				return 'oversizeExtraLL'
			}else{
				return 'normal-size'
			}
		},
		imageLoaded(e){
			var _this = this;
			this.loaded = true;
			//_this.$emit('imageLoaded', _this.index);
		},
  },
  mounted() {
  	var _this = this
	// var questions = info.options.sort(function(){
	// 	return 0.5 - math.random()
	// })
	// console.log('info',info)
	// _this.options = info.options
  },
  props:{
	  info:{}
  }
};
</script>
<style>
@import './index.response.css';
.question-text{
	font-size: 40upx;
	font-weight: 600;
	margin: 40upx;
}
.sign-image{
	height: 400upx;
	display: block;
	margin: auto;
}
.selected-correct{
	background: #00bf8f;
}
.selected-wrong{
	background: #e3494a;
}
.normal-size{
	margin-top: -12rpx;
	width: 100%;
	height: 80rpx;
	line-height: 40rpx;
	display: flex !important;
	align-items: center !important;
}
.oversizeFont{
	margin-top: -12rpx;
	width: 100%;
	height: 120rpx;
	line-height: 40rpx;
	display: flex !important;
	align-items: center !important;
}
.oversizeExtra{
	margin-top: -12rpx;
	width: 100%;
	height: 160rpx;
	line-height: 40rpx;
	display: flex !important;
	align-items: center !important;
}
.oversizeExtraL{
	margin-top: -12rpx;
	height: 200rpx;
	line-height: 40upx;
	display: flex !important;
	align-items: center !important;
}
.oversizeExtraLL{
	margin-top: -12rpx;
	height: 240rpx;
	line-height: 40upx;
	display: flex !important;
	align-items: center !important;
}
.white-text{
	color: #ffffff
}
</style>
