// 绑定管家账号
let objs = $("tr[id^='datagrid-row-r1-2-']");
for (var i = 0; i < objs.length; i++) {
  let roleNameFlag = $(objs[i]).find('td[field=roleNameStr] div').text().trim();
  if (!roleNameFlag == "") {
    continue;
  }
  objs[i].click();
  // 获取手机号
  let phone = $(objs[i]).find('td[field=mobile] a').attr('onclick').split("'")[1];
  $('input[value=绑定管家账号]').click();
  // 获取输入框元素
  var inputElement = $('input[name=qf_mobile]');
  // 模拟输入
  inputElement.val(phone);
  // 执行查询
  await new Promise(resolve => {
    $($('input[value=查询]')[1]).click();
    setTimeout(resolve, 2000);
  });
  // 选中
  $('tr#datagrid-row-r2-2-0').click();
  // 确认
  $('input[id^="staffMgrSelWinOkBtn"]').click()
}








--------------
$('button.editBtn').click()

$('p.dropdown-btn').click()

$('input[placeholder="请输入关键字"]').click();

$($('span.zc-j-radio')[9]).click()