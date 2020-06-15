import * as Table from "cli-table2";
import {consoleToUser, HOST, tipsParse} from "../utils";
import {BaseRequestParams, ChainItem, ContractItem, InsertData, MyRequest} from "../types";
import RequestService from "./RequestService";

/**
 * @Description: 命令行数据的处理
 * @Author: Auspicious
 * @Email: <18437980785@163.com>
 * @Date: 2020/6/11 10:42
 * @LastEditors: missagril
 */

class CommandService {
    private requestService: RequestService;

    constructor() {
        this.requestService = new RequestService();
    }

    /**
     * 链列表
     */
    getChainList(params: BaseRequestParams = {}): void {
        this.requestService.getChainList(params).then((res: MyRequest) => {
            const {status, errorCode, data} = res;

            let table;
            if (status === 200 && errorCode === 0) {
                table = new Table({
                    head: [tipsParse(200), tipsParse(201)]
                });

                data.rows.forEach((item: ChainItem) => {
                    table.push([item.id, item.chain_name])
                });
            } else {
                table = this.normalHandle(res);
            }
            consoleToUser(table.toString())
        });
    }

    /**
     * 获取用户的合约列表
     */
    getContractList(params: BaseRequestParams = {}): void {
        this.requestService.getContractList(params).then((res: MyRequest) => {
            const {status, errorCode, data} = res;

            let table;
            if (status === 200 && errorCode === 0) {
                table = new Table({
                    head: [tipsParse(202), tipsParse(203), tipsParse(204), tipsParse(205)]
                });

                data.rows.forEach((item: ContractItem) => {
                    table.push([item.id, item.user_chain_id, item.remark, item.account])
                });
            } else {
                table = this.normalHandle(res);
            }
            consoleToUser(table.toString())
        });
    }

    /**
     * 执行插入数据
     * @param chainID
     * @param contractID
     * @param account
     * @param actionName
     * @param chainData
     */
    insertData(chainID: string, contractID: string, account: string, actionName: string, chainData: string): void {
        const insertData: InsertData = {
            chainID, contractID, account, actionName, chainData
        };

        this.requestService.insertData(insertData).then((res: MyRequest) => {
            const table = this.normalHandle(res, false);

            consoleToUser(table.toString());

            const url = `${HOST}/spa/admin/console/blockchain/browser/tx/${res.data.transaction_id}?chainId=${insertData.chainID}`;

            consoleToUser(tipsParse(1016, url));
        })
    };

    /**
     * 通用的处理
     * @param response
     * @param isError
     */
    normalHandle(response: MyRequest, isError: boolean = true): Table {

        const {status, errorCode, message, data} = response;

        const table: any = new Table({
            head: [tipsParse(300), tipsParse(301), tipsParse(302), tipsParse(303), tipsParse(304)]
        });

        table.push([status, errorCode, message, JSON.stringify(data), tipsParse(isError ? 1014 : 1015)]);

        return table;
    };
}

export default CommandService;
