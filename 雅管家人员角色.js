let objs = $("tr[id^='datagrid-row-r1-2-']");
for (var i = 0; i < objs.length; i++) {
    let divText = $(objs[i]).find('td[field=roles] div');
    if (!($(divText).text().trim() === "")) {
        continue;
    }
    objs[i].click();
    //设置角色
    $('input[value=设置角色]').click()
    //选择片区管家
    $('span#TREE_bsUserRoleGrid_4_check').click()
    //保存
    $('input#bsRoleSelEditWinSaveBtn').click()
}