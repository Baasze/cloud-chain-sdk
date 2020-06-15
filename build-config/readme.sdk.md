# 云链白泽 SDK

安装SDK
```
yarn add cloud-chain-sdk
```

使用
```javascript
const BaasZeSDKClient = require('cloud-chain-sdk');

const client = new BaasZeSDKClient({
    app_id: '', // 您的APP_ID
    app_secret: '' // 您的APP_SECRET
});

(async () => {
    try {
        const result = await client.getContractList()

        console.log(result);
    } catch (e) {
        console.error(e);
    }
})();

```