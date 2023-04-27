<template>
	<view class="ice-selector">
		<u-picker @confirm="(e)=>{
			console.log(e)
			inputValue=getName(range[e.indexs[0]].id);
			console.log(inputValue)
			$emit('input',range[e.indexs[0]].id);
			$emit('confirm',range[e.indexs[0]].id);
			pickerShow=false
		}"
		@cancel="pickerShow=false"
		 :show="pickerShow" :columns="[range]" :keyName="rangeKey"></u-picker>
		<input class="input" v-model="inputValue" @click="pickerShow=true" :placeholder="placeholder" :disabled="true" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pickerShow:false,
				inputValue:'',
			};
		},
		methods:{
			getName(id) {
				if (id==='') {
					return '';
				}
				for (let item of this.range) {
					if (item.id == id) {
						return item[this.rangeKey];
					}
				}
				return '';
			},
		},
		mounted() {
			this.inputValue=this.getName(this.value);
		},
		watch:{
			range(){
				this.inputValue=this.getName(this.value);
				console.log(this.inputValue)
			},
			value(){
				this.inputValue=this.getName(this.value);
				
			},
		},
		props:{
			value:'',
			range:{
				type:Array,
				default:[],
			},
			rangeKey:{
				type:String,
				default:"text"
			},
			placeholder:{
				type:String,
				default:"请选择状态"
			},
		},
	}
</script>

<style lang="scss" scoped>
	.ice-selector{
		// width: 100%;
		// padding: 20rpx 30rpx;
		// line-height: 40rpx;
		input{
			// line-height: 40rpx;
			font-size: 28rpx;
		}
		
		/deep/.input-placeholder{
			color: rgb(192, 196, 204);
		}
	}
	
</style>
