<template>
	<view class="width-full">
		<view class="m-module-top-span" v-if="showTopSpan"></view>
		<view class="m-module-container" >
			<view class="m-module-title" :style="{ 'border-left-color' : leftIconColor }">{{title}}</view>
				<!-- <fa-icon size="25" type="bar-chart" color="black"></fa-icon> -->
				<view>
					<slot></slot>
				</view>
		</view>
		<view class="m-module-bottom-line" v-if="showBottomSpan"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			click(e){
				console.log(JSON.stringify(e));
				this.$emit('rightIconClick', e)
			}
		},
		props:{
			title:{
				type:String
			},
			leftIconColor:{
				type:String,
				default:"#0ea391"
			},
			showTopSpan:{
				type:Boolean,
				default:false
			},
			showBottomSpan:{
				type:Boolean,
				default:false
			},
			showRightIcon:{
				type:Boolean,
				default:false
			},
			rightIcon:{
				type:String
			},
			rightIconColor:{
				type:String,
				default: 'black'
			}
		}
	}
</script>

<style scoped="true">
	.m-module-container{
		padding:20upx 20upx;
		flex-wrap:nowrap;
		background: white;
		display: flex;
		font-size: 32upx;
	}
	.m-module-title{
		flex:1;
		padding-left: 10upx; 
		color: #000000;
		border-left: #0ea391 solid 10upx ;
	}

	.m-module-top-span{
		background: #EEEEEE;
		height: 20upx;
		width: 100%;
	}
	
	.m-module-bottom-line{
/* 		border-bottom-style: solid;
		border-bottom-color: #EEEEEE; */
		width: 100%;
		height: 1upx;
		background: #eee;
	}
</style>
