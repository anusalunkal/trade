var sRelativePath = "../../../";
var oGenWordFile = require(sRelativePath + "Utils/GenerateWordDoc.js");

//Data Objects
var sTestID = "Core_10001";
var sTestName = sTestID + "_TC10011_Posses_Login";

//Page Objects
var oLoginPage = require(sRelativePath + "PageObjects/Login/LoginBasePage.js");

//Utils
var oCommonUtils = require(sRelativePath + "Utils/CommonUtils.js");

var oSpecUtil=require(sRelativePath+"pageObjects/SpecUtil.js")


describe(sTestName, function(){
    beforeAll(async function(){
        orginalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000000;

        // await oGenWordFile.createWord(sTestName);

         await oCommonUtils.launchApplication();
        await console.log(dtoLogin);
    })
    
    
    oSpecUtil.applicationLogin(dtoLogin);
    

})

