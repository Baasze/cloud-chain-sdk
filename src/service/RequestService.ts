/**
 * @Description: 请求封装
 * @Author: Auspicious
 * @Email: <18437980785@163.com>
 * @Date: 2020/6/10 16:51
 * @LastEditors: missagril
 */
import BaaseZeSDKUtils from "../utils/BaaseZeSDKUtils";
import {checkHostUrl, HOST, isDebug, tipsParse} from "../utils";
import {BaseRequestParams, InsertData, MyConfig, MyRequest} from "../types";
import ConfigService from "./ConfigService";
import * as assert from 'assert';

class RequestService {

    /**
     * 定义请求工具库
     */
    private baaseZeSDKUtils: BaaseZeSDKUtils;

    /**
     * 参数检测
     */
    private hasOwnProperty: any = Object.prototype.hasOwnProperty;

    /**
     * 构造器
     * @param callType
     * @param options
     */
    constructor(callType: 'command' | 'sdk' = 'command', options: MyConfig | any = null) {
        if (callType === 'sdk') {
            assert(options, tipsParse(1012));

            assert(options.app_id, tipsParse(1012));

            assert(options.app_secret, tipsParse(1013));

            if (options.app_language)
                assert(['ZH', 'EN', 'zh', 'en'].includes(options.app_language), tipsParse(1018))
        } else {
            options = ConfigService.getConfig();

            assert(options, tipsParse(1001));
        }

        // 检测 HOST 参数的存在及合法性
        if (this.hasOwnProperty.call(options, 'app_host') && options.app_host) {
            if (!checkHostUrl(options.app_host)) {
                assert(false, tipsParse(1017));
            }
        } else {
            options.app_host = isDebug ? "http://127.0.0.1:3000" : HOST;
        }

        // 只处理 https://xxx.com/ 的情况，忽略 //... 等
        if (options.app_host.endsWith('/')) {
            options.app_host = options.app_host.replace("/", '');
        }

        this.baaseZeSDKUtils = new BaaseZeSDKUtils(options);
    }

    /**
     * 获取用户的链列表
     * @param params
     */
    async getChainList(params: BaseRequestParams = {}): Promise<MyRequest> {
        return await this.baaseZeSDKUtils.request('/sdk/chain/list', 'GET', params);
    }

    /**
     * 获取用户的合约列表
     * @param params
     */
    async getContractList(params: BaseRequestParams = {}): Promise<MyRequest> {
        return await this.baaseZeSDKUtils.request('/sdk/contract/list', 'GET', params)
    }

    /**
     * 插入数据
     * @param insertData
     */
    async insertData(insertData: InsertData): Promise<MyRequest> {
        return await this.baaseZeSDKUtils.request(
            '/sdk/contract/adddata',
            'POST',
            insertData,
        );
    };
}

export default RequestService;
