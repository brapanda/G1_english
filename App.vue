<script>
	import Vue from 'vue'
    export default {
        onLaunch: function() {
            console.log('App Launch');
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif       
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
        },
        onShow: function() {
            console.log('App Show');
        },
        onHide: function() {
            console.log('App Hide');
        }
    }
</script>

<!-- <style>
	@import url("/static/css/mint-ui-style.css");
</style> -->
<style>
	/* @import "./common/css/uni.css" */
    /*每个页面公共css */
    /* uni-app默认全局使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。如不使用flex布局，请删除或注释掉本行。*/
	
	@import './common/css/colorui/main.css';
	@import './common/css/colorui/icon.css';
	
	.content {
	    display: flex;
	    flex: 1;
	    flex-direction: column;
	    /* background-color: #efeff4; */
		background-color: white;
	    padding: 20upx;
	}
	
	.module-content{
	  margin:20upx
	}
	
	.detail-content{
	  display: block;
	  margin: 4upx 0upx
	}
	
    body,
    page {
        min-height: 100%;
        display: flex;
    }

    /* #ifdef MP-BAIDU */
    page {
        width: 100%;
        height: 100%;
        display: block;
    }

    swan-template {
        width: 100%;
        min-height: 100%;
        display: flex;
    }

    /* #endif */

    .input-group {
        background-color: #ffffff;
        margin-top: 40upx;
        position: relative;
    }

    .input-group::before {
        position: absolute;
        right: 0;
        top: 0;
        left: 0;
        height: 1upx;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
    }

    .input-group::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 1upx;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
    }

    .input-row {
        display: flex;
        flex-direction: row;
        position: relative;
    }

    .input-row .title {
        width: 20%;
        height: 50upx;
        min-height: 50upx;
        padding: 15upx 0;
        padding-left: 30upx;
        line-height: 50upx;
    }

    .input-row.border::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 15upx;
        height: 1upx;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
    }

    .btn-row {
        margin-top: 50upx;
        padding: 20upx;
    }

    button.primary {
        background-color: #0faeff;
    }
	
	.zero-padding{
		padding:0upx!important;
	}
	
	.background-main-color{
		background-color: #00bf8f!important;
	}
	
	.font-main-color{
		color: #00bf8f!important;
	}
	
	.block-title {
		font-size: 32upx;
		line-height: 32upx;
		color: #777;
		margin: 35upx 25upx 15upx 25upx;
		position: relative;
	}
	
	.summary-main-title {
		/* color: #F25A68; */
	  font-size: 32upx;/*1rem;*/
	  font-weight: 500;
	  padding: 5upx 0upx;
	}
	.summary-sub-title {
		/* color: #F25A68; */
	  font-size: 28upx;/*1rem;*/
	  font-weight: 300;
	  padding: 5upx 0upx;
	}
	.summary-price{
		/* color: #797979; */
	  font-size: 36upx;/*1.1rem;*/
	  /* font-weight: bold; */
	  font-weight: 400;
	  padding: 5upx 0upx;
	}
	.summary-trans-sold{
		font-size: 26upx;
		font-weight: 500;
		padding: 20upx;
	}
	.summary-sold-date{
		font-size: 26upx;
		font-weight: 400;
		padding: 5upx 0upx;
	}
	.summary-house-type {
		/* color: #797979; */
	  font-size: 16upx;/*0.9rem;*/
	  /* font-weight: bold; */
	  margin: 0upx 0upx;
	}
	.summary-dom{
	  font-size: 26upx;/*0.9rem;*/
	}
	
	.uni-swiper-dot{
		width: 12upx !important;
		height: 12upx !important;
		margin-right: 10upx !important;
	}
	
	.uni-swiper-dots{
		width: 90% !important;
		line-height:14upx;
		white-space: normal !important;
	}
	
/* 	.uni-swiper-dots-horizontal{
		width: 100% !important;
	} */
	.col-3 {
	  width: 33.3%;
	}
	.col-5 {
	  width: 50%;
	}
	.col-all {
	  width: 100%;
	}
	.col-display {
	  display: flex;
	  display: -webkit-flex;
	  flex-wrap: wrap;
	}

	.flex-col-1 {
	  width: 100%;
	  padding-left: 20upx;
	  font-weight: 300;
	}
	
	.flex-col-1-address{
	  width: 100%;
	  padding-left: 20upx;
	}

	.flex-col-2 {
	  width: 50%;
	  /* padding: 2px 0px; */
	  font-size: 25upx;
	  /* padding-left: 5px */
	}

	.flex-col-3 {
	  width: 210upx;
	  padding-top: 10upx;
	  font-size: 25upx;
	  font-weight: 300;
	}
	
	.flex-col-3-address {
	  width: 33.33%;
	}
	
	.flex-col-bottom{
		padding: 20upx 20upx;
		font-weight: 300;
	}
	
	.flex-col-even-background{
		background: #fbfbfb;
	}

	.flex-col-6 {
	  width: 66.66666%;
	  font-size: 25upx;
	}

	.width-full{
		width: 100%;
	}

	.height-full{
		height: 100%;
	}

	.search-view{
		display: flex;
		justify-content: center;
	/* 	height: 100px; */
		/* width:100%; */
		padding: 0 20upx;
	}

	.no-data {
		text-align: center;
		color: #999;
		margin: 100upx;
	}
	.m-row{
		display: flex;
		flex-direction: row;
		/* justify-content: space-between; */
	}
	.m-column{
		display: flex;
		flex-direction: column;
	}
	.m-flex-item{
		flex: 1;
	}
	
	.m-txt-center{
		text-align: center;
	}
	
	.m-left-border{
		border-left-style: solid;
		border-left-color:#eee;
		width: 1upx;
	}
	.m-right-border{
 		border-right-style:solid;
		border-right-color:#eee;
		width: 1upx;
	}
	.m-v-line{
		width: 100%;
		height: 1upx;
		background: #eee;
		margin: 10upx 0;
	}
	.m-h-line{
		width: 1upx;
		height: 30upx;
		background: #7a7a7a;
		margin-top: 50upx;
	}
	.m-row-title{
		font-size: 32upx;
		width: 20%;
		height: 26px;
		min-height: 26px;
		padding: 8px 0;
		padding-left: 16px;
		line-height: 26px;
	}
	.m-row-content{
		font-size: 28upx;
		display: flex;
		align-items: center;
	}
	
	.m-btn{
		line-height: 75upx;
		font-size: 33upx;
	}
	.m-title-size{
		font-size: 32upx;
	}
	.m-not-login{
		filter: blur(5px);
	}
</style>
