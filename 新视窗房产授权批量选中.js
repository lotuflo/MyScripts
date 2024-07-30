// ==UserScript==
// @name         新视窗房产授权批量选中
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Try to take over the world!
// @author       You
// @match        https://xsc.agileliving.com.cn:8001/CrmManagement/MemberManagement/SystemSet/HousePopedomSet/HouseTreeForGrant.aspx*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// ==/UserScript==
/* globals $*/
(function() {
    'use strict';

    // 创建悬浮按钮
    const button = document.createElement('button');
    button.innerHTML = '多选';
    button.style.position = 'fixed';
    button.style.top = '10px';
    button.style.right = '10px';
    button.style.zIndex = '9999';
    button.style.padding = '10px';
    button.style.backgroundColor = 'white';
    button.style.border = 'none';
    button.style.color = 'black';
    button.style.cursor = 'pointer';
    button.style.borderRadius = '5px';
    document.body.appendChild(button);

    button.addEventListener('click', function() {
        createInputDialog();
    });

    // 生成悬浮窗，允许输入字符串并分隔成数组
    function createInputDialog() {
        const input = prompt("请输入字符串:");
        if (input) {
            const stringArray = input.split(/[\s,|]+/).map(item => item.trim());
            compareTags(stringArray);
        }
    }

    // 循环对比标签的文本值

function compareTags(stringArray) {
    const tags = $('a[id^="webfx-tree-object-"][id$="-anchor"]:not(:contains("正在加载..."))');
	let skipNum = 0;//跳过勾选
	let successNum = 0;//成功勾选
	// 记录跳过和不匹配的 tagText
    let unmatchedTags = new Set(stringArray);
    tags.each(function() {
        const tagText = $(this).text();
        if (stringArray.includes(tagText)) {
            // 获取相邻的 input 标签
            const input = $(this).siblings('input[type="checkbox"]');
            // 判断 input 标签是否未勾选
            if (!input.is(':checked')) {
                input.click(); // 执行点击操作
                successNum++;
            }else{
				skipNum++;
			}
            unmatchedTags.delete(tagText);
        }
    });
	alert('共输入' + stringArray.length + '个: ' + successNum + ' 个成功, ' + skipNum + ' 个跳过, ' + unmatchedTags.size + ' 个不匹配:\n\n ' + Array.from(unmatchedTags).join(', '));
}

})();
