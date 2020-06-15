import * as fs from 'fs';
import * as path from 'path';
import {jsonParse, consoleToUser, tipsParse} from "../utils";
import {MyConfig} from "../types";

class ConfigService {

    static configFilePath: string = path.join(__dirname, '../../user_config/config.json');

    /**
     * 写入配置文件
     * @param app_id
     * @param app_secret
     * @param app_host
     */
    static setConfig(app_id: string, app_secret: string, app_host: string = '') {
        try {
            const fileData = JSON.stringify({
                app_id, app_secret, app_host
            });

            const configDirPath: string = path.join(__dirname, '../../user_config');

            // 如果文件不存在，检查文件夹是否存在，不存在创建文件夹，再写入文件
            if (!fs.existsSync(ConfigService.configFilePath)) {
                if (!fs.existsSync(configDirPath)) fs.mkdirSync(configDirPath);
            }

            fs.writeFileSync(ConfigService.configFilePath, fileData);
        } catch (e) {
            consoleToUser(tipsParse(1002, e.toString()));
        }
    }

    /**
     * 获取配置文件
     */
    static getConfig(): MyConfig | null {
        try {
            if (!fs.existsSync(ConfigService.configFilePath)) {
                return null;
            }

            const configContent: string = fs.readFileSync(ConfigService.configFilePath).toString();

            return jsonParse(configContent);
        } catch (e) {
            // consoleToUser(tipsParse(1002, e.toString()));
        }
        return null;
    }
}

export default ConfigService;
