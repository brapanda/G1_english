<template>
	<view class="m-column check-form">
		<view class="check-title">验证邮箱</view>
		<view class="check-content">
			验证码已经发送至邮箱：<br>
			{{email}}<br>
			请将验证码输入到下面的输入框中验证。
		</view>
		<view class="check-input">
			<input  v-model="code" type="number" min="0000" max="9999" placeholder="输入4位数字验证码">
		</view>
		<button class="check-btn" @click="verifyCheck">确定</button>
		<button class="check-btn" @click="cancel">取消</button>
	</view>
</template>

<script>
	import {zRequest} from '@/common/js/util.js'
	export default{
		data(){
			return{
				code:''
			}
		},
		methods:{
			verifyCheck(){
				if(!this.code || this.code.length !== 4){
					uni.showToast({
						title: '请输入正确的验证码',
						mask: false,
						duration: 1500
					});
					return;
				}
				
				this.$emit('verify', this.code);
			},
			cancel(){
				this.$emit('cancel');
			}
		},
		props:{
			isRegist:{
				type:Boolean,
				default:false
			},
			isForget:{
				type:Boolean,
				default:false
			},
			email:{
				type:String
			}
		}
	}
</script>

<style scoped="true">
	.check-form{
		width: 483upx;
		/* padding: 25upx; */
	}
	.check-title{
		text-align: center;
		font-size: 35upx;
		margin-bottom: 25upx;
	}
	.check-content{
		text-align: center;
		font-size: 28upx;
	}
	.check-btn{
		margin-top: 25upx;
		margin-left: 0upx;
		margin-right: 0upx;
		line-height: 75upx;
		font-size: 33upx;
	}
	.check-input{
		border: red 1upx solid;
		border-radius: 5upx;
		margin-top: 25upx;
		font-size: 25upx;
		padding: 0 15upx;
	}
</style>
