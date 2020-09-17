<template>
	<div>
		<view 
			v-for="(item,index) in testInfo"
			:key="index"
		>
		<div class="hm-email-card" >
			<div class="box" >
				<div class="titleClass">
					<div class="wrap">
					<text class="newMessages">{{ item.title }}</text>
					</div>
				</div>
				<div class="content">
				<text class="summary">{{ item.desc }}</text>
				</div>
			</div>
		</div>
		</view>
		<!-- #ifdef APP-PLUS || H5 -->
		<button class="cu-btn cuIcon lg service-btn-style" @click="viewMap">
			<text class="cuIcon-location" style="font-size: 45upx;"></text>
		</button>
		<!-- #endif -->
		
	</div>
</template>
<script>
export default {
  name: 'HmEmailCard',
  props: {
    dataId: {
      type: String,
      default: 'hm-email-card'
    },
  },
  data() {
    return {
		testInfo:[{'title': 'NEWMARKET', 'desc': '320 Harry Walker Parkway South, Newmarket, ON L3Y 7B4\n\nMonday - Friday 7:00 AM-7:00PM\n\nSaturday 8:30AM-5:00PM', 'location': {'lat': 44.0565399, 'lng': -79.4210248}}, {'title': 'TORONTO PORT UNION', 'desc': '91 Rylander Blvd. Unit # 109A, Scarborough, ON M1B 5M5\n\nMonday - Friday 7:00 AM-7:00PM\n\nSaturday 8:30AM-5:00PM', 'location': {'lat': 43.7971562, 'lng': -79.15106109999999}}, {'title': 'TORONTO METRO-EAST', 'desc': '1448 Lawrence Ave East Unit 15, North York, ON M4A 2V6\n\nMonday - Friday 7:00AM-7:00PM\n\nSaturday 8:30AM-5:00PM', 'location': {'lat': 43.743243, 'lng': -79.31291759999999}}, {'title': 'TORONTO DOWNSVIEW (DOWNSVIEW PARK)', 'desc': '37 Carl Hall Road, Toronto, ON M3K 2E2\n\nMonday - Friday  7:00AM-7:00PM', 'location': {'lat': 43.7463455, 'lng': -79.4790013}}, {'title': 'TORONTO DOWNTOWN', 'desc': '777 Bay Street, Toronto, ON M5G 2C8 (Lower Level)\n\nMonday - Friday 8:30 AM-5PM', 'location': {'lat': 43.6604859, 'lng': -79.3844559}}, {'title': 'TORONTO ETOBICOKE', 'desc': '5555 Eglinton Avenue West, Unit E120-124, Etobicoke, ON M9C 5M1\n\nMonday - Friday 7:00AM-7:00PM\n\nSaturday 8:30AM-5:00PM', 'location': {'lat': 43.6503823, 'lng': -79.6035332}}, {'title': 'OSHAWA', 'desc': '200 John Street West, Oshawa, ON L1J 2B4\n\nMonday - Friday 8:30 AM-5PM', 'location': {'lat': 43.8942217, 'lng': -78.8681665}}, {'title': 'HAMILTON', 'desc': '370 Kenora Ave N,\u202f Stoney Creek, ON L8E 2W2\n\nMonday to Friday\u202f 7:00 AM to 7:00 PM\n\nSaturday 8:30AM-5:00PM', 'location': {'lat': 43.24100199999999, 'lng': -79.7637756}}, {'title': 'OAKVILLE', 'desc': '2370 Wyecroft Rd Oakville,L6L 5L7\n\nMonday - Friday 7:00AM-7:00PM\n\nSaturday 8:30AM-5:00PM', 'location': {'lat': 43.4116146, 'lng': -79.73178949999999}}, {'title': 'ORANGEVILLE', 'desc': '50 Fourth Ave Orangeville,L9W 4P1\n\nMonday - Friday 7:00AM-7:00PM\n\nSaturday 8:30AM-5:00PM', 'location': {'lat': 43.9261502, 'lng': -80.0935966}}, {'title': 'MISSISSAUGA', 'desc': '255 Longside Drive Mississauga,L5W 1L8\n\nMonday - Friday 7:00AM-7:00PM\n\nSaturday 8:30AM-5:00PM', 'location': {'lat': 43.63888619999999, 'lng': -79.7093998}}, {'title': 'BRAMPTON', 'desc': '59 First Gulf Blvd, Unit 9 Brampton, L6W 4P9\n\nMonday - Friday 7:00AM-7:00PM\n\nSaturday 8:30AM-5:00PM', 'location': {'lat': 43.678215, 'lng': -79.7160616}}, {'title': 'OTTAWA WALKLEY', 'desc': '1570 Walkley Rd,\u202f Ottawa, ON K1V 6P5\n\nMonday to Friday\u202f 7:00 AM to 7:00 PM\n\nSaturday 8:30AM-5:00PM', 'location': {'lat': 45.376226, 'lng': -75.6475538}}, {'title': 'OTTAWA CANOTEK', 'desc': '5303 Canotek Rd,\u202f Unit 14,\u202f Ottawa, ON K1J 9M1\n\nMonday to Friday\u202f 8:30 AM to 5:00 PM', 'location': {'lat': 45.4529502, 'lng': -75.5885048}}, {'title': 'KITCHENER', 'desc': '1405 Ottawa St N,\u202f Unit 11,\u202f Kitchener, ON N2A 3Z1\n\nMonday to Friday\u202f 7:00 AM to 7:00 PM\n\nSaturday 8:30AM-5:00PM', 'location': {'lat': 43.4560267, 'lng': -80.4299745}}, {'title': 'GUELPH', 'desc': '255 Woodlawn Road W, Unit 106,\u202f Guelph, ON N1H 8J1\n\nMonday to Friday\u202f 8:30 AM to 5:00 PM', 'location': {'lat': 43.5532809, 'lng': -80.2953309}}]

	};
  },
  methods: {
	  estimateHeight(text){
		  return text.length / 20 * 42
	  },
	  viewMap(){
		  console.log("view map")
		  uni.navigateTo({
		  	url: './map'
		  })
	  }
  }
};
</script>
<style>
@import '@/common/css/index.response.location.css';
.service-btn-style{
		position: fixed;
		top: calc(100% - 200upx);
		left: 650upx;
		box-shadow: 0 0 18upx #777777;
		background: #ffffff;
	}
</style>
