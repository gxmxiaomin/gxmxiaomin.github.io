<template>
	<view>
		<view class="view-list">
			<view class="view-item" v-for="(item,index) in list">
				<view class="view-user" @click="uni.navigateTo({
					url:'../personal-home-page/personal-home-page?id='+item.userId
				})">
					<image :src="item.headUrl" mode=""></image>
					<text>{{item.nickName}}</text>
				</view>
				<view class="view-attention">
					<button type="default" @click="focus(item.userId)" v-if="item.status==0">+关注</button>
					<button type="default" @click="cancelFocus(item.userId)" v-if="item.focusStatus==0&&item.status==1"
						class="button-cancel">取消关注</button>
					<button v-if="item.focusStatus==1&&item.status==1" @click="cancelFocus(item.userId)"
						type="default">互相关注</button>

				</view>
			</view>
		</view>

		<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
		page++
		getList()
		return ''
		}" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				list: [],
			}
		},
		onLoad(data) {
			this.id = data.id;
		},
		onShow() {
			this.page = 1;
			this.getList();
		},
		methods: {
			async focus(id) {
				console.log(id);
				let res = await this.http.post('/app/forum/topic/focusOnUser', {
					userId: id,
				});
				console.log('关注成功', res);
				if (res.code == 200) {
					this.page = 1;
					this.getList();
				} else {
					this.$toast(res.msg);
				}
			},

			// 取消关注
			async cancelFocus(id) {
				console.log(id);
				let res = await this.http.post('/app/forum/topic/deleteFocus', {
					userId: id,
				});
				console.log('取消关注', res);
				if (res.code == 200) {
					this.page = 1;
					this.getList();
				} else {
					this.$toast(res.msg);
				}
			},
			async getList() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get('/app/forum/user/selectFansList', {
					pageNum: this.page,
					pageSize: this.pageSize,
					userId: this.id,
				});
				console.log('关注列表', res);
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.list, res.rows);
					this.loadmoreStatus = status;
					this.list = list;
				} else {
					this.$toast(res.msg);
				}
			},
		}
	}
</script>

<style lang="scss">
	.view-list {
		.view-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 30rpx;

			.view-user {
				display: flex;
				align-items: center;

				image {
					width: 95rpx;
					height: 95rpx;
					border-radius: 50%;
				}

				text {
					margin-left: 20rpx;
					font-size: 32rpx;
					color: #333333;
				}
			}

			.view-attention {
				button {
					width: 200rpx;
					height: 56rpx;
					background: #4A9AFF;
					border-radius: 28rpx;

					font-size: 28rpx;
					color: #FFFFFF;

					display: flex;
					align-items: center;
					justify-content: space-around;
				}

				.button-cancel {
					background: #F7F7F7;
					border: 1px solid #666666;
					border-radius: 28rpx;

					font-size: 28rpx;
					color: #999999;
				}
			}
		}
	}
</style>
