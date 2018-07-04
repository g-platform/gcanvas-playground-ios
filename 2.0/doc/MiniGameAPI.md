# 渲染

## 画布

### `Canvas` tbplay.createCanvas()
>创建一个画布对象。首次调用创建的是显示在屏幕上的画布，之后调用创建的都是离屏画布。

#### 返回值
>[Canvas](#canvas)<br>
>画布对象

### <span id="canvas">Canvas</span>
>画布对象
#### 属性

> `Number` width<br>
> 画布的宽度

> `Number` height<br>
> 画布的高度

#### 方法
> RenderingContext Canvas.getContext(`String` contextType)<br>
> 获取画布对象的绘图上下文

### RenderingContext
> 通过 Canvas.getContext('2d') 接口可以获取 CanvasRenderingContext2D 对象。CanvasRenderingContext2D 实现了 HTML Canvas 2D Context 定义的大部分属性、方法。通过 Canvas.getContext('webgl') 接口可以获取 WebGLRenderingContext 对象。 WebGLRenderingContext 实现了 WebGL 1.0 定义的大部分属性、方法、常量。


#### 2d 接口支持情况
>iOS/Android 不支持的 2d 属性和接口
>
* globalCompositeOperation 不支持以下值： source-in source-out destination-atop lighter copy。如果使用，不会报错，但是将得到与预期不符的结果。
* isPointInPath

#### WebGL 接口支持情况
>iOS/Android 不支持的 WebGL 接口
>
* pixelStorei 当第一个参数是 gl.UNPACK_COLORSPACE_CONVERSION_WEBGL 时
* compressedTexImage2D
* compressedTexSubImage2D

> 除此之外 Android 还不支持 WebGL 接口
>
* getExtension
* getSupportedExtensions


## RenderingContext Canvas.getContext(`String` contextType)
>获取画布对象的绘图上下文

### 参数
>`String` contextType<br>
>上下文类型

**contextType 的合法值**

| 值                   | 说明              |
| ------------------- | ----------------- | 
| 2d                  | 2d 绘图上下文       | 
| webgl               | webgl 绘图上下文    | 

### 返回值
>RenderingContext<br>
>绘图上下文


## 图片

### `Image` tbplay.createImage()
>创建一个图片对象

#### 返回值
>Image<br>
>图片对象

### Image
>图片对象

#### 属性
>`String` src<br>
>图片的 URL

>`Number` width<br>
>图片的真实宽度

>`Number` height<br>
>图片的真实高度

>`Function` onload<br>
>图片加载完成后触发的回调函数

#### 方法
>`Image` tbplay.createImage()<br>
>创建一个图片对象


## 帧率

### cancelAnimationFrame(`Number` requestID)
>取消一个先前通过调用 requestAnimationFrame 方法添加到计划中的动画帧请求

#### 参数
>`Number` requestID

### `Number` requestAnimationFrame(`Function` callback)
>在下次进行重绘时执行。

#### 参数
>`Function` callback<br>
>执行的 callback

#### 返回值
>`Number`<br>
>请求 ID

# 系统
## 生命周期

### tbplay.onHide(`Function` callback)
>监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。

#### 参数
>callback<br>
>监听事件的回调函数

### tbplay.offHide(`Function` callback)
>取消监听小游戏隐藏到后台事件。锁屏、按 HOME 键退到桌面、显示在聊天顶部等操作会触发此事件。

#### 参数
>callback<br>
>取消监听事件的回调函数

### tbplay.onShow(`Function` callback)
>监听小游戏回到前台的事件

#### 参数
>callback<br>
>监听事件的回调函数

### tbplay.offShow(`Function` callback)
>取消监听小游戏回到前台的事件

#### 参数
>callback<br>
>取消监听事件的回调函数


## 系统信息
### SystemInfo tbplay.getSystemInfoSync()
>同步获取系统信息

#### 返回值
`Object` res

| 属性 | 类型 | 说明 |
| --- | --- | --- | 
| brand | `String` | 手机品牌 |
| model | `String` | 手机型号 |
| pixelRatio | `Number` | 设备像素比 |
| screenWidth | `Number` | 屏幕宽度 |
| screenHeight | `Number` | 屏幕高度 |
| windowWidth | `Number` | 可使用窗口宽度 |
| windowHeight | `Number` | 可使用窗口高度 |
| version | `String` | 手淘版本号 |
| system | `String` | 操作系统版本 |
| platform | `String` | 客户端平台 |
| SDKVersion | `String` | 客户端基础库版本 |
| battery | `Number` | 电量，范围 1 - 100 |


## 触摸事件

### tbplay.onTouchStart(`Function` callback)
>监听开始触摸事件

#### 参数
>callback<br>
>监听事件的回调函数

#### callback 回调函数
参数<br>
res

| 属性 | 类型 | 说明 |
| --- | --- | --- | 
| touches | Array.\<[Touch](#touch)\> | 当前所有触摸点的列表 |
| changedTouches | Array.\<[Touch](#touch)\> | 触发此次事件的触摸点列表 |
| timeStamp | `Number` | 事件触发时的时间戳 |

### tbplay.offTouchStart(`Function` callback)
>取消监听开始触摸事件

#### 参数
>callback<br>
>取消监听事件的回调函数

### tbplay.onTouchMove(`Function` callback)
>监听触点移动事件

#### 参数
>callback<br>
>监听事件的回调函数

#### callback 回调函数
参数<br>
res

| 属性 | 类型 | 说明 |
| --- | --- | --- | 
| touches | Array.\<[Touch](#touch)\> | 当前所有触摸点的列表 |
| changedTouches | Array.\<[Touch](#touch)\> | 触发此次事件的触摸点列表 |
| timeStamp | `Number` | 事件触发时的时间戳 |

### tbplay.offTouchMove(`Function` callback)
>取消监听触点移动事件

#### 参数
>callback<br>
>取消监听事件的回调函数

### tbplay.onTouchEnd(`Function` callback)
>监听触摸结束事件

#### 参数
>callback<br>
>监听事件的回调函数

#### callback 回调函数
参数<br>
res

| 属性 | 类型 | 说明 |
| --- | --- | --- | 
| touches | Array.\<[Touch](#touch)\> | 当前所有触摸点的列表 |
| changedTouches | Array.\<[Touch](#touch)\> | 触发此次事件的触摸点列表 |
| timeStamp | `Number` | 事件触发时的时间戳 |

### tbplay.offTouchEnd(`Function` callback)
>取消监听触摸结束事件

#### 参数
>callback<br>
>取消监听事件的回调函数

### tbplay.onTouchCancel(`Function` callback)
>监听触点失效事件

#### 参数
>callback<br>
>监听事件的回调函数

#### callback 回调函数
参数<br>
res

| 属性 | 类型 | 说明 |
| --- | --- | --- | 
| touches | Array.\<[Touch](#touch)\> | 当前所有触摸点的列表 |
| changedTouches | Array.\<[Touch](#touch)\> | 触发此次事件的触摸点列表 |
| timeStamp | `Number` | 事件触发时的时间戳 |

### tbplay.offTouchCancel(`Function` callback)
>取消监听触点失效事件

#### 参数
>callback<br>
>取消监听事件的回调函数

### <span id="touch">Touch</span>
>`Touch` 对象表示在触控设备上的触摸点。通常是指手指或者触控笔在触屏设备或者触摸板上的操作。

#### 属性
>`Number` identifier<br>
>`Touch` 对象的唯一标识符，只读属性。一次触摸动作(我们值的是手指的触摸)在平面上移动的整个过程中, 该标识符不变。可以根据它来判断跟踪的是否是同一次触摸过程。

>`Number` screenX<br>
>触点相对于屏幕左边沿的 X 坐标。

>`Number` screenY<br>
>触点相对于屏幕上边沿的 Y 坐标。



# 网络

## 发起请求
### tbplay.request
#### `RequestTask` tbplay.request(`Object` object)

>发起网络请求。

*参数*

`Object` object，网络请求参数内容

| 属性 | 类型 | 默认值 | 是否必填 | 说明 |
|---|---|---|---|---|
|url|`String`||是|网络请求的地址|
|data|`Object`||否|请求的参数|
|header|`Object`||否|请求的Header|
|method|`String`|GET|否|HTTP请求方法|
|dataType|`String`|json|否|返回的数据格式|
|success|`Function`||否|接口调用成功的回调函数|
|fail|`Function`||否|接口调用失败的回调函数|
|complete|`Function`||否|接口调用结束的回调函数(成功/失败都会执行)|

*返回值*

[RequestTask](#a_RequestTask)，返回网络请求任务对象。

### <span id="a_RequestTask">RequestTask</span>

>网络请求任务对象

*方法*

* abort()

>中断网络请求任务


# 性能

## tbplay.getPerformanceNow

`Number` tbplay.getPerformanceNow()

>获取当前时间以微秒为单位的时间戳

*返回值*

* `Number` now，时间戳，单位us。

# 数据缓存
## tbplay.clearStorageSync
>清理本地数据缓存

## tbplay.getStorageSync

### `String` tbplay.getStorageSync(`String` key)

>从本地缓存中获取指定 key 的内容。

*参数*

* `String` key，本地缓存中指定的key

*返回值*

* `String` data，key对应的内容。

### tbplay.removeStorageSync
#### tbplay.removeStorageSync(`String` key)

>从本地缓存中移除指定 key

*参数*

* `String` key，本地缓存中指定的key

### tbplay.setStorageSync
#### tbplay.setStorageSync(`String` key, `String` data)

>数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容。

*参数*

* `String` key，本地缓存中指定的key
* `String` data，需要存储的内容




# 媒体
## 音频
### tbplay.createInnerAudioContext 
>创建一个Audio实例。

*返回值*

[Audio](#a_ Audio)类型的对象



### <span id="a_ Audio">Audio</span>


*属性*

* `String` src，音频资源的地址
* `Boolean` autoplay，是否自动播放
* `Boolean` loop，是否循环播放
* `Number` duration，[只读] 当前音频的长度，单位s。只有在当前合法的src时返回。
* `Number` currentTime，[只读] 当前音频播放位置，单位s。只有在当前合法的src时返回，时间不取整。
* `Boolean` paused，当前是否暂停状态，true表示暂停，false表示正在播放。
* `Number` volume，音量。取值范围0~1。

*方法*

* play()
	
	播放
* pause()
	
	暂停。暂停后的音频再播放会从暂停处继续播放。
* stop()
	
	停止。停止后的音频再播放会从头开始播放。
	
* seek(`Number` position)

	跳转到指定位置，单位s。
		
* destroy()

	销毁当前实例。
* onCanplay(`Function` callbak)

	监听音频进入可以播放状态的事件。
* offCanplay(`Function` callbak)

	取消监听音频进入可以播放状态的事件。
* onPlay(`Function` callbak)

	监听音频进入可以播放状态的事件。
* offPlay(`Function` callbak)

	取消监听音频进入可以播放状态的事件。	
* onPause(`Function` callbak)

	监听音频暂停的事件。
* offPause(`Function` callbak)

	取消监听音频暂停的事件。
* onStop(`Function` callbak)

	监听音频停止的事件。
* offStop(`Function` callbak)

	取消监听音停止的事件。		
* onEnded(`Function` callbak)

	监听音频自然播放至结束的事件。
* offEnded(`Function` callbak)

	取消监听音频自然播放至结束的事件。		
* onTimeUpdate(`Function` callbak)

	监听音频播放进度更新事件。
* offTimeUpdate(`Function` callbak)

	取消监听音频播放进度更新事件。	
* onSeeking(`Function` callbak)

	监听音频进行跳转操作的事件。
* offSeeking(`Function` callbak)

	取消监听音频进行跳转操作的事件。
* onSeeked(`Function` callbak)

	监听音频完成跳转操作的事件。
* offSeeked(`Function` callbak)

	取消监听音频完成跳转操作的事件。	
	
# 定时器

## <a name="a_setTimeout"></a>setTimeout
### `Number` setTimeout ( `Function` callback, `Number` delay)

>创建一个定时器，在定时器到以后执行注册的回调函数。
 
*参数*
 
>`Function` callback, 回调函数
`Number` delay, 延迟的时间，回调函数在该延迟之后被调用，单位ms

*返回值*

>`Number`, 定时器ID。这个值可以通过[clearTimeout](#a_clearTimeout)来取消该定时器。

### <span id="a_clearTimeout">clearTimeout</span>

#### clearTimeout(`Number` timeoutID)
  	
>取消由[setTimeout](#a_setTimeout)方法创建的定时器。
  
*参数*

>`Number` timeoutID, 要取消的定时器的ID

### <a name="a_setInterval"></a>setInterval
#### `Number` setInterval ( `Function` callback, `Number` delay)

>创建一个定时器，按照指定的周期(以毫秒为单位)来执行注册的回调函数。
 
*参数*
 
>`Function` callback, 回调函数
`Number` delay, 执行回调函数的时间间隔，单位ms

*返回值*

>`Number`, 定时器ID。这个值可以通过[clearInterval](#a_clearInterval)来取消该定时器。

### <a name="a_clearInterval"></a>clearInterval

#### clearInterval(`Number` intervalID)
  	
>取消由[setInterval](#a_setInterval)方法创建的定时器。
  
*参数*

>`Number` intervalID, 要取消的定时器的ID