// ==UserScript==
// @name         新商盟自动选购
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        http://gd.xinshangmeng.com:9090/eciop/orderForCC/*
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	// Your code here...
	var $ = window.$;
	var onBlur = window.onBlur;
	var time = 1500;
	//获取烟种数量
	var sum = $('#newul').find('li').length;
	//获取所有按钮
	var pBnts = $('em.adda');
	var dBnts = $('em.suba');
	var flag = 0;
	//1生成div 并放入到合适的位置
	$("<div id=mydiv><a href=# style='font-size: xxx-large;color:#198016;'>一键自动订购</a></div>").insertBefore(
		'div.orderinfo');
	//2span标签并绑定功能
	$('#mydiv').click(automatically);

	function checknum() {
		// var $ = window.$;
		//模拟每一行点击一次 从而获得可订购数
		for (var i = 0; i < sum; i++) { //必须
			//模拟第一次点击  更新此行的可用量
			$(pBnts[i]).trigger('click');
			//~需要优化获取id方式
			//给这个函数,烟id 行数 以及订购数不为0,该函数会自动获取数量框的值并提交
			onBlur($($('.cgt-big-img-switch')[i]).attr('data-cgt-code'), i + 1);
		}
	}

	function takeMyOrder() {
		// var $ = window.$;
		for (var i = 0; i < sum; i++) {
			//find 当前行对应的可用量
			var num = parseInt($($('#newul').find('li')[i]).find('span.cgt-col-qtl-lmt').html());
			if (isNaN(num)) {
				flag = -1;
				setTimeout(automatically, time);
				return;
			} else {
				//有多少，订多少
				$("input[name=req_qty]")[i].value = num;
				onBlur($($('.cgt-big-img-switch')[i]).attr('data-cgt-code'), i + 1);
			}

		}
		$('#kyl-btn').trigger('click');
		$('#kyl-btn').trigger('click');
		flag = 1;
		$('#mydiv a')[0].text = '已完成自动订购';
	}

	function automatically() {
		// 1.第一次检查 第二次选购
		// 0可继续 1完成 -1异常重置操作
		switch (flag) {
			case -1:
				console.log('记录' + time);
				time = time + 2000;
				if (time < 15000) {
					flag = 0;
				} else {
					alert('操作超时,请检查网络');
					return;
				}
			case 0:
				$('#mydiv a')[0].text = '请稍后...';
				checknum();
				setTimeout(takeMyOrder, time);
				break;
			case 1:
				alert('请勿重复操作');
				break;
		}
	}
})();
