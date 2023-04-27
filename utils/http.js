// #ifdef H5
// export const domain = 'localhost:8080/dpc'; // 卢夏晗
// #endif
// #ifndef H5
// export const domain = 'api.muxingchen.com/api'; // 卢夏晗
// #endif

// export var domain = '5qtyc4.natappfree.cc'; // 杨晨natapp

 // export const domain = 'api.muxingchen.com/api'; // 线上
// export const domain = '192.168.0.115:8099';//调试端口
//export var domain = '101.35.245.140/api'; // 测试服务器
// export var domain = '192.168.124.7:8099' //本地测试接口--卢主管
// export var domain = '192.168.86.12:8099' //本地测试接口--海涛
export var domain = '192.168.86.3:8099' //本地测试接口--大哥
// export var domain = '192.168.86.17:8099' //本地测试接口--海涛

export var baseUrl = 'http://' + domain;
console.log(baseUrl);
var isLoading = false;
var timeoutID;

var showLoading = () => {
	if (isLoading) {
		clearTimeout(timeoutID);
	} else {
		isLoading = true;
		uni.showLoading({
			title: '加载中',
		});
	}
}

var hideLoading = () => {
	timeoutID = setTimeout(() => {
		isLoading = false;
		uni.hideLoading()
	}, 500)
}

export var http = {
	async get(url, data) {
		// showLoading();
		// console.log(url, data);
		var res = await uni.request({
			url: `${baseUrl}${url}`,
			header: {
				token: uni.getStorageSync('token'),
				Authorization: 'Bearer ' + uni.getStorageSync('token')
			},
			data: data
		});
		// hideLoading();
		console.log(res[1].data,'code');
		console.log(res,'code1');
		// if (res[1].data.code == 10001) {
		// 	console.log(2);
		// 	console.log('get 10001 10001');
		// 	uni.redirectTo({
		// 		url: '/pages/login/login'
		// 	})
		// }
		if (res[1].data.msg == '请求访问：/app/userHome/notificationCenter/getMarketingCourseMessage，认证失败，无法访问系统资源') {
			uni.navigateTo({
				url: '/pages/login/login'
			})
		}
		// if(res[1].data.code = 200 || (!res[1].data.code)){
		// 	return res[1].data;
		// }
		// uni.redirectTo({
		// 	url:'/pages/login/login'
		// })
		return res[1].data;
	},
	async post(url, data) {
		// showLoading();
		console.log(url, data);
		var res = await uni.request({
			url: `${baseUrl}${url}`,
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				token: uni.getStorageSync('token'),
				Authorization: 'Bearer ' + uni.getStorageSync('token')
			},
			data: data
		});
		// hideLoading();
		console.log(res);
		console.log(res[1].data);
		if (res[1].data.code == 10001) {
			console.log(4);
			uni.redirectTo({
				url: '/pages/login/login'
			})
		}
		if (res[1].data.code == 401) {
			console.log('post');
			console.log('psot 401 401');
			uni.redirectTo({
				url: '/pages/login/login'
			})
		}
		// if(res[1].data.code = 200 || (!res[1].data.code)){
		// 	return res[1].data;
		// }
		// uni.redirectTo({
		// 	url:'/pages/login/login'
		// })
		return res[1].data;
	},
	async postJson(url, data) {
		console.log(url, data);
		let header = {}
		if(url != '/app/user/appLogin') {
			header.token = uni.getStorageSync('token'),
			header.Authorization = 'Bearer ' + uni.getStorageSync('token')
		}
		// showLoading();
		var res = await uni.request({
			url: `${baseUrl}${url}`,
			data: data,
			method: 'POST',
			header: {
				'content-type': 'application/json',
				// token: uni.getStorageSync('token'),
				// Authorization: 'Bearer ' + uni.getStorageSync('token')
				...header
			},
		});
		// hideLoading();
		// console.log(res[1].data);
		// console.log(7);
		console.log(res);
		if (res[1].data.code == 10001) {
			console.log('psotJson 10001 10001');
			uni.redirectTo({
				url: '/pages/login/login'
			})
		}
		if (res[1].data.code == 401) {
			console.log('postJson');
			console.log('postJson 401 401');
			uni.redirectTo({
				url: '/pages/login/login'
			})
		}
		// if(res[1].data.code = 200 || (!res[1].data.code)){
		// 	return res[1].data;
		// }
		// uni.redirectTo({
		// 	url:'/pages/login/login'
		// })
		return res[1].data;
	},
	async upload(filePath) {
		console.log(8);
		console.log(filePath);
		// showLoading();
		var res = await uni.uploadFile({
			url: `${baseUrl}/system/oss/upload`,
			filePath: filePath,
			name: 'file',
		});
		// hideLoading();
		console.log(res);
		return JSON.parse(res[1].data);
	},
};
