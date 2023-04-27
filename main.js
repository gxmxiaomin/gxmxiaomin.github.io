import App from './App'
import Vue from 'vue'
import {http,baseUrl} from './utils/http.js'
import {IM} from './utils/IM.js'
import utils from './utils/utils.js'
import tree from './utils/tree.js'
import uView from "uview-ui";
import myMix from 'utils/mixin.js';
import shareUrlList from "@/utils/shareUrl.js"
import MessageTip from '@/components/message-tip/message-tip.vue'
import * as messageShowTip from '@/utils/messageShow.js'
import { DownloadMethods } from '@/static/js/configUrl.js'
Vue.mixin(myMix)

Vue.use(uView);
Vue.use(utils);
Vue.component('MessageTip',MessageTip);


Vue.prototype.http=http
Vue.prototype.baseUrl=baseUrl
Vue.prototype.IM = IM
Vue.prototype.uni=uni
Vue.prototype.shareUrlList=shareUrlList
Vue.prototype.messageShowTip = messageShowTip
Vue.prototype.DownloadMethods = DownloadMethods
Vue.prototype.console=console
Vue.config.productionTip = false
App.mpType = 'app'




const app = new Vue({
    ...App
})
app.$mount()
