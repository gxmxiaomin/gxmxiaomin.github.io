// this指针  添加监听，卸载监听
export const showTextMessage = (that, type="on") => {
	console.log("展示", that)
	function setmessage(msg) {
		console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",msg)
		that.$refs.messageTip.showTip(msg)
	}
	if (type=="on") {
		uni.$on('havNewMsg', setmessage)
	} else {
		uni.$off('havNewMsg', setmessage)
	}
}
