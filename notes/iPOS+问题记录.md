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
