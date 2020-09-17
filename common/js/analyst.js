import {authRequest,getPhotos} from '../../common/js/util.js'
import regionData from '../../static/json/region.json'

function AnalystRegion(json){
	var obj = Object()
	var areaList = ["All"]
	var regionDic = {}
	var cityDic = {}
	var communityDic = {}
	for (var a in json){
		let n = json[a].n
		let l = json[a].l
		var lDic = {}
		var mList = []
		if (l.length > 0) {
			for (var m in l){
				let lN = l[m].n
				let lL = l[m].l
				var cList = []
				if (lL.length > 0){
					for (var c in lL){
						let cN = lL[c].n
						if (cN != ""){
							cList.push(cN)
						}
					}
					cList.sort()
					cList = ["All"].concat(cList)
				}
				lDic[lN] = cList
				communityDic[lN] = cList
				mList.push(lN)
			}
			mList.sort()
			mList = ["All"].concat(mList)
		}
		regionDic[n] = lDic
		cityDic[n] = mList
		areaList.push(n)
	}
	obj.areaList = areaList
	obj.regionDic = regionDic
	obj.cityDic = cityDic
	obj.communityDic = communityDic
	return obj
}

function getAreaJson(){
	var region = AnalystRegion(regionData.l)
	console.log("region",region)
	console.log("region area",region.areaList)
	console.log("region region dic",region.regionDic)
	console.log("region city dic",region.cityDic)
	console.log("region comm dic",region.communityDic)
	
	// console.log("load area json scuccess")
	// uni.showLoading({
	// 	title: 'loading...',
	// 	mask: false
	// });
	// var result = await authRequest("/area.json", null, "GET");
	// uni.hideLoading();
	// console.log("area request",result)
	// if(result && result.statusCode == 200 && result.data) {
	// 	if (result.data){
	// 		var region = AnalystRegion(result.data.l)
	// 		console.log("region",region)
	// 	}
	// }
	return region	
}

export {
	AnalystRegion,
	getAreaJson
}