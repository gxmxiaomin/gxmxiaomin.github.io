<template>
	<view class="view-container">

		<!-- 顶部导航 -->
		<view class="view-status-bar">
			<view class="view-nav-bar">
				<view class="view-trip">
					<text @click="uni.switchTab({
						url:'../index/index'
					})" class="text-trip">跳过</text>
				</view>
			</view>
		</view>
		
		<!-- 选择身份 -->
		<view class="view-select">
			<view class="view-item-name">选择身份</view>
			<view class="view-show-picker" @click="chooseIdentity = true">
				<text>{{identity?identity:'请选择身份'}}</text>
				<u-picker :show="chooseIdentity" :columns="roleList" keyName="name" :defaultIndex="[0]"
					@confirm="confirm" @cancel="chooseIdentity=false"></u-picker>
				<image src="@/static/images/down.png" mode=""></image>
			</view>
		</view>

		<view class="view-space"></view>

		<!-- 实名认证: 用户 -->
		<view v-if="params.identityType==0">
			<view class="view-form">
				<view class="view-form-title">实名认证</view>

				<!-- 姓名 -->
				<view class="view-form-item">
					<view class="view-item-name">
						<text>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</text>
					</view>
					<view class="view-input">
						<input type="text" v-model="params.legalPersonsName" placeholder="请输入" />
					</view>
				</view>

				<!-- 身份证号 -->
				<view class="view-form-item">
					<view class="view-item-name">身份证号</view>
					<view class="view-input">
						<input type="text" v-model="params.idCardNumber" placeholder="请输入" />
					</view>
				</view>

				<!-- 联系电话 -->
				<view class="view-form-item">
					<view class="view-item-name">联系电话</view>
					<view class="view-input">
						<input type="number" v-model="params.contactInformation" placeholder="请输入" />
					</view>
				</view>

				<!-- 常住地址 -->
				<view class="view-form-item">
					<view class="view-item-name">常住地址</view>
					<view class="view-input" @click="$refs.selectAddress.show()">
						<text class="address-info" v-if="address">{{address}}</text>
						<text class="address-info-placeholder" v-else>请选择所在地区</text>
					</view>
				</view>

				<!-- 详细地址 -->
				<view class="view-form-item">
					<view class="view-item-name">详细地址</view>
					<view class="view-input">
						<input type="text" v-model="params.residenceAddress" placeholder="请输入" />
					</view>
				</view>
			</view>

			<!-- 上传资料信息 -->
			<view class="view-uploads">

				<view class="view-item">
					<view class="view-uploads-title">请上传资料信息</view>
					<view class="view-uploads-tips">
						证书类型包含专业资格证、工作证明等有效证件<br>
						*请按照示例上传图片，并保持图片边框清晰
					</view>
				</view>

				<!-- 身份证 -->
				<view class="view-item">
					<ice-upload-image class="img-photo" v-model="params.idCardUrlFront" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-idcard-front.png')"></ice-upload-image>
					<ice-upload-image class="img-photo" v-model="params.idCardUrlReverse" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-idcard-backend.png')"></ice-upload-image>
				</view>
			</view>
		</view>

		<!-- 实名认证: 学校 -->
		<view v-if="params.identityType==1">
			<view class="view-form">
				<view class="view-form-title">实名认证</view>

				<!-- 学校名称 -->
				<view class="view-form-item">
					<view class="view-item-name">
						<text>学校名称</text>
					</view>
					<view class="view-input">
						<input type="text" v-model="params.merchantsName" placeholder="请输入" />
					</view>
				</view>

				<!-- 法人姓名 -->
				<view class="view-form-item">
					<view class="view-item-name">法人姓名</view>
					<view class="view-input">
						<input type="text" v-model="params.legalPersonsName" placeholder="请输入" />
					</view>
				</view>

				<!-- 联系电话 -->
				<view class="view-form-item">
					<view class="view-item-name">联系电话</view>
					<view class="view-input">
						<input type="number" v-model="params.contactInformation" placeholder="请输入" />
					</view>
				</view>

				<!-- 常住地址 -->
				<view class="view-form-item">
					<view class="view-item-name">常住地址</view>
					<view class="view-input" @click="$refs.selectAddress.show()">
						<text class="address-info" v-if="address">{{address}}</text>
						<text class="address-info-placeholder" v-else>请选择所在地区</text>
					</view>
				</view>

				<!-- 详细地址 -->
				<view class="view-form-item">
					<view class="view-item-name">详细地址</view>
					<view class="view-input">
						<input type="text" v-model="params.residenceAddress" placeholder="请输入" />
					</view>
				</view>
			</view>

			<!-- 上传资料信息 -->
			<view class="view-uploads">
				<!-- 提示 -->
				<view class="view-item">
					<view class="view-uploads-title">请上传资料信息</view>
					<view class="view-uploads-tips">
						证书类型包含专业资格证、工作证明等有效证件<br>
						*请按照示例上传图片，并保持图片边框清晰
					</view>
				</view>

				<!-- 营业执照 -->
				<view class="view-item">
					<view class="view-item-title">
						营业执照
					</view>
					<ice-upload-image class="img-photo" v-model="params.businessLicenseUrl" width="669rpx"
						height="404rpx" :defaultImage="require('@/static/images/upload-yingyezhizhao.png')">
					</ice-upload-image>
				</view>

				<!-- 法人身份证 -->
				<view class="view-item">
					<view class="view-item-title">法人身份证</view>
					<ice-upload-image class="img-photo" v-model="params.idCardUrlFront" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-idcard-front.png')"></ice-upload-image>
					<ice-upload-image class="img-photo" v-model="params.idCardUrlReverse" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-idcard-backend.png')"></ice-upload-image>
				</view>


				<view class="view-item">
					<view class="view-item-title">
						学校门头照片
					</view>
					<ice-upload-image class="img-photo" v-model="params.doorwayUrl" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-school-door.png')">
					</ice-upload-image>
				</view>

				<view class="view-item">
					<view class="view-item-title">
						消防安全许可证
					</view>
					<ice-upload-image class="img-photo" v-model="params.fireSafetyUrl" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-safe-image.png')">
					</ice-upload-image>
				</view>

				<view class="view-item">
					<view class="view-item-title">
						办学许可证
					</view>
					<ice-upload-image class="img-photo" v-model="params.schoolPermissionField" width="669rpx"
						height="404rpx" :defaultImage="require('@/static/images/upload-school-lincense.png')">
					</ice-upload-image>
				</view>
			</view>
		</view>

		<!-- 实名认证: 商家(实体店) -->
		<view v-if="params.identityType==2">
			<view class="view-form">
				<view class="view-form-title">实名认证</view>

				<!-- 商家名称 -->
				<view class="view-form-item">
					<view class="view-item-name">
						<text>商家名称</text>
					</view>
					<view class="view-input">
						<input type="text" v-model="params.merchantsName" placeholder="请输入" />
					</view>
				</view>

				<!-- 法人姓名 -->
				<view class="view-form-item">
					<view class="view-item-name">法人姓名</view>
					<view class="view-input">
						<input type="text" v-model="params.legalPersonsName" placeholder="请输入" />
					</view>
				</view>

				<!-- 联系电话 -->
				<view class="view-form-item">
					<view class="view-item-name">联系电话</view>
					<view class="view-input">
						<input type="number" v-model="params.contactInformation" placeholder="请输入" />
					</view>
				</view>

				<!-- 常住地址 -->
				<view class="view-form-item">
					<view class="view-item-name">常住地址</view>
					<view class="view-input" @click="$refs.selectAddress.show()">
						<text class="address-info" v-if="address">{{address}}</text>
						<text class="address-info-placeholder" v-else>请选择所在地区</text>
					</view>
				</view>

				<!-- 详细地址 -->
				<view class="view-form-item">
					<view class="view-item-name">详细地址</view>
					<view class="view-input">
						<input type="text" v-model="params.residenceAddress" placeholder="请输入" />
					</view>
				</view>
			</view>

			<!-- 上传资料信息 -->
			<view class="view-uploads">
				<view class="view-item">
					<view class="view-uploads-title">请上传资料信息</view>
					<view class="view-uploads-tips">
						证书类型包含专业资格证、工作证明等有效证件<br>
						*请按照示例上传图片，并保持图片边框清晰
					</view>
				</view>

				<!-- 营业执照 -->
				<view class="view-item">
					<view class="view-item-title">营业执照</view>
					<ice-upload-image class="img-photo" v-model="params.businessLicenseUrl" width="669rpx"
						height="404rpx" :defaultImage="require('@/static/images/upload-yingyezhizhao.png')">
					</ice-upload-image>
				</view>

				<!-- 法人身份证 -->
				<view class="view-item">
					<view class="view-item-title">法人身份证</view>
					<ice-upload-image class="img-photo" v-model="params.idCardUrlFront" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-idcard-front.png')"></ice-upload-image>
					<ice-upload-image class="img-photo" v-model="params.idCardUrlReverse" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-idcard-backend.png')"></ice-upload-image>
				</view>

				<view class="view-item">
					<view class="view-item-title">
						消防安全许可证
					</view>
					<ice-upload-image v-model="params.fireSafetyUrl" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-safe-image.png')">
					</ice-upload-image>
				</view>

				<!-- 门头照片 -->
				<view class="view-item">
					<view class="view-item-title">
						门头照片
					</view>
					<ice-upload-image v-model="params.doorwayUrl" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-door.png')">
					</ice-upload-image>
				</view>

			</view>
		</view>

		<!-- 实名认证: 心理咨询师 -->
		<view v-if="params.identityType==3">
			<view class="view-form">
				<view class="view-form-title">实名认证</view>

				<!-- 姓名 -->
				<view class="view-form-item">
					<view class="view-item-name">
						<text>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</text>
					</view>
					<view class="view-input">
						<input type="text" v-model="params.legalPersonsName" placeholder="请输入" />
					</view>
				</view>

				<!-- 联系电话 -->
				<view class="view-form-item">
					<view class="view-item-name">联系电话</view>
					<view class="view-input">
						<input type="number" v-model="params.contactInformation" placeholder="请输入" />
					</view>
				</view>

				<!-- 常住地址 -->
				<view class="view-form-item">
					<view class="view-item-name">常住地址</view>
					<view class="view-input" @click="$refs.selectAddress.show()">
						<text class="address-info" v-if="address">{{address}}</text>
						<text class="address-info-placeholder" v-else>请选择所在地区</text>
					</view>
				</view>

				<!-- 详细地址 -->
				<view class="view-form-item">
					<view class="view-item-name">详细地址</view>
					<view class="view-input">
						<input type="text" v-model="params.residenceAddress" placeholder="请输入" />
					</view>
				</view>
			</view>

			<!-- 上传资料信息 -->
			<view class="view-uploads">
				<!-- 提示 -->
				<view class="view-item">
					<view class="view-uploads-title">请上传资料信息</view>
					<view class="view-uploads-tips">
						证书类型包含专业资格证、工作证明等有效证件<br>
						*请按照示例上传图片，并保持图片边框清晰
					</view>
				</view>

				<!-- 证书资质 -->
				<view class="view-item">
					<view class="view-item-title">证书资质</view>
					<ice-upload-image v-model="params.certificateQualification" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/ZiZhiZhengShu.png')">
					</ice-upload-image>
				</view>

				<!-- 居民身份证 -->
				<view class="view-item">
					<view class="view-item-title">居民身份证</view>
					<ice-upload-image class="img-photo" v-model="params.idCardUrlFront" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-idcard-front.png')"></ice-upload-image>
					<ice-upload-image class="img-photo" v-model="params.idCardUrlReverse" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-idcard-backend.png')"></ice-upload-image>
				</view>
			</view>
		</view>

		<!-- 实名认证: 律师/医生/自媒体 -->
		<view v-if="params.identityType==4 || params.identityType==5 || params.identityType==6">
			<view class="view-form">
				<view class="view-form-title">实名认证</view>

				<!-- 姓名 -->
				<view class="view-form-item">
					<view class="view-item-name">
						<text>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</text>
					</view>
					<view class="view-input">
						<input type="text" v-model="params.merchantsName" placeholder="请输入" />
					</view>
				</view>

				<!-- 联系电话 -->
				<view class="view-form-item">
					<view class="view-item-name">联系电话</view>
					<view class="view-input">
						<input type="number" v-model="params.contactInformation" placeholder="请输入" />
					</view>
				</view>

				<!-- 常住地址 -->
				<view class="view-form-item">
					<view class="view-item-name">常住地址</view>
					<view class="view-input" @click="$refs.selectAddress.show()">
						<text class="address-info" v-if="address">{{address}}</text>
						<text class="address-info-placeholder" v-else>请选择所在地区</text>
					</view>
				</view>

				<!-- 详细地址 -->
				<view class="view-form-item">
					<view class="view-item-name">详细地址</view>
					<view class="view-input">
						<input type="text" v-model="params.residenceAddress" placeholder="请输入" />
					</view>
				</view>
			</view>

			<!-- 上传资料信息 -->
			<view class="view-uploads">

				<view class="view-item">
					<view class="view-uploads-title">请上传资料信息</view>
					<view class="view-uploads-tips">
						证书类型包含专业资格证、工作证明等有效证件<br>
						*请按照示例上传图片，并保持图片边框清晰
					</view>
				</view>

				<!-- 证书资质 -->
				<view class="view-item">
					<view class="view-item-title">证书资质</view>
					<ice-upload-image v-model="params.certificateQualification" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/ZiZhiZhengShu.png')">
					</ice-upload-image>
				</view>

				<!-- 居民身份证 -->
				<view class="view-item">
					<view class="view-item-title">居民身份证</view>
					<ice-upload-image class="img-photo" v-model="params.idCardUrlFront" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-idcard-front.png')"></ice-upload-image>
					<ice-upload-image class="img-photo" v-model="params.idCardUrlReverse" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-idcard-backend.png')"></ice-upload-image>
				</view>
			</view>
		</view>

		<!-- 实名认证: 培训机构 -->
		<view v-if="params.identityType==7">
			<view class="view-form">
				<view class="view-form-title">实名认证</view>

				<!-- 机构名称 -->
				<view class="view-form-item">
					<view class="view-item-name">
						<text>机构名称</text>
					</view>
					<view class="view-input">
						<input type="text" v-model="params.merchantsName" placeholder="请输入" />
					</view>
				</view>

				<!-- 法人姓名 -->
				<view class="view-form-item">
					<view class="view-item-name">法人姓名</view>
					<view class="view-input">
						<input type="text" v-model="params.legalPersonsName" placeholder="请输入" />
					</view>
				</view>

				<!-- 联系电话 -->
				<view class="view-form-item">
					<view class="view-item-name">联系电话</view>
					<view class="view-input">
						<input type="number" v-model="params.contactInformation" placeholder="请输入" />
					</view>
				</view>

				<!-- 常住地址 -->
				<view class="view-form-item">
					<view class="view-item-name">常住地址</view>
					<view class="view-input" @click="$refs.selectAddress.show()">
						<text class="address-info" v-if="address">{{address}}</text>
						<text class="address-info-placeholder" v-else>请选择所在地区</text>
					</view>
				</view>

				<!-- 详细地址 -->
				<view class="view-form-item">
					<view class="view-item-name">详细地址</view>
					<view class="view-input">
						<input type="text" v-model="params.residenceAddress" placeholder="请输入" />
					</view>
				</view>
			</view>

			<!-- 上传资料信息 -->
			<view class="view-uploads">
				<!-- 提示 -->
				<view class="view-item">
					<view class="view-uploads-title">请上传资料信息</view>
					<view class="view-uploads-tips">
						证书类型包含专业资格证、工作证明等有效证件<br>
						*请按照示例上传图片，并保持图片边框清晰
					</view>
				</view>

				<!-- 营业执照 -->
				<view class="view-item" v-if="params.identityType!=0">
					<view class="view-item-title" style="margin-top: 0;">
						营业执照
					</view>
					<ice-upload-image class="img-photo" v-model="params.businessLicenseUrl" width="669rpx"
						height="404rpx" v-if="params.identityType!=0"
						:defaultImage="require('@/static/images/upload-yingyezhizhao.png')">
					</ice-upload-image>
				</view>

				<!-- 法人身份证 -->
				<view class="view-item">
					<view class="view-item-title">法人身份证</view>
					<ice-upload-image class="img-photo" v-model="params.idCardUrlFront" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-idcard-front.png')"></ice-upload-image>
					<ice-upload-image class="img-photo" v-model="params.idCardUrlReverse" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-idcard-backend.png')"></ice-upload-image>
				</view>

				<view class="view-item-title" style="margin-top: 0;" v-if="params.identityType==5">
					证书资质
				</view>
				<ice-upload-image v-model="params.certificateQualification" width="669rpx" height="404rpx"
					v-if="params.identityType==5" :defaultImage="require('@/static/images/ZiZhiZhengShu.png')">
				</ice-upload-image>

				<view class="view-item-title" v-if="params.identityType!=0">
					学校门头照片
				</view>
				<ice-upload-image v-model="params.doorwayUrl" width="669rpx" height="404rpx"
					v-if="params.identityType!=0" :defaultImage="require('@/static/images/upload-school-door.png')">
				</ice-upload-image>
				<view class="view-item-title" v-if="params.identityType!=0">
					消防安全许可证
				</view>
				<ice-upload-image v-model="params.fireSafetyUrl" width="669rpx" height="404rpx"
					v-if="params.identityType!=0" :defaultImage="require('@/static/images/upload-safe-image.png')">
				</ice-upload-image>
			</view>
		</view>

		<!-- 实名认证: 商家(网店) -->
		<view v-if="params.identityType==8">
			<view class="view-form">
				<view class="view-form-title">实名认证</view>

				<!-- 商家名称 -->
				<view class="view-form-item">
					<view class="view-item-name">
						<text>商家名称</text>
					</view>
					<view class="view-input">
						<input type="text" v-model="params.merchantsName" placeholder="请输入" />
					</view>
				</view>

				<!-- 法人姓名 -->
				<view class="view-form-item">
					<view class="view-item-name">法人姓名</view>
					<view class="view-input">
						<input type="text" v-model="params.legalPersonsName" placeholder="请输入" />
					</view>
				</view>

				<!-- 联系电话 -->
				<view class="view-form-item">
					<view class="view-item-name">联系电话</view>
					<view class="view-input">
						<input type="number" v-model="params.contactInformation" placeholder="请输入" />
					</view>
				</view>

				<!-- 常住地址 -->
				<view class="view-form-item">
					<view class="view-item-name">常住地址</view>
					<view class="view-input" @click="$refs.selectAddress.show()">
						<text class="address-info" v-if="address">{{address}}</text>
						<text class="address-info-placeholder" v-else>请选择所在地区</text>
					</view>
				</view>

				<!-- 详细地址 -->
				<view class="view-form-item">
					<view class="view-item-name">详细地址</view>
					<view class="view-input">
						<input type="text" v-model="params.residenceAddress" placeholder="请输入" />
					</view>
				</view>
			</view>

			<!-- 上传资料信息 -->
			<view class="view-uploads">
				<!-- 提示 -->
				<view class="view-item">
					<view class="view-uploads-title">请上传资料信息</view>
					<view class="view-uploads-tips">
						证书类型包含专业资格证、工作证明等有效证件<br>
						*请按照示例上传图片，并保持图片边框清晰
					</view>
				</view>

				<!-- 营业执照 -->
				<view class="view-item">
					<view class="view-item-title">
						营业执照
					</view>
					<ice-upload-image class="img-photo" v-model="params.businessLicenseUrl" width="669rpx"
						height="404rpx" :defaultImage="require('@/static/images/upload-yingyezhizhao.png')">
					</ice-upload-image>
				</view>

				<!-- 法人身份证 -->
				<view class="view-item">
					<view class="view-item-title">法人身份证</view>
					<ice-upload-image class="img-photo" v-model="params.idCardUrlFront" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-idcard-front.png')"></ice-upload-image>
					<ice-upload-image class="img-photo" v-model="params.idCardUrlReverse" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/upload-idcard-backend.png')"></ice-upload-image>
				</view>

				<!-- 加盟授权证书 -->
				<view class="view-item">
					<view class="view-item-title">加盟授权证书</view>
					<ice-upload-image class="img-photo" v-model="params.franchiseLicense" width="669rpx" height="404rpx"
						:defaultImage="require('@/static/images/franchiseLicense.png')"></ice-upload-image>
				</view>
			</view>
		</view>

		<button @click="submit" class="u-reset-button">提交审核</button>
		<selectAddress ref='selectAddress' @selectAddress="successSelectAddress"></selectAddress>
	</view>
</template>

<script>
	import selectAddress from '@/components/yixuan-selectAddress/yixuan-selectAddress.vue'
	export default {
		components: {
			selectAddress
		},
		data() {
			return {
				isIdentity: false, // 是否已选身份
				chooseIdentity: false, // 选择身份
				identity: '', // 已选身份
				roleList: [
					[{
						name: '用户',
						id: 0,
					}, {
						name: '学校',
						id: 1,
					}, {
						name: '商家',
						id: 2,
					}, {
						name: '心理咨询师',
						id: 3,
					}, {
						name: '律师',
						id: 4,
					}, {
						name: '医生',
						id: 5,
					}, {
						name: '自媒体',
						id: 6,
					}, {
						name: '培训机构',
						id: 7,
					}, {
						name: '商家(网店)',
						id: 8,
					}]
				],
				address: '',
				params: {
					identityType: '', //	身份类型(0:用户；1:学校；2:商家；3:心理咨询师；4:律师；5:医生；6:自媒体;7 学校(机构) 8:商家(网店))
					merchantsName: '', //	商家(机构)名称
					legalPersonsName: '', //法人姓名 用户姓名
					idCardNumber: '', // 身份证号码
					idCardUrlFront: "", // 身份证正面
					idCardUrlReverse: "", // 身份证反面
					contactInformation: '', // 联系电话
					province: '', // 省
					city: '', // 市
					area: '', // 区
					residenceAddress: '', // 详细地址
					areaName: '', // 所在区域
					areaName: "",
					businessLicenseUrl: "",
					doorwayUrl: "",
					fireSafetyUrl: "",
					schoolPermissionField: "",
					province: '',
					certificateQualification: '',
				},
			};
		},
		methods: {
			// 提交审核
			async submit() {
				// console.log(this.params);

				if (!this.isIdentity) {
					this.$toast('请选择身份');
					return false
				}
				switch (this.params.identityType) {
					case 0:
						this.isType0(); // 用户
						break;
					case 1:
						this.isType1(); // 学校
						break;
					case 2:
						this.isType2(); // 商家
						break;
					case 3:
						this.isType3(); // 心理咨询师
						break;
					case 4:
						this.isType4(); // 律师
						break;
					case 5:
						this.isType4(); // 医生
						break;
					case 6:
						this.isType4(); // 自媒体
						break;
					case 7:
						this.isType7(); // 培训机构
						break;
					case 8:
						this.isType8(); // 商家(网店)
						break;
				}
				let res = await this.http.postJson('/app/userInfo/userPerfectInformation', this.params);
				console.log(res);
				if (res.code == 200) {
					await this.$toast("提交成功");
					uni.navigateTo({
						url: '../check-status/check-status?status=checking'
					})
				} else {
					this.$toast(res.msg);
				}
			},

			// 判断·商家(网店)
			isType8() {
				if (!this.params.merchantsName) {
					this.$toast('请输入商家名称');
					return false
				}
				if (!this.params.legalPersonsName) {
					this.$toast('请输入法人姓名');
					return false
				}
				if (!this.params.contactInformation) {
					this.$toast('请输入联系电话');
					return false
				}
				if (!uni.$u.test.mobile(this.params.contactInformation)) {
					this.$toast('手机号格式不正确');
					return false
				}
				if (!this.params.city) {
					this.$toast('请选择所在地区');
					return false
				}
				if (!this.params.area) {
					this.$toast('请选择所在地区');
					return false
				}
				if (!this.params.residenceAddress) {
					this.$toast('请输入详细地址');
					return false
				}
				if (!this.params.businessLicenseUrl) {
					this.$toast('请上传营业执照');
					return false
				}
				if (!this.params.idCardUrlFront) {
					this.$toast('请上传身份证正面');
					return false
				}
				if (!this.params.idCardUrlReverse) {
					this.$toast('请上传身份证反面');
					return false
				}
				if (!this.params.franchiseLicense) {
					this.$toast('请上传加盟授权证书');
					return false
				}
			},

			// 判断·培训机构
			isType7() {
				if (!this.params.merchantsName) {
					this.$toast('请输入机构名称');
					return false
				}
				if (!this.params.legalPersonsName) {
					this.$toast('请输入法人姓名');
					return false
				}
				if (!this.params.contactInformation) {
					this.$toast('请输入联系电话');
					return false
				}
				if (!uni.$u.test.mobile(this.params.contactInformation)) {
					this.$toast('手机号格式不正确');
					return false
				}
				if (!this.params.city) {
					this.$toast('请选择所在地区');
					return false
				}
				if (!this.params.area) {
					this.$toast('请选择所在地区');
					return false
				}
				if (!this.params.residenceAddress) {
					this.$toast('请输入详细地址');
					return false
				}
				if (!this.params.businessLicenseUrl) {
					this.$toast('请上传营业执照');
					return false
				}
				if (!this.params.idCardUrlFront) {
					this.$toast('请上传身份证正面');
					return false
				}
				if (!this.params.idCardUrlReverse) {
					this.$toast('请上传身份证反面');
					return false
				}
				if (!this.params.doorwayUrl) {
					this.$toast('请上传学校门头照片');
					return false
				}
				if (!this.params.fireSafetyUrl) {
					this.$toast('请上传消防安全许可证');
					return false
				}
			},

			// 判断·律师
			isType4() {
				if (!this.params.legalPersonsName) {
					this.$toast('请输入姓名');
					return false
				}
				if (!this.params.idCardNumber) {
					this.$toast('请输入身份证号');
					return false
				}
				if (!uni.$u.test.idCard(this.params.idCardNumber)) {
					this.$toast('身份证号格式不正确');
					return false
				}
				if (!this.params.contactInformation) {
					this.$toast('请输入联系电话');
					return false
				}
				if (!uni.$u.test.mobile(this.params.contactInformation)) {
					this.$toast('手机号格式不正确');
					return false
				}
				if (!this.params.city) {
					this.$toast('请选择所在地区');
					return false
				}
				if (!this.params.area) {
					this.$toast('请选择所在地区');
					return false
				}
				if (!this.params.residenceAddress) {
					this.$toast('请输入详细地址');
					return false
				}
				if (!this.params.certificateQualification) {
					this.$toast('请上传证书资质照片');
					return false
				}
				if (!this.params.idCardUrlFront) {
					this.$toast('请上传身份证正面');
					return false
				}
				if (!this.params.idCardUrlReverse) {
					this.$toast('请上传身份证反面');
					return false
				}
			},

			// 判断·心理咨询师
			isType3() {
				if (!this.params.legalPersonsName) {
					this.$toast('请输入姓名');
					return false
				}
				if (!this.params.contactInformation) {
					this.$toast('请输入联系电话');
					return false
				}
				if (!uni.$u.test.mobile(this.params.contactInformation)) {
					this.$toast('手机号格式不正确');
					return false
				}
				if (!this.params.city) {
					this.$toast('请选择所在地区');
					return false
				}
				if (!this.params.area) {
					this.$toast('请选择所在地区');
					return false
				}
				if (!this.params.residenceAddress) {
					this.$toast('请输入详细地址');
					return false
				}
				if (!this.params.certificateQualification) {
					this.$toast('请上传证书资质照片');
					return false
				}
				if (!this.params.idCardUrlFront) {
					this.$toast('请上传身份证正面');
					return false
				}
				if (!this.params.idCardUrlReverse) {
					this.$toast('请上传身份证反面');
					return false
				}
			},

			// 判断·商家
			isType2() {
				if (!this.params.merchantsName) {
					this.$toast('请输入商家名称');
					return false
				}
				if (!this.params.legalPersonsName) {
					this.$toast('请输入法人姓名');
					return false
				}
				if (!this.params.contactInformation) {
					this.$toast('请输入联系电话');
					return false
				}
				if (!uni.$u.test.mobile(this.params.contactInformation)) {
					this.$toast('手机号格式不正确');
					return false
				}
				if (!this.params.city) {
					this.$toast('请选择所在地区');
					return false
				}
				if (!this.params.area) {
					this.$toast('请选择所在地区');
					return false
				}
				if (!this.params.residenceAddress) {
					this.$toast('请输入详细地址');
					return false
				}
				if (!this.params.businessLicenseUrl) {
					this.$toast('请上传营业执照');
					return false
				}
				if (!this.params.idCardUrlFront) {
					this.$toast('请上传身份证正面');
					return false
				}
				if (!this.params.idCardUrlReverse) {
					this.$toast('请上传身份证反面');
					return false
				}
				if (!this.params.fireSafetyUrl) {
					this.$toast('请上传消防安全许可证');
					return false
				}
				if (!this.params.doorwayUrl) {
					this.$toast('请上传门头图片');
					return false
				}
			},

			// 判断·学校
			isType1() {
				if (!this.params.merchantsName) {
					this.$toast('请输入学校名称');
					return false
				}
				if (!this.params.legalPersonsName) {
					this.$toast('请输入法人姓名');
					return false
				}
				if (!this.params.contactInformation) {
					this.$toast('请输入联系电话');
					return false
				}
				if (!uni.$u.test.mobile(this.params.contactInformation)) {
					this.$toast('手机号格式不正确');
					return false
				}
				if (!this.params.city) {
					this.$toast('请选择所在地区');
					return false
				}
				if (!this.params.area) {
					this.$toast('请选择所在地区');
					return false
				}
				if (!this.params.residenceAddress) {
					this.$toast('请输入详细地址');
					return false
				}
				if (!this.params.businessLicenseUrl) {
					this.$toast('请上传营业执照');
					return false
				}
				if (!this.params.idCardUrlFront) {
					this.$toast('请上传身份证正面');
					return false
				}
				if (!this.params.idCardUrlReverse) {
					this.$toast('请上传身份证反面');
					return false
				}
				if (!this.params.doorwayUrl) {
					this.$toast('请上传学校门头照片');
					return false
				}
				if (!this.params.fireSafetyUrl) {
					this.$toast('请上传消防安全许可证');
					return false
				}
				if (!this.params.schoolPermissionField) {
					this.$toast('请上传办学许可证');
					return false
				}
			},

			// 判断用户
			isType0() {
				if (!this.params.legalPersonsName) {
					this.$toast('请输入姓名');
					return false
				}
				if (!this.params.idCardNumber) {
					this.$toast('请输入身份证号');
					return false
				}
				if (!uni.$u.test.idCard(this.params.idCardNumber)) {
					this.$toast('身份证号格式不正确');
					return false
				}
				if (!this.params.contactInformation) {
					this.$toast('请输入联系电话');
					return false
				}
				if (!uni.$u.test.mobile(this.params.contactInformation)) {
					this.$toast('手机号格式不正确');
					return false
				}
				if (!this.params.city) {
					this.$toast('请选择所在地区');
					return false
				}
				if (!this.params.area) {
					this.$toast('请选择所在地区');
					return false
				}
				if (!this.params.residenceAddress) {
					this.$toast('请输入详细地址');
					return false
				}
				if (!this.params.idCardUrlFront) {
					this.$toast('请上传身份证正面');
					return false
				}
				if (!this.params.idCardUrlReverse) {
					this.$toast('请上传身份证反面');
					return false
				}
			},

			// 选择身份
			confirm(e) {
				// console.log(e);
				this.isIdentity = true;
				this.chooseIdentity = false;
				this.params.identityType = e.indexs[0];
				this.identity = e.value[0].name;
				console.log(`已选身份:${e.indexs[0]}-${e.value[0].name}`);
			},

			successSelectAddress(address) { //选择成功回调
				console.log(address)
				this.params.areaName = address.join('');
				console.log(this.params.areaName);
				if (address.length == 3) {
					this.address = address[0] + '-' + address[1] + '-' + address[2]
					this.params.province = address[0]
					this.params.city = address[1]
					this.params.area = address[2]
					return
				}
				if (address.length == 2) {
					this.address = address[0] + '-' + address[1]
					this.params.province = address[0]
					this.params.city = address[1]
					return
				}
			},
		},
	}
</script>

<style lang="scss">
	.view-status-bar {
		padding-top: var(--status-bar-height);

		.view-nav-bar {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding: 0 20rpx;
			height: 88rpx;

			.view-trip {
				width: 133rpx;
				height: 60rpx;
				background: rgba(0, 0, 0, 0.2);
				border-radius: 10rpx;
				text-align: center;
				line-height: 60rpx;
				color: #FFFFFF;
			}
		}
	}

	/deep/.uni-input-input {
		font-size: 26rpx;
		color: #666666;
	}

	/deep/.address-info {
		font-size: 26rpx;
		color: #666666;
	}

	/deep/.address-info-placeholder {
		font-size: 26rpx;
		color: #999999;
	}

	.address-info {
		font-size: 28rpx;
	}

	.view-container {
		display: flex;
		flex-direction: column;

		.view-select {
			width: 100%;
			display: flex;
			align-items: center;
			margin: 30rpx 0;
			padding: 0 30rpx;

			.view-item-name {
				font-size: 32rpx;
				color: #333333;
				margin-right: 31rpx;
				width: 18%;
			}

			.view-show-picker {
				width: 100%;
				flex-shrink: 1;
				height: 80rpx;
				background: #F6F6F6;
				border-radius: 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 17rpx 0 30rpx;

				text {
					font-size: 28rpx;
					color: #333333
				}

				image {
					width: 22rpx;
					height: 13rpx;
				}
			}
		}

		.view-space {
			height: 20rpx;
			background: #F7F7F7;
		}

		.view-form {
			width: 100%;
			margin-bottom: 60rpx;
			padding: 0 30rpx;

			.view-form-title {
				font-size: 40rpx;
				font-weight: 500;
				color: #333333;
				margin: 30rpx 0;
			}

			.view-form-item {
				width: 100%;
				height: 80rpx;
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;

				.view-item-name {
					font-size: 32rpx;
					color: #333333;
					margin-right: 31rpx;
					width: 18%;
				}

				.view-input {
					width: 100%;
					height: 80rpx;
					flex: 1;
					background: #F6F6F6;
					border-radius: 10rpx;
					padding: 0 30rpx;
					display: flex;
					align-items: center;

					input {
						width: 100%;
					}

					/deep/.ice-text {
						font-size: 28rpx;
					}

					input {
						height: 100%;

						.uni-input-placeholder {
							font-size: 28rpx;
							color: #999999;
						}
					}
				}
			}
		}

		.view-uploads {
			width: 100%;
			display: flex;
			flex-direction: column;
			margin-bottom: 13rpx;
			padding: 0 30rpx;

			.view-uploads-title {
				width: 100%;
				font-size: 32rpx;
				font-weight: 500;
				color: #333333;
				margin-bottom: 8rpx;
			}

			.view-uploads-tips {
				width: 100%;
				font-size: 24rpx;
				color: #FC6129;
				line-height: 36rpx;
				margin-bottom: 25rpx;
			}

			.view-item {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;

				.view-photo {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.img-photo {
					display: flex;
					align-items: center;
					justify-content: center;
				}

				.img-photo+.img-photo {
					margin-top: 20rpx;
				}
			}

			.view-item-title {
				width: 100%;
				font-size: 32rpx;
				color: #333333;
				margin: 60rpx 0 32rpx;
			}

			.view-uploads-item {
				width: 669rpx;
				height: 404rpx;
				background-size: 669rpx 404rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin-bottom: 33rpx;
				border: 1px dashed #999999;

				image {
					width: 121rpx;
					height: 120rpx;
					margin-bottom: 39rpx;
				}
			}
		}

		.u-reset-button {
			width: 633rpx;
			height: 90rpx;
			background: #4B9AFF;
			border-radius: 45rpx;
			font-size: 32rpx;
			font-weight: 500;
			color: #FFFFFF;
			line-height: 90rpx;
			text-align: center;
			margin: 4rpx auto 20rpx;
		}
	}
</style>
