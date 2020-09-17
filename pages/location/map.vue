<template>
	<view>
		<web-view progress="true" :webview-styles="webviewStyles" :src="'/hybrid/html/mapView.html'" @message="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data(){
            return {
				webviewStyles: {
                    progress: {
                        color: '#00bf8f'
                    }
                }
            };
        },
		methods: {
			getMessage(e) {
				uni.showModal({
					content: JSON.stringify(e.detail),
					showCancel: false
				})
			}
		},
		onLoad: function (params) { //option为object类型，会序列化上个页面传递的参数
			
		}
	}
</script>

<style>
</style>
