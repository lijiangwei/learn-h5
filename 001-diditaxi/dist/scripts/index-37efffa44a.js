! function() {
	document.addEventListener("WeixinJSBridgeReady", function() {
		var e = {
				general_config: {
					img_url: "http://static.diditaxi.com.cn/site/pages/thank-2014/globle-logo.png",
					sharetitle: "谢谢你，陌生人",
					sharedesc: "一句问候，一个微笑，一次关心，虽来自陌生人，却足以温暖人心",
					link: location.href
				}
			},
			n = e.general_config;
		WeixinJSBridge.on("menu:share:appmessage", function(e) {
			WeixinJSBridge.invoke("sendAppMessage", {
				appid: "wx69b6673576ec5a65",
				img_url: n.img_url,
				img_width: "",
				img_height: "",
				link: n.link,
				title: n.sharetitle,
				desc: n.sharedesc
			}, function(e) {})
		}), WeixinJSBridge.on("menu:share:timeline", function(e) {
			WeixinJSBridge.invoke("shareTimeline", {
				img_url: n.img_url,
				img_width: "",
				img_height: "",
				link: n.link,
				title: n.sharetitle,
				desc: n.sharedesc
			}, function(e) {})
		})
	});
	var e = document.documentElement.clientHeight,
		n = document.getElementsByClassName("firLoad"),
		t = document.getElementsByClassName("secLoad"),
		i = document.getElementsByClassName("swiper-slide"),
		a = document.getElementsByClassName("story"),
		s = document.getElementsByClassName("button"),
		l = document.getElementsByClassName("share")[0],
		o = document.getElementsByClassName("autiobtn")[0];
	document.getElementsByClassName("swiper-container")[0].style.height = e + "px";
	for (var r = function(e, n) {
			var t = new RegExp("(^| )" + n + "( |$)");
			t.test(e.className) || (e.className = e.className.trim() + " " + n)
		}, c = function(e, n) {
			if (!e || 1 != e.nodeType) throw new Error("第一参数ele需要是一个DOM元素对象");
			if ("string" != typeof n) throw new Error("第二参数必须为string类型");
			var t = new RegExp("(?:^| )" + n + "(?: |$)", "g");
			e.className = e.className.replace(t, "").trim()
		}, m = function(e) {
			for (var n = 0, t = e.previousSibling; t;) 1 == t.nodeType && n++, t = t.previousSibling;
			return n
		}, g = 0; g < n.length; g++) n[g].style.backgroundImage = n[g].dataset.url, r(i[0], "slide-move");
	var d = new Image;
	d.src = "images/page-1.jpg", d.onload = function() {
		for (var e = 0; e < t.length; e++) t[e].style.backgroundImage = t[e].dataset.url;
		document.getElementsByClassName("loading")[0].style.display = "none", r(i[0], "slide-move")
	};
	for (var g = 0; g < a.length; g++) ! function(e) {
		s[g].onclick = function() {
			r(a[e], "storyShow"), a[e].style.display = "block"
		}, a[g].onclick = function() {
			c(a[e], "storyShow"), window.setTimeout(function() {
				a[e].style.display = "none"
			}, 300)
		}
	}(g);
	s[s.length - 1].onclick = function() {
		l.style.display = "block"
	}, l.onclick = function() {
		l.style.display = "none"
	}, o.onclick = function() {
		var e = document.getElementById("media");
		null !== e && (e.paused ? (e.play(), r(o, "rotate")) : (e.pause(), c(o, "rotate")))
	};
	var u = new Swiper(".swiper-container", {
		paginationClickable: !0,
		mode: "vertical",
		onSlideChangeEnd: function() {
			for (var e = u.activeSlide(), n = (m(e), 0); n < i.length; n++) c(i[n], "slide-move");
			for (var n = 0; n < a.length; n++) c(a[n], "storyShow"), a[n].style.display = "none";
			r(e, "slide-move")
		}
	})
}();
//# sourceMappingURL=index.js.map