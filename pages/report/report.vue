<template>
	<view>
		<view class="view-header" :style="'background: url('+bg+');'">
			<u-navbar title="签到有礼">
				<view class="u-nav-slot" slot="left" @click="uni.navigateBack({})">
					<image class="image-fanhui" src="../../static/images/31fanhui1.png"></image>
				</view>
				<view class="u-nav-slot u-nav-slot-r" slot="right">
					<view class="view-more" @click="showMore = !showMore">
						<image class="image-more" src="../../static/images/gengduo.png">
						</image>
					</view>
					<view class="view-pop-more" v-show="showMore"
						:style="showMore?'height: 400rpx;background: url('+topBg+');':'background: url('+topBg+');'">
						<view class="view-more-item" @click="uni.navigateTo({
							url:'../message-notice/message-notice'
						})">
							<image src="../../static/images/msg_icon.png" mode=""></image>
							<text>消息通知</text>
						</view>
						<view class="view-more-item" @click="uni.navigateTo({
							url:'../starCoinShop/starCoinShop'
						})">
							<image src="../../static/images/goods_icon.png" mode=""></image>
							<text>兑换物品</text>
						</view>
						<view class="view-more-item" @click="uni.navigateTo({
							url:'../starCoin-exchange/starCoin-exchange'
						})">
							<image src="../../static/images/exchange_icon.png" mode=""></image>
							<text>已兑换</text>
						</view>
						<view class="view-more-item" @click="uni.navigateTo({
							url:'../starCoinrRule/starCoinrRule'
						})">
							<image src="../../static/images/star_icon.png" mode=""></image>
							<text>星币规则</text>
						</view>
					</view>
				</view>
			</u-navbar>
			<!-- <u-switch v-model="checked"></u-switch> -->

			<view class="view-mask" v-show="showMore" @tap="showMore=false">
			</view>

			<view class="view-block">
				<view class="view-item">
					<view class="view-title">我的星币</view>
					<image style="margin-bottom: -10rpx; width: 40rpx;height:40rpx;"
						src="../../static/images/jinbi.png"></image>
					<view class="view-num">{{integral.score}}<text style="font-size: 24rpx;">枚</text></view>
				</view>
				<view class="view-item" @click="show=!show">
					<view class="view-title">连续签到</view>
					<view class="view-info" @click="showSignInInfo = !showSignInInfo">
						<view class="view-report">本月已经签到了<text>{{userInfo.monthSignCount}}</text>天</view>
						<image class="view-right image-right" src="../../static/images/31fanhui11.png"></image>
					</view>
				</view>
			</view>

			<view class="view-process">
				<u-switch v-model="checked" style='position: absolute;left: 600rpx;'></u-switch>
				<view class="view-process-title">已连续签到<text>{{userInfo.continuousDay }}</text>天<text
						style="font-size: 24rpx;color: #7c7c7c;margin-left: 33%;">签到提醒</text>
					<view style="font-size: 24rpx;color:#7c7c7c;">连续签到90天，领取大礼</view>
				</view>
				<view class="view-points">
					<view class="view-points-day" @click="qiandao(1)">
						<view class="view-leftDay">
							<view :style="userInfo.continuousDay>=1?{'background':'#fef8e5'}:{'background':'#f6f4f2'}"
								class="view-date">
								<text
									style="display:block; font-size:14rpx;margin-top: -10rpx;">+{{dayScore.one_day_score}}</text>
								<image style="width: 56rpx;height: 56rpx;margin-top: -30rpx;"
									v-if="userInfo.continuousDay>=1" src="../../static/images/jinbi2.png"></image>
								<image style="width: 70rpx;height: 66rpx;margin-top: -30rpx;" v-else
									src="../../static/images/jinbi.png"></image>
								<text
									style="display: block; font-size:14rpx;margin-top: -40rpx;color:#d39d16;">第一天</text>
							</view>
							<!-- <view class="view-days">第一天</view> -->
						</view>
						<!-- <view class="view-line">
							<text class="text-line"></text>
						</view> -->
					</view>
					<view class="view-points-day" @click="qiandao(2)">
						<view class="view-leftDay">
							<view :style="userInfo.continuousDay>=2?{'background':'#fef8e5'}:{'background':'#f6f4f2'}"
								class="view-date">
								<text
									style="display:block; font-size:14rpx;margin-top: -10rpx;">+{{dayScore.two_day_score}}</text>
								<image style="width: 56rpx;height: 56rpx;margin-top: -30rpx;"
									v-if="userInfo.continuousDay>=2" src="../../static/images/jinbi2.png"></image>
								<image style="width: 70rpx;height: 66rpx;margin-top: -30rpx;" v-else
									src="../../static/images/jinbi.png"></image>
								<text
									style="display: block; font-size:14rpx;margin-top: -40rpx;color:#d39d16;">第二天</text>

								<!-- <text v-if="userInfo.continuousDay<2">+{{dayScore.two_day_score}}</text>
								<image v-if="userInfo.continuousDay>=2" src="../../static/images/truess.png"></image> -->
							</view>
							<!-- <view class="view-days">第二天</view> -->
						</view>
						<!-- <view class="view-line">
							<text class="text-line"></text>
						</view> -->
					</view>
					<view class="view-points-day" @click="qiandao(3)">
						<view class="view-leftDay">
							<view :style="userInfo.continuousDay>=3?{'background':'#fef8e5'}:{'background':'#f6f4f2'}"
								class="view-date">
								<text
									style="display:block; font-size:14rpx;margin-top: -10rpx;">+{{dayScore.three_day_score}}</text>
								<image style="width: 56rpx;height: 56rpx;margin-top: -30rpx;"
									v-if="userInfo.continuousDay>=3" src="../../static/images/jinbi2.png"></image>
								<image style="width: 70rpx;height: 66rpx;margin-top: -30rpx;" v-else
									src="../../static/images/jinbi.png"></image>
								<text
									style="display: block; font-size:14rpx;margin-top: -40rpx;color:#d39d16;">第三天</text>

								<!-- <text v-if="userInfo.continuousDay<3">+{{dayScore.three_day_score}}</text>
								<image v-if="userInfo.continuousDay>=3" src="../../static/images/truess.png"></image> -->
							</view>
							<!-- <view class="view-days">第三天</view> -->
						</view>
						<!-- <view class="view-line">
							<text class="text-line"></text>
						</view> -->
					</view>
					<view class="view-points-day" @click="qiandao(4)">
						<view class="view-leftDay">
							<view :style="userInfo.continuousDay>=4?{'background':'#fef8e5'}:{'background':'#f6f4f2'}"
								class="view-date">
								<text
									style="display:block; font-size:14rpx;margin-top: -10rpx;">+{{dayScore.four_day_score}}</text>
								<image style="width: 56rpx;height: 56rpx;margin-top: -30rpx;"
									v-if="userInfo.continuousDay>=4" src="../../static/images/jinbi2.png"></image>
								<image style="width: 70rpx;height: 66rpx;margin-top: -30rpx;" v-else
									src="../../static/images/jinbi.png"></image>
								<text
									style="display: block; font-size:14rpx;margin-top: -40rpx;color:#d39d16;">第四天</text>

								<!-- <text v-if="userInfo.continuousDay<4">+{{dayScore.four_day_score}}</text>
								<image v-if="userInfo.continuousDay>=4" src="../../static/images/truess.png"></image> -->
							</view>
							<!-- <view class="view-days">第四天</view> -->
						</view>
						<!-- <view class="view-line">
							<text class="text-line"></text>
						</view> -->
					</view>
					<view class="view-points-day" @click="qiandao(5)">
						<view class="view-leftDay">
							<view :style="userInfo.continuousDay>=5?{'background':'#fef8e5'}:{'background':'#f6f4f2'}"
								class="view-date">
								<text
									style="display:block; font-size:14rpx;margin-top: -10rpx;">+{{dayScore.five_day_score}}</text>
								<image style="width: 56rpx;height: 56rpx;margin-top: -30rpx;"
									v-if="userInfo.continuousDay>=5" src="../../static/images/jinbi2.png"></image>
								<image style="width: 70rpx;height: 66rpx;margin-top: -30rpx;" v-else
									src="../../static/images/jinbi.png"></image>
								<text
									style="display: block; font-size:14rpx;margin-top: -40rpx;color:#d39d16;">第五天</text>

								<!-- <text v-if="userInfo.continuousDay<5">+{{dayScore.five_day_score}}</text>
								<image v-if="userInfo.continuousDay>=5" src="../../static/images/truess.png"></image> -->
							</view>
							<!-- <view class="view-days">第五天</view> -->
						</view>
						<!-- <view class="view-line">
							<text class="text-line"></text>
						</view> -->
					</view>
					<view class="view-points-day" @click="qiandao(6)">
						<view class="view-leftDay">
							<view :style="userInfo.continuousDay>=6?{'background':'#fef8e5'}:{'background':'#f6f4f2'}"
								class="view-date">
								<text
									style="display:block; font-size:14rpx;margin-top: -10rpx;">+{{dayScore.one_day_score}}</text>
								<image style="width: 56rpx;height: 56rpx;margin-top: -30rpx;"
									v-if="userInfo.continuousDay>=6" src="../../static/images/jinbi2.png"></image>
								<image style="width: 70rpx;height: 66rpx;margin-top: -30rpx;" v-else
									src="../../static/images/jinbi.png"></image>
								<text
									style="display: block; font-size:14rpx;margin-top: -40rpx;color:#d39d16;">第六天</text>

								<!-- <text v-if="userInfo.continuousDay<6">+{{dayScore.one_day_score}}</text>
								<image v-if="userInfo.continuousDay>=6" src="../../static/images/truess.png"></image> -->
							</view>
							<!-- <view class="view-days">第六天</view> -->
						</view>
						<!-- <view class="view-line">
							<text class="text-line"></text>
						</view> -->
					</view>
					<view class="view-points-day" @click="qiandao(7)">
						<view class="view-leftDay">
							<view :style="userInfo.continuousDay>=7?{'background':'#fef8e5'}:{'background':'#f6f4f2'}"
								class="view-date">
								<text
									style="display:block; font-size:14rpx;margin-top: -10rpx;">+{{dayScore.seven_day_score}}</text>
								<image style="width: 56rpx;height: 56rpx;margin-top: -30rpx;"
									v-if="userInfo.continuousDay>=7" src="../../static/images/jinbi2.png"></image>
								<image style="width: 70rpx;height: 66rpx;margin-top: -30rpx;" v-else
									src="../../static/images/jinbi.png"></image>
								<text
									style="display: block; font-size:14rpx;margin-top: -40rpx;color:#d39d16;">第七天</text>

								<!-- <text v-if="userInfo.continuousDay<7">+{{dayScore.seven_day_score}}</text>
								<image v-if="userInfo.continuousDay>=7" src="../../static/images/truess.png"></image> -->
							</view>
							<!-- <view class="view-days">第七天</view> -->
						</view>
					</view>
				</view>
			</view>

			<!-- 公告 -->
			<view class="view-notice">
				<image src="../../static/images/announcement_icon.png" mode=""></image>
				<u-notice-bar icon="" :text="contents"></u-notice-bar>
			</view>

			<!-- 连续签到赢大礼 -->
			<view class="view-award">
				<view class="view-award-title">还差 {{gap}} 天领取 {{gift.goodsName}}</view>
				<view class="view-award-info">

					<view class="view-award-item" v-if="false">
						<view>
							<image v-if="this.dayInfo >= '1'" src="../../static/images/jinbi2.png" mode=""></image>
							<image v-else src="../../static/images/jinbi.png" mode=""></image>
						</view>
						<view class="bg-gray"></view>
						<text class="text-black">30天</text>
					</view>

					<view class="view-award-item" v-for="(item,index) in giftList">
						<view @click="uni.navigateTo({
					url:'../signProductInfo/signProductInfo?id='+item.id
				})">
							<image :src="item.goodsImg.split(',')[0]" mode=""></image>
							<view class="view-state" v-if="item.exchangeStatus==1">已领取</view>
							<view class="view-state view-blue" v-if="item.exchangeStatus==2" @click="uni.navigateTo({
								url:'../sign-goods/sign-goods?id='+item.id+'&goodsName='+item.goodsName
							})">未领取</view>
							<view class="view-not" v-else-if="item.exchangeStatus==0">待领取</view>
						</view>
						<view class="bg-gray"></view>
						<text class="text-black">{{item.signNum}}天</text>
					</view>
					<view class="view-line"></view>
				</view>
				<view style="height: 30rpx;"></view>
			</view>

			<!-- ////////////////////////////////////////////////////////// -->
			<view class="view-a">
				<view class="view-award-title">做任务赢星币</view>
				<view class="task">
					<view class="" style="width: 300rpx;display: inline-block;">
						<image style="width:80rpx;height: 80rpx;" src="../../static/images/pinglun3x.png" mode="">
						</image>
						<text
							style="font-size:26rpx; position: absolute;margin-top: 15rpx;margin-left: 20rpx;">评论文章</text>
						<image
							style="width: 30rpx;height: 30rpx;position: absolute;margin-top: 10rpx;margin-left: 140rpx;"
							src="../../static/images/jinbi.png" mode=""></image>
						<text
							style="font-size: 16rpx;position: absolute;margin-top: 10rpx;margin-left: 170rpx;color: #ffa574;">+2</text>
						<view class="jindutiao">
							<view :style="{'width':width1.a1 + '%'}" class="jindutiao2"></view>
							<text class="jindu">{{this.width1.a2}}/2</text>
						</view>
					</view>
					<view @tap="commentA" :style="{'background':width1.a3,'color':width1.a4}" class="task-button">
						{{this.width1.a5}}
					</view>
				</view>

				<view class="task">
					<view class="" style="width: 300rpx;display: inline-block;">
						<image style="width:80rpx;height: 80rpx;" src="../../static/images/zhuanfa3x.png" mode="">
						</image>
						<text
							style="font-size:26rpx;position: absolute;margin-top: 15rpx;margin-left: 20rpx;">转发文章</text>
						<image
							style="width: 30rpx;height: 30rpx;position: absolute;margin-top: 10rpx;margin-left: 140rpx;"
							src="../../static/images/jinbi.png" mode=""></image>
						<text
							style="font-size: 16rpx;position: absolute;margin-top: 10rpx;margin-left: 170rpx;color: #ffa574;">+3</text>
						<view class="jindutiao">
							<view :style="{'width':width2.a1 + '%'}" class="jindutiao2"></view>
							<text class="jindu">{{this.width2.a2}}/1</text>
						</view>
					</view>
					<view @tap="commentB" :style="{'background':width2.a3,'color':width2.a4}" class="task-button">
						{{this.width2.a5}}
					</view>
				</view>
				<view class="task">
					<view class="" style="width: 300rpx;display: inline-block;">
						<image style="width:80rpx;height: 80rpx;" src="../../static/images/dianzan3x.png" mode="">
						</image>
						<text
							style="font-size:26rpx;position: absolute;margin-top: 15rpx;margin-left: 20rpx;">点赞文章</text>
						<image
							style="width: 30rpx;height: 30rpx;position: absolute;margin-top: 10rpx;margin-left: 140rpx;"
							src="../../static/images/jinbi.png" mode=""></image>
						<text
							style="font-size: 16rpx;position: absolute;margin-top: 10rpx;margin-left: 170rpx;color: #ffa574;">+1</text>
						<view class="jindutiao">
							<view :style="{'width':width3.a1 + '%'}" class="jindutiao2"></view>
							<text class="jindu">{{this.width3.a2}}/3</text>
						</view>
					</view>
					<view @tap="commentC" :style="{'background':width3.a3,'color':width3.a4}" class="task-button">
						{{this.width3.a5}}
					</view>
				</view>
				<!-- <view class="task">
					<view class="" style="width: 300rpx;display: inline-block;">
						<image style="width:80rpx;height: 80rpx;" src="../../static/images/jiahaoyou3x.png" mode=""></image>
						<text style="font-size:26rpx;position: absolute;margin-top: 15rpx;margin-left: 20rpx;">邀请好友</text>
						<image style="width: 30rpx;height: 30rpx;position: absolute;margin-top: 10rpx;margin-left: 140rpx;" src="../../static/images/jinbi.png" mode=""></image>
						<text style="font-size: 16rpx;position: absolute;margin-top: 10rpx;margin-left: 170rpx;color: #ffa574;">+7</text>
						<view class="jindutiao">
							<view :style="{'width':width4.a1 + '%'}" class="jindutiao2"></view>
							<text class="jindu">{{this.width4.a2}}/3</text>
						</view>
					</view>
					<view :style="{'background':width4.a3,'color':width4.a4}" class="task-button">
						{{this.width4.a5}}
					</view>
				</view> -->
				<view class="task">
					<view class="" style="width: 300rpx;display: inline-block;">
						<image style="width:80rpx;height: 80rpx;" src="../../static/images/fabu3x.png" mode=""></image>
						<text
							style="font-size:26rpx;position: absolute;margin-top: 15rpx;margin-left: 20rpx;">发布帖子</text>
						<image
							style="width: 30rpx;height: 30rpx;position: absolute;margin-top: 10rpx;margin-left: 140rpx;"
							src="../../static/images/jinbi.png" mode=""></image>
						<text
							style="font-size: 16rpx;position: absolute;margin-top: 10rpx;margin-left: 170rpx;color: #ffa574;">+10</text>
						<view class="jindutiao">
							<view :style="{'width':width5.a1 + '%'}" class="jindutiao2"></view>
							<text class="jindu">{{this.width5.a2}}/1</text>
						</view>
					</view>
					<view @tap="commentD" :style="{'background':width5.a3,'color':width5.a4}" class="task-button">
						{{this.width5.a5}}
					</view>
				</view>
				<view class="task">
					<view class="" style="width: 300rpx;display: inline-block;">
						<image style="width:80rpx;height: 80rpx;" src="../../static/images/goumai3x.png" mode="">
						</image>
						<text
							style="font-size:26rpx;position: absolute;margin-top: 15rpx;margin-left: 20rpx;">特惠优选</text>
						<view class="jindutiao">
							<view :style="{'width':width6.a1 + '%'}" class="jindutiao2"></view>
							<text class="jindu">{{this.width6.a2}}/1</text>
						</view>
					</view>
					<view @click="uni.navigateTo({
					url:'../market-rush-buy/market-rush-buy'
				})" :style="{'background':width6.a3,'color':width6.a4}" class="task-button">
						{{this.width6.a5}}
					</view>
				</view>
			</view>



		</view>

		<!-- 星币收支明细 -->
		<view class="view-list-box">
			<view class="view-title">
				<text>星币收支明细</text>
				<text @click="uni.navigateTo({
					url:'../starCoin/starCoin'
				})">查看全部 ></text>
			</view>
			<view class="view-list">
				<view class="view-item" v-for="(item,index) in RecordList.slice(0,2)">
					<view class="view-left">
						<text class="text-remark">{{item.title}}</text>
						<text class="text-time">{{item.createTime}}</text>
					</view>

					<view class="view-content">
						<image class="image-icons" src="../../static/images/icon.png"></image>
						<view class="view-add">
							<text class="text-pm" v-if="item.pm==1">+</text>
							<text class="text-pm" v-else>-</text>
						</view>
						<view class="view-count">
							<text class="text-count">{{item.number}}</text>
						</view>
					</view>
				</view>
				<!-- <u-loadmore :status="loadmoreStatus" @loadmore="()=>{
				page++
				getDetailsInfo()
				return ''
			}" /> -->
			</view>
		</view>

		<!-- 星币商品 -->
		<view class="view-goods-container">
			<view class="view-title">
				<text>星币商城</text>
				<text @click="all()">查看全部 ></text>
			</view>
			<view class="view-goods-list">
				<view class="view-goods-item" v-for="(item,index) in shopLsit" @click="uni.navigateTo({
					url:'../starCoinShopDetails/starCoinShopDetails?id='+item.id
				})">
					<view class="view-goods-cover">
						<image :src="item.goodsCover" mode=""></image>
					</view>
					<view class="view-goods-info">
						<view>
							<u--text block lines="1" color="#333" size="28rpx" bold mode="text" :text="item.goodsName">
							</u--text>
						</view>
						<view>
							<text>价值:{{item.originalPrice}}</text>
						</view>
						<view>
							<text>{{item.sellPrice}}</text>
							<text>星币</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="view-calendar-sign">
			<u-popup :show="show" @close="show=false" @open="show=true" round="20rpx">
				<view class="view-box">
					<!-- 日历导航切换 -->
					<view class="view-calendar-nav">
						<image src="../../static/images/dailysignin/arrow_left.png" @click="dateUp"></image>
						<view>{{year}} 年 {{month}} 月</view>
						<image src="../../static/images/dailysignin/arrow_right.png" @click="dateDown"></image>
					</view>

					<!-- 日历内容 -->
					<view class="view-calendar-info">
						<view class="view-weeks">
							<text v-for="(w,i) in weeks" :key="i">{{w}}</text>
						</view>
						<view class="view-list">
							<view class="view-item" @click="postReport(item)" v-for="(item,index) in calendarData"
								:key='index'>
								<view class="view-sign-state" :style="{ display: item.label == ''?'none':'block' }">
									<image v-if="item.state==0" src="../../static/images/filess.png"></image>
									<image v-if="item.state==1" src="../../static/images/truess.png"></image>
									<text v-if="item.state==2">+10</text>
								</view>
								<view class="view-date">
									{{item.date}}
								</view>
							</view>
						</view>
					</view>

				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				color: true,
				width1: {
					a1: 0,
					a2: 0,
					a3: '#f37823',
					a4: '#f1f1f1',
					a5: '去完成',
					a6: true
				}, // 进度条默认长度   评论文章
				width2: {
					a1: 0,
					a2: 0,
					a3: '#f37823',
					a4: '#f1f1f1',
					a5: '去完成',
					a6: true
				}, //转发文章
				width3: {
					a1: 0,
					a2: 0,
					a3: '#f37823',
					a4: '#f1f1f1',
					a5: '去完成',
					a6: true
				}, //点赞文章
				width4: {
					a1: 0,
					a2: 0,
					a3: '#f37823',
					a4: '#f1f1f1',
					a5: '去完成',
					a6: true
				}, // 添加好友
				width5: {
					a1: 0,
					a2: 0,
					a3: '#f37823',
					a4: '#f1f1f1',
					a5: '去完成',
					a6: true
				}, // 发布帖子
				width6: {
					a1: 0,
					a2: 0,
					a3: '#f37823',
					a4: '#f1f1f1',
					a5: '去完成',
					a6: true
				}, // 特惠优选
				checked: false, //开关
				bg: require('@/static/images/roport-bg.png'),
				topBg: require('@/static/images/bg_release.png'),
				announcement: [],
				ann:'123',
				showMore: false, // 顶部右上角更多
				date: '', //签到时间
				showSignInInfo: false, // 显示签到弹窗信息
				userInfo: [],
				dayInfo: '', //本月签到天数
				dayScore: [],
				daySign: [],
				RecordList: [],
				giftList: [], //签到礼物列表
				shopLsit: [],
				cover: '',
				show: false, // 是否弹框
				data: [],
				weeks: ['日', '一', '二', '三', '四', '五', '六'],
				calendarData: [],
				currentDay: '', // 当前时间
				year: 0, //当前日期年
				month: 0, //当前日期月数
				date: 0, //当前日期号数
				day: -1, //当前星期几
				time: '',
				timestamp: '',
				reportState: 0, // 签到状态 0:未签到 1:已签到
				reportDay: [],
				checkdays: [],
				integral: {}, //星币数量
				gift: [], //领取的礼品
				gap:'' ,//还差gap天领取礼品
				contents:''  //兑换的公告
			}
		},
		onLoad() {
			this.getReportInfo()
			this.getShopList()
			this.task() //点赞
			this.affiche() // 公告
			// this.post() //发帖
			// this.comment() //评论
		},
		created() {
			this.getNow(); // 获取当前日期数据
		},
		onShow() {
			this.getDetailsInfo();
		},
		methods: {
			async affiche(){
				let res = await this.http.get('/app/userNotice/selectMuUserNotice',{
					pageNum:1,
					pageSize:10,
					type:0
				})
				for (let item of res.rows) {
					this.announcement.push(item.contents)
				}
				console.log(this.announcement)
				this.contents = this.announcement.toString()
				console.log('《《《《《《《《《《《《《《《《《《《《《《',res)
			},
			//还差 X 天领取 XXX 礼品
			sign() {
					console.log(this.giftList)
					console.log(this.userInfo.continuousDay)
					const a = this.giftList.filter(valus => valus.signNum > this.userInfo.continuousDay)
					console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', a)
					this.gift = a[0]
					console.log(this.gift)
					this.gap = this.gift.signNum - this.userInfo.continuousDay
			},
			qiandao(e) {
				if (e == 1) {
					if (this.userInfo.continuousDay >= 1) {
						// this.$toast('今日已签到');
					} else {
						let currentYear = new Date().getFullYear();
						let month = new Date().getMonth() + 1;
						let currentMonth = month < 10 ? '0' + month : month;
						let day = new Date().getDate();
						let currentDay = day < 10 ? '0' + day : day;
						let currentTime = currentMonth + '.' + currentDay
						console.log(currentTime); //今天日期
						this.postReportt(currentTime)
					}
				} else if (e == 2) {
					if (this.userInfo.continuousDay >= 2) {
						// this.$toast('今日已签到');
					} else {
						let currentYear = new Date().getFullYear();
						let month = new Date().getMonth() + 1;
						let currentMonth = month < 10 ? '0' + month : month;
						let day = new Date().getDate();
						let currentDay = day < 10 ? '0' + day : day;
						let currentTime = currentMonth + '.' + currentDay
						console.log(currentTime); //今天日期
						this.postReportt(currentTime)

					}
				} else if (e == 3) {
					if (this.userInfo.continuousDay >= 3) {
						// this.$toast('今日已签到');
					} else {
						let currentYear = new Date().getFullYear();
						let month = new Date().getMonth() + 1;
						let currentMonth = month < 10 ? '0' + month : month;
						let day = new Date().getDate();
						let currentDay = day < 10 ? '0' + day : day;
						let currentTime = currentMonth + '.' + currentDay
						console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', currentTime); //今天日期
						this.postReportt(currentTime)

					}
				} else if (e == 4) {
					if (this.userInfo.continuousDay >= 4) {
						// this.$toast('今日已签到');
					} else {
						let currentYear = new Date().getFullYear();
						let month = new Date().getMonth() + 1;
						let currentMonth = month < 10 ? '0' + month : month;
						let day = new Date().getDate();
						let currentDay = day < 10 ? '0' + day : day;
						let currentTime = currentMonth + '.' + currentDay
						console.log(currentTime); //今天日期
						this.postReportt(currentTime)

					}
				} else if (e == 5) {
					if (this.userInfo.continuousDay >= 5) {
						// this.$toast('今日已签到');
					} else {
						let currentYear = new Date().getFullYear();
						let month = new Date().getMonth() + 1;
						let currentMonth = month < 10 ? '0' + month : month;
						let day = new Date().getDate();
						let currentDay = day < 10 ? '0' + day : day;
						let currentTime = currentMonth + '.' + currentDay
						console.log(currentTime); //今天日期
						this.postReportt(currentTime)

					}
				} else if (e == 6) {
					if (this.userInfo.continuousDay >= 6) {
						// this.$toast('今日已签到');
					} else {
						let currentYear = new Date().getFullYear();
						let month = new Date().getMonth() + 1;
						let currentMonth = month < 10 ? '0' + month : month;
						let day = new Date().getDate();
						let currentDay = day < 10 ? '0' + day : day;
						let currentTime = currentMonth + '.' + currentDay
						console.log(currentTime); //今天日期
						this.postReportt(currentTime)

					}
				} else if (e == 7) {
					if (this.userInfo.continuousDay >= 7) {
						// this.$toast('今日已签到');
					} else {
						let currentYear = new Date().getFullYear();
						let month = new Date().getMonth() + 1;
						let currentMonth = month < 10 ? '0' + month : month;
						let day = new Date().getDate();
						let currentDay = day < 10 ? '0' + day : day;
						let currentTime = currentMonth + '.' + currentDay
						console.log(currentTime); //今天日期
						this.postReportt(currentTime)

					}
				}
			},
			// async comment(){
			// 	console.log(111111111111111111111111111111)
			// 	let res = await this.http.post('/app/forum/topic/getTimeCreateComment');
			// 	console.log(111111111111111111111111111111)
			// 	console.log(res)
			// },
			// async post(){
			// 	let res = await this.http.post('');
			// 	console.log(res)
			// },
			async task() {
				let res = await this.http.get('/app/forum/topic/getTimeVoteTopic');
				console.log(res)
				let data = res.data,
					arr = [];
				if (data.length > 0) {
					for (let item of data) {
						arr.push(item.title);
					}
					console.log(arr);
					var a1 = arr.filter(value => value == '点赞')
					var a2 = arr.filter(value => value == '评论')
					var a3 = arr.filter(value => value == '转发')
					var a4 = arr.filter(value => value == '发帖')
					console.log(a1)
					console.log(a2)
					console.log(a3)
					console.log(a4)
					//点赞
					if (a1.length == 1) {
						this.width3 = {
							a1: 33,
							a2: 1,
							a3: '#f37823',
							a4: '#f1f1f1',
							a5: '去完成',
							a6: true
						}
					} else if (a1.length == 2) {
						this.width3 = {
							a1: 66,
							a2: 2,
							a3: '#f37823',
							a4: '#f1f1f1',
							a5: '去完成',
							a6: true
						}
					} else if (a1.length == 3) {
						this.width3 = {
							a1: 100,
							a2: 3,
							a3: '#f1f1f1',
							a4: '#f37823',
							a5: '已完成',
							a6: false
						}
					}
					//评论
					if (a2.length == 1) {
						this.width1 = {
							a1: 33,
							a2: 1,
							a3: '#f37823',
							a4: '#f1f1f1',
							a5: '去完成',
							a6: true
						}
					} else if (a2.length == 2) {
						this.width1 = {
							a1: 100,
							a2: 2,
							a3: '#f1f1f1',
							a4: '#f37823',
							a5: '已完成',
							a6: false
						}
					}
					//转发
					if (a3.length == 1) {
						this.width2 = {
							a1: 100,
							a2: 1,
							a3: '#f1f1f1',
							a4: '#f37823',
							a5: '已完成',
							a6: false
						}
					}
					//发贴
					if (a4.length == 1) {
						this.width5 = {
							a1: 100,
							a2: 1,
							a3: '#f1f1f1',
							a4: '#f37823',
							a5: '已完成',
							a6: false
						}
					}
				}
			},
			all() {
				uni.navigateTo({
					url: '../starCoinShop/starCoinShop?id=' + this.integral.score
				})

			},

			commentA() {
				if (this.width1.a6 == true) {
					uni.switchTab({
						url: '../information/information'
					})
				}
			},
			commentB() {
				if (this.width2.a6 == true) {
					uni.switchTab({
						url: '../information/information'
					})
				}
			},
			commentC() {
				if (this.width3.a6 == true) {
					uni.switchTab({
						url: '../information/information'
					})
				}
			},
			commentD() {
				if (this.width5.a6 == true) {
					uni.navigateTo({
						url: '../rech-text/rech-text'
					})
				}
			},



			change(status) {
				// console.log(status);
			},

			//打开签到弹窗
			open() {
				this.$refs.calendar.open();
			},
			// 获取当前时间
			getNow() {
				let now = new Date()
				this.year = +now.getFullYear()
				this.month = +now.getMonth() + 1
				this.date = +now.getDate()
				this.day = +now.getDay()
				this.currentDay = this.month + '.' + this.date;
				this.getMonth(this.year + '-' + this.month)
			},

			// 获取每个月的天数
			monthDay(month) {
				if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
					return 31
				} else if ([4, 6, 9, 11].includes(month)) {
					return 30
				} else if (month === 2) {
					//  判断当年是否为闰年
					if (
						(this.year % 4 === 0 && this.year % 100 !== 0) ||
						this.year % 400 === 0
					) {
						return 29
					} else {
						return 28
					}
				}
			},
			// 添加当月数据
			async getCalendarDate(signTime) {
				this.calendarData = [];
				// 获取当前月份一号星期几
				let firstDay = new Date(this.year + "-" + this.month + "-" + "1").getDay();
				console.log(firstDay)
				let num = parseInt(firstDay);
				let nowDays = this.monthDay(this.month);
				let lastMonth = this.month - 1 > 0 ? this.month - 1 : 12;
				let lastDays = this.monthDay(lastMonth);
				//   循环添加上一个月数据
				for (let i = 0; i < num; i++) {
					this.calendarData.push({
						label: '',
					});
				}
				// 循环添加当月数据
				for (let i = 0; i < nowDays; i++) {
					this.calendarData.push({
						label: i + 1,
					});
				}
			},

			// 点击切换上个月
			dateUp() {
				this.month--;
				if (this.month <= 0) {
					this.year--;
					this.month = 12;
				}
				this.getMonth(this.year + '-' + this.month);
			},

			// 点击切换下个月
			dateDown() {
				this.month++;
				if (this.month > 12) {
					this.year++;
					this.month = 1;
				}
				this.getMonth(this.year + '-' + this.month)
			},

			// 签到当月
			async getMonth(date) {
				let res = await this.http.post('/app/userScores/checkMonthSign', {
					date: date
				});
				if (res.code == 200) {
					this.reportDay = res.data
					this.month = res.data.dateList[0].date.split('.')[0]
					this.year = res.data.dateList[0].year
					this.getCalendarDate(this.year + '-' + this.month)
					// 获取当前月份一号星期几
					let firstDay = new Date(this.year + "-" + this.month + "-" + "1").getDay();
					console.log(firstDay)
					let num = parseInt(firstDay);
					let nowDays = this.monthDay(this.month);
					let lastMonth = this.month - 1 > 0 ? this.month - 1 : 12;
					let lastDays = this.monthDay(lastMonth);
					// 循环添加当月数据
					for (let i = 0; i < nowDays; i++) {
						this.calendarData.push({
							label: i + 1,
						});
					}
					for (let list of res.data.dateList) {
						this.calendarData.push(list)
					}
					console.log(this.calendarData);
				} else {}
			},

			// 签到信息
			async getReportInfo() {
				let res = await this.http.get('/app/userScores/userSignInfo', {});
				if (res.code == 200) {
					this.userInfo = res.data;
					console.log('签到日期', this.userInfo);
					//星币数量
					this.integral = this.userInfo.score
					this.dayInfo = res.data.sevenDaySignData.day;
					this.dayScore = res.data.sevenDaySignData.signConfigMap
					console.log('签到积分', this.dayScore);
					this.daySign = res.data.sevenDaySignData
					console.log('明日签到', this.daySign);
					this.giftList = res.data.userSignGifts
					console.log('连续签到礼品信息', this.giftList);
					this.sign()
					console.log('签到信息', res)
				} else {
					this.$toast('用户信息异常');
				}
			},

			async getDetailsInfo() {
				this.loadmoreStatus = 'loading';
				let res = await this.http.get('/app/userScores/userSignInfo', {
					pageNum: this.page,
					pageSize: this.pageSize,
				});
				console.log('收支明细:', res);
				if (res.code == 200) {
					let {
						status,
						list
					} = await this.$resPage(this.page, this.pageSize, this.RecordList, res.data.scoresInfo);
					this.loadmoreStatus = status;
					this.RecordList = list;
					console.log(this.RecordList)
				} else {
					// this.$toast(res.msg);
				}
			},

			// 积分商品列表
			async getShopList() {
				let res = await this.http.get('/app/userScores/scoreGoodsList', {
					pageNum: 1,
					pageSize: 10,
				});
				console.log('积分商品', res);
				if (res.code == 200) {
					this.shopLsit = res.rows
					console.log(this.shopLsit)
				} else {
					// this.$toast(res.msg);
				}
			},
			async postReport(e) {
				console.log(e);
				let currentYear = new Date().getFullYear();
				let month = new Date().getMonth() + 1;
				let currentMonth = month < 10 ? '0' + month : month;
				let day = new Date().getDate();
				let currentDay = day < 10 ? '0' + day : day;
				let currentTime = currentMonth + '.' + currentDay
				console.log(currentTime); //今天日期
				console.log(currentDay)
				console.log('查看', this.dayInfo);
				if (e.year == currentYear && e.date == currentTime) {
					let res = await this.http.post('/app/userScores/sign', {
						day: this.dayInfo,
					});
					console.log(res)
					if (res.code == 200) {
						this.userInfo = res.data;
						this.getReportInfo()
						this.$toast('签到成功');
						this.getMonth(this.year + '-' + this.month)
						this.$forceUpdate()
					} else {
						this.$toast('今日已签到')
					}
				}
			},

			async postReportt(e) {
				console.log(e);
				let currentYear = new Date().getFullYear();
				let month = new Date().getMonth() + 1;
				let currentMonth = month < 10 ? '0' + month : month;
				let day = new Date().getDate();
				let currentDay = day < 10 ? '0' + day : day;
				let currentTime = currentMonth + '.' + currentDay
				console.log(currentTime); //今天日期
				console.log(currentDay)
				console.log('查看', this.dayInfo);
				if (e == currentTime) {
					let res = await this.http.post('/app/userScores/sign', {
						day: this.dayInfo,
					});
					console.log(res)
					if (res.code == 200) {
						this.userInfo = res.data;
						this.getReportInfo()
						this.$toast('今日已签到');
						this.getMonth(this.year + '-' + this.month)
						this.$forceUpdate()
					} else {
						// this.$toast('今日已签到')
					}
				}
			}

		}
	}
</script>

<style lang="scss">
	.jindu {
		// display: inline-block;
		font-size: 20rpx;
		position: absolute;
		margin-left: 120rpx;
		margin-top: -20rpx;
	}

	.jindutiao {
		margin-left: 20rpx;
		margin-bottom: 15rpx;
		display: inline-block;
		background: #f1f1f1;
		width: 100rpx;
		height: 10rpx;
		// border: 1px solid #aaaaaa;

		border-radius: 5rpx;

		.jindutiao2 {
			height: 100%;
			// width: 33%;
			border-radius: 10rpx;
			background: #f47723;
		}
	}

	.task {
		margin-bottom: 30rpx;
		margin-left: 20rpx;
	}

	.task-button {
		display: inline-block;
		width: 120rpx;
		height: 45rpx;
		line-height: 45rpx;
		background: #f47723;
		border-radius: 22rpx;
		font-size: 26rpx;
		text-align: center;
		color: #FFFFFF;
		// margin-left: 80%;
		position: absolute;
		left: 566rpx;
		margin-top: 30rpx;
		// margin-left: 240rpx;
		// margin-bottom: 15rpx;
	}

	.view-a {
		width: 690rpx;
		height: 725rpx;
		background: #FFFFFF;
		box-shadow: 0px 1px 33rpx 0px rgba(33, 102, 197, 0.22);
		border-radius: 10rpx;
		margin: 0 auto;
		margin-top: 40rpx;

		.view-award-title {
			font-weight: bold;
			padding: 30rpx;
		}
	}

	.view-calendar-sign {

		.view-box {
			background-color: #F7F7F7;
			padding: 40rpx;
			border-radius: 20rpx 20rpx 0 0;
		}

		.view-calendar-nav {
			display: flex;
			justify-content: space-between;
			margin-bottom: 30rpx;
			align-items: center;

			image {
				width: 56rpx;
				height: 56rpx;
			}
		}

		.view-calendar-info {
			display: flex;
			flex-direction: column;
			border-radius: 20rpx;
			background-color: #fff;

			.view-weeks {
				display: flex;
				margin: 40rpx 0;

				text {
					width: 14%;
					text-align: center;
					font-size: 20rpx;
					color: #999999;
				}
			}

			.view-list {
				display: flex;
				flex-wrap: wrap;

				.view-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					width: 14%;
					height: 120rpx;
					text-align: center;
					color: #C9C9C9;
					font-size: 20rpx;

					image {
						width: 50rpx;
						height: 50rpx;
					}
				}

				.view-sign-state {
					line-height: 50rpx;
					text-align: center;
					width: 50rpx;
					height: 50rpx;
					border-radius: 999rpx;
					background-color: #F6F6F5;
					color: #999999;
					font-size: 20rpx;
					display: flex;
					align-items: center;

					image {
						width: 100%;
						height: 100%;
						margin: 0 auto;
					}
				}

				.state-not {
					background: url(../../static/images/dailysignin/default_icon.png) no-repeat;
					background-size: 100%;
				}

				.state-success {
					background: url(../../static/images/dailysignin/signIn_icon.png) no-repeat;
					background-size: 100%;
				}

				.state-fail {
					background: url(../../static/images/dailysignin/notSignIn_icon.png) no-repeat;
					background-size: 100%;
				}
			}

			.view-date {
				margin-bottom: 10rpx;
			}
		}
	}

	.view-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 32rpx;
		margin-top: 20rpx;

		text {
			&:first-child {
				font-weight: 600;
				color: #111734;
				padding: 20rpx;
			}

			&:last-child {
				font-weight: 500;
				font-size: 28rpx;
				color: #666666;
			}
		}
	}

	.u-nav-slot-r {
		display: flex;
		// align-items: center;
		position: relative;
	}

	.view-pop-more {
		width: 255rpx;
		position: absolute;
		top: 70rpx;
		right: -10rpx;
		z-index: 999;
		background-size: 100% !important;
		background-repeat: no-repeat !important;
		overflow: hidden;
		transition: 0.3s;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding-top: 14rpx;

		.view-more-item+.view-more-item {
			border-top: 1px solid #4A4A4A;
		}

		.view-more-item {
			display: flex;
			height: 80rpx;
			align-items: center;
			padding: 16rpx;
			font-size: 32rpx;
			color: #fff;
			width: 100%;

			image {
				width: 44rpx;
				height: 44rpx;
				margin-right: 10rpx;
			}
		}
	}

	.bg-blue {
		background-color: #4B9AFF;
	}

	.bg-gray {
		background-color: #E7E8E7;
	}

	.text-black {
		color: #333333;
	}

	.text-gray {
		color: #E7E8E7;
	}

	/deep/.slot-icon span {
		font-size: 20rpx;
		color: #999999;
	}

	.view-award {
		width: 690rpx;
		// height: 289rpx;
		background: #FFFFFF;
		box-shadow: 0px 1px 33rpx 0px rgba(33, 102, 197, 0.22);
		border-radius: 10rpx;
		margin: 0 auto;

		.view-award-title {
			font-weight: bold;
			padding: 30rpx;
		}

		.view-award-info {
			display: flex;
			align-items: center;
			// justify-content: space-between;
			position: relative;
			padding: 6rpx 30rpx 0;

			view {
				&:nth-child(2) {
					margin-left: 10%;
				}

				&:nth-child(3) {
					margin-left: 10%;
				}

				&:nth-child(4) {
					margin-left: 30%;
				}
			}

			.view-line {
				width: 100%;
				height: 1rpx;
				background-color: #F7F7F7;
				position: absolute;
				left: 0;
				bottom: 48rpx;
			}

			.view-award-item {
				.get {
					position: relative;
					width: 50rpx;
					height: 50rpx;
					background: #4A4A4A;
					z-index: 999;
					// top: 200rpx;
				}
				
				
				display: flex;
				flex-direction: column;
				align-items: center;

				view {

					// &:nth-child(2) {
					// 	margin-left: 20rpx;
					// }
					&:first-child {
						border-radius: 10rpx;
						overflow: hidden;
						position: relative;

						.view-state {
							width: 100%;
							height: 26rpx;
							background: rgba(0, 0, 0, 0.2);
							position: absolute;
							bottom: 0;
							color: #fff;
							font-size: 16rpx;
							line-height: 26rpx;
							text-align: center;
							background: rgba(74, 154, 255, 0.4);
						}

						.view-blue {
							background-color: #4B9AFF;
							color: #FFFFFF;
						}

						.view-not {
							width: 100%;
							height: 26rpx;
							position: absolute;
							bottom: 0;
							color: #fff;
							font-size: 16rpx;
							line-height: 26rpx;
							text-align: center;
							background: #4A9AFF;
						}

						image {
							width: 80rpx;
							height: 80rpx;
						}
					}

					&:nth-child(2) {
						width: 14rpx;
						height: 14rpx;
						border-radius: 999rpx;
						margin: 8rpx 0;
						z-index: 9;
					}
				}

				text {
					font-size: 24rpx;
					color: #333333;
				}
			}
		}
	}

	.view-goods-container {
		padding: 0 30rpx 0 30rpx;
		// background-color: #F7F7F7;

		.view-goods-list {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-content: flex-start;

			.view-goods-item {
				display: flex;
				flex-direction: column;
				width: 330rpx;
				background-color: #fff;
				border-radius: 20rpx;
				margin-bottom: 30rpx;

				.view-goods-cover {
					width: 330rpx;
					height: 330rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.view-goods-info {
					display: flex;
					flex-direction: column;
					padding: 12rpx;

					view {
						&:nth-child(2) {
							margin: 10rpx 0;

							text {
								font-size: 20rpx;
								color: #4A9AFF;
								background-color: rgba(74, 154, 255, 0.05);
								border: 1px solid #4A9AFF;
								border-radius: 6rpx;
								padding: 3rpx 10rpx;
							}
						}

						&:last-child {
							color: #FF0000;

							text {
								&:first-child {
									font-size: 36rpx;
									font-weight: bold;
								}

								&:last-child {
									font-size: 30rpx;
									margin-left: 6rpx;
								}
							}
						}
					}
				}
			}
		}
	}

	.view-list-box {
		width: 90%;
		margin: auto;
		background: #FFFFFF;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		// border-radius: 30rpx 30rpx 0rpx 0rpx;
		border-radius: 20rpx;
		margin-top: 480rpx;
		// background-color: #F7F7F7;
		// border: 1rpx solid #F7F7F7;
		// box-shadow:5rpx 5rpx 5rpx 5rpx #ccc;
		// border:2px solid #eee;box-shadow: 0 0 5px rgba(0,0,0,.1);
		box-shadow: 0px 1px 33rpx 0px rgba(33, 102, 197, 0.22);

		.view-list {
			border-radius: 10rpx;
			background-color: #fff;
		}

		.view-item+.view-item {
			border-top: 1px solid #f7f7f7;
		}

		.view-item {
			display: flex;
			align-items: center;
			margin: 0 30rpx;
			padding: 30rpx 0;

			.view-content {
				display: flex;
				align-items: center;
				color: #F68F4A;
				font-family: Impact;

				.text-count {
					width: 100%;
					font-size: 34rpx;
					text-align: center;
				}

				.view-add {
					margin: 0 0 0 20rpx;
				}

				.view-count {
					min-width: 50rpx;
					text-align: center;
				}

				.image-icons {
					width: 28rpx;
					height: 28rpx;
					margin-left: auto;
				}
			}

			.view-left {
				flex-grow: 1;
				flex-shrink: 1;
				display: flex;
				flex-direction: column;
				max-width: 500rpx;

				.text-remark {
					font-size: 28rpx;
					font-weight: 400;
					color: #111734;
				}

				.text-time {
					font-size: 24rpx;
					font-weight: 400;
					color: #999999;
					margin-top: 6rpx;
				}
			}

			.text-money {
				font-size: 28rpx;
				font-weight: 500;
				color: #FF6B35;

				view {
					display: flex;

					&:first-child {
						width: 20%;
					}

					&:last-child {
						display: flex;
						justify-content: center;
						max-width: 200rpx;
						min-width: 50rpx;
						text-align: center;
						margin-left: 20rpx;
					}
				}
			}
		}
	}

	/deep/.u-navbar__content {
		background: none !important;
	}

	.view-notice {
		display: flex;
		align-items: center;
		margin: 20rpx 0;
		padding: 0 30rpx;

		image {
			width: 102rpx;
			height: 34rpx;
		}
	}

	.u-notice-bar {
		background: none !important;
	}

	/deep/.u-notice__content__text {
		color: #FFFFFF !important;
	}

	/deep/.u-steps-item__wrapper__circle {}

	/deep/.u-steps-item__content {
		margin-top: 20rpx !important;
	}

	/deep/.u-icon__icon {
		font-size: 30rpx !important;
	}

	/deep/.u-steps-item__line--row {
		top: 30rpx !important;
	}

	/deep/.slot-icon {
		display: flex;
		align-items: center;
	}

	/deep/.u-steps-item__wrapper {
		width: 70rpx;
		height: 60rpx !important;
		background: #F5F5F4;
		border: 1rpx solid #E8E9E8;
		opacity: 0.9;
		border-radius: 50%;
	}

	/deep/.u-steps-item__wrapper__circle__text {
		font-size: 30rpx !important;
	}

	.view-header {
		width: 100%;
		height: 1332rpx;
		background-size: cover !important;
		padding-top: var(--status-bar-height);

		.view-process {
			width: 690rpx;
			background: #FFFFFF;
			margin: 0 auto;
			box-shadow: 0rpx 1rpx 33rpx 0rpx rgba(33, 102, 197, 0.22);
			border-radius: 10rpx;
			padding: 30rpx;



			.u-steps {
				margin-top: 36rpx;
			}

			.view-points {
				width: 100%;
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;

				.view-points-day {
					display: flex;

					.view-line {
						width: 35rpx;
						height: 60rpx;
						display: flex;
						align-items: center;

						.text-line {
							width: 100%;
							height: 2rpx;
							background-color: #dddddd;
							display: block;
						}
					}

					.view-leftDay {
						.view-days {
							text-align: center;
							font-size: 20rpx;
							color: #666666;
							margin-top: 10rpx;
						}
					}

					.view-date {
						background-color: #f6f4f2;
						width: 80rpx;
						height: 130rpx;
						border-radius: 10rpx;
						font-size: 16rpx;
						color: #999999;
						display: block;
						line-height: 60rpx;
						text-align: center;
						// border: 1rpx solid #cccccc;

						image {
							width: 24rpx;
							height: 24rpx;
						}
					}
				}
			}

			.view-process-title {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #131313;

				text {
					color: #4B9AFF;
					font-size: 38rpx;
					font-family: Impact;
					margin: 0 12rpx;
				}
			}
		}

		.view-block {
			width: 100%;
			display: flex;
			justify-content: space-between;
			padding: 30rpx;

			.view-right {
				display: flex;
				align-items: center;
			}

			.view-item {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 120rpx;

				.view-info {
					display: flex;
					align-items: center;
				}

				.image-right {
					width: 13rpx;
					height: 24rpx;
					margin-top: 5rpx;
				}

				.view-report {
					font-size: 28rpx;
					font-family: PingFang SC;
					color: #cbe4f7;
					margin-right: 20rpx;

					text {
						margin: 0 10rpx;
						font-size: 34rpx;
						font-family: Impact;
					}
				}

				.view-title {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 0.5);
				}

				.view-num {
					font-size: 56rpx;
					font-family: Impact;
					font-weight: 400;
					color: #FFFFFF;
					margin-top: -65rpx;
					margin-left: 50rpx;

					>text {
						font-size: 28rpx;
						font-family: Impact;
						font-weight: 400;
						color: #FFFFFF;
						margin-left: 6rpx;
					}
				}
			}
		}

		.image-fanhui {
			width: 16rpx;
			height: 28rpx;
		}

		.view-more {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			width: 88rpx;
			height: 88rpx;
			padding-right: 10rpx;

			.image-more {
				width: 34rpx;
				height: 8rpx;
			}
		}
	}

	.view-mask {
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	.view-money {
		display: flex;
		align-items: center;
	}
</style>
