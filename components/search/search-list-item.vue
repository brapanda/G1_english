<template>
	<view class="uni-list-item" :class="[disabled === true || disabled === 'true' ? 'uni-list-item--disabled' : '']" :hover-class="disabled === true || disabled === 'true' || showSwitch === true || showSwitch === 'true' ? '' : 'uni-list-item--hover'" @click="onClick">
		<view class="uni-list-item__container">
			<view class="item-left" :class="{'title-setting':isTitle}">
				<view class="uni-list-item__content-title">{{title}}</view>
			</view>
			
			<view class="item-right" :class="{'title-setting':isTitle}">
				<text :style="'color:' + textColor">{{note}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import uniBadge from '../uni-badge/uni-badge.vue'
	export default {
		name: 'uni-list-item',
		components: {
			uniBadge
		},
		data() {
			return {
				
			};
		},
		props: {
			isTitle: false,
			title: String, //列表标题
			selected: "",
			note: String, //列表描述
			textColor: "",//描述字体颜色
			icon: "",
			isCurrect: false,
			
			badgeText: String, //badge内容
			badgeType: { //badge类型
				type: String,
				default: 'success'
			},
			thumb: String, //缩略图
			showExtraIcon: { //是否显示扩展图标
				type: [Boolean, String],
				default: false
			},
			extraIcon: {
				type: Object,
				default () {
					return {
						type: "contact",
						color: "#000000",
						size: "20"
					};
				}
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			},
			onSwitchChange(e) {
				this.$emit('switchChange', e.detail)
			}
		}
	}
</script>

<style>
	@charset "UTF-8";
	@import "../uni-list-item/uni-list-item.css";
	
	.title-setting{
		font-size: 30upx;
		font-weight: 500;
		color: #000000;
	}
	
	.tag-style{
		border-radius: 10upx;
		font-size: 24upx;
		font-weight: 500;
		height: 45upx;
		color: white;
	}
	.item-left{
		width: 345upx;
		text-align: left;
	}
	.item-center{
		width: 230upx;
		text-align: center;
	}
	.item-right{
		width: 345upx;
		text-align: right;
	}
</style>