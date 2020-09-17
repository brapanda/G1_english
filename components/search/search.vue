<template>
	<view class="search-input-view">
		<view class="search-span"></view>
		<fa-icon type="search" size="15" color="#666666"></fa-icon>
		<view class="search-span"></view>
		<input :focus="focus" confirm-type="search" @confirm="confirm" ref="search" class="search-input" type="text" placeholder="输入搜索关键词" />
	</view>
</template>

<script>
	import faIcon from '@/components/fa-icon/fa-icon.vue'
	export default{
		data(){
			return {
			};
		},
		components:{
			faIcon
		},
		methods:{
			confirm(e){
				this.$emit('confirm', e);
			}
		},
		props:{
			focus:{
				type:Boolean,
				default: false
			}
		}
	}
</script>

<style>
.search-span{
	width: 20upx;
}
.search-input-view {
	width: 100%;
	height:63upx;
	display: flex;
	align-items:center;
	background-color: #e7e7e7;
	border-radius: 28upx;
	flex-wrap:nowrap;
	font-size: 28upx;
	overflow: hidden;
	margin: 10upx 0upx;
}

.search-input {
	height:100%;
	background-color: #e7e7e7;
	flex:1;
	text-align: left;
}
</style>
