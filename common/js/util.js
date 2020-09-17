const forcedLogin = true;
var api = "https://youju.zouzuhui.top";//"http://192.168.123.133:8088";//"http://localhost:52979";//"http://192.168.1.12:8088";//"http://youju.ca";//
var md5 = require("@/common/js/md5.min.js");
var CryptoJS = require('@/common/js/crypto-js.min.js');
const noImage = "/static/img/no_image_640x426.jpg";
var emailReg = /^([a-zA-Z0-9.-])+\@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
const appVersion = "1.0.0"
var dataVersionKey = "garbage_key_version"
const dataStorageKey = "garbage_words_storage"
var garbageData = []

function back(word) {
	let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
	let srcs =CryptoJS.enc.Base64.stringify(encryptedHexStr);
	let decrypt = CryptoJS.AES.decrypt(srcs, m, { iv: x, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
	let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
	return decryptedStr.toString();
}

function to(word) {
	let srcs = CryptoJS.enc.Utf8.parse(word);
	let encrypted = CryptoJS.AES.encrypt(srcs, m, { iv: x, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.NoPadding });
	return encrypted.toString();  //返回的是base64格式的密文
}
    

function getProductId(platform){
	if(platform == 'android'){
		return 2;
	}else if(platform == 'ios'){
		return 1;
	}else{
		return 3;
	}
}

function getNetworkType(network){
	if(network == 'wifi'){
		return 1;
	}else if(network == '2g'){
		return 2;
	}else if(network == '3g'){
		return 3;
	}else if(network == '4g'){
		return 4;
	}else if(network == '5g'){
		return 5;
	}else if(network == 'ethernet'){
		return 6;
	}else if(network == 'none'){
		return 7;
	}else{
		return 0;
	}
}

async function getRequestParam(){
	var imei = md5(Date().toString());
	// #ifdef APP-PLUS
		imei = md5(plus.device.imei);
	// #endif
	var systemVersion = 'uk';
	var machine = 'uk';//机器型号
	var productId = 2;//产品id 1iphone 2andorid 3other
	var network = 'uk';
	var channel = 'uk';//产品渠道

	try {
		await uni.getNetworkType({
			success: function (res) {
				network = getNetworkType(res.networkType);
				//console.log('network:' + network + ':' + res.networkType);
			}
		}); 
		
		await uni.getSystemInfo({
			success: function (res) {
				systemVersion = res.version;
				//console.log('systemVersion:' + systemVersion);
				machine = encodeURI(res.model);
				//console.log('machine:' + machine)
				//console.log('language:' + res.language);
				productId = getProductId(res.platform);
				//console.log('productId:' + productId + ':' + res.platform);
			}
		});
	} catch (e) {
		// errorpromis js
		//console.log('get system info error');
	}
	return 'a=' + appVersion + '&i=' + imei + '&s=' + systemVersion  + '&m=' + machine  + '&pd=' + productId  + '&n=' + network  + '&ch=' + channel;
}

var timer;
function notLoginHandle(){
	if(timer) clearInterval(timer);
	timer = setInterval(()=>{
		uni.showModal({
			//title: '未登录',
			content: '您未登录，部分功能需要登录后才能使用',
			/**
			 * 如果需要强制登录，不显示取消按钮
			 */
			showCancel: !forcedLogin,
			success: (res) => {
				if (res.confirm) {
					return
					/**
					 * 如果需要强制登录，使用reLaunch方式
					 */
					if (forcedLogin) {
						uni.reLaunch({
							url: '../login/login'
						});
					} else {
						uni.navigateTo({
							url: '../login/login'
						});
					}
				}
			}
		});
		clearInterval(timer);
	}, 500);
}
var m = CryptoJS.enc.Utf8.parse('scriptjsscriptjs');

async function zRequest(url, data, method, needAuth, contentType, mapResult){
	if(url.indexOf('http') == -1){
		url = api + url;
	}
	var authObj = uni.getStorageSync("user:auth");//从存储获得授权串
	if(needAuth && !authObj){
		notLoginHandle();
		return;
	}
	var requestData;
	var requestMethod;
	var requestContentType;
	if(data){
		requestData = data;
	}else{
		requestData = {};
	}
	if(method){
		requestMethod = method;
	}else{
		requestMethod = 'POST';
	}
	if(contentType){
		requestContentType = contentType;
	}else{
		requestContentType = 'application/json';
	}
	
	if(/\?[\d_\w]+\=/.test(url)){
		url = url + "&" + await getRequestParam();
	}else{
		url = url + "?" + await getRequestParam();
	}
	
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data: requestData,
			header: {
				'content-type':requestContentType,
				'Access-Control-Allow-Origin': '*', 
				'Access-Control-Allow-Headers':'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin',
				'Authorization': 'Bearer ' + authObj.token //授权头
			},
			method: requestMethod,
			dataType:'json',
			success: (res) => {
				//console.log('success');
				//console.log(res);
				if(res.statusCode == 401){
					logoutHandle();
					notLoginHandle();
					return;
				}

				if(mapResult){
					//结果重新映射
					resolve(successRequestWithData(res));
				}else{
					resolve(res);
				}
				
			},
			fail:(res)=>{
				console.log('request faile');//奔溃请求不会进入这里
 				console.log(res);
				reject(res);
			}
		});
	})
}

async function zRequestMap(url, data, method, needAuth, contentType){
	return await zRequest(url, data, method, needAuth, contentType, true);
}

function zFormReuest(url, data, method, needAuth){
	return zRequest(url, data, method, needAuth, 'application/x-www-form-urlencoded')
}
function zFormReuestMap(url, data, method, needAuth){
	return zRequest(url, data, method, needAuth, 'application/x-www-form-urlencoded', true)
}

function authRequest(url, data, method){
	return zRequest(url, data, method, true);
}

function authRequestMap(url, data, method){
	return zRequest(url, data, method, true, null, true);
}

function successRequest(result){
	return result && result.statusCode == 200 && result.data && result.data.error === 0;
}

function successRequestWithData(result){
	if(result && result.statusCode == 200 && result.data && result.data.error === 0){
		return { success : true,data : result.data };
	}
	
	var message = "";
	//TODO 通过code查找message，查不到才取message
	if(result.data.message)
		message = result.data.message;

	return { success : false, message: message, code : result.data.error};
}
var x = CryptoJS.enc.Utf8.parse('scriptjsscriptjs'); 
function loginHandle(token, id){
	if(token && id){
		var user = {
			token : token,
			id : id
		};
		uni.setStorageSync("user:auth", user);
	}
}

function logoutHandle(){
	uni.removeStorageSync("user:auth");
}

function getAuth(){
	return uni.getStorageSync("user:auth");
}

function isLogin(){
	//return true;
	var userAuth = getAuth();
	return userAuth;
}

function setUserInfo(data){
	if(data){
		uni.setStorageSync("user:info", data);
	}
}
function getUserInfo(){
	return uni.getStorageSync("user:info");
}

function checkVersion(userAction){
	const updateManager = uni.getUpdateManager();

	updateManager.onCheckForUpdate(function (res) {
		// 请求完新版本信息的回调
		if(userAction && !res.hasUpdate){
			uni.showToast({
				title:"没有版本更新"
			})
		}
		console.log("version check",res.hasUpdate);
		if(res.hasUpdate){
				updateManager.onUpdateReady(function (res) {
				console.log("version check ready",res);
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
					  if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate();
					  }
					}
				});

			});

			updateManager.onUpdateFailed(function (res) {
			  // 新的版本下载失败
			});
		}
	});
}

function setSearchHis(val){
	if(!val) return;
	let searchHistory = uni.getStorageSync('search:history');
	if (!searchHistory) searchHistory = [];
	let serachData = {};
	if (typeof(val) === 'string') {
		serachData = {
			name:val
		};
	} else {
		serachData = val
	}

	// 判断数组是否存在，如果存在，那么将放到最前面
	for (var i = 0; i < searchHistory.length; i++) {
		if (searchHistory[i].name === serachData.name) {
			searchHistory.splice(i, 1);
			break;
		}
	}

	searchHistory.unshift(serachData);
	searchHistory = searchHistory.splice(0, 15);
	uni.setStorageSync('search:history',searchHistory);
}

function getSearchHis(){
	return uni.getStorageSync('search:history');
}

function clearSearchHis(){
	return uni.removeStorageSync('search:history');
}

function setCollect(val){
	if(!val) return;
	let collect = uni.getStorageSync('user:collect');
	if (!collect) collect = [];

	// 判断数组是否存在，如果存在，那么将放到最前面
	for (var i = 0; i < collect.length; i++) {
		if (collect[i].ID === val.ID) {
			collect.splice(i, 1);
			break;
		}
	}

	collect.unshift(val);
	uni.setStorageSync('user:collect',collect);
}

function removelCollect(val){
	if(!val) return;
	let collect = uni.getStorageSync('user:collect');
	if (!collect) return;

	// 判断数组是否存在，如果存在，那么将放到最前面
	for (var i = 0; i < collect.length; i++) {
		if (collect[i].ID === val.ID) {
			console.log('find the collect to remove');
			collect.splice(i, 1);
			break;
		}
	}
	
	uni.setStorageSync('user:collect',collect);
}

function getCollect(){
	return uni.getStorageSync('user:collect');
}

function clearCollect(){
	return uni.removeStorageSync('user:collect');
}

function isCollectContains(id){
	if(!id) false;
	let collect = uni.getStorageSync('user:collect');
	if (!collect) false;

	// 判断数组是否存在，如果存在，那么将放到最前面
	for (var i = 0; i < collect.length; i++) {
		if (collect[i].ID === id) {
			return true;
		}
	}
	
	return false;
}

function getCover(photo) {
	if (photo) return photo;
	return noImage;
}

function getFormatterPrice(price){
	var newP = price.toFixed(0)
	if (newP == 0){
		return "$0"
	}else{
		var listString = newP.toString().split("").reverse();
		var newList = [];
		var count = 0;
		for (var s in listString){
			if (count <= 2){
				newList = [listString[s]].concat(newList);
				count += 1
			}else{
				newList = [listString[s],","].concat(newList);
				count = 1
			}
		}
		var newPrice = "$" + newList.join("");
		return newPrice
	}
}
function formatNumberRgx(num) {
	if (num) {
		var str = num.toString().replace("$", "");
		if(str && str.length > 0){
			var parts = str.split(".");
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			return parts.join(".");
		}
	}
	return "0";
}

function getPrice(price, lease) {
	if (price == '0') {
		return formatNumberRgx(lease);
	} else {
		return formatNumberRgx(price);
	}
}

function isNullOrEmpty(str) {
	if (!str) return true;
	if (str.replace(/[ ]/g, "").length == 0) return true;
	return false;
}

function getPhotos(photo)  {
	if (photo && photo.length > 0) return photo;
	return [noImage];
}

function isParentNullChildEmpty(str, parent) {
	if (!parent) return true;
	return isNullOrEmpty(str);
}

function isContains(str, substr) {
	return str && substr && new RegExp(substr).test(str);
}

function isCondo(ownershiptype, propertyType) {
	return ownershiptype == "Condo & Other" || propertyType == "Condo";
}

function inWechat() {
	return /(micromessenger|webbrowser)/.test(navigator.userAgent.toLocaleLowerCase());
}

//把字符串日期转为日期
function convertStrToDate(datetimeStr) {
	if(!datetimeStr)
		return "";
	var mydateint = Date.parse(datetimeStr); //数值格式的时间
	if (!isNaN(mydateint)) {
		var mydate = new Date(mydateint);
		return mydate;
	}
	var mydate = new Date(datetimeStr); //字符串格式时间
	var monthstr = mydate.getMonth() + 1;
	if (!isNaN(monthstr)) { //转化成功
		return mydate;
	} //字符串格式时间转化失败
	var dateParts = datetimeStr.split(" ");
	var dateToday = new Date();
	var year = dateToday.getFullYear();
	var month = dateToday.getMonth();
	var day = dateToday.getDate();
	if (dateParts.length >= 1) {
		var dataPart = dateParts[0].split("-"); //yyyy-mm-dd  格式时间             
		if (dataPart.length == 1) {
			dataPart = dateParts[0].split("/"); //yyyy/mm/dd格式时间
		}
		if (dataPart.length == 3) {
			year = Math.floor(dataPart[0]);
			month = Math.floor(dataPart[1]) - 1;
			day = Math.floor(dataPart[2]);
		}
	}
	if (dateParts.length == 2) { //hh:mm:ss格式时间
		var timePart = dateParts[1].split(":"); //hh:mm:ss格式时间
		if (timePart.length == 3) {
			var hour = Math.floor(timePart[0]);
			var minute = Math.floor(timePart[1]);
			var second = Math.floor(timePart[2]);
			return new Date(year, month, day, hour, minute, second);
		}
	} else {
		return new Date(year, month, day);
	}
}

function formatMixDate(date){
	let date1 = date.split(" ")[0]
	let date2 = date1.split("T")[0]
	if (date2.includes("/")){
		let dateList = date2.split("/")
		var month = dateList[0]
		var day = dateList[1]
		var year = dateList[2]
		
		if (month.length < 4){
			if (year.length == 2){
				year = "20" + year
			}
			if (month.length==1){
				month = "0" + month
			}
			if (day.length==1){
				day = "0" + day
			}
		}else{
			var newMonth = dateList[1]
			var newDay = dateList[2]
			var newYear = dateList[0]
			if (newMonth.length == 1){
				newMonth = "0" + newMonth
			}
			if (newDay.length == 1){
				newDay = "0" + newDay
			}
			year = newYear
			month = newMonth
			day = newDay
		}
		return year + "-" + month + "-" + day
	}else{
		let dateList = date2.split("-")
		if (dateList[0].length == 2){
			return "20" + date2
		}else{
			return date2
		}
	}
}

function formatDate(str) {
	var date = convertStrToDate(str);
	//console.log(date);
	if (date) {
		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	}
	return str;
}

function formatTime(str){
	var date = convertStrToDate(str);
	//console.log(date);
	if (date) {
		return date.getHours() + ':' + ((date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes());
	}
	return str;
}

function formatTimeAll(str){
	let strList = str.split("T")
	if (strList.length > 1){
		let timeList = strList[1].split(":")
		return timeList[0]+":"+timeList[1]
	}else{
		return ""
	}
}

function friendlyDate(timestamp) {
	var formats = {
		'year': '%n% 年前',
		'month': '%n% 月前',
		'day': '%n% 天前',
		'hour': '%n% 小时前',
		'minute': '%n% 分钟前',
		'second': '%n% 秒前',
	};

	var now = Date.now();
	var seconds = Math.floor((now - timestamp) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	var months = Math.floor(days / 30);
	var years = Math.floor(months / 12);

	var diffType = '';
	var diffValue = 0;
	if (years > 0) {
		diffType = 'year';
		diffValue = years;
	} else {
		if (months > 0) {
			diffType = 'month';
			diffValue = months;
		} else {
			if (days > 0) {
				diffType = 'day';
				diffValue = days;
			} else {
				if (hours > 0) {
					diffType = 'hour';
					diffValue = hours;
				} else {
					if (minutes > 0) {
						diffType = 'minute';
						diffValue = minutes;
					} else {
						diffType = 'second';
						diffValue = seconds === 0 ? (seconds = 1) : seconds;
					}
				}
			}
		}
	}
	return formats[diffType].replace('%n%', diffValue);
}

//FieldPropertyName 图片字段名称 列表字段名称  imageWithContainer图片是否被包一层
function lazyLoad(_this,imageWithContainer,listPropertyName, FieldPropertyName) {//选取未加载的图片处理
	if(!(_this[listPropertyName] && _this[listPropertyName].length > 0)) return;

	let lazies = uni.createSelectorQuery().in(_this, {}).selectAll('.lazy');

	lazies.boundingClientRect(images => {
		images.forEach((image, index) => {
			if (image && image.top <= _this.windowHeight && image.left <= _this.windowWidth) {
				if(!imageWithContainer){
					_this[listPropertyName][image.dataset.index].showImg = true;
				}else{
					//var obj = {src:getCover(_this[listPropertyName][image.dataset.index][FieldPropertyName]),show:true};
					_this.$set(_this[listPropertyName][image.dataset.index],"showImg",true);
				}
			}
		})
	}).exec();
}

function lazyLoadInit(_this,isStrArray, listPropertyName, fieldPropertyName) {//选取未加载的图片处理
	lazyLoadWindow(_this);
	lazyLoad(_this);
}

function lazyLoadWindow(_this){
	var systemInfo = uni.getSystemInfoSync();
	_this.windowHeight = systemInfo.windowHeight;
	_this.windowWidth = systemInfo.windowWidth;
}

function setCurrentLocation(data){
	if(data){
		uni.setStorageSync("user:currentlocation", data);
	}
}

function getCurrentLocation(){
	return uni.getStorageSync("user:currentlocation");
}

// download garbage data
// function checkDataVersion(){
// 	let url = "/api/other/sorttrash"
	
// 	uni.getStorage({
// 		key: dataVersionKey,
// 		success: function(res){
// 			console.log("get storage garbage version",res.data)
// 			let key = res.data
// 			let param = {
// 				"id": key
// 			}
// 			zRequestMap(url,param,'GET').then(function(result){
// 				if (result){
// 					if(result.data){
// 						if (result.data.data == ""){
// 							uni.getStorage({
// 								key: dataStorageKey,
// 								success: function(dataRes){
// 									garbageData = dataRes.data
// 									console.log("get garbage data from storage",dataRes.data)
// 								},
// 								fail:()=>{
// 									console.log("get garbage data from storage fail")
// 								}
// 							})
// 						}else{
// 							uni.setStorage({
// 								key: dataVersionKey,
// 								data: result.data.key,
// 								success:function(){
// 									console.log("set garbage key storage sucess")
// 								},
// 								fail:()=>{
// 									console.log("set garbage key fail")
// 								}
// 							})
// 							let decodeData = back(result.data.data)
// 							console.log("words data before",decodeData)
// 							let jsonData = JSON.parse(decodeData)
// 							console.log("words data",jsonData)
// 							garbageData = jsonData
// 							setGarbageData(jsonData)
// 						}
// 					}
// 				}
// 			})
// 		},
// 		fail:()=>{
// 			console.log("get history fail")
// 			zRequestMap(url,null,'GET').then(function(result){
// 				if (result){
// 					if(result.data){
// 						let key = result.data.key
// 						uni.setStorage({
// 							key: dataVersionKey,
// 							data: key,
// 							success:function(){
// 								console.log("set garbage key storage sucess")
// 							},
// 							fail:()=>{
// 								console.log("set garbage key fail")
// 							}
// 						})
// 						let decodeData = back(result.data.data)
// 						let jsonData = JSON.parse(decodeData)
// 						console.log("words data",jsonData)
// 						garbageData = jsonData
// 						setGarbageData(jsonData)
// 					}
// 				}
// 			})
			
// 		}
// 	})
// }

// function setGarbageData(data){
// 	uni.setStorage({
// 		key: dataStorageKey,
// 		data: data,
// 		success:function(){
// 			console.log("set garbage key storage sucess")
// 		},
// 		fail:()=>{
// 			console.log("set garbage key fail")
// 		}
// 	})
// }

export {
	setCurrentLocation,getCurrentLocation,
	forcedLogin,
	getProductId,
	getNetworkType,
	getRequestParam,
	notLoginHandle,
	zRequest,zRequestMap,zFormReuest,zFormReuestMap,authRequest,authRequestMap,successRequest,successRequestWithData,
	loginHandle,logoutHandle,
	getAuth,
	isLogin,
	setUserInfo,
	getUserInfo,
	setSearchHis,
	getSearchHis,
	clearSearchHis,
	setCollect,
	removelCollect,
	getCollect,
	clearCollect,
	isCollectContains,
	getCover,
	formatNumberRgx,
	getPrice,
	isNullOrEmpty,
	getPhotos,
	isParentNullChildEmpty,
	isContains,
	isCondo,
	inWechat,
	convertStrToDate,
	formatMixDate,
	formatDate,
	formatTime,
	formatTimeAll,
	friendlyDate,
	getFormatterPrice,
	emailReg,
	appVersion,
	checkVersion,
	lazyLoad,lazyLoadInit,lazyLoadWindow,
	to,back,
	// checkDataVersion,
	// garbageData
};