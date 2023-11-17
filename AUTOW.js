// ==UserScript==
// @name         AUTOW
// @namespace    http://tampermonkey.net/
// @version      0.7
// @description  try to take over the world!
// @author       You
// @match        https://jinjianghotels.udesk.cn/entry/im
// @match        https://jinjianghotels.udesk.cn/entry/analysis/im/record/index?end_date=&search=&start_date=&urlParams=
// @icon         https://www.google.com/s2/favicons?sz=64&domain=udesk.cn
// @grant        none

// ==/UserScript==
/* globals $*/
(function() {
  'use strict';
  //全局开关变量
  let lotuflo = true;
  //span.robot-img-span___v57nc div
  function tip(info) {
    // 创建提示元素
    var tooltip = document.createElement('div');
    tooltip.textContent = info;
    tooltip.style.position = 'fixed';
    tooltip.style.bottom = '50px';
    tooltip.style.right = '80px';
    tooltip.style.padding = '10px';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.borderRadius = '5px';
    tooltip.style.zIndex = '9999';

    // 将提示元素添加到文档中
    document.body.appendChild(tooltip);

    // 设置定时器，在3秒后自动移除提示元素
    setTimeout(function() {
      document.body.removeChild(tooltip);
    }, 1000);
  }
  var movedFlag = false; // 将movedFlag变量定义在全局作用域中

  // 创建按钮元素
  var button = document.createElement('button');
  button.id = 'myButton';
  button.textContent = 'ON';
  button.style.position = 'fixed';
  button.style.bottom = '50px';
  button.style.right = '20px';
  button.style.padding = '5px';
  button.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  button.style.color = 'white';
  button.style.borderRadius = '5px';
  button.style.zIndex = '9999';
  button.style.cursor = 'move';
  var isDragging = false;
  var dragOffsetX = 0;
  var dragOffsetY = 0;
  // 添加按下去的动画效果反馈
  button.addEventListener('mousedown', function(event) {
    button.style.transform = 'scale(0.95)';
    isDragging = true;
    dragOffsetX = event.clientX - button.offsetLeft;
    dragOffsetY = event.clientY - button.offsetTop;
  });

  button.addEventListener('mouseup', function() {
    button.style.transform = 'scale(1)';
    isDragging = false;
  });

  document.addEventListener('mousemove', function(event) {

    if (isDragging) {
      button.style.right = '';
      button.style.bottom = '';
      button.style.left = (event.clientX - dragOffsetX) + 'px';
      button.style.top = (event.clientY - dragOffsetY) + 'px';
      movedFlag = true;
    }
  });
  var isSimulatedClick = false;
  button.addEventListener('click', function() {
    //修改只剩开关功能
    lotuflo = !lotuflo;
    if (lotuflo) {
      button.textContent = 'ON';
    } else {
      button.textContent = 'OFF';
    }
  });
  $(document).ready(function() {
    // 将悬浮 div 添加到页面中
    $("body").append(button);
  })

  //捕捉新建工单按钮而且必须唯一
  function execAuto() {
    if (!lotuflo) {
      lotuflo
      return;
    }
    //移动了按钮则不执行
    if (movedFlag) {
      movedFlag = false;
      return;
    }
    tip('ing');
    var count = 0;
    while ($('span.udesk-webapp-ts-react-select-selection-item[title=请选择IT服务模板]').length != 1 && count < 6) {
      // 等待1秒钟
      setTimeout(function() {}, 1000);
      count++;
    }
    //判断是否存在请选择IT服务模板没有则不执行
    if ($('span.udesk-webapp-ts-react-select-selection-item[title=请选择IT服务模板]').length != 1) {
      tip('请检查')
      return;
    }
    // 找框√
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("mousedown", true, true);
    var masks = document.querySelectorAll('div.udesk-webapp-ts-react-select-selector');
    if (masks.length > 0) {
      masks[masks.length - 1].dispatchEvent(evt)
    } else {
      tip('请检查')
      return;
    }
    //这个X
    event.stopPropagation();
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
    isSimulatedClick = false;
  }

  $(document).on('click', function(event) {
    // 解决循环调用问题
    if (isSimulatedClick) {

    isSimulatedClick = false;
    return;
  }
    //怎么判断执行了第几次
    var bnt1 = $($(event)[0].target).closest('div.hight-light-icon-wrapper___3lRNO  ').find('span.t-create-ticket').length == 1;
    if (bnt1) {
      setTimeout(execAuto, 6000);
      return;
    }
    var bnt2 = $(event)[0].target.textContent.includes('新建工单');
    if (bnt2) {
      setTimeout(execAuto, 6000);
      return;
    }
    if ($('span.udesk-webapp-ts-react-select-selection-item[title=请选择IT服务模板]').length == 1) {
      isSimulatedClick = true;
      execAuto();
      return;
    }

    //var bnt3 = $(event.target).is('div.header-section') && event.clientX == 0 && event.clientY == 0;
    //由于event传导不正确因此,需要明确知道点击了的是新建按钮 而不是别的东西



    /*if (bnt3) {
      var bnt4 = $('div.udesk-webapp-react-row.udesk-webapp-react-row-center.my-12___2fZMz')[0];
      if (bnt4) {
        if (bnt4.textContent.includes('新建工单')) {
          setTimeout(execAuto, 6000);
          return;
        }
      }
    }*/
  });
})();
