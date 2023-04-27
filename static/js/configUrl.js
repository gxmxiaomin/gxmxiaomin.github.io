export let userDownloadAndriod = "https://www.pgyer.com/NgGP"

export let userDownloadIOS = "itms-apps://itunes.apple.com/cn/app/id uni.UNI419986E?mt=8"
//用户是否是分享进来的方法跳转对应版本下载链接
export let DownloadMethods = function(isShare, ismethod,invitationCode) {
	if (isShare) {
		uni.redirectTo({
			// url: '/pages/downloadAorI/downloadAorI?href=' + userDownloadAndriod
			url: '/pages/welcome/welcome?invitationCode=' + invitationCode
		})
		// if ((uni.getSystemInfoSync().osName == 'android') || (uni.getSystemInfoSync().osName == "windows")) {

		// 	uni.redirectTo({
		// 		url: '/pages/downloadAorI/downloadAorI?href=' + userDownloadAndriod
		// 	})
		// 	// uni.getSystemInfoSync().platform 
		// } else {
		// 	uni.redirectTo({
		// 		url: '/pages/downloadAorI/downloadAorI?href=' + userDownloadIOS
		// 	})
		// }

	} else {

		ismethod()
	}
}
