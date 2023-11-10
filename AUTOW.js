// ==UserScript==
// @name         AUTO
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jinjianghotels.udesk.cn/entry/analysis/im/record/index?end_date=&search=&start_date=&urlParams=
// @icon         https://www.google.com/s2/favicons?sz=64&domain=udesk.cn
// @grant        none
// ==/UserScript==
/* globals $*/
(function() {
  'use strict';

  // 创建悬浮 div 元素
  var floatingDiv = document.createElement('div');
  floatingDiv.style.position = 'fixed';
  floatingDiv.style.bottom = '20px';
  floatingDiv.style.right = '20px';
  floatingDiv.style.padding = '10px';
  floatingDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  floatingDiv.style.color = 'white';
  floatingDiv.style.borderRadius = '5px';
  floatingDiv.style.zIndex = '9999';

  // 创建按钮元素并添加到悬浮 div 中
  var button = document.createElement('button');
  button.textContent = 'AUTO';
  button.style.padding = '5px 10px';
  button.style.backgroundColor = 'blue';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.cursor = 'pointer';
  button.addEventListener('click', function() {
    //触发生成子选项
    //修改状态为已关闭
    let eles = $('div.udesk-webapp-ts-react-select-item.udesk-webapp-ts-react-select-item-option')
    $(eles[3]).click()
    //修改优先级为低
    $(eles[7]).click()
    //选择IT标准模板
    //$(eles[8]).click()
    //选择影响度
    $(eles[13]).click()
    //选择服务方式
    $(eles[19]).click()
    //选择问题类型
    $(eles[21]).click()
    $('textarea#TextField_197401').text('已告知')
  });
  floatingDiv.appendChild(button);

  // 将悬浮 div 添加到页面中
  document.body.appendChild(floatingDiv);
})();
