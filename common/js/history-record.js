var infoTest = {
					ID: 18075560,
					TransactionType: "For sale",
					SizeTotalText: "50.41x129.29 FT",
					Price: 1798888,
					Lease: null,
					BathroomTotal: 4,
					BedroomTotal: 4,
					ListingID: "N3775448",
					StreetAddress: "693 FOXCROFT Boulevard ",
					City: "Newmarket",
					Province: "Ontario",
					PostalCode: "L3X1N2",
					LocationLat: 44.041649,
					LocationLng: -79.428848,
					Status: 2,
					SoldPrice: null,
					PropertyTax: null,
					SoldDate: null,
					ListingContractDate: "2016-11-18",
					Photo: "https://f001.backblazeb2.com/file/trebimg/house/E4328249/1.jpg",
					Dom:"1",
					BookLink: "https://cen060-wc.globalwolfweb.com/onlineshowing.asp",
					Ad:"Y"
				}

function HistoryRecord(){
	var history = Object()
	history.history_key = "user:history_record"
	history.historyData = []
	return history
}

function getHistory(history){
	uni.getStorage({
		key: history.history_key,
		success: function(res){
			console.log("get storage",res.data)
			history.historyData = res.data
		},
		fail:()=>{
			console.log("get history fail")
		}
	})
}

function setHistory(history){
	uni.setStorage({
		key: history.history_key,
		data: history.historyData,
		success:function(){
			getHistory(history)
			console.log("set history storage sucess")
		},
		fail:()=>{
			console.log("set history fail")
		}
	})
}

function deleteHistory(item,history){
	history.historyData = history.historyData.filter(function(h){
							return h.ID != item.ID
						  })
	setHistory(history)
}
function addHistory(item,history){
	deleteHistory(item,history)
	history.historyData = [item].concat(history.historyData)
	setHistory(history)
}

export{
	HistoryRecord,
	getHistory,
	setHistory,
	deleteHistory,
	addHistory
}