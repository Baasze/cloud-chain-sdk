/**
 * @Description: 导出，提供引用
 * @Author: Auspicious
 * @Email: <18437980785@163.com>
 * @Date: 2020/6/11 11:21
 * @LastEditors: missagril
 */
import RequestService from "./src/service/RequestService";
import {MyConfig} from "./src/types";
import * as assert from "assert";
import {tipsParse} from "./src/utils";

let sdkService: RequestService;

function BaasZeSDKClient(options: MyConfig) {
    // @ts-ignore
    if (!(this instanceof BaasZeSDKClient)) {
        assert(false, tipsParse(1019));
    }

    if (!sdkService) {
        sdkService = new RequestService('sdk', options);
    }
    return sdkService;
}

export = BaasZeSDKClient;