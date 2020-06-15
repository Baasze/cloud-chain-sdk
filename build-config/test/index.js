/**
 * @Description: 案例演示
 * @Author: Auspicious
 * @Email: <18437980785@163.com>
 * @Date: 2020/6/15 10:04
 * @LastEditors: missagril
 */

const BaasZeSDKClient = require('../');

// 实例配置, 具体配置详见一下配置说明
const options = {
    app_id: '', // 您的APP_ID
    app_secret: '' // 您的APP_SECRET
};

const client = new BaasZeSDKClient(options);

(async () => {
    try {
        // 获取我的链列表
        const result = await client.getContractList({
            limit: 20,
            page: 0
        });

        console.log(result);
    } catch (e) {
        console.error(e);
    }
})();

