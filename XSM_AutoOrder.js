// ==UserScript==
// @name         新商盟自动选购
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You

// @match        http://gd.xinshangmeng.com:9090/eciop/orderForCC/*
// @grant        window.onload
// @grant        none
// ==/UserScript==




function mychange(a) {
	// 传入a标签修改样式
	let style = "display: block; padding: 10px 0 10px 20px; text-decoration: none;";
	let defaultStyle = style + "color: #333333;";
	let hoverStyle = style + "color: #ffffff; background-color: #666666;";

	a.href = 'javascript:;'
	a.style = defaultStyle

	// 鼠标移入移除效果，相当于hover
	a.onmouseenter = function() {
		this.style = hoverStyle
	}
	a.onmouseleave = function() {
		this.style = defaultStyle
	}
}

function addBox() {
	// 主元素
	var div = document.createElement('div')
	div.id = 'search-app-box'
	div.style =
		"position: fixed; top: 120px; left: 20px; width: 100px; background-color: #EEEEEE; font-size: 12px;z-index: 99999;"
	// document.body.appendChild(div)
	document.body.insertAdjacentElement("afterBegin", div);

	// 标题
	let title = document.createElement('span')
	title.innerText = "快捷功能"
	title.style = "display: block; text-align: center; margin-top: 10px; font-size: 14px; font-weight: bold;"
	div.appendChild(title)




	let a = document.createElement('a')
	mychange(a);
	a.innerText = '模拟检查'

	let b = document.createElement('a')
	mychange(b);
	b.innerText = '可购全选'

	let c = document.createElement('a')
	mychange(c);
	c.innerText = '一键自动选购'

	a.onclick = checknum;
	b.onclick = takeMyOrder;
	c.onclick = automatically;
	div.appendChild(a)
	div.appendChild(b)
	div.appendChild(c)
};
var $ = window.$
//获取烟种数量
var sum = $('#newul').find('li').length
//获取所有按钮
var pBnts = $('em.adda');
var dBnts = $('em.suba');
var myOrderFlag = true
var checkFlag = true
function checknum() {
	//模拟每一行点击一次 从而获得可订购数
	var onBlur = window.onBlur
	if(checkFlag){
		//更新数据
		for (var i = 0; i < sum; i++) {//必须
			//模拟第一次点击  更新此行的可用量
			$(pBnts[i]).trigger('click');
			//~需要优化获取id方式
			//给这个函数,烟id 行数 以及订购数不为0,该函数会自动获取数量框的值并提交
			onBlur($($('.cgt-big-img-switch')[i]).attr('data-cgt-code'), i + 1);
		}
		// for (i = 0; i < sum; i++) {
		// 	$(dBnts[i]).trigger('click');
		// 	onBlur($($('.cgt-big-img-switch')[i]).attr('data-cgt-code'), i + 1);
		// }
		checkFlag = false
	}else{
		alert('请刷新页面后再试')
	}
}

function takeMyOrder(){
	var onBlur = window.onBlur
	if(myOrderFlag){
		for (var i = 0; i < sum; i++){
			//find 当前行对应的可用量
			var num = parseInt($($('#newul').find('li')[i]).find('span.cgt-col-qtl-lmt').html());
			//有多少，订多少
			$("input[name=req_qty]")[i].value = num;
			onBlur($($('.cgt-big-img-switch')[i]).attr('data-cgt-code'), i + 1);
		}
		myOrderFlag = false
	}else{
		alert('请刷新页面后再试')
	}
}

function automatically(){
	// 1.第一次检查 第二次选购
	if(checkFlag==true&&myOrderFlag==true){
		checknum()
		// debugger
		setTimeout(automatically,3000)
		//替换成监听器
	}else if(checkFlag==false&&myOrderFlag==true){
		takeMyOrder()
        //点击排序
        $('#kyl-btn').trigger('click');
		$('#kyl-btn').trigger('click');
		alert('自动选购完毕，请检查！')
	}else{
		alert('请刷新页面后再试')
	}

	// checknum()
	// takeMyOrder()

}

(function() {
	//onblur函数是该网站点击按钮所触发的函数，且必须先click了再调用，onblur才能生效
	//当且仅当我的脚本运行结束后，onblur函数才会执行
	'use strict';
	// Your code here...
	addBox();
})();
