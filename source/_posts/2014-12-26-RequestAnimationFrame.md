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
有了``requestAnimationFrame``这样的宝贝在手，我们就可以做好多东西啦。首先想到的就是各种的缓动动画，缓动动画是一个模拟现实中运动的事物的动画，比如汽车的加速与停车、球从空中掉到地下的弹跳过程等等，以下是常见的缓动动画使用的函数：
> Linear：无缓动效果
> Quadratic：二次方的缓动（t^2）
> Cubic：三次方的缓动（t^3）
> Quartic：四次方的缓动（t^4）
> Quintic：五次方的缓动（t^5）
> Sinusoidal：正弦曲线的缓动（sin(t)）
> Exponential：指数曲线的缓动（2^t）
> Circular：圆形曲线的缓动（sqrt(1-t^2)）
> Elastic：指数衰减的正弦曲线缓动
> 超过范围的三次方缓动（(s+1)*t^3 – s*t^2）
> 指数衰减的反弹缓动

每一个缓动函数都有相对的加速度、减速度、先加速度后减速度的运动过程，通俗一点就是先慢后快、先快后慢、先慢到快再快到慢的过程，一般使用easeIn、easeOut、easeInOut来表示它们。加速度的函数和减速度的函数，它们是相互反函数，能够通过反函数的数学知识来推导出来，也能够通过相似的函数来代替减速度函数，本人数学不好，大家可以自行研究。通过这些动画能够实现我们很多效果。像轮播效果、手机scroll效果等等。以下是[张鑫旭](http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/)博客里的缓动函数集：
```js
/*
 * Tween.js
 * b: beginning value（初始值）；
 * s: ending value（结束值）；
 * t: current time（当前时间）；
 * d: duration（持续时间）。
 * you can visit 'http://easings.net/zh-cn' to get effect
*/
var Tween = {
    Linear: function(b, s, t, d) { return (s-b)*t/d + b; },
    Quad: {
        easeIn: function(b, s, t, d) {
            return (s-b) * (t /= d) * t + b;
        },
        easeOut: function(b, s, t, d) {
            return -(s-b) *(t /= d)*(t-2) + b;
        },
        easeInOut: function(b, s, t, d) {
            if ((t /= d / 2) < 1) return (s-b) / 2 * t * t + b;
            return -(s-b) / 2 * ((--t) * (t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(b, s, t, d) {
            return (s-b) * (t /= d) * t * t + b;
        },
        easeOut: function(b, s, t, d) {
            return (s-b) * ((t = t/d - 1) * t * t + 1) + b;
        },
        easeInOut: function(b, s, t, d) {
            if ((t /= d / 2) < 1) return (s-b) / 2 * t * t*t + b;
            return (s-b) / 2*((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(b, s, t, d) {
            return (s-b) * (t /= d) * t * t*t + b;
        },
        easeOut: function(b, s, t, d) {
            return -(s-b) * ((t = t/d - 1) * t * t*t - 1) + b;
        },
        easeInOut: function(b, s, t, d) {
            if ((t /= d / 2) < 1) return (s-b) / 2 * t * t * t * t + b;
            return -(s-b) / 2 * ((t -= 2) * t * t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(b, s, t, d) {
            return (s-b) * (t /= d) * t * t * t * t + b;
        },
        easeOut: function(b, s, t, d) {
            return (s-b) * ((t = t/d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function(b, s, t, d) {
            if ((t /= d / 2) < 1) return (s-b) / 2 * t * t * t * t * t + b;
            return (s-b) / 2*((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(b, s, t, d) {
            return -(s-b) * Math.cos(t/d * (Math.PI/2)) + s;
        },
        easeOut: function(b, s, t, d) {
            return (s-b) * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(b, s, t, d) {
            return -(s-b) / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(b, s, t, d) {
            return (t==0) ? b : (s-b) * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(b, s, t, d) {
            return (t==d) ? b + (s-b) : (s-b) * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(b, s, t, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t /= d / 2) < 1) return (s-b) / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return (s-b) / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(b, s, t, d) {
            return -(s-b) * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function(b, s, t, d) {
            return (s-b) * Math.sqrt(1 - (t = t/d - 1) * t) + b;
        },
        easeInOut: function(b, s, t, d) {
            if ((t /= d / 2) < 1) return -(s-b) / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return (s-b) / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
		Elastic: {
				easeIn: function(b, s, t, d, a, p) {
						var v; //s - v
						if (t==0) return b;
						if ((t /= d) == 1) return s;
						if (typeof p == "undefined") p = d * .3;
						if (!a || a < Math.abs((s-b))) {
								v = p / 4;
								a = s-b;
						} else {
								v = p / (2 * Math.PI) * Math.asin((s-b) / a);
						}
						return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - v) * (2 * Math.PI) / p)) + b;
				},
				easeOut: function(b, s, t, d, a, p) {
						var v;
						if (t==0) return b;
						if ((t /= d) == 1) return s;
						if (typeof p == "undefined") p = d * .3;
						if (!a || a < Math.abs((s-b))) {
								a = s-b; 
								v = p / 4;
						} else {
								v = p/(2*Math.PI) * Math.asin((s-b)/a);
						}
						return (a * Math.pow(2, -10 * t) * Math.sin((t * d - v) * (2 * Math.PI) / p) + s);
				},
				easeInOut: function(b, s, t, d, a, p) {
						var v;
						if (t==0) return b;
						if ((t /= d / 2) == 2) return b;
						if (typeof p == "undefined") p = d * (.3 * 1.5);
						if (!a || a < Math.abs((s-b))) {
								a = s-b; 
								v = p / 4;
						} else {
								v = p / (2  *Math.PI) * Math.asin((s-b) / a);
						}
						if (t < 1) return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - v) * (2 * Math.PI) / p)) + b;
						return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - v) * (2 * Math.PI) / p ) * .5 + s;
				}
		},
		Back: {
				easeIn: function(b, s, t, d, v) {
						if (typeof v == "undefined") v = 1.70158;
						return (s-b) * (t /= d) * t * ((v + 1) * t - v) + b;
				},
				easeOut: function(b, s, t, d, v) {
						if (typeof v == "undefined") v = 1.70158;
						return (s-b) * ((t = t/d - 1) * t * ((v + 1) * t + v) + 1) + b;
				},
				easeInOut: function(b, s, t, d, v) {
						if (typeof v == "undefined") v = 1.70158; 
						if ((t /= d / 2) < 1) return (s-b) / 2 * (t * t * (((v *= (1.525)) + 1) * t - v)) + b;
						return (s-b) / 2*((t -= 2) * t * (((v *= (1.525)) + 1) * t + v) + 2) + b;
				}
		},
		Bounce: {
				easeIn: function(b, s, t, d) {
					return s - Tween.Bounce.easeOut( 0, s-b, d-t, d);
				},
				easeOut: function(b, s, t, d) {
						if ((t /= d) < (1 / 2.75)) {
								return (s-b) * (7.5625 * t * t) + b;
						} else if (t < (2 / 2.75)) {
								return (s-b) * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
						} else if (t < (2.5 / 2.75)) {
								return (s-b) * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
						} else {
								return (s-b) * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
						}
				},
				easeInOut: function(b, s, t, d) {
						if (t < d / 2) {
								return Tween.Bounce.easeIn(0, (s-b), t * 2, d) * .5 + b;
						} else {
								return Tween.Bounce.easeOut(0, (s-b), t * 2 - d, d) * .5 + (s-b) * .5 + b;
						}
				}
		}
};
Math.Tween = Tween;
```
我对其进行了相对应的测试：
[Animation test](/animation-test/index/index.html)

4、参考文献
----------
[张鑫旭博客 http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/](http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/)
[缓动函数查看表 http://easings.net/zh-cn](http://easings.net/zh-cn)
[javascript动画 http://javascript.info/tutorial/animation](http://javascript.info/tutorial/animation)