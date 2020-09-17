<template>
	<view class="cu-card case mpg-container" >
		<view class="cu-item shadow" :style="'background:'+info.background">
			<view class="image">
				<image class="category-size" mode="aspectFit" :src="categoryImage" />
			</view>
			<view>
				<view style="padding:20upx 40upx;font-weight: 400;">
					<text style="font-weight: 500;font-size: 32upx;">{{info.tabName + " "}}</text>
					{{info.desc}}
				</view>
				<view style="padding:10upx 40upx;font-weight: 500;font-size: 32upx;">投放要求:</view>
				<view class="category-detail-text" style="padding:0upx 40upx;margin-bottom: 20upx;font-weight: 400;line-height:40upx;" v-for="(item,index) in info.require" key="index">
					<view>{{"●" + " "}}</view>
					<view style="margin: 0upx 10upx 0upx 20upx">{{item}}</view>
				</view>
				<view style="padding:0upx 40upx;margin-bottom: 40upx;font-weight: 400;line-height:40upx;"></view>
			</view>
		</view>
		<view class="cu-list menu sm-border card-menu margin-top">
			<wordListItem :title="item" :note="info.tabName" :textColor="info.color" show-extra-icon="true" show-arrow="false" v-for="(item,index) in info.list" :key="index"></wordListItem>
		</view>
		<view class="margin-top"></view>
	</view>
</template>

<script>
	import wordListItem from '@/components/main-page-item/word-list-item.vue'
	
	export default{
		data(){
			return {
				categoryImage: ''
			};
		},
		components:{
			wordListItem
		},
		methods:{
		},
		mounted() {
			this.categoryImage = this.info.categoryImage
			console.log("info",this.info)
		},
		props:{
			info:{}
		},
		onLoad() {
			
		}
	}
</script>

<style>
	
.category-size{
	width: 300upx;
	height: 300upx;
	padding: 40upx;
}

.mpg-container{
	margin: 10upx 50upx; 
	overflow-y: scroll;
	height: 100%;
}
.category-detail-text{
	flex:1;
	flex-direction: row;
	display: flex;
}

</style>
