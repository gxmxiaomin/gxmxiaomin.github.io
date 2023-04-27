const shareBaseUrl = "http://h5.muxingchen.com/index.html"
// const shareBaseUrl = "http://localhost:8080/"
const newShareBaseUrl = "http://124.220.35.129:9000/"
const urlList = {
	// 商品分享链接
	marketUrl(data) {
		let url = shareBaseUrl + "#/pages/goods-user/goods-user?invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
		Object.keys(data).forEach((key,index)=>{
			url = url + "&" + key + "=" + data[key]
		})
		return url
	},
	//论坛分享链接
	postUrl(data) {
		let url = shareBaseUrl + "#/pages/fourm-user/fourm-user?invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
		Object.keys(data).forEach((key,index)=>{
			url = url + "&" + key + "=" + data[key]
		})
		return url
	},
	//动态分享链接
	postUrls(data) {
		let url = shareBaseUrl + "#/pages/dync-school/dync-school?invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
		Object.keys(data).forEach((key,index)=>{
			url = url + "&" + key + "=" + data[key]
		})
		return url
	},
	//论坛教育模块的分享连接
	schoolForumUrl(data) {
		let url = shareBaseUrl + "#/pages/fourm-school/fourm-school?invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
		Object.keys(data).forEach((key,index)=>{
			url = url + "&" + key + "=" + data[key]
		})
		return url
	},
	//实时热点分享链接
	hostdetailUrl(data) {
		let url = shareBaseUrl + "#/pages/hot-user/hot-user?invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
		Object.keys(data).forEach((key,index)=>{
			url = url + "&" + key + "=" + data[key]
		})
		return url
	},
	//金刚区幼儿教育分享链接
	academylUrl(data) {
		let url = shareBaseUrl + "#/pages/child-details/child-details?isShare=true&invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
		Object.keys(data).forEach((key,index)=>{
			url = url + "&" + key + "=" + data[key]
		})
		return url
	},
	//金刚区家庭教育分享链接
	videoScreenUrl(data) {
		let url = shareBaseUrl + "#/pages/homeeducation/videoscreen?isShare=true&invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
		Object.keys(data).forEach((key,index)=>{
			url = url + "&" + key + "=" + data[key]
		})
		return url
	},
	//金刚区就业服务分享链接
	videoScreenUrl(data) {
		let url = shareBaseUrl + "#/pages/homeeducation/videoscreen?isShare=true&invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
		Object.keys(data).forEach((key,index)=>{
			url = url + "&" + key + "=" + data[key]
		})
		return url
	},
	//金刚区家庭就业服务分享链接
    employmentUrl(data) {
		let url = shareBaseUrl + "#/pages/employment-details/employment-details?isShare=true&invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
		Object.keys(data).forEach((key,index)=>{
			url = url + "&" + key + "=" + data[key]
		})
		return url
	},
	//金刚区院校详情分享链接  schoolType: 1.幼儿教育 2.兴趣培养 3.民办院校 4.公办院校 5.职业院校
	publicdetailUrl(data) {
		let url = shareBaseUrl + "#/pages/private-school/private-school?invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
		Object.keys(data).forEach((key,index)=>{
			url = url + "&" + key + "=" + data[key]
		})
		return url
	},
	// //咨询详情的分享链接
	// publicdetailUrl(data) {
	// 	let url = shareBaseUrl + "#/pages/informationdetails/informationdetails?isShare=true&invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
	// 	Object.keys(data).forEach((key,index)=>{
	// 		url = url + "&" + key + "=" + data[key]
	// 	})
	// 	return url
	// },
	// //兴趣培养的分享链接
	// publicdetailUrl(data) {
	// 	let url = shareBaseUrl + "#/pages/interest-details/public-details?isShare=true&invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
	// 	Object.keys(data).forEach((key,index)=>{
	// 		url = url + "&" + key + "=" + data[key]
	// 	})
	// 	return url
	// },
	//轮播图分享
	swiperUrl(data) {
		let url = shareBaseUrl + "#/pages/swiper-details/swiper-details?invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
		Object.keys(data).forEach((key,index)=>{
			url = url + "&" + key + "=" + data[key]
		})
		return url
	},
	
	//活动
	 socialUrl(data) {
	  let url = shareBaseUrl + "#/pages/active-user/active-user?invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
	  Object.keys(data).forEach((key,index)=>{
	   url = url + "&" + key + "=" + data[key]
	  })
	  return url
	 },
	 //代理加盟分享轮播区域
	 minelUrl(data) {
	   let url = shareBaseUrl + "#/pages/agent-joining/agent-joining?isShare=true&invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
	   Object.keys(data).forEach((key,index)=>{
	    url = url + "&" + key + "=" + data[key]
	   })
	   return url
	  },
	  
	  videoShareUrl(data) {
	    let url = shareBaseUrl + "#/pages/video-school/video-school?invitationCode="+(uni.getStorageSync('invitationCode') || 25323)
	    Object.keys(data).forEach((key,index)=>{
	     url = url + "&" + key + "=" + data[key]
	    })
	    return url
	   },



}


export default urlList
