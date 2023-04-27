Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"H+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
				.length)));
		}
	}
	return fmt;
}

String.prototype.toDate = function() {
	return new Date(this.replace(/\-/g, '/'));
}

var toast = function(msg) {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title: msg,
			icon: 'none',
			duration: 1500,
			success: () => {
				setTimeout(() => {
					resolve('');
				}, 1500)
			}
		})
	});
};

var getHtml = function(html) {
	const regex = new RegExp('<img', 'gi');
	return html.replace(regex, `<img style="max-width: 100%;height:auto;"`);
}

var resPage = function(page, pageSize,rawList,resList) {
	console.log("total", pageSize)
	return new Promise((resolve, reject) => {
		if(page==1){
			rawList=resList;
		}else{
			rawList=rawList.concat(resList);
		}
		if(resList.length<pageSize){
			console.log("没有更多了")
			resolve({
				status:'nomore',
				list:rawList,
			});
		}else{
			resolve({
				status:'loadmore',
				list:rawList,
			});
		}
	});
}

var alert = function(msg, callback) {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title: '提示',
			content: msg,
			success: function(res) {
				if (res.confirm) {
					resolve('');
				} else if (res.cancel) {
					reject();
				}
			}
		});
	});
};
var toPx = function(rpx) {
	var info = uni.getSystemInfoSync();
	console.log(info.screenWidth)
	return rpx / 750.0 * info.screenWidth;
	//return parseFloat(px)/info.screenWidth*750;
}
//屏幕px
var toRpx = function(px) {
	var info = uni.getSystemInfoSync();
	// return px / 750.0 * info.screenWidth;
	return parseFloat(px) / info.screenWidth * 750;
}

var hidePhone = function(phone) {
	if (phone.length >= 7) {
		return phone.replace(phone.substring(3, phone.length - 4), "****")
	}else{
		return phone;
	}
}

var getCover = function(images) {
	if (images&&images.indexOf(',') > -1) {
		return images.split(',')[0]
	}else{
		return images;
	}
}

var getLocation = function(){
	return new Promise((resolve, reject) => {
		let amapFile = require('@/utils/amap-wx.130.js');
		var myAmapFun = new amapFile.AMapWX({
			key: '0c8155a1d73c6dcd160d405a17da048d'//todo 更换高德小程序key
		});
		myAmapFun.getRegeo({
			success: async (data) => {
				console.log(data)
				resolve(data);
			},
			fail: function(info) {
				console.log(info)
				reject();
			}
		});
	});
}

var strToArray = function(images) {
	if(!images){
		return [];
	}
	if (images&&images.indexOf(',') > -1) {
		return images.split(',')
	}else{
		return [images];
	}
}

export default{
	install:(Vue,options)=>{
		Vue.prototype.$toast=toast;
		Vue.prototype.$alert=alert;
		Vue.prototype.$getHtml=getHtml;
		Vue.prototype.$resPage=resPage;
		Vue.prototype.toPx=toPx;
		Vue.prototype.toRpx=toRpx;
		Vue.prototype.hidePhone=hidePhone;
		Vue.prototype.getCover=getCover;
		Vue.prototype.getLocation=getLocation;
		Vue.prototype.strToArray=strToArray;
	}
}