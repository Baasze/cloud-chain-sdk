/**
 * @Description: 命令配置以及基本参数判断
 * @Author: Auspicious
 * @Email: <18437980785@163.com>
 * @Date: 2020/6/11 15:36
 * @LastEditors: missagril
 */
import {program} from "commander";
import {checkHostUrl, consoleToUser, jsonParse, parseInput, tipsParse} from "../utils";
import ConfigService from "../service/ConfigService";
import CommandService from "../service/CommandService";
import * as assert from "assert";

program
    .command("version")
    .description(tipsParse(101))
    .action(() => {
        consoleToUser("current version 1.0.0");
    });

program
    .command("GetChainList")
    .description(tipsParse(102))
    .arguments("[limit] [page]")
    .action((limit: any = 20, page: any = 0) => {
        (new CommandService()).getChainList(parseInput(limit, page));
    });

program
    .command("GetContractList")
    .description(tipsParse(104))
    .arguments("[limit] [page]")
    .action((limit: any = 20, page: any = 0) => {
        (new CommandService()).getContractList(parseInput(limit, page));
    });

program
    .command("insert")
    .arguments("<chainID> <contractID> <account> <actionName> <chainData>")
    .description(tipsParse(105))
    .action((
        chainID: string,
        contractID: string,
        account: string,
        actionName: string,
        chainData: string
        ) => {
            if (!chainID) return consoleToUser(tipsParse(1007));
            if (!contractID) return consoleToUser(tipsParse(1008));
            if (!account) return consoleToUser(tipsParse(1009));
            if (!actionName) return consoleToUser(tipsParse(1010));
            if (!chainData) return consoleToUser(tipsParse(1011));
            try {
                const newChainData = jsonParse(chainData, 1006);

                (new CommandService()).insertData(
                    chainID,
                    contractID,
                    account,
                    actionName,
                    JSON.stringify(newChainData)
                );
            } catch (e) {
                consoleToUser(e.toString());
            }
        }
    );

/**
 * 写入配置
 */
program
    .command("config")
    .arguments("<app_id> <app_secret> [app_host]")
    .description(tipsParse(103))
    .action((app_id: string, app_secret: string, app_host: string) => {
        if (!app_id) return consoleToUser(tipsParse(1003));

        if (!app_secret) return consoleToUser(tipsParse(1004));

        if (app_host && !checkHostUrl(app_host)) return consoleToUser(tipsParse(1017));

        ConfigService.setConfig(app_id, app_secret, app_host);

        consoleToUser(tipsParse(1005));
    });

program.parse(process.argv);
