# 云链白泽命令行工具

安装
```
npm install cloud-chain-command -g
```

安装完成后您的系统以及支持了 `baasze` 的命令

查看命令帮助
```
baasze help
```

查看当前命令行工具的版本
```
baasze version
```

配置您的 APP_ID 和 APP_SECRET，以及可选项的域名 APP_HOST
```
baasze config [APP_ID] [APP_SECRET] https://baasze.com
```

查询我的链列表
```
baasze GetChainList
```

查询我的合约列表
```
baasze GetContractList
```

写入数据到指定链
```
baasze insert 22b792279c784cea32b818860f14578f 4ded23d181297d542cd224a9717c0e84 baaszetest1 test '{"name": "test"}'
```
