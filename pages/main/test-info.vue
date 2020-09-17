<template>
	<div>
		<view 
			v-for="(item,index) in testInfo"
			:key="index"
		>
		<div class="hm-email-card" :style="'height:' + (estimateHeight(item.desc) + 250).toString() + 'rpx'">
			<div class="box" :style="'height:' + (estimateHeight(item.desc)+220).toString() + 'rpx'">
				<div class="titleClass">
					<div class="wrap">
					<text class="newMessages">{{ item.title }}</text>
					</div>
				</div>
				<div class="content">
				<text class="summary" :style="'height:' + estimateHeight(item.desc).toString() + 'rpx'">{{ item.desc }}</text>
				</div>
			</div>
		</div>
		</view>
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
		testInfo:[
			{"title": "G1 Summary",
			"desc":"All new drivers in Ontario must take a G1 knowledge test (also known as G1 written test). The official test is created by the Ministry of Transportation (MTO) and is offered in all DriveTest Centres. The test is available on paper at all locations across Ontario, and on computer at some locations. No appointment is required (make sure you come at least one hour before the DriveTest centre closes though). The G1 test will have 20 questions about road signs and 20 more after that. Make sure you understand the demerit system too. You have to have your license with you at all times and it has to be registered by the Ministry of Transportation.\n\nEach province has its own licenses and it has to be registered in your province. However, there are steps that you have to follow starting with the G1 license. There are six conditions with a G1 license. Any new driver has to have a G1 licence for at least 12 months before they can take the G1 test, which will get you your G2 license. This time can be cut down to eight months if you take a driver education course at an accredited driving school. Drivers get more privileges after they pass their G1 driving test in Ontario."
			},
			{"title":"How to pass the test?",
			"desc":"There are 40 questions on the official G1 test, and they are all multiple choice. The test is not timed. You'll receive two test sheets, each with 20 questions. The first set of 20 questions is about road signs, while the second one is about the rules of the road. You'll need to get 16 or more questions right on each of those two sections in order to pass your G1 test (the total passing score for both sections is 80%). Your G1 knowledge test will be marked on the spot, and you'll receive your results immediately. The results of your G1 written test are valid for one year."
			},
			{"title":"As a G1 driver you have to:",
			"desc":"● maintain a zero blood alcohol level while you are driving\n\n● have a licensed driver with you that has at least four years driving and a blood alcohol level less than .05 percent in case they have to take the wheel\n\n● the other driver should be the only one in the front\n\n● never have more people then seat belts in the vehicle\n\n● do not drive on the 400 series highways or the high speed expressways\n\n● do not drive from midnight to five in the morning\n\n● You have to be at least sixteen years old to get your G1."
			},
			{"title":"To apply for a driver’s license you need:",
			"desc":"● a passport\n\n● Canadian citizenship card\n\n● permanent resident card\n\n● record of landing\n\n● proof of residence\n\n● any immigration papers"
			},
			{"title":"How do I get a licence in Ontario?",
			"desc":"Applying for a licence in Ontario is about a 24 month process. There are steps put into place that allow you to easily transition into becoming a responsible licensed driver. You will….\n\n● First: Take and pass a written exam that will give you a G1 licence.\n\n● Second: Hold your G1 licence for at least 12 months. (Certain restrictions apply with this licence such as no driving without a G licensed driver with at least 4 years of experience in the front seat with you at all times), OR take a driver's education course at a driving school and wait only 8 months\n\n● Third: Take and pass your G1 licence road test (including parallel parking and a few other things). Obtain your G2 licence.\n\n● Fourth: Hold your G2 licence at least 12 months. Then apply for your regular G licence."
			}
		]
		
		
	};
  },
  methods: {
	  estimateHeight(text){
		  var splitn = text.split('\n\n')
		  var extra = splitn.length * 80
		  return text.length / 20 * 21 + extra
	  }
  }
};
</script>
<style>
@import '@/common/css/index.response.info.css';
</style>
