# iPOS+问题记录
## 1 扫描枪输入问题
	做扫描录入信息，切记在英文输入法下！中文拼音输入法下扫描条码中有英文+数字（英文在数字前），扫描出来部分数据会缺失
## 2 离线版本数据安装,数据包中有特殊Unicode字符
	JSON字符数据里面又特殊字符：比如 
```	
	var dStr = '{"a":"\u00062", b:"nihao"}' 
	JSON.parse(dStr)
	VM1476:1 Uncaught SyntaxError: Unexpected token  in JSON at position 6
	    at JSON.parse (<anonymous>)
	    at <anonymous>:1:6
```
	解决方法：
```
	JSON.parse(dStr.toString())
```

## 3 iPOS+签名验证问题
	大部分接口都可以,但是发现收银小票上传sign不行,应为PHP对JSON数据处理有些不同,将[]去除了,而前端的没有
	
## 4 使用中文字符串硬编码
班尼路语言包处理中发现问题(类似很多)：
``` javascript
    // ...
    case '本月':
         $scope.filter.start_time = new Date(dateStartEnd($rootScope.configData.remote_time).month_start*1000);
            $scope.filter.end_time = new Date(dateStartEnd($rootScope.configData.remote_time).month_end*1000);
            break;
    // ...
```
建议使用一个`code`一类的`数字 | 字母`判断逻辑，不要使用中文，这样不仅增加了理解成本，代码也会一团乱麻

## 5 修改公共模块需要注意, 一定需要搜索全局, 防止修改影响到其他模块, 之前这个有好几位同时发生过这样的情况, 因此需要特别注意下! 我们所修改的正是客户在/即将使用的! 一定要注意! 

## 6 代码同步问题
	1. 我们自身上传代码到代码库没有同步成功(最近伊美源就发生了). 这个我们自己一定要检查是否上传成功.
	2. 客户同步代码到服务器没有同步成功(九牧王就发生过几次).
	这两个问题都可以通过连接查看客户环境, 确保代码为最新的!

## 7 提示缺少payment字段(pos/pos/update)
	php.ini 修改这两个参数
		max_input_vars =10000
		mssql.charset = 'GBK'
	然后使用 service httpd stop
	service httpd start
	重启服务（不能使用restart,这个测试重启后解决不了问题）
	然后重新数据同步

## 8 iPOS+出问题调试方法
### 1 pos+中间层调试 跟踪到500错误
	查看 /mid/logs/api_error_log/ 下的log日志
**注意:/mid/logs/要给下写权限**
	(如果没有发现/mid/logs/api_error_log/ 那么给客户提换我们develop上的\mid\api\lib\HttpUtil.php   这个文件给客户替换下)

### 2 pos后台调试
	data/config.php
	//接口日志权限控制
	$GLOBALS['log_limits'] = array(
	    'ipos_api' => 1,      //M6、ipos_api接口  ipos\web\api\ipos_api.php
	    'posj_api' => 0,      //pos+接口          ipos\api\index.php
	    'icrm_api' => 1,      //icrm接口          ipos\web\api\icrm_dj.php
	    'o2o_api'  => 1,      //O2O日志           ipos\api_o2o\api.php
	    'o2oqimen_api'  => 1, //O2O奇门接口日志
	);
	将 posj_api 参数置为 1

	