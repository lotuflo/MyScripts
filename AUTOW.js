// ==UserScript==
// @name         AUTOW
// @namespace    http://tampermonkey.net/
// @version      0.3
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
  button.style.backgroundColor = 'rgb(147, 197, 114)';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.cursor = 'pointer';
  // 添加按下去的动画效果反馈
  button.addEventListener('mousedown', function() {
    button.style.transform = 'scale(0.95)';
  });

  button.addEventListener('mouseup', function() {
    button.style.transform = 'scale(1)';
  });
  button.addEventListener('click', function() {
    // 找框√
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("mousedown", true, true);
    var masks = document.querySelectorAll('div.udesk-webapp-ts-react-select-selector');
    if (masks.length > 0) {
      masks[masks.length - 1].dispatchEvent(evt)
    }
    //这个X
    let str = 'div.udesk-webapp-ts-react-select-item.udesk-webapp-ts-react-select-item-option[title=';
    //先选择it模板
    $(str + 'IT服务模板]').click()
    //刷新框的数量
    masks = document.querySelectorAll('div.udesk-webapp-ts-react-select-selector');
    //触发所有框生成所有子选项
    for (var i = 3; i < masks.length; i++) {
      masks[i].dispatchEvent(evt);
    }
    //修改状态为已关闭
    $(str + '已关闭]').click();
    //修改优先级和影响度为低
    $(str + '低]').click();
    //选择服务方式
    $(str + '其它支持]').click();
    //选择问题类型
    $(str + '操作问题]').click();
    $('textarea#TextField_197401').text('已告知').val('已告知')
  });
  floatingDiv.appendChild(button);

  // 将悬浮 div 添加到页面中
  document.body.appendChild(floatingDiv);
})();
