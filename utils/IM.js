//环信IM的方法
let WebIM = (wx.WebIM = require("./WebIM")["default"]);
var conn = WebIM.conn

export var IM = {
	//注册环信
	register(username) {
		return new Promise((resolve, reject) => {
			let options = {
				username: username,
				password: '123456',
				appKey: WebIM.config.appkey,
				success: function(res) {
					resolve({
						code: 200,
						data: res.user,
						msg: "注册成功"
					})
				},
				error: function(err) {
					let errorData = JSON.parse(err.data);
					let msg = ""
					if (errorData.error === 'duplicate_unique_property_exists') {
						console.log('用户已存在！');
						msg = '用户已存在！'
						resolve({
							code: 200,
							data: null,
							msg: msg
						})
					} else if (errorData.error === 'illegal_argument') {
						if (errorData.error_description === 'USERNAME_TOO_LONG') {
							console.log('用户名超过64个字节！')
							resolve({
								code: 500,
								data: null,
								msg: '用户名超过64个字节！！'
							})
						} else {
							console.log('用户名不合法！')
							resolve({
								code: 500,
								data: null,
								msg: '用户名不合法'
							})
						}
					} else if (errorData.error === 'unauthorized') {
						console.log('注册失败，无权限！')
						resolve({
							code: 500,
							data: null,
							msg: '注册失败，无权限！'
						})
					} else if (errorData.error === 'resource_limited') {
						console.log('您的App用户注册数量已达上限,请升级至企业版！')
						msg = '您的App用户注册数量已达上限,请升级至企业版！'
						resolve({
							code: 500,
							data: null,
							msg: '您的App用户注册数量已达上限,请升级至企业版！'
						})
					}

				},
			};
			conn.registerUser(options);
		})

	},
	
	//登录环信
	login(username) {
		return new Promise((resolve, reject) => {
			let options = {
				user: username,
				pwd: '123456',
				appKey: WebIM.config.appkey,
				success: function(res) {
					let resIM = {
						code: 200,
						data: res.user,
						msg: "登录成功"
					}
					resolve(resIM)
				},
				error: function() {
					let resIM = {
						code: 500,
						msg: "登录失败"
					}
					resolve(resIM)
				}
			};
			conn.open(options);
		})
	},
	
	//退出登录
	logout() {
		return new Promise((resolve, reject) => {
			conn.close();
			resolve({
				code: 200,
				msg: '退出成功'
			})
		})
	},
	
	//修改用户信息
	updateUserInfo(data) {
		return new Promise(async (resolve, reject) => {
			let res = await WebIM.conn.updateOwnUserInfo(data)
			resolve({
				code: 200,
				data: res.data,
				msg: '修改用户信息成功'
			})
		})
	},
	
	// 获取用户的信息
	async fetchUserInfoById(userId) {
		const res = await WebIM.conn.fetchUserInfoById(userId)
		console.log("获取到的用户信息", res)
		return res
	},

	//获取IM用户信息 
	getUserInfo(username) {
		return new Promise(async (resolve, reject) => {
			let res = await WebIM.conn.fetchUserInfoById(username)
			resolve({
				code: 200,
				data: res.data,
				msg: '获取IM用户信息成功'
			})
		})
	},

	// 单聊发送文本消息
	sendPrivateText(data) {
		return new Promise((resolve, reject) => {
			let id = conn.getUniqueId(); // 生成本地消息id
			let msg = new WebIM.message('txt', id); // 创建文本消息
			msg.set({
				msg: data.msg, // 消息内容
				to: data.toUserName, // 接收消息对象（用户id）
				chatType: 'singleChat', // 设置为单聊
				// ext: {
				// 	key: value,
				// 	key2: {
				// 		key3: value2
				// 	}
				// }, //扩展消息
				success: function(id, serverMsgId) {
					console.log("Send private text Success");
					resolve({
						code: 200,
						data: {
							msg: data.msg,
							id: id
						},
						msg: 'send private text Success'
					})
				},
				fail: function(e) {
					// 失败原因:
					// e.type === '603' 被拉黑
					// e.type === '605' 群组不存在
					// e.type === '602' 不在群组或聊天室中
					// e.type === '504' 撤回消息时超出撤回时间
					// e.type === '505' 未开通消息撤回
					// e.type === '506' 没有在群组或聊天室白名单
					// e.type === '501' 消息包含敏感词
					// e.type === '502' 被设置的自定义拦截捕获
					// e.type === '503' 未知错误
					console.log("Send private text error");
					resolve({
						code: 500,
						msg: 'send private text error'
					})
				}
			});
			conn.send(msg.body);
		})
	},
	
	//格式化emoji
	parseEmoji(msg) {
		return new Promise((resolve, reject) => {
			resolve(WebIM.parseEmoji(msg))
		})
	},
	
	// 转换表情
	setEmoji(emo) {
		// let data = 
		return WebIM.Emoji.map[emo]
	},
	
	// 单聊通过URL发送图片消息
	sendPrivateUrlImg(file, chatType='singleChat') {
		return new Promise((resolve, reject) => {
			let id = conn.getUniqueId(); // 生成本地消息id
			let msg = new WebIM.message('img', id); // 创建图片消息
			let option = {
				body: {
					type: 'file',
					url: file.url,
					// size: {
					// 	width: msg.width,
					// 	height: msg.height,
					// },
					// length: msg.length,
					filename: file.time,
					// filetype: msg.filetype
				},
				chatType: chatType,
				to: file.username, // 接收消息对象
				success: function(res) {
					resolve({
						code: 200,
						data: {
							url: file.url,
							id: id
						},
						msg: "图片发送成功"
					})
				}
			};
			msg.set(option);
			conn.send(msg.body);
		})
	},
	
	//发送自定义消息
	sendCustomMsg(file) {
		console.log(file)
		return new Promise((resolve, reject) => {
			let id = conn.getUniqueId(); // 生成本地消息id
			let msg = new WebIM.message('audio', id); // 创建自定义消息
			msg.set({
				to: file.username, // 接收消息对象（用户id）
				body: {
					type: 'audio',
					url: file.url,
					// size: {
					// 	width: msg.width,
					// 	height: msg.height,
					// },
					length: file.length,
					filename: file.name,
					filetype: "mp3"
				},
				ext: {}, // 消息扩展
				chatType: 'singleChat', // 设置聊天类型 单聊 群聊 聊天室
				success: function(id, serverMsgId) {
					console.log(111111)
					resolve({
						code: 200,
						data: {
							url: file.url,
							// audioLength: file.length,
							id: id
						}
					})
				},
				fail: function(e) {
					console.log(22222222)
					resolve({
						code: 500,
						data: e
					})
				}
			});
			console.log(msg)
			conn.send(msg.body);
		})
	},
	
	/**
	 * 获取对话历史消息 支持Promise返回
	 * @param {Object} options
	 * @param {String} options.queue   - 对方用户id（如果用户id内含有大写字母请改成小写字母）/群组id/聊天室id
	 * @param {String} options.count   - 每次拉取条数
	 * @param {Boolean} options.isGroup - 是否是群聊，默认为false
	 * @param {String} options.start - （非必需）起始位置的消息id，默认从最新的一条开始
	 * @param {Function} options.success
	 * @param {Funciton} options.fail
	 */
	//消息漫游
	messageRoam(username, isGroup=false) {
		return new Promise((resolve, reject) => {
			let options = {
				queue: username, //需特别注意queue属性值为大小写字母混合，以及纯大写字母，会导致拉取漫游为空数组，因此注意将属性值装换为纯小写
				isGroup: isGroup,
				count: 10,
				success: function(res) {
					resolve(res)
				},
				fail: function() {}
			}
			WebIM.conn.fetchHistoryMessages(options)
		})
	},
	
	//重置漫游
	resetMessageRoam() {
		return new Promise((resolve, reject) => {
			WebIM.conn.mr_cache = []
			resolve('')
		})
	},
	
	//获取聊天列表
	async getSessionList() {
		let res = await WebIM.conn.getSessionList()
		console.log(res)
		return res
	},

	//消息已读回执
	readMessage(username, chatType='singleChat') {
		return new Promise((resolve, reject) => {
			let msg = new WebIM.message('channel', conn.getUniqueId());
			msg.set({
				to: username,
				chatType: chatType
			});
			conn.send(msg.body);
			resolve('')
		})
	},
	
	//删除一个会话
	deleteSession(username, chatType='singleChat', deleteRoam=true) {
		console.log(WebIM.conn)
		return new Promise((resolve, reject) => {
			WebIM.conn.deleteSession({
				channel: username, // 会话 ID（对方的 userID 或群组 ID）。
				chatType: chatType, // 会话类型 singleChat（单聊） groupChat（群聊）。
				deleteRoam: deleteRoam, // 是否同时删除服务端漫游消息。
			})
			resolve('')
		})
	},

	// 获取好友列表
	async getRoster() {
		const res = await WebIM.conn.getRoster()
		console.log("获取到的好友列表", res)
		return res
	},
	
	// 发送好友申请
	addContact(username, message) {
		WebIM.conn.addContact(username, message);
	},
	
	// 同意好友申请
	acceptInvitation(username) {
		WebIM.conn.acceptInvitation(username);
	},
	
	// 拒绝好友申请
	declineInvitation(username) {
		WebIM.conn.declineInvitation(username);
	},
	
	// 删除好友
	deleteContact(username) {
		WebIM.conn.deleteContact(username);
	},
	
	// 将好友加入黑名单
	addToBlackList(...username) {
		WebIM.conn.addToBlackList(username);
	},
	
	// 将好友移出黑名单
	removeFromBlackList(...username) {
		WebIM.conn.removeFromBlackList(username);
	},
	
	// 获取黑名单列表
	async getBlacklist() {
		const res = await WebIM.conn.getBlacklist()
		console.log("获取到的黑名单列表", res)
		return res
	},
	
	// ---------------------------------------------------------群聊----------------------------------
	// 获取群聊列表
	async getGroup() {
		const res = await WebIM.conn.getGroup()
		console.log("获取到的群聊列表", res)
		 return res
	},
	
	// 创建群聊
	async createGroupNew(options) {
		// let options = {
		//     data: {
		//         groupname: 'groupName',          // 群组名
		//         desc: 'group description',       // 群组描述
		//         members: ['user1', 'user2'],     // 用户名组成的数组
		//         public: true,                    // pub等于true时，创建为公开群
		//         approval: true,                  // approval为true，加群需审批，为false时加群无需审批
		//         allowinvites: allowInvites,      // true：允许群成员邀请人加入此群，false：只有群主才可以往群里加人 注意公开群（public：true),则不允许群成员邀请别人加入此群
		//         inviteNeedConfirm: false         // 邀请加群，被邀请人是否需要确认。true 为需要被邀请者同意才会进群
		//     },
		//     success(res){},
		//     error(err){},
		// };
		const res = await WebIM.conn.createGroupNew(options)
		console.log("创建的结果为", res)
		return res
	},
	
	// 获取群聊信息
	async getGroupInfo(groupId) {
		let options = {
		    groupId: groupId    // 群组id
		};
		const res = await WebIM.conn.getGroupInfo(options)
		console.log("获取到的群聊信息", res)
		return res
	},
	
	// 修改群聊的信息
	async modifyGroup(option) {
		// let option = {
		//     groupId: 'groupId',
		//     groupName: 'ChangeTest',                         // 群组名称
		//     description: 'Change group information test'     // 群组简介
		// };
		const res = await WebIM.conn.modifyGroup(option)
		console.log("修改群聊的结果为", res)
		return res
	},
	
	
	// 发送群聊文本消息
	sendGroupText(data) {		
		return new Promise((resolve, reject) => {
			let id = conn.getUniqueId(); // 生成本地消息id
			let msg = new WebIM.message('txt', id); // 创建文本消息
			msg.set({
				msg: data.msg, // 消息内容
				to: data.groupId, // 接收消息对象（用户id）
				chatType: 'groupChat', // 设置为群聊消息
				success: function(id, serverMsgId) {
					console.log("Send private text Success");
					resolve({
						code: 200,
						data: {
							msg: data.msg,
							id: id
						},
						msg: 'send private text Success'
					})
				},
				fail: function(e) {
					// 失败原因:
					// e.type === '603' 被拉黑
					// e.type === '605' 群组不存在
					// e.type === '602' 不在群组或聊天室中
					// e.type === '504' 撤回消息时超出撤回时间
					// e.type === '505' 未开通消息撤回
					// e.type === '506' 没有在群组或聊天室白名单
					// e.type === '501' 消息包含敏感词
					// e.type === '502' 被设置的自定义拦截捕获
					// e.type === '503' 未知错误
					console.log("Send private text error");
					resolve({
						code: 500,
						msg: 'send private text error'
					})
				}
			});
			conn.send(msg.body);
		})
	},
	
	// 移出指定群成员
	async removeSingleGroupMember(data) {
		let option = {
			groupId, //群聊id
			username //用户id
		}
		const res = await WebIM.conn.removeSingleGroupMember(option)
		console.log("移出群成员的结果为", res)
		return res
	},
	
	// 解散群聊
	async dissolveGroup(groupId) {
		let option = {
			groupId
		}
		const res = await WebIM.conn.dissolveGroup(option)
		console.log("群聊解散", res)
		return res
	},
	
	// 退出群聊
	async quitGroup(groupId) {
		let option = {
			groupId
		}
		const res = await WebIM.conn.quitGroup(option)
		console.log("退出群聊的结果", res)
		return res
	},
	
	// 获取群成员列表
	async listGroupMember(option) {
		// let options = {
		//     pageNum: 'pageNum',                                               // 页码
		//     pageSize: 'pageSize',                                             // 预期每页获取的记录数
		//     groupId: 'groupId'                                       
		// };
		const res = await WebIM.conn.listGroupMember(options)
		console.log("获取到的群成员列表", res)
		return res
	},
	
	// 设置指定管理员
	async setAdmin(options) {
		// let options = {
		//     groupId: "groupId",            // 群组id
		//     username: "user"               // 用户名
		// };
		const res = await WebIM.conn.setAdmin(options)
		console.log("设置管理员的结果", res)
		return res
	},
	
	// 移除指定管理员
	async removeAdmin(options) {
		// let options = {
		//     groupId: "groupId",             // 群组id
		//     username: "user"                // 用户名
		// };
		const res = await WebIM.conn.removeAdmin(options)
		console.log("移除管理员的结果为", res)
		return res
	},
	
	// 获取群组中的管理员
	async getGroupAdmin(groupId) {
		let options = {
		    groupId: groupId                 // 群组id
		};
		const res = await WebIM.conn.getGroupAdmin(options)
		console.log("获取到的群组成员", res)
		return res
	},
	
	// ------------------------------------加群处理--------------------
	// 将好友加入群聊
	async inviteToGroup(option) {
		// let option = {
		//     users: ['user1', 'user2'],
		//     groupId: 'groupId'
		// };
		const res = await WebIM.conn.inviteToGroup(option)
		console.log("将好友加入群聊", res)
		return res
	},
	
	// 申请加入群组
	async joinGroup(groupId) {
		let option = {
			groupId
		}
		const res = await WebIM.conn.joinGroup(groupId)
		console.log("申请加入群组的结果", res)
		return res
	},
	
	// 同意申请入群
	async agreeJoinGroup(options) {
		// let options = {
		//     applicant: 'userId',                          // 申请加群的用户名
		//     groupId: 'groupId'                            // 群组ID
		// };
		const res = await WebIM.conn.agreeJoinGroup(options)
		console.log("同意入群申请", res)
		return
	},
	
	// 拒绝用户的入群申请
	async rejectJoinGroup(options) {
		// let options = {
		//     applicant: 'user',                 // 申请加群的用户名
		//     groupId: 'groupId'                 // 群组ID
		// };
		const res = await WebIM.conn.rejectJoinGroup(options)
		console.log("拒绝入群申请", res)
		return res
	}

}
