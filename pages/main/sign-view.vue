  <template> 
	<view class="main-container m-column" :style="'height:100%'">
		<view class="bg-white searchBar-frame">
			<!-- <view class="search-form round">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索垃圾名称" confirm-type="search" @confirm="search" @input="onKeyInput"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow-blur round" @click="search">搜索</button>
			</view> -->
		</view>
		<view class="list-box" >
			<view 
				v-for="(item,index) in saveSignData" 
				:key="index"
				:class="{'active':item.active}"
			>
			<!-- #ifdef APP-PLUS || H5 -->
			<image :src="'../../static/signs/'+item.question + '.jpg'" mode="aspectFit" lazy-load="true"></image>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<image :src="'https://image.youju.ca/public/uni-G1/g1cn/'+item.question + '.jpg'" mode="aspectFit" lazy-load="true"></image>
			<!-- #endif -->
				<view class="sign-text">{{getCorrectAnswer(item)}}</view>
			</view>
		</view>
		<view class="load">{{loadTxt}}</view>
    </view>
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
				tabList:[
					{tabName: '考试需知',color:'#ee0088'},
					{tabName: '路牌辨识',color:'#002288'}
				],
				
				// photoList:["http://seopic.699pic.com/photo/50046/5562.jpg_wh1200.jpg","http://seopic.699pic.com/photo/50046/5562.jpg_wh1200.jpg"],
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
		// onPullDownRefresh() {
		// },
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
			onKeyInput: function(event){
				this.inputKey = event.target.value 
			},
			search(){
				uni.navigateTo({
					url: '/pages/search/search?key=' + this.inputKey
				});
			},
			
			// uni app segment control
			async changeTab(e) {
				let index = e.target.current;
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题
			},
			getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
			},
			async tapTab(e) { //点击tab-bar
				let tabIndex = e.target.dataset.id;
				if (this.tabIndex === tabIndex) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollLeft = (e.currentTarget.dataset.id - 1) * 60; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = tabIndex;
				}
			},
			
			// tab bar 
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				console.log("tab item",this.TabCur)
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			
			
			
			// 图片加载
			/* 获取照片 */
			getPhoto(){
				var _this = this
				if(!this.isGet){
					return;
				}
				this.isGet=false;
				new Promise((success,error)=>{
					/* 第一页弹出加载层 */
					if(this.page==1){
						uni.showLoading({
							title:'Loading',
							mask:true
						})
					}else{
						this.loadTxt="Loading";
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
					var beginIndex = _this.rows * (_this.page - 1)
					var endIndex = _this.rows * _this.page
					console.log('res show',_this.signData.slice(beginIndex,endIndex))
					if(this.page==1){
						uni.hideLoading();
					}
					this.saveSignData= _this.saveSignData.concat(_this.signData.slice(beginIndex,endIndex))
					this.showImages();
				})
			},
			/* 显示照片 */
			showImages(){
				var _this = this
				let index=(this.page-1)*this.rows;
				let show=()=>{
					if(index<this.saveSignData.length){
						_this.$set(this.saveSignData[index],"active",true);
						index++;
					}else{
						clearInterval(interval);
						_this.loadTxt="Pull Up to Load More";
						_this.page++;
						_this.isGet=true;
						if (_this.page*_this.rows >= _this.signData.length){
							_this.loadTxt = "No More Signs"
						}
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
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '../user/user',
			});
		},
		onReady() {
		},
        onLoad() {
			var _this = this;
			var info = uni.getSystemInfo({
				success(res) {
					_this.height = res.windowHeight + 'px';
				}
			})
			
			_this.signData = signQuestion.data
			console.log('load sign question',signQuestion)
			_this.getPhoto()
			for (var i in signQuestion){
				
			}
        },
		onShow() {
		}
    }
</script>

<style lang='scss'>
	.tab-large-font{
		font-size: 36upx;
	}
	.searchBar-frame{
		width: 750upx;
	}
	.main-tab-style{
		font-weight: 800;
	}
	
	.uni-tab-bar-loading {
		text-align: center;
		font-size: 28upx;
		color: #999;
	}
	.category-tap-view{
		height: 100%;
		-webkit-overflow-scrolling: touch;
	}
	
	.main-container{
		background:#fbfbfb;
		overflow-y: auto;
	}
	
	
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
