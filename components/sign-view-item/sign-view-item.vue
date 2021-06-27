<template>
	<scroll-view>
		<view class="list-box">
			<view 
				v-for="(item,index) in saveSignData" 
				:key="index"
				:class="{'active':true}"
			>
				<!-- #ifdef APP-PLUS || H5-->
				<image :src="'/static/signs/'+item.question + '.jpg'" mode="aspectFit" lazy-load="true"></image>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<image :src="'https://image.youju.ca/public/uni-G1/g1en/'+item.question + '.jpg'" mode="aspectFit" lazy-load="true"></image>
				<!-- #endif -->
				<view class="sign-text">{{getCorrectAnswer(item)}}</view>
			</view>
		</view>
		<view class="load">{{loadTxt}}</view>
	</scroll-view>
</template>

<script>
	import signQuestion from '@/static/data/question_sign_json.json'
	
	
	export default {
		data() {
			return {
				height:"0px",
				TabCur : 0,
				scrollLeft: 0,
				isClickChange: false,
				tabIndex: 0,
				inputKey: "",
				
				
				signData: [],
				saveSignData: [],
				rows:10,
				page:1,
				isGet:true,
				loadTxt:""
			};
		},
		components:{
		},
		computed:{
		},
		onPageScroll() {
		},
		onReachBottom(){
			console.log("on reach bottom")
			this.getPhoto();
		},
		methods:{
			// search bar setting
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			
			// 图片加载
			/* 获取照片 */
			getPhoto(){
				if(!this.isGet){
					return;
				}
				this.isGet=false;
				new Promise((success,error)=>{
					/* 第一页弹出加载层 */
					if(this.page==1){
						uni.showLoading({
							title:'加载中',
							mask:true
						})
					}else{
						this.loadTxt="正在加载中";
					}
					/* 无真实图片请求接口，由 setTimeout 模拟异步过程 */
					setTimeout(()=>{
						/* 拼接图片路径字符串 */
						let joinUrlStr=(num)=>{
							return {
								index:num,
								url:`/static/logo.png`
							}
						}
						let list=[];
						for(let i=0;i<10;i++){
							list.push(joinUrlStr((this.page-1)*this.rows+i))
						}
						success(list);
					},1000);
				}).then((res)=>{
					if(this.page==1){
						uni.hideLoading();
					}
					this.saveSignData=[...this.signData,...res];
					this.showImages();
				})
			},
			/* 显示照片 */
			showImages(){
				let index=(this.page-1)*this.rows;
				let show=()=>{
					if(index<this.signData.length){
						this.$set(this.signData[index],"active",true);
						index++;
					}else{
						clearInterval(interval);
						this.loadTxt="上拉加载更多";
						this.page++;
						this.isGet=true;
					}
				}
				
				let interval=setInterval(()=>{
					show();
				},100);
			},
			/* 预览照片 */
			previewPhoto(e){
				let index=e.currentTarget.dataset.index;
				let list=this.signData.map((item,index)=>{
					return 'https://youju.nyc3.digitaloceanspaces.com/G1/sign-cn/'+item.question + '.jpg';
				});
				
				uni.previewImage({
					current:list[index],	/* 传 Number H5 端出现不兼容 */
					urls: list
				});
			},
			// get correct answer
			getCorrectAnswer(info){
				for (var i in info.options){
					if (info.options[i].correct == 'true'){
						return info.options[i].text
					}
				}
				return ''
			}
		},
		onNavigationBarSearchInputClicked(e) {
			uni.navigateTo({
				url: '/pages/search/search?key=' + this.inputKey
			});
		},
		mounted() {
			var _this = this
			_this.signData = signQuestion.data
			console.log('load sign question',signQuestion)
			_this.getPhoto()
			for (var i in signQuestion){
				
			}
		},
	  //   onLoad() {
			// var _this = this;
			// var info = uni.getSystemInfo({
			// 	success(res) {
			// 		_this.height = res.windowHeight + 'px';
			// 	}
			// })
			
			// _this.signData = signQuestion.data
			// console.log('load sign question',signQuestion)
			// for (var i in signQuestion){
				
			// }
	  //   },
		onShow() {
		}
	}
</script>

<style>
	/* sign page */
	.list-box {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		align-content: flex-start;
		padding: 20upx 20upx 0 20upx;
		line-height: 30upx;
		font-size: 28upx;
		color: #333;
	
		&>view {
			background-color: #fff;
			width: 345upx;
			padding: 20upx;
			margin-bottom: 20upx;
			box-sizing: border-box;
			opacity: 0;
			transform:translateY(40upx);
			transition: all 0.3s ease-in-out 0s;
			
			&.active{
				opacity: 1;
				transform:translateY(0);
			}
		}
		
		image{
			width: 100%;
			height: 300upx;
			margin-bottom: 10upx;
		}
	}
	
	.load{
		line-height: 80upx;
		text-align: center;
		font-size: 24upx;
		color: #999;
		padding-bottom: 20rpx;
	}
	.sign-text{
		text-align: center;
		font-size: 28upx;
		font-weight: 600;
		font-family: 'Gill Sans', sans-serif;
	}
</style>
