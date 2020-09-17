<template>
	<view class="m-column" :style="{height: height}">
		<view class="test-score" v-if="testType != 'selfTest'">
			<view :style="'color:' + (score>=80?'#00bf8f':'#e3494a')">{{'Score: '+totalScore.correct.toString()+' / ' + totalScore.total.toString()}}</view>
			<view :style="'font-size:30upx'">{{'Signs: ' + signAnswer.correct.toString() + ' / ' + signAnswer.total.toString()}}</view>
			<view :style="'font-size:30upx'">{{'Regulations: ' + ruleAnswer.correct.toString() + ' / ' + ruleAnswer.total.toString()}}</view>
		</view>
		<view class="self-test-score" v-else>
			<view :style="'color:' + (isPass?'#00bf8f':'#e3494a')">{{isPass ? 'Passed': 'Failed'}}</view>
			<view :style="'color:' + (signAnswer.correct >= 16?'#00bf8f':'#e3494a')+';font-size:30upx'">{{'Signs: ' + signAnswer.correct.toString() + ' / ' + signAnswer.total.toString()}}</view>
			<view :style="'color:' + (ruleAnswer.correct >= 16?'#00bf8f':'#e3494a')+';font-size:30upx'">{{'Regulations: ' + ruleAnswer.correct.toString() + ' / ' + ruleAnswer.total.toString()}}</view>
		</view>
		<view class="cu-list menu sm-border card-menu margin-top m-flex-item" style="width:690upx;overflow-y: auto;-webkit-overflow-scrolling: touch;">
			<self-test-result-item style="width:100%;" title="Question" selected="Selected" note="Correct" type="Type" isTitle=true></self-test-result-item>
			<self-test-result-item style="width:100%;" :title="titleNumber(index)" :info="item" :selected="selectedAnswer(item)" :note="correctAnswer(item)" :type="choiceType(item)" v-for="(item,index) in selfTestAnswer" :key="index"></self-test-result-item>
		</view>
		<!-- <view class="margin-top"></view> -->
		<view class="padding flex flex-wrap justify-around align-center">
			<button class="cu-btn round lg bg-white" @click="reselfTest">
				<text class="cuIcon-refresh"> {{" Retest"}}</text>
			</button>
			<button class="cu-btn round lg bg-white" @click="share" open-type="share">
				<text class="cuIcon-share"> {{" Share"}}</text>
			</button>
		</view>
	</view>
</template>

<script>
	import selfTestResultItem from '@/components/self-test-item/self-test-result-item.vue'
	
	export default{
		data(){
			return{
				height: '0px',
				score: 0,
				selfTestAnswer: [],
				categoryDic:{
				0: "x",
				1: "湿垃圾",
				2: "干垃圾",
				3: "可回收垃圾",
				4: "有害垃圾",
				5: "不属于日常生活垃圾",
				6: "装修垃圾，请咨询物业",
				7: "大件垃圾，请咨询物业"
			},
			colorDic:{
				1: "#7e5132",
				2: "#000000",
				3: "#2c2884",
				4: "#ff4765",
				5: "#2a2a2a",
				6: "#2a2a2a",
				7: "#2a2a2a",
			},
			choice : ["A","B","C","D"],
			colors : ["#00bf8f","#e3494a"],
			testType: '',
			signAnswer: {},
			ruleAnswer: {},
			isPass: false,
			totalScore: {}
			}
		},
		components:{
			selfTestResultItem
		},
		methods:{
			calcScore(){
				this.score = Number(this.totalScore.correct / this.totalScore.total * 100).toFixed(0)
			},
			reselfTest(){
				var _this = this
				uni.showModal({
					title: 'Do you confirm to retest, it will delete all questions and answers?',
					showCancel: true,
					success(e) {
						if(e.confirm){
							
							console.log("reset questions",e)
							_this.$eventHub.$emit('resetAction', {'resetQuestions':true,'currentType':_this.testType})
							uni.navigateBack({})
							_this.$eventHub.$off('resetAction');
						}
					}
				})
				
			},
			onShareAppMessage(res) {
				console.log(res);
				if (res.from === 'button') {
					// 来自页面内分享按钮
					console.log(res.target);
				}
				return {
					title: "Share With Friends",
					path: 'pages/self-test/self-test',
					success(resp) {
						console.log(resp);
					}
				};
			},
			
			titleNumber(index){
				return (index + 1).toString()
			},
			selectedAnswer(info){
				if (info.selected == -1){
					return "No Answer"
				}
				return this.choice[info.selected]
			},
			
			correctAnswer(info){
				var choices = info.options
				if (choices[0].correct == 'true'){
					return "A"
				}else if(choices[1].correct == 'true'){
					return 'B'
				}else if(choices[2].correct == 'true'){
					return 'C'
				}else{
					return 'D'
				}
				
			},
			choiceType(info){
				if (info.type == 'sign'){
					return 'Sign'
				}else if(info.type == "rule"){
					return 'Regulation'
				}
				
			},
			countAnswer(){
				var totalAnswer = this.selfTestAnswer.length
				var totalCorrect = 0
				var totalSign = 0
				var totalSignCorrect = 0
				var totalRule = 0
				var totalRuleCorrect = 0
				for (var i in this.selfTestAnswer){
					var item = this.selfTestAnswer[i]
					if(item.type == 'sign'){
						totalSign += 1
						if (item.isCorrect){
							totalSignCorrect += 1
							totalCorrect += 1
						}
					}
					if(item.type == 'rule'){
						totalRule += 1
						if (item.isCorrect){
							totalRuleCorrect += 1
							totalCorrect += 1
						}
					}
				}
				this.signAnswer = {'correct': totalSignCorrect,'total':totalSign}
				this.ruleAnswer = {'correct': totalRuleCorrect,'total':totalRule}
				this.totalScore = {'correct': totalCorrect,'total':totalAnswer}
				if (this.testType == 'selfTest'){
					if (totalSignCorrect >= 16 &&totalRuleCorrect >= 16){
						this.isPass = true
					}else{
						this.isPass = false
					}
				}
			}
		},
		onLoad(options) {
			var _this = this;
			uni.getSystemInfo({              
				success: function(res) {                  
					_this.height = res.windowHeight + 'px';
				}
			});
			if (options){
				if(options.results){
					this.selfTestAnswer = JSON.parse(options.results)
				}
				if (options.type){
					this.testType = options.type
				}
			}
			
			console.log("self test result",this.selfTestAnswer)
			this.countAnswer()
			this.calcScore()
		}
	}
</script>

<style>
	.test-score{
		width: 100%;
		height: 150upx;
		line-height: 50upx;
		font-size: 40upx;
		font-weight: 600;
		padding-top: 10upx;
		text-align: center;
	}
	.self-test-score{
		width: 100%;
		height: 150upx;
		line-height: 50upx;
		font-size: 40upx;
		font-weight: 600;
		padding-top: 10upx;
		text-align: center;
	}
</style>
