<template>
	<view class="uni-list-item"  @click="onClick">
		<view class="uni-list-item__container">
			<view class="item-left" :class="{'title-setting':isTitle}">
				<view class="uni-list-item__content-title">{{title}}</view>
			</view>
			<view class="item-center" :class="{'title-setting':isTitle}">
				<view class="uni-list-item__content-title" :style="'color:' + answerColor(isTitle,selected,note)">{{selected}}</view>
			</view>
			<view class="item-center" :class="{'title-setting':isTitle}">
				<view :style="'color:' + textColor">{{note}}</view>
			</view>
			<view class="item-right" :class="{'title-setting':isTitle}">
				<text :style="'color:' + textColor">{{type}}</text>
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
				choice : ["A","B","C","D"],
				colors : ["#00bf8f","#e3494a"]
			};
		},
		props: {
			info: {},
			
			isTitle: false,
			title: String, //列表标题
			selected: "",
			note: String, //列表描述
			type: String,
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
			},
			
			answerColor(isTitle,selected,note){
				if (isTitle){
					return ''
				}else{
					if (selected == note){
						return '#00bf8f'
					}else{
						return '#da4f49'
					}
				}
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
		width: 230upx;
		text-align: left;
	}
	.item-center{
		width: 230upx;
		text-align: center;
	}
	.item-right{
		width: 230upx;
		text-align: right;
	}
</style>