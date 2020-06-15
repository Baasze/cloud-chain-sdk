/**
 * @Description: 类型定义
 * @Author: Auspicious
 * @Email: <18437980785@163.com>
 * @Date: 2020/6/10 16:19
 * @LastEditors: missagril
 */

/**
 * 定义配置
 */
export interface MyConfig {
    /* SDK的 APP_ID */
    app_id: string;
    /* SDK的 app_secret */
    app_secret: string;
    /* SDK的 API 接口地址 */
    app_host?: string;
    /* SDK请求接口的语言参数 */
    app_language?: 'ZH' | 'EN' | 'zh' | 'en'
}

/**
 * 接口数据列表
 */
interface RequestList {
    count: number;
    rows: any[];
}

/**
 * 定义节点信息
 */
export interface ChainItem {
    id: number;
    chain_name: string;
}

/**
 * 定义合约信息
 */
export interface ContractItem {
    id: number;
    user_chain_id: string;
    account: string;
    abi_json: string;
    remark: string;
}

/**
 * 定义接口返回结果
 */
export interface MyRequest {
    /* HTTP状态码 */
    status: number;

    /* 接口返回的错误码 */
    errorCode: number;

    /* 接口返回的错误信息 */
    message: string;

    /* 接口返回的数据 */
    data: any;
}

/**
 * 请求基本参数
 */
export interface BaseRequestParams {
    /* 分页 */
    page?: number;

    /* 分页大小 */
    limit?: number;
}

/**
 * 定义插入的数据
 */
export interface InsertData extends BaseRequestParams {
    chainID: string;
    contractID: string;
    account: string;
    actionName: string;
    chainData: string
}
