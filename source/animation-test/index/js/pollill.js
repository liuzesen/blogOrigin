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