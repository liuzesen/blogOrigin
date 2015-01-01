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

