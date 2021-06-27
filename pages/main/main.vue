<template>
	<div style="margin-top: 40rpx;">
		<div class="hm-downloads-card"  @click="goTo('info')">
		  <div class="container card-style-1" style="background-image: url('/static/images/background2.jpg');background-size: 1500upx">
			<div class="downloadDetail">
			  <div class="downloadDetail-container">
				<text class="count">{{ title(0) }}</text>
				<text class="downloads">{{ desc(0) }}</text>
			  </div>
			</div>
			<!-- <image class="downloadImage" mode="aspectFit" :src="'https://www.ccdriving.ca/image/catalog/Test/1/image001.jpg'" /> -->
		  </div>
		</div>
		
		<div class="hm-downloads-card" @click="goTo('sign-view')">
		  <div class="container card-style-2" style="background-image: url('/static/images/background2.jpg');background-size: 1500upx">
			<div class="downloadDetail">
			  <div class="downloadDetail-container">
				<text class="count">{{ title(1) }}</text>
				<text class="downloads">{{ desc(1) }}</text>
			  </div>
			</div>
		  </div>
		</div>
		
		<div class="hm-downloads-card" @click="goTo('test')">
		  <div class="container card-style-3" style="background-image: url('/static/images/background2.jpg');background-size: 1500upx">
			<div class="downloadDetail">
			  <div class="downloadDetail-container">
				<text class="count">{{ title(2) }}</text>
				<text class="downloads">{{ desc(2) }}</text>
			  </div>
			</div>
		  </div>
		</div>
	<!-- #ifdef MP-WEIXIN -->
	<button class="cu-btn cuIcon lg service-btn-style" open-type="contact">
		<text class="cuIcon-mark" style="font-size: 45upx;"></text>
	</button>
	<!-- #endif -->
	
	</div>
</template>

<script>
export default {
  name: 'HmDownloadsCard',
  props: {
    dataId: {
      type: String,
      default: 'hm-downloads-card'
    },
  },
  data() {
    return {
		testCat:[
			{
				"title":"Test Info",
				"desc" : "Things Need To Know"
			},
			{
				"title":"Signs",
				"desc" : "Before You Start"
			},
			{
				"title":"Practice",
				"desc" : "Mock Test"
			}
		],
		qCompleted: {
			"allSign": 0,
			"allRule": 0,
			"all": 0,
			"selfTest": 0
		}
	};
  },
  onShow() {
  },
  methods: {
	  title(index){
		  console.log('test title', this.testCat[index].title)
		  return this.testCat[index].title
	  },
	  desc(index){
		  return this.testCat[index].desc
	  },
	  goTo(type){
		  if (type=='info'){
			  uni.navigateTo({
			  	url: './test-info'
			  })
		  }else if(type == 'test'){
			  uni.switchTab({
			  	url: './test-page'
			  })
		  }else{
			  uni.navigateTo({
			  	url: './sign-view'
			  })
		  }
	  },
  }
};
</script>

<style>
	@import '@/common/css/index.response.main.css';
	.service-btn-style{
		position: fixed;
		top: calc(100% - 200upx);
		left: 650upx;
		box-shadow: 0 0 18upx #777777;
		background: #ffffff;
	}
	
	.card-background{
		background-image: url('/static/images/background.jpg');
		background-size: 1500upx
	}
	
	.card-style-1{
		background-color: #49AFCD;
	}
	
	.card-style-2{
		background-color: #F0AD4E;
	}
	
	.card-style-3{
		background-color: #56BD92;
	}

</style> 
