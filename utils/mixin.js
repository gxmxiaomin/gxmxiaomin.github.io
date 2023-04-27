export default {
	data() {
		return {
			page:1,
			pageSize:10,
			loadmoreStatus:'loadmore',
			statusBarHeight:0,
		}
	},
	created(){
		uni.getSystemInfo({
			complete: (res) => {
				this.statusBarHeight=this.toRpx(res.statusBarHeight);
			}
		})
	},
	methods:{
		
	}
}