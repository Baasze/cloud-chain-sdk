/**
 * @Description: 一些工具函数
 * @Author: Auspicious
 * @Email: <18437980785@163.com>
 * @Date: 2020/6/10 15:46
 * @LastEditors: missagril
 */
import language from "../common/language";
import {BaseRequestParams} from "../types";

/**
 * 主域名
 */
export const HOST = "https://baasze.com";

/**
 * 当前环境类型
 */
export const isDebug = false;

/**
 * debug 日志
 * @param args
 */
export const log = (...args: any) => {
    if (isDebug) console.log(...args);
};

/**
 * 展示给用户的输出
 * @param args
 */
export const consoleToUser = (...args: any) => {
    console.log(...args);
};

/**
 * 处理提示语
 * @param code
 * @param args
 */
export const tipsParse = (code: number, ...args: any): string => {
    let message: string = language[code];

    const arr = [...args];

    if (arr.length === 0) return message;

    for (let v of arr) {
        message = message.replace("%s", v);
    }

    return message;
};

/**
 * 解析并判断是不是JSON
 * @param content
 * @param tipsCode
 */
export const jsonParse = (content: string, tipsCode: number = 1006): any => {
    try {
        const obj = JSON.parse(content);

        if (toString.call(obj) === "[object Object]") {
            return obj;
        } else {
            sdkError("")
        }
    } catch (e) {
        sdkError(tipsParse(tipsCode));
    }
};

/**
 * 抛出异常
 * @param message
 */
export const sdkError = (message: string = '') => {
    throw new Error(message);
};

/**
 * 处理用户输入
 * @param limit
 * @param page
 */
export const parseInput = (limit: any, page: any): BaseRequestParams => {
    limit = parseInt(limit) || 20;

    page = parseInt(page) || 0;

    return {limit, page}
};

/**
 * 检测URL是否合规
 * @param app_host
 */
export const checkHostUrl = (app_host: string) => {
    return app_host.startsWith("http://") || app_host.startsWith("https://")
};