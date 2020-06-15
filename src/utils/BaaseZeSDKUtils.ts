/**
 * @Description: 接口请求封装
 * @Author: Auspicious
 * @Email: <18437980785@163.com>
 * @Date: 2020/6/9 16:15
 * @LastEditors: missagril
 */
import axios, {AxiosRequestConfig} from 'axios';
import * as MD5 from 'md5';
import * as querystring from 'querystring';
import {MyConfig, MyRequest} from "../types";

class BaaseZeSDKUtils {
    /* 申请的 APP_ID */
    private readonly APP_ID: string;

    /* 申请的 APP_SECRET */
    private readonly APP_SECRET: string;

    /* 域名地址 */
    private readonly APP_HOST: string | undefined;

    /* 语言参数 */
    private readonly APP_LANGUAGE: 'ZH' | 'EN' | 'zh' | 'en' | undefined;

    /* 请求地址 */
    private path: string = '';

    /* 请求类型 */
    private requestType: 'GET' | 'POST' | 'get' | 'post' = 'GET';

    /* 请求数据的最大数量 */
    private limit: number = 20;

    /* 请求数据的页数 */
    private page: number = 0;

    /* 请求添加的额外数据 */
    private requestParams: object = {};

    constructor(options: MyConfig) {
        this.APP_ID = options.app_id;
        this.APP_SECRET = options.app_secret;
        this.APP_HOST = options.app_host;
        this.APP_LANGUAGE = options.app_language;
    }

    /**
     * 创建请求参数
     */
    createParams(): any {
        const params: any = {
            path: this.path,
            app_id: this.APP_ID,
            nonce_str: (Math.random() * 10)
                .toString(16)
                .substr(0, 32)
                .replace('.', ''),
            timestamp: parseInt(new Date().getTime() / 1000 + ''),
            limit: this.limit,
            page: this.page,
            ...this.requestParams,
        };

        params.sign = this.createSign(params);

        return params;
    }

    /**
     * 创建签名
     * @param params
     */
    createSign(params: any): string {
        let str = '';

        // 对参数进行排序拼接
        Object.keys(params)
            .sort()
            .forEach((item: string) => {
                str += '&' + item + '=' + params[item];
            });

        return MD5(this.APP_SECRET + str).toLowerCase();
    }

    /**
     * 发起请求
     * @param path
     * @param requestType
     * @param requestParams
     * @param limit
     * @param page
     * @param headers
     */
    async request(
        path: string,
        requestType: 'GET' | 'POST' | 'get' | 'post' = 'GET',
        requestParams: object = {},
        headers: any = {},
        limit: number = 20,
        page: number = 0,
    ): Promise<any> {
        this.path = path;
        this.requestType = requestType;
        this.limit = limit;
        this.page = page;
        this.requestParams = requestParams;

        // 默认设置请求方式为 application/json
        if (!Object.prototype.hasOwnProperty.call(headers, 'Content-Type')) {
            headers['Content-Type'] = 'application/json;charset=UTF-8';
        }

        if (!Object.prototype.hasOwnProperty.call(headers, 'Accept-Language') && this.APP_LANGUAGE) {
            headers['Accept-Language'] = this.APP_LANGUAGE.toLowerCase() || 'zh';
        }

        const params: any = this.createParams();

        const requestUrl =
            this.APP_HOST +
            this.path +
            (this.requestType.toUpperCase() === 'GET'
                ? '?' + querystring.stringify(params)
                : '');

        const options: AxiosRequestConfig = {
            method: this.requestType,
            headers: headers,
            data: this.requestType.toUpperCase() === 'POST' ? params : {},
            url: requestUrl,
            validateStatus: () => true
        };

        try {
            const {status, data: {error_code, message, data}} = await axios.request(options);

            return this.createResponse(status, error_code, message, data);
        } catch (e) {
            return this.createResponse(500, 50000, e.toString(), null);
        }
    }

    /**
     * 这里接口返回的数据
     * @param status
     * @param errorCode
     * @param message
     * @param data
     */
    createResponse(status: number, errorCode: number, message: string, data: any): MyRequest {
        return {
            status, errorCode, message, data
        }
    }
}

export default BaaseZeSDKUtils;
