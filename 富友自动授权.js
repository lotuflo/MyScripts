// Function to click on the span containing "用户管理"
function clickUserManagement() {
    var userManagement = Array.from(document.querySelectorAll('span.layui-left-nav')).find(span => span.textContent.includes('用户管理'));
    if (userManagement) {
        userManagement.click();
        clearInterval(userManagementInterval); // Stop checking once clicked
    }
}

// Function to click on the list item with data-title "角色管理"
function clickRoleManagement() {
    var roleManagement = document.querySelector('li[data-title="角色管理"]');
    if (roleManagement) {
        roleManagement.click();
        clearInterval(roleManagementInterval); // Stop checking once clicked
    }
}

// Function to click the edit button
function clickEditButton() {
    var element = document.querySelector('a.layui-btn.layui-btn-xs[lay-event="edit"]');
    if (element) {
        element.click();
        clearInterval(editButtonInterval); // Stop checking once clicked
    }
}

// Function to check the checkbox related to "缴费报表下载"
function checkCheckbox() {
    var checkbox81 = Array.from(document.querySelectorAll('.ew-tree-pack > span')).find(span => span.textContent.includes('缴费报表下载'));
    if (checkbox81) {
        var checkboxTd = checkbox81.closest('tr').querySelector('td[data-type="checkbox"] div[lay-skin="primary"]');
        if (checkboxTd && !checkboxTd.classList.contains('layui-form-checked')) {
            checkboxTd.click(); // Simulate a click
        }
        clearInterval(checkboxInterval); // Stop checking once processed
    }
}

// Function to click on the save button
function clickSaveButton() {
    var element = Array.from(document.querySelectorAll('a[lay-submit]')).find(a => a.textContent.includes('保存'));
    if (element) {
        element.click(); // Simulate a click
        clearInterval(saveButtonInterval); // Stop checking once clicked
    }
}

// Function to click on the logout button
function clickLogoutButton() {
    var element = Array.from(document.querySelectorAll('a.login-out')).find(a => a.textContent.includes('退出登录'));
    if (element) {
        //element.click(); // Simulate a click
        clearInterval(logoutButtonInterval); // Stop checking once clicked
    }
}

// Set intervals for each function
var userManagementInterval = setInterval(clickUserManagement, 1000);
var roleManagementInterval = setInterval(clickRoleManagement, 2000);
var editButtonInterval = setInterval(clickEditButton, 3000);
var checkboxInterval = setInterval(checkCheckbox, 4000);
var saveButtonInterval = setInterval(clickSaveButton, 5000);	
var logoutButtonInterval = setInterval(clickLogoutButton, 6000);
