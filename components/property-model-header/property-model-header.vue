<template>
    <div class="module-header main-background">
        <div class="module-header-1"><i class="fa fa-tags" color="#56BD92"/></div>
        <div class="module-header-2">{{title}}</div>
        <div class="module-header-3"></div>
        <div class="module-header-4"></div>
    </div>
</template>

<script>
	export default {
	  data() {
		  //th-list tag square info
		return {};
	  },
	  mounted() {},
	  props: ["title"]
	};
</script>

<style>
.module-header {
  display: flex;
  display: -webkit-flex;
  width: 100%;
  height: 35px;
  /* background: blue; */
  border-bottom: 2px solid #eee
}
.module-header-1{
    flex-grow: 0;
    width: 40px;
    text-align: center;
    line-height: 35px;
    color:#56BD92;
}
.module-header-2{
    flex-grow: 0;
    width: 100px;
    line-height: 35px;
    font-size: 1rem;
    font-weight: bold;
}
.module-header-3{
    flex-grow: 1;
}
.module-header-4{
    flex-grow: 0;
    width: 20px;
}
</style>

