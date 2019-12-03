var dtoLogin = require('../../dataObjects/dataObject.js');
var oUtil = require('../../Utils/CommonUtils.js');

var oGenWordFile = require("../../Utils/GenerateWordDoc.js");

//LoginPage Elements
var tb_UserName = element(by.model("email"));
var tb_UserPassword = element(by.model("password"));
var btn_SignIn = element(by.buttonText('Sign in'));

class LoginBasePage{

async login(dto)
{
    var userNameCSV = await dtoLogin.getLoginusername(dto);
    var passwordCSV = await dtoLogin.getLoginPassword(dto);

    await oUtil.addWait(5000);
    await tb_UserName.sendKeys(userNameCSV);
    await tb_UserPassword.sendKeys(passwordCSV);

   // await oGenWordFile.captureScreenshot("Posses Login");

    await oUtil.clickElement(btn_SignIn);

    await oUtil.addWait(3000);


}
}

module.exports= new LoginBasePage();