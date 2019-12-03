var g_UAT_URL = "https://rbc.tps.uat.cgitrade360.com/#!/login";
var g_UAT_Portal_URL = "https://rbc.portal.uat.proponix.com/poratal/optional/TestingLogon.jsp";


var Possses_Url = "http://posse.com/signin";


var timeSolver = require('../node_modules/timesolver/timeSolver.min.js');
var oCSVUtility = require("../utils/CSVUtility.js");


class CommonUtil
{

    async launchApplication()
    {
        //await browser.get(g_UAT_URL);
        await browser.get(Possses_Url);
        await console.log("Application is launched successfully");
    }

    async launchApplication1(sURL)
    {
        await browser.manage().window().maximize();
        await browser.get(sURL);

    }

    async closeApplication()
    {
        await browser.close();

    }

    async addWait(sWaitTime)
    {
        await browser.sleep(sWaitTime * 0.8);
    }

    async clickElement(ui_Element)
    {
        await ui_Element.click();
        await this.addWait(500);
    }

    async typeElement(ui_Element, sText)
    {
        await ui_Element.clear();
        console.log(sText);
        await ui_Element.sendKeys(sText);
        await this.addWait(500);

    }

    async clickCheckBox(ui_Element, sYesOrNo)
    {
        if (await sYesOrNo.includes("Yes"))
        {
            await ui_Element.click();
            await this.addWait(1000);

        }
    }


    async setandVerifyValueOnInputElement(ui_Element, sText)
    {
        await ui_Element.clear();
        await this.addWait(1000);
        await ui_Element.sendKeys(sText);
        await this.addWait(1000);
        return await ui_Element.getAttribute('value').then(insertedValue =>
            {
                if (insertedValue !== sText)
                {
                    return this.setandVerifyValueOnInputElement(ui_Element, sText);
                }
                else
                {
                    return null;
                }
            });

    }
   
    async setandVerifyValue(ui_Element, sText)
    {
        await ui_Element.clear();
        await ui_Element.sendKeys(sText);
        await ui_Element.sendKeys(protractor.Key.TAB);
        await this.addWait(300);
        return await ui_Element.getAttribute('value').then(insertedValue =>
            {
                if (insertedValue !== sText)
                {
                    return this.setandVerifyValue(ui_Element, sText);
                }
                else
                {
                    return null;
                }
            }); 
    }

    async isElementPresent(ui_Element)
    {
        const bPresence = await ui_Element.isPresent();
        return bPresence;
    }

    async getText(ui_Element)
    {
        const sText = await ui_Element.getText();
        return sText;
    }

    async getAttribute(ui_Element, sAttribute)
    {
        if (this.isElementPresent(ui_Element))
        {
            const sText = await ui_Element.getAttribute(sAttribute);
            const sText1 = sText.trim();
            return sText1;
        }
        else
        {
            return "";
        }
    }

    captureScreenShot(ui_Element, filename)
    {
        ui_Element.takeScreenshot().then((png) =>
        {
            var stream = fs.createWriteStream(filename);
            stream.write(new Buffer(png, 'base64'));
            stream.end();

        });

    }


    async selectElementbyOptionalLabel(ui_Element, sOption)
    {
        await ui_Element.all(by.xpath('//option[contains(@label,"' + sOption + '" )])')).click();
        await this.addWait(1000);

    }
    async selectElementbyOptionalExactLabel(ui_Element, sOption)
    {
        await ui_Element.all(by.xpath('//option[(@label,"' + sOption + '" )])')).click();
        await this.addWait(1000);

    }

    async selectElementbyOptionalExactLabelandVerify(ui_Element, sOption, verifyElement)
    {
        if (await ui_Element.isEnabled()){
            await ui_Element.all(by.xpath('//option[(@label,"' + sOption + '" )])')).click();
            await this.addWait(1000);
            return await verifyElement.getText().then(insertedValue =>
                {
                    if (insertedValue !== sOption)
                    {
                        return this.selectElementbyOptionalExactLabelandVerify(ui_Element, sOption, verifyElement);
                    }
                    else
                    {
                        return null;
                    }
                });
    
        }
    }

    todayDateMMDDYYYY(){
        var sTodayDate = new Date();
        var sDay = sTodayDate.getDate().toString();
        var sMonth = (sTodayDate.getMonth() + 1).toString();
        var sYear = sTodayDate.getFullYear().toString();

        if (sDay.length == 1)
        {
            sDay ='0' + sDay;

        }
        if (sMonth.length == 1)
        {
            sMonth ='0' + sMonth;

        }
        return (sMonth + '/' + sDay + '/' + sYear);
        
    }

    AddZero(num)
    {
         return (num >= 0 && num <10) ? "0" + num : num + "";
    }

    getNowDateTimeStr()
    {
        var now = new Date();
        var hour = now.getHours() - (now.getHours() >= 12 ? 12 : 0);
        return [[this.AddZero(now.getDate()), this.AddZero(now.getMonth() + 1), now.getFullYear()].join("_"),[this.AddZero(hour), this.AddZero(now.getMinutes())].join("_"), this.AddZero(now.getSeconds())].join("_");
        
    }

    addDays2CurrentDate(count)
    {
        var afterAdd = timeSolver.add(new Date(), count, "day");
        var dateStringday = timeSolver.getString(afterAdd, "MM/DD/YYYY");
        return dateStringday;
    }

    addDays2date(numberOfDaysToAdd)
    {
        var NewDate = new Date();
        NewDate.setDate(NewDate.getDate() + 500);
        var NewDateString = NewDate.toString();
        function convertDate(d)
        {
            var parts = d.split("");
            var months = 
            {
                Jan : "01", Feb : "02", Mar :"03", Apr :"04", May :"05", Jun : "06", Jul : "07", Aug : "08", Sep : "09", Oct : "10", Nov : "11", Dec : "12"
            };
         return months[parts[1]] + "/" + parts[2] + "/" + parts[3];
            
        }
        return convertDate(NewDateString);
    }

    convertStringToNumWithComma(sNum)
    {
        const iNum = Number(sNum);
        return iNum.toLocaleString();

    }

    async windowMenuIcon(windowName, windowOption)
    {
       if (await this.isElementPresent(element(by.cssContainingText('.tps-window-header',"" + windowName + ""))))
            await element(by.cssContainingText('.tps-window-header', "" + windowName + "" )).click();
        await element(by.xpath('//div[contains@window-name, "' + windowName + '")]//div[@title="' + windowOption + '" ]')).click();
        await this.addWait(2000);
    }

    moveToElement(ui_Element)
    {
        browser.actions().mouseMove(ui_Element).perform();

    }

    
    moveToElementAndClick(ui_Element)
    {
        browser.actions().mouseMove(ui_Element).click().perform();
        
    }

async updateWriteCsv(sCSVFileName, sRefColumn, sRefData, sIntendedColumn, sValueToUpdate)
{
    oCSVUtility.updateWriteCsv(sCSVFileName, sRefColumn, sRefData, sIntendedColumn, sValueToUpdate);
}

}
module.exports = new CommonUtil();
