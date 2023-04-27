<template>
	<view>
		<view class="view-first" v-for="(item,index) in teamList" :key="index">
			<view @click="spread(item,index)" class="view-user">
				<image :src="item.headUrl" class="image-avatar"></image>
				<text class="text-nickname">{{item.nickName}}</text>
				<u-icon v-if="item.drop" name="arrow-right"></u-icon>
				<u-icon v-else name="arrow-down"></u-icon>
			</view>
			<view v-if="!item.drop" class="view-user child" v-for="(child,childIndex) in item.popularizeTeamVoList" :key="childIndex">
				<image :src="child.headUrl" class="image-avatar"></image>
				<text class="text-nickname">{{child.nickName}}</text>
			</view>
		</view>
		<u-loadmore :status="loadmoreStatus" @loadmore="()=>{
			pageNum++
			getTeamList()
			return ''
		}"></u-loadmore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teamList: [],
				pageNum: 1,
				loadmoreStatus: 'loadmore',
				show:true
			};
		},
		mounted() {
			this.getTeamList()
		},
		methods: {
			spread(e,i){
				console.log(e)
				console.log(i)
				if(e.drop == false){
					e.drop = true
				}else {
					e.drop = false
				}
				
			},
			async getTeamList() {
				this.loadmoreStatus = 'loading'
				let res = await this.http.post('/app/userPersonalCenter/popularizeTeamList', {
					pageSize: 10,
					pageNum: this.pageNum,
				});
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.pageNum, 10, this.teamList, res.rows)
					this.teamList = list
					console.log(this.teamList)
					this.loadmoreStatus = status
				} else {
					this.$toast(res.msg);
				}
			}
		}
	}
</script>

<style lang="scss">
	.view-first {
		display: flex;
		flex-direction: column;

		.view-user {
			padding: 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			&.child {
				padding-left: 60rpx;
			}

			.image-avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}

			.text-nickname {
				font-size: 32rpx;
				font-weight: 400;
				color: #333333;
				flex-grow: 1;
				flex-shrink: 1;
			}
		}

	}
</style>
