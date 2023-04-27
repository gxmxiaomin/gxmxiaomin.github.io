<template>
	<view>
		<!-- 进行中 -->
		<view class="contents" v-if="types==1">
			<view class="boxflex" v-for="(item,index) in ordList" :key="index" @click="gotiao(item)">
				<view class="header--circles">
					<view class="hhuas">
						{{item.courseName}}
						<text class="gojins"><i style=" font-style:normal"
								:class="types === '1' ?'sele-jinxing':'sele-wancheng'">进行中</i></text>
					</view>
					<!-- <view class="zongks">
						<view class="course">
							总课时：<text style="display: inline-block;font-weight: 800;">{{item.courseHour || 0}}</text>
						</view>
						<view class="course" style="margin: 10px 10px">
							已上课时：<text style="display: inline-block;font-weight: 800; "> {{item.attendClassSize || 0}}</text>
						</view>
						<view class="course">
							剩余课时：<text style="display: inline-block;font-weight: 800;"> {{item.courseHour - item.attendClassSize}}</text>
						</view>
					</view> -->
				</view>
				<view class="incons">
					<image style="width: 15px;height: 15px;" src="../../static/images/gt.png" mode=""></image>
				</view>
			</view>
			<view style="margin: 60px 0 0 120px" v-if="showfals">
				{{mags}}
			</view>
		</view>
		<!-- 已完成 -->
		<view class="contents" v-if="types==2">
			<view class="boxflex" >
				<view class="header--circles">
					<view class="hhuas">
						绘画创造世界
						<text class="gojins"><i style=" font-style:normal"
								:class="types === '2' ?'sele-wancheng':'sele-jinxing'">已完成</i></text>
					</view>
				<!-- 	<view class="zongks">
						<view class="course">
							总课时：<text style="display: inline-block;font-weight: 800;"> 20</text>
						</view>
						<view class="course" style="margin: 10px 10px">
							已上课时：<text style="display: inline-block;font-weight: 800; "> 20</text>
						</view>
						<view class="course">
							剩余课时：<text style="display: inline-block;font-weight: 800;"> 20</text>
						</view>
					</view> -->
				</view>
				<view class="incons">
					<image style="width: 15px;height: 15px;" src="../../static/images/gt.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-coursexs",
		props: {
			types: String,
			ordList:Array,
			showfals:Boolean,
			mags:String,

		},
		data() {
			return {
		

			};
		},
		mounted() {
		},
		methods: {
			//跳转课程详情
			gotiao(item){
					this.$emit('gotiao',item.id)
				
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.contents {
		overflow: hidden;
		width: 100%;
		padding: 0 10px;

		.boxflex {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 60px;
			background-color: #fff;
			margin: 15px 0;
			border-radius: 10px;

			.header--circles {
				width: calc(100% - 20%);
				height: 60px;
				border-radius: 10px 0 0 10px;
				padding:0 20px;
				// align-items: center;
				line-height: 60px;
				.hhuas {
					font-size: 15px;
					font-weight: 800;

					.gojins {
						display: inline-block;
						font-size: 8px;
						padding: 1px 10px;
						height: 20px;
						line-height: 20px;

						color: #fff;
						border-radius: 30px;
						margin-left: 10px;
					}

				}

				.zongks {
					font-size: 10px;
					display: flex;

					.course {
						margin-top: 10px;
					}
				}
			}

			.incons {
				width: 10%;
				height: 60px;
				line-height: 60px;
				text-align: center;
				border-radius: 0 10px 10px 0;
				flex-shrink: 0;
			}
		}
	}

	.sele-jinxing {
		font-size: 8px;
		padding: 1px 10px;
		height: 20px;
		line-height: 20px;
		border-radius: 30px;
		background-color: #5b9deb;
	}

	.sele-wancheng {
		padding: 1px 10px;
		height: 20px;
		line-height: 20px;
		border-radius: 30px;
		background-color: red;
	}
</style>
