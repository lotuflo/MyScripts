
function waitAsync(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, milliseconds);
    });
}

async function run() {
$('span.layui-left-nav:contains("用户管理")').click();
await waitAsync(1000);
$('li[data-title="角色管理"]').click();
await waitAsync(1000);
$('button.layui-btn[layuimini-href="/sysRole/goToPage.fuiou?operator=add"]').click()
await waitAsync(1000);
 $('div.layui-unselect.layui-form-radio:has(div:contains("超级管理员")) > i').click();
 await waitAsync(1000);
 $('tr td span:contains("商户信息")').closest('td[data-field="menuName"]').siblings('td[data-type="checkbox"]').find('i.layui-icon.layui-icon-ok').click();
 $('tr td span:contains("交易信息")').closest('td[data-field="menuName"]').siblings('td[data-type="checkbox"]').find('i.layui-icon.layui-icon-ok').click();
await waitAsync(1000);
 $('tr td span:contains("终端业务开关")').closest('td[data-field="menuName"]').siblings('td[data-type="checkbox"]').find('i.layui-icon.layui-icon-ok').click();
 await waitAsync(1000);
 $('tr td span:contains("退款权限")').closest('td[data-field="menuName"]').siblings('td[data-type="checkbox"]').find('i.layui-icon.layui-icon-ok').click();
$('input[name="roleName"]').val('财务查询超管');
document.querySelectorAll('a.layui-btn.layui-btn-radius.layui-btn-sm.layui-btn-normal').forEach(button => button.textContent.includes('保存') && button.click());

}run();	
