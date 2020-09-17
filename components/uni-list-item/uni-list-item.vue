<template>
	<view class="uni-list-item" :class="[disabled === true || disabled === 'true' ? 'uni-list-item--disabled' : '']" :hover-class="disabled === true || disabled === 'true' || showSwitch === true || showSwitch === 'true' ? '' : 'uni-list-item--hover'" @click="onClick">
		<view class="uni-list-item__container">
			<view class="uni-list-item__icon" v-if="thumb">
				<image class="uni-list-item__icon-img" :src="thumb"></image>
			</view>
			<view class="uni-list-item__icon" v-else-if="showExtraIcon === true || showExtraIcon === 'true'">
				<fa-icon :color="extraIcon.color" :size="extraIcon.size" :type="extraIcon.type"></fa-icon>
			</view>
			<view class="uni-list-item__content">
				<view class="uni-list-item__content-title">{{title}}</view>
				<view class="uni-list-item__content-note" v-if="note">{{note}}</view>
			</view>
			<view class="uni-list-item__extra" v-if="showBadge === true || showBadge === 'true' || showArrow === true || showArrow === 'true'||showSwitch === true || showSwitch === 'true'">
				<uni-badge v-if="showBadge === true || showBadge === 'true'" :type="badgeType" :text="badgeText"></uni-badge>
				<switch v-if="showSwitch === true || showSwitch === 'true'" color="#00bf8f" :disabled='disabled' :checked="switchChecked" @change="onSwitchChange" />
				<fa-icon v-if="showArrow === true || showArrow === 'true'" color="#bbb" size="20" type="angle-right"></fa-icon>
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
			title: String, //列表标题
			note: String, //列表描述
			disabled: { //是否禁用
				type: [Boolean, String],
				default: false
			},
			showArrow: { //是否显示箭头
				type: [Boolean, String],
				default: true
			},
			showBadge: { //是否显示数字角标
				type: [Boolean, String],
				default: false
			},
			showSwitch: { //是否显示Switch
				type: [Boolean, String],
				default: false
			},
			switchChecked: { //Switch是否被选中
				type: [Boolean, String],
				default: false
			},
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
	@import "./uni-list-item.css";
</style>