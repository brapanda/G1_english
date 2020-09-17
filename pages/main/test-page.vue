<template>
	<div style="margin-top: 40rpx;">
		<div class="hm-downloads-card" @click="beginTest('allSign')">
		  <div class="container" :style="'background-color:#e3494a'">
			<div class="downloadDetail">
			  <div class="downloadDetail-container">
				<text class="count">{{ title(0) }}</text>
				<text class="downloads">{{ 'Completed ' + qCompleted['allSign'].toString() + ' / 60' }}</text>
			  </div>
			</div>
			<image class="downloadImage" mode="aspectFit" :src="'/static/images/stop_sign.png'" />
		  </div>
		</div>
		
		<div class="hm-downloads-card" @click="beginTest('allRule')">
		  <div class="container" :style="'background-color:#5613d5'">
			<div class="downloadDetail">
			  <div class="downloadDetail-container">
				<text class="count">{{ title(1) }}</text>
				<text class="downloads">{{ 'Completed ' + qCompleted['allRule'].toString() + ' / 145' }}</text>
			  </div>
			</div>
			<image class="downloadImage" mode="aspectFit" :src="'/static/images/car.png'" />
		  </div>
		</div>
		
		<div class="hm-downloads-card" @click="beginTest('all')">
		  <div class="container" :style="'background-color:#1a2355'">
			<div class="downloadDetail">
			  <div class="downloadDetail-container">
				<text class="count">{{ title(2) }}</text>
				<text class="downloads">{{ 'Completed ' + qCompleted['all'].toString() + ' / 205' }}</text>
			  </div>
			</div>
			<image class="downloadImage" mode="aspectFit" :src="'/static/images/test.png'" />
		  </div>
		</div>
		
		<div class="hm-downloads-card" @click="beginTest('selfTest')">
		  <div class="container" :style="'background-color:#ef8056'">
			<div class="downloadDetail">
			  <div class="downloadDetail-container">
				<text class="count">{{ title(3) }}</text>
				<text class="downloads">{{ 'Completed ' + qCompleted['selfTest'].toString() + ' / 40' }}</text>
			  </div>
			</div>
			<image class="downloadImage" mode="aspectFit" :src="'/static/images/exam.png'" />
		  </div>
		</div>
	
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
    options: {
      type: Object,
      default: function() {
        return {
			
        };
      }
    }
  },
  data() {
    return {
		testCat:[
			{
				"title":"Traffic Signs",
				"desc" : ""
			},
			{
				"title":"Regulations",
				"desc" : ""
			},
			{
				"title":"Practices",
				"desc" : ""
			},
			{
				"title":"Mock Test",
				"desc" : ""
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
  	this.getCompleted('allSign')
	this.getCompleted('allRule')
	this.getCompleted('all')
	this.getCompleted('selfTest')
  },
  methods: {
	  title(index){
		  console.log('test title', this.testCat[index].title)
		  return this.testCat[index].title
	  },
	  desc(index){
		  return this.testCat[index].desc
	  },
	  beginTest(type){
		  uni.navigateTo({
		  	url: '../self-test/self-test?testType='+type
		  })
	  },
	  getCompleted(testType){
		  try{
		  	var qList = uni.getStorageSync(testType)
			var correct = 0
			for (var i in qList){
				if (qList[i].isSelected){
					correct += 1
				}
			}
			this.qCompleted[testType] = correct
			console.log('qCompleted',this.qCompleted)
		  }catch(e){
		  	//TODO handle the exception
			console.log('read error')
			this.qCompleted[testType] = 0
		  }
	  }
  }
};
</script>

<style>
	@import '@/common/css/index.response.css';
</style>
