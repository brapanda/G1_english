<template>
	<view class="width-full bg-color">
		<view class="cu-bar search">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input focus="true" v-model="inputKey" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索地址、MLS#" confirm-type="search" @confirm="search"></input>
			</view>
		</view>
		<view v-if="isHistory" class="history-box">
			<view v-if="historyList.length > 0">
				<view class="history-title">
					<text>搜索历史</text>
					<fa-icon type="trash-o" size="20" @click="clearSearch"></fa-icon>
				</view>
				<view class="history-content">
					<view class="history-item" v-for="(item, index) in historyList" @click="historyTap(item)" :key="index">
						{{ item.name }}
					</view>
				</view>
			</view>
			<view v-else class="no-data">您还没有历史记录</view>
		</view>
		<view v-else class="history-box">
			<view v-if="historyList.length > 0" class="history-list-box">
				<view
					class="history-list-item"
					v-for="(item, index) in historyList"
					:key="index"
					@click="historyTap(item)"
				>
					<!-- <rich-text :nodes="item.nameNodes"></rich-text> -->
				</view>
			</view>
			<view v-else class="no-data">没有搜索到相关内容</view>
		</view>
		
		<!-- <view class="result-view" v-if="resultList.length > 0"> -->
		<view class="cu-list menu sm-border card-menu margin-top" style="width:690upx;" v-if="resultList.length > 0">
			<search-item style="width:100%;" :title="item.n" :selected="emptySelected" :note="categoryDic[item.c]" :textColor="colorDic[item.c]" v-for="(item,index) in resultList" :key="index"></search-item>
			<view class="margin-top"></view>
		</view>
		<!-- </view> -->
		<view v-else class="no-data" v-show="historyList.length > 0">没有搜索到相关内容</view>
	</view>
</template>

<script>
import mSearch from '@/components/search/search.vue'
import {setSearchHis,getSearchHis,clearSearchHis,authRequest,isLogin,garbageData} from '@/common/js/util.js'
// import propertyHistorySmall from '@/components/property-list-item/property-list-history-small.vue'
import searchItem from '@/components/search/search-list-item.vue'
	
export default {
	data() {
		return {
			historyList: [],
			isHistory: true,
			list: [],
			flng: true,
			timer: null,
			input:"xxxxx",
			resultList:[],
			userLogin: false,
			inputKey: "",
			emptySelected: '',
			categoryDic:{
				0: "x",
				1: "湿垃圾",
				2: "干垃圾",
				3: "可回收垃圾",
				4: "有害垃圾",
				5: "不属于日常生活垃圾",
				6: "装修垃圾,请咨询物业",
				7: "大件垃圾,请咨询物业"
			},
			colorDic:{
				1: "#7e5132",
				2: "#000000",
				3: "#2c2884",
				4: "#ff4765",
				5: "#2a2a2a",
				6: "#2a2a2a",
				7: "#2a2a2a",
			}
		};
	},
	components:{
		mSearch,
		searchItem
		// propertyHistorySmall
	},
	onLoad: function(keys) {
		this.historyList = getSearchHis() || [];
		// this.userLogin = isLogin()
		if(keys){
			if (keys.key){
				this.inputKey = keys.key
				this.getSearchData(this.inputKey)
			}
			console.log("input key",keys.key)
		}
		//this.$refs.search.$refs.search.focus = true;
	},
	methods:{
		InputFocus(e) {
			this.InputBottom = e.detail.height
		},
		InputBlur(e) {
			this.InputBottom = 0
		},
		getSearchData(val){
			if(!val) return;
			
			if(val.length > 20){
				uni.showToast({
					title: '搜索内容太长',
					mask: false,
					duration: 1500
				});
				return;
			}
			
			setSearchHis(val);
			this.historyList = getSearchHis();
			
			uni.showLoading({
				title: "搜索中...",
				mask: false
			});
			var _this = this;
			_this.resultList = [];
			//访问接口
			for (var i in garbageData){
				if((garbageData[i].n).includes(val)){
					_this.resultList.push(garbageData[i])
				}
			}
			uni.hideLoading()
			console.log("compared words",_this.resultList)
			// authRequest("/api/map/search?q=" + val, null, "GET").then(
			// 	function(result){
			// 		console.log(result);
			// 		uni.hideLoading();
			// 		
			// 		if(result && result.statusCode == 200 && result.data && result.data.count > 0){
			// 			_this.resultList = result.data.data;
			// 		}else{
			// 			_this.resultList = [];
			// 		}
			// 	}
			// );
		},
		historyTap(item) {
			this.getSearchData(item.name);
		},
		clearSearch() {
			var _this = this;
			uni.showModal({
				title: '提示',
				content: '是否清理全部搜索历史？该操作不可逆。',
				success: res => {
					if (res.confirm) {
						clearSearchHis();
						_this.historyList = [];
						_this.resultList = [];
					}
				}
			});
		},
		search(e){
			this.getSearchData(e.target.value);
		}
	},
	onNavigationBarSearchInputChanged(e) {
		console.log('输入时触发');
		//当 searchInput 输入时触发
		uni.showToast({
			title: '输入时触发',
			mask: false,
			duration: 1500
		});
		return;
		let text = e.text;
		if (!text) {
			this.isHistory = true;
			this.historyList = [];
			this.historyList = uni.getStorageSync('search:history');

			return;
		} else {
			this.isHistory = false;
			this.getInputtips(text);
		}
	},
	onNavigationBarSearchInputConfirmed(e) {
		//点击软键盘搜索按键触发
		console.log('键盘搜索')
		console.log(e);
		this.getSearchData(e.text);
	},
	onNavigationBarButtonTap() {
		//点击导航栏 buttons 时触发
		uni.showModal({
			title: '提示',
			content: '用户点击了功能按钮，这里仅做展示操作。',
			success: res => {
				if (res.confirm) {
					console.log('用户点击了确定');
				}
			}
		});
	}
};
</script>

<style>
.bg-color{
	background: #fbfbfb;
}
.history-box{
	font-size: 28upx;
}

.history-title {
	display: flex;
	justify-content: space-between;
	padding: 20upx 30upx;
	padding-bottom: 0;
	font-size: 34upx;
	color: #333;
}
.history-title .uni-icon {
	font-size: 40upx;
}
.history-content {
	display: flex;
	flex-wrap: wrap;
	padding: 15upx;
}
.history-item {
	padding: 4upx 35upx;
	border: 1px #f1f1f1 solid;
	background: #fff;
	border-radius: 50upx;
	margin: 12upx 10upx;
	color: #999;
}
.history-list-box {
	/* margin: 10upx 0; */
}
.history-list-item {
	padding: 15upx 15;
	margin-left: 15upx;
	border-bottom: 1px #EEEEEE solid;
	font-size: 28upx;
}

.result-view{
	background: white;
	padding: 10upx 10upx 0upx 10upx;
}
</style>
