title: RequestAnimationFrame作动画
date: 2014-12-26 11:27:30
categories:
- 前端技术
tags:
- javascript
- animation
---
RequestAnimationFrame作动画
==========================
1、简介
------
本文当然不是教你作动画啦，因为对于动画的原理我了解甚少，本文主要是说明如何使用RequestAnimationFrame函数来做简单的缓动动画，在动画方面只能是蜻蜓点水了。废话不多说，开始研究吧。
动画其实是由一帧一帧的静态画面组成的，显示器通过不停地刷新屏幕的图像，从而形成动画。而用来恒量刷新速度的单位是FPS（Frames Per Second），即每秒传输帧数，我们PC机一般默认的FPS为75，即每秒钟刷新屏幕75次。而要保证动画的流畅性，一般FPS要在30以上，60FPS是一般游戏采取的值，当然FPS要看显卡的性能，如果显示不能够支持60FPS，反而使用60FPS会感觉比采用30FPS的卡。FPS还跟显示器的参数有关，大家去百度一下啦。60FPS每帧之间的时间间隔就是1000/60 ~ 16.7ms。而浏览器也会有自己的FPS，指的就是浏览器屏幕的重绘请求时间，一般的浏览器就是使用60FPS。
讲回``RequestAnimationFrame``吧，从前我们做JS的动画，在没有CSS3的Animation和``RequestAnimationFrame``时，都是使用``setTimeout``来做的。但是``setTimeout``要自己设置刷新动画的间隔，即``setTimeout``的第二个参数，这个参数官方推荐的就是16.7ms。如果你设置的间隔太小，则会有部分的帧在显示上丢失，动画看上去就一卡一卡的，不流畅。而``RequestAnimationFrame``恰恰用来处理这样的问题，它会帮你根据浏览器的FPS来确定你的间隔时间，让你的动画更加流畅。
2、兼容性
--------
### PC端兼容性 ###
![PC端浏览器的兼容](desktop.png)
### 手机端兼容性 ###
![手机端浏览器的兼容](mobile.png)
由上可见，``RequestAnimationFrame``的兼容性还是很有限的，在IE上要到10才支持，安卓要4.4以上才支持，所以在安卓浏览器上的动画基本都有点卡顿的感觉，IOS的Safari要6以上支持。因此我们有必要对其进行兼容处理，主要的处理手段就是使用``setTimeout``来代替``RequestAnimationFrame``。
代码如下：
```js
(function(window) {
	// 统一方法
	window.requestAnimationFrame = window.requestAnimationFrame ||
				     			 window.msRequestAnimationFrame ||
							 window.webkitRequestAnimationFrame ||
								window.mozRequestAnimationFrame ||
							      window.oRequestAnimationFrame;
	// 注意chrome有两个版本
	window.cancelAnimationFrame = window.cancelAnimationFrame ||
							 	window.msCancelAnimationFrame ||
						 	window.webkitCancelAnimationFrame ||
					 window.webkitCancelRequestAnimationFrame ||
							   window.mozCancelAnimationFrame ||
								 window.oCancelAnimationFrame;
	
	// 回退使用setTimeout代替，android4.4以下基本用这个方式
	if (!window.requestAnimationFrame) {
		
		var lastTime = 0;
		
		window.requestAnimationFrame = function(callback) {
			
			var currTime = new Date().getTime();
			
			// timeToCall减去了callback执行时间
			// 是为了使动画执行更流畅一点
			var timeToCall = Math.max(0, (50/3 - (currTime-lastTime)));
			
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			
			lastTime = currTime + timeToCall;
			
			return id;
		};
		
		window.cancelAnimationFrame = function(id) {
			window.clearTimeout(id);
		};
	}
	
})(window);
```
下面是一个使用它的例子：
这是一个由左向右移动的``div``的例子。
```html
<div id="block" style="position: absolute;width: 50px; height: 50px; background-color: #EEE;left: 0;">
```
```js
window.onload = function() {
	var block = document.getElementById('block');
	var targetLeftX = 600;
	var run = function() {
		var leftX = parseInt(block.style.left);
		block.style.left = leftX + 1 + 'px';
		
		if (leftX < targetLeftX) {
			window.requestAnimationFrame(run);
		}
	};
	run();
}
```
3、常见缓动函数
--------------
有了``requestAnimationFrame``这样的宝贝在手，我们就可以做好多东西啦。首先想到的就是各种的缓动动画，

4、参考文献
----------