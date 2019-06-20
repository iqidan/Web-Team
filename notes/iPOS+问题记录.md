# iPOS+问题记录
## 1 扫描枪输入问题
	做扫描录入信息，切记在英文输入法下！中文拼音输入法下扫描条码中有英文+数字（英文在数字前），扫描出来部分数据会缺失
## 2 离线版本数据安装,数据包中有特殊Unicode字符
	JSON字符数据里面又特殊字符：比如 
```var dStr = '{"a":"\u00062", b:"nihao"}' 
	JSON.parse(dStr)
	VM1476:1 Uncaught SyntaxError: Unexpected token  in JSON at position 6
	    at JSON.parse (<anonymous>)
	    at <anonymous>:1:6
```
	解决方法：
```
	JSON.parse(dStr.toString())
```