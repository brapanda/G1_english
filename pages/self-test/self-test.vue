<template>
	<view class="self-test-main m-column" :style="{height:height}">
		<swiper :current="subjectIndex" class="swiper-box m-flex-item" @change="SwiperChange" >
			<swiper-item v-for="(subject,index) in subjectList" :key="index">	
				<selfTestItem :class="{lazy:!subject.showImg}" @questionSelected="getAnswer" :info="subject"></selfTestItem>
			</swiper-item>
		</swiper>
		<view class="count-question">
			<text class="text-current-index">{{subjectIndex+1 + " "}}</text>
			<text style="color:#dedede;font-size: 36upx;font-weight: 400;">
				{{"/ " + subjectList.length}}
			</text>
		</view>
		<view class="flex flex-wrap justify-around align-center bg-white" style="padding: 15upx;">
						
			<button class="cu-btn cuIcon lg" @tap="MoveSubject(-1)"><text class="cuIcon-back"></text></button>
			<button class="cu-btn round lg" @click="checkAnswer">
				<text class="cuIcon-edit">{{" Check"}}</text>
			</button>
			<button class="cu-btn round lg" @click="showFixed">
				<text class="cuIcon-roundcheck">{{' Correct: ' + checkCorrect() + '/' + subjectList.length}}</text>
			</button>
			<button class="cu-btn cuIcon lg" @tap="MoveSubject(1)"><text class="cuIcon-right"></text></button>
			
		</view>
		<view class="fixed-bottom" :class="{active:show_hide}" @click.stop="hideFixed">
			<view class="tibiao" @click.stop>
				<view class="tibiao-bar">
					<text class="tibiao-no3">{{choice[2]}}</text><!-- 未选择 -->
					<view class="tibiao-null"></view>
					<text class="tibiao-no2">{{choice[1]}}</text><!-- 选择错误 -->
					<view class="tibiao-no"></view>
					<text class="tibiao-yes2">{{choice[0]}}</text><!-- 选择正确 -->
					<view class="tibiao-yes"></view>
				</view>
				<view>
					<text v-for="(item,index) in subjectList" :key="index"
					:class="{active_o:checkSheet(item) == 'correct',active_t:checkSheet(item) == 'wrong'}" @click="AppointedSubject(index)">{{index + 1}}</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import selfTestItem from '@/components/self-test-item/self-test-item.vue'
import signQuestion from '@/static/data/question_sign_json.json'
	import ruleQuestion from '@/static/data/question_rule_json.json'
	
	export default {
		data() {
			return {
				height:'0px',
				currentType: '', //当前题型
				subjectIndex: 0,//跳转索引
				autoShowAnswer: false,//答错是否显答案
				autoRadioNext:true,//判断题、单项题，自动移下一题
				swiperHeight: '800upx',//
				title: 'Mock Test',
				subjectList:[],
				modalCard: null ,//显示答题卡
				modalError:null , //纠错卡
				//swiper
				cardCur: 0,
				show_hide:false,//题标是否隐藏 默认false 为隐藏，
				choice:[0,0,0],//[选择正确，选择错误，未选择]
			}
		},
		onLoad(option) {
			var _this = this;
			// var option = {testType: "all"}
			_this.currentType = option.testType
			
			this.$eventHub.$on('resetAction', (data)=>{
				console.log('collectChange', data);
				if (data.currentType == this.currentType){
					_this.resetQuestions()
				}
			})
			
			_this.setQuestions()
			
			uni.getSystemInfo({              
				success: function(res) {                  
					_this.height = res.windowHeight + 'px';
				}
			});
			
			uni.setNavigationBarTitle({
				title: this.title
			});			
			
		},
		methods: {
			showCardModal: function(e) {
				this.modalCard = e.currentTarget.dataset.target
			},
			hideCardModal: function(e) {
				this.modalCard = null
			},
			showErrorModal: function(e) {
				this.modalError = e.currentTarget.dataset.target
			},
			hideErrorModal: function(e) {
				this.modalError = null
			},
			SwiperChange: function(e) { //滑动事件
				var _this = this
				console.log("swiperchange",e.target.current)
				_this.$set(_this.subjectList[e.target.current],"showImg",true);
				
				let index = e.target.current;
				if (index != undefined) {
					this.subjectIndex = index;
				}
								
			},
			
			RadioboxChange : function(e) { //单选选中
			
				var items = this.subjectList[this.subjectIndex].optionList;
				var values = e.detail.value;
				this.subjectList[this.subjectIndex].userAnswer = values;
				if(this.autoRadioNext && this.subjectIndex < this.subjectList.length - 1){
					this.subjectIndex += 1;						
					};
				
			},
			CheckboxChange: function(e) { //复选选中

				var items = this.subjectList[this.subjectIndex].optionList;
				var values = e.detail.value;
				this.subjectList[this.subjectIndex].userAnswer = "";
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].id == values[j]) {

							this.subjectList[this.subjectIndex].userAnswer += items[i].id;
							break
						}
					}
				}
			},
			textInput : function(e) { //填空题
			
				this.subjectList[this.subjectIndex].userAnswer = e.detail.value;
				
			},			
			ShowAnswerChange: function(e) { //显示答案
			
				if(this.subjectList[this.subjectIndex].showAnswer)
				{
					this.subjectList[this.subjectIndex].showAnswer=false;					
				}
				else{
					
					this.subjectList[this.subjectIndex].showAnswer=true;
				}				
			},
			
			
			MoveSubject: function(e) { //上一题、下一题

				if (e === -1 && this.subjectIndex != 0) {
					this.subjectIndex -= 1;
				}
				if (e === 1 && this.subjectIndex < this.subjectList.length - 1) {
					this.subjectIndex += 1;
				}
			},
			
			AppointedSubject: function(e) { //题卡指定
				
					this.modalCard = null;
					this.subjectIndex = e;									
			},			
			
			SubmitError: function(e) { //提交纠错
				
					this.modalError = null;														
			},
			
			getQuestions(num,qList){
				var questionList = qList
				var result = [];
				
				questionList.sort(function(){
					return Math.random() > .5 ? -1: 1
				})
				for (var m = 0; m < num; m++) {	
					let item = questionList[m]
					result.push(item);
				};
				console.log("questions",result)
				for (var n in result){
					console.log("n in result", n, result[n].selected)
					result[n].selected = -1
					if (n == 0){
						result[n].showImg = true
					}
				}
				// this.subjectList = result
				// this.subjectIndex = 0
				return result
			},
			resetQuestions(){
				var _this = this
				console.log('remove current type',_this.currentType)
				uni.removeStorageSync(_this.currentType)
				_this.setQuestions()
				// for (var i in this.subjectList){
				// 	this.subjectList[i].isSelected = false
				// 	this.subjectList[i].isCorrect = null
				// 	this.subjectList[i].selected = -1
				// }
				_this.AppointedSubject(0)
			},
			setQuestions(){
				var _this = this
				var qList = []
				
				try {
					const saveQuestions = uni.getStorageSync(_this.currentType)
					if (saveQuestions.length > 0){
						console.log('load history questions success', saveQuestions)
						_this.subjectList = saveQuestions
						_this.subjectIndex = 0
					}else{
						if (_this.currentType){
							var type = _this.currentType
							if (type == "allSign"){
								qList = signQuestion.data
							}else if (type == 'allRule'){
								qList = ruleQuestion.data
							}else if (type == 'selfTest'){
								qList = _this.getQuestions(20,ruleQuestion.data).concat(_this.getQuestions(20,signQuestion.data))
							}else{
								qList = _this.getQuestions(signQuestion.data.length,signQuestion.data).concat(_this.getQuestions(ruleQuestion.data.length,ruleQuestion.data))
							}
						}
						// console.log("get questions",qList, _this.getQuestions(20,signQuestion.data))
						_this.subjectList = _this.getQuestions(qList.length,qList)
						_this.AppointedSubject(0)
					}
				}catch(e){
					if (_this.currentType){
						var type = _this.currentType
						if (type == "allSign"){
							qList = signQuestion.data
						}else if (type == 'allRule'){
							qList = ruleQuestion.data
						}else if (type == 'selfTest'){
							qList = _this.getQuestions(20,ruleQuestion.data).concat(_this.getQuestions(20,signQuestion.data))
						}else{
							qList = _this.getQuestions(signQuestion.data.length,signQuestion.data).concat(_this.getQuestions(ruleQuestion.data.length,ruleQuestion.data))
						}
					}
					// console.log("get questions",qList, _this.getQuestions(20,signQuestion.data))
					_this.subjectList = _this.getQuestions(qList.length,qList)
					_this.AppointedSubject(0)
				}
				_this.countAnswers()
			},
			getAnswer(e){
				console.log("getAnswer",e)
				if(e.isCorrect){
					let _this = this
					setTimeout(function () {
						_this.MoveSubject(1)
					}, 300);
				}
				if(e){
					for (var i in this.subjectList){
						if (e.id == this.subjectList[i].id){
							this.subjectList[i] = e
						}
					}
					uni.setStorageSync(this.currentType,this.subjectList)
				}
				this.countAnswers()
			},
			countAnswers(){
				var answer = [0,0,this.subjectList.length]
				for (var i in this.subjectList){
					if (this.subjectList[i].isCorrect == true){
						answer[0] += 1
					}else if (this.subjectList[i].isCorrect == false){
						answer[1] += 1
					}
					if (this.subjectList[i].isSelected == true){
						answer[2] -= 1
					}
				}
				this.choice = answer
			},
			checkAnswer(){
				uni.navigateTo({
					url:"/pages/self-test/self-test-result?results=" + JSON.stringify(this.subjectList) + "&type=" + this.currentType
				})
			},
			checkCorrect(){
				var totalCorrect = 0
				for(var i=0;i<this.subjectList.length;i++){
					var answer = this.subjectList[i]
					if (answer.isCorrect){
						totalCorrect+=1
					}
				}
				return totalCorrect.toString()
			},
			checkSheet(info){
				console.log('check info',info)
				if (info.isSelected){
					if (info.isCorrect){
						return 'correct'
					}else{
						return 'wrong'
					}
				}else{
					return ''
				}
			},
			// show answers list
			topic(e){
				this.swiperIndex = e + 1
				this.show_hide = !this.show_hide
			},
			showFixed(){
				console.log("show fixed work",this.show_hide)
				this.show_hide = !this.show_hide
			},
			hideFixed(){
				this.show_hide = !this.show_hide
			},
			nullFixed(){
				//占位 不可删
			}
			
		},
		components:{
			selfTestItem
		}
	}
</script>

<style lang='less'>
	@import "../../common/css/colorui/animation.css";
	page {
		background-color: #FFFFFF;
	}
	.self-test-main{
		/* height:100%; */
		width:100%;
		/* overflow: hidden; */
	}
	.cu-form-group {
		justify-content: flex-start
	}

	.cu-form-group .title {
		padding-left: 30upx;
		padding-right: 0upx;
	}

	.cu-form-group+.cu-form-group {
		border-top: none;
	}

	.cu-bar-title {
		min-height: 50upx;
	}
	
	.cu-list.menu>.cu-item-error{justify-content: flex-start;}
	
	.count-question{
		font-size: 36upx;
		text-align: right;
		width: 670upx;
		padding: 0upx 0upx;
	}
	.text-current-index{
		font-size: 40upx;
		font-weight: 500;
		color: #00bf8f;
	}
	
	.fixed-bottom{
		width:100%;
		height:100%;
		position: fixed;
		left:0;
		top:0;
		z-index: 999;
		background:rgba(0,0,0,.4);
		pointer-events: none;
		opacity: 0;
		transition:all .3s;
		.tibiao{
			position: absolute;
			bottom:0;
			left:0;
			background: #fff;
			width:100%;
			overflow: auto;
			height: 50%;
			padding:30rpx 20rpx;
			.tibiao-bar{
				display: flex;
				flex-direction: row-reverse;
				padding-bottom: 30rpx;
				border-bottom: solid 1px #ddd;
				height:16px;
				line-height: 16px;
				view{
					width:10px;
					height:10px;
					border-radius: 50%;
					margin-left: 30rpx;
					margin-top:3px;
					&.tibiao-yes{
						background:#00bf8f;
					}
					&.tibiao-no{
						background:#e3494a;
					}
					&.tibiao-null{
						background:#999;
					}
				}
				text{
					margin-left:3px;
					display: inline-block;
					font-size: 13px;
					&.tibiao-yes2{
						color:#00bf8f;
					}
					&.tibiao-no2{
						color:#e3494a;
					}
					&.tibiao-no3{
						color:#666;
					}
				}
			}
			&>view{
				&:nth-child(2){
					text{
						margin-left:22rpx;
						margin-top:10rpx;
						display: inline-block;
						width:100rpx;
						height:100rpx;
						line-height: 100rpx;
						text-align: center;
						border-radius: 50%;
						font-size: 14px;
						color:#666;
						background:#e4e4e4;
						&:nth-child(6n+1){
							margin-left:0;
						}
						&.active_o{
							background:#00bf8f;
							color:#ffffff;
						}
						&.active_t{
							background:#e3494a;
							color:#ffffff;
						}
					}
				}
			} 
		}
		&.active {
			opacity: 1;
			pointer-events: auto;
			transition:all .3s;
		}
	}
</style>
