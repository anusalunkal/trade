//var oExcel = require('excel.js');
//var XLSX = require('xlsx');
const CSV = require('csvtojson');
const path = require("path");
//var sTestType;


//var workbook;
//var worksheet;

class CSVUtility{

   /* readSheet(sFile,sSheetName){

        workbook = new oExcel.Workbook();
        workbook.xlsx.readFile(sFile).then(function(){

            worksheet = Workbook.getWorksheet(sSheetName);
            console.log("RCnt :" + worksheet.actualRowCount);
            console.log("CCnt " + worksheet.actualColumnCount);

            var row = worksheet.getRow(1);
            console.log(row.getCell(1).value);

            return new Promise(function(resolve,reject){

                resolve(worksheet);
            });
            
        }).then(function(resultWS){

            console.log("RCnt 2:" + worksheet.actualRowCount);

            worksheet = resultWS;
        });

        console.log("RCnt 3 :" +worksheet.actualRowCount);

        return resultWS;

    }*/

async dataParsing(sData)
{
    if(await sData.includes("data")){
        return sData.substring(5);

    }

    else{
        return sData;
    }
}


/*

readSheetAndReturnJSON(sFile,sSheetName)
{
    var workbook = XLSX.readFile(path.resolve(__dirname,sFile));
    var worksheet = workbook.Sheets[sSheetName];
    return XLSX.utils.sheet_to_json(worksheet);
}

async readSheetFromCSVAndReturnJSON(sFile){
    const jsonArray = await CSV().fromFile(path.resolve(__dirname,sFile));
    return jsonArray;
}

getRowCount(oJSONObj)
{
    return Object.keys(oJSONObj).length;

}

async getRowValues(sCSVFileName){
    const csvJSON = await CSV().fromFile(path.resolve(__dirname,'../testData/' + sCSVFileName +'.csv'));

}

async getTestType(sTestID){
    if (await sTestID.includes("PreReq_"))
           sTestType = "PreReq";
    if (await sTestID.includes("Smoke_"))
           sTestType = "Smoke";
    if (await sTestID.includes("Core_"))
           sTestType = "Core";
    if (await sTestID.includes("Extended_"))
           sTestType = "Extended";
    if (await sTestID.includes("Portal_"))
           sTestType = "Portal";


    return await sTestType;
}

 aync getTestID(sTestID)
{
    if (await sTestID.includes("PreReq_"))
           sTestID = sTestID.replace("PreReq_", "");
    if (await sTestID.includes("Smoke_"))
           sTestID = sTestID.replace("Smoke", "");
    if (await sTestID.includes("Core_"))
           sTestID = sTestID.replace("Core_", "");
    if (await sTestID.includes("Extended_"))
           sTestID = sTestID.replace("Extended_", "");
    if (await sTestID.includes("Portal_"))
           sTestID = sTestID.replace("Portal_", "");

    return await sTestID;
}
 
async getRowValuesLogin(sCSVFileName,sTestID)
{
    const csvJSON = await CSV().fromFile(path.resolve(__dirname, '../testData/' + await sCSVFileName +'.csv'));
    for (var iEachCSVRow = 0; iEachCSVRow < await Object.keys(csvJSON).length; iEachCSVRow++)
    {
        if (await csvJSON[iEachCSVRow].TestID === sTestID)
        {
            return await csvJSON[iEachCSVRow];
        }
    }
}*/


async getRowValuesBasedOnTestID(sCSVFileName,sTestID)
{
    await console.log(sTestID)
   // var sTestTypeExp = await this.getTestType(sTestID);
   // var sTestIDExp = await this.getTestID(sTestID);



    await console.log('../testData/' +sCSVFileName +'.csv');
   // const csvJSON = await CSV().fromFile(path.resolve(__dirname, '../testData/' + await sTestTypeExp + '/' + await sCSVFileName + '.csv'));

   const csvJSON = await CSV().fromFile(path.resolve(__dirname, '../testData/'  + await sCSVFileName + '.csv'));
    
   await console.log(csvJSON);
   
   for (var iEachCSVRow = 0; iEachCSVRow < await Object.keys(csvJSON).length; iEachCSVRow++)
    {
        await console.log(csvJSON[iEachCSVRow].sTestID);
        if (await csvJSON[iEachCSVRow].sTestID === sTestID)
            {
                
                await console.log(csvJSON[iEachCSVRow]);
                return await csvJSON[iEachCSVRow];
                
            }  
    }
}

/*
async getRowValuesBasedOnPortalTestID( sCSVFileName, sTestID)
{
    var sTestIDExp = await this.getTestID(sTestID);
    const csvJSON = await CSV().fromFile(path.resolve(__dirname, '../testData/Portal/' + await sCSVFileName + '.csv'));
    for (var iEachCSVRow = 0; iEachCSVRow < await Object.keys(csvJSON).length; iEachCSVRow++)
    {
        if (await csvJSON[iEachCSVRow].TestID === sTestIDExp)
            {
                return await csvJSON[iEachCSVRow];
            }  
    }
}


async getRowValuesBasedOnPartyType(sCSVFileName, sTestID, sPartyType)
{
    var sTestTypeExp = await this.getTestType(sTestID);
    var sTestIDExp = await this.getTestID(sTestID);
    const csvJSON = await CSV().fromFile(path.resolve(__dirname, '../testData/' + await sTestTypeExp + '/' + await sCSVFileName + '.csv'));
    for (var iEachCSVRow = 0; iEachCSVRow < await Object.keys(csvJSON).length; iEachCSVRow++)
    {
        if ((await csvJSON[iEachCSVRow].TestID === sTestIDExp) && (await csvJSON[iEachCSVRow].PartyType === sPartyType))
            {
                return await csvJSON[iEachCSVRow];
            }  
    }

}


async getRowValuesBasedOnAdjustmentType(sCSVFileName,sTestID, sAdjID)
{

    var sTestTypeExp = await this.getTestType(sTestID);
    var sTestIDExp = await this.getTestID(sTestID);
    await console.log("TESTID Row Adj " , sTestIDExp);
    const csvJSON = await CSV().fromFile(path.resolve(__dirname, '../testData/' + await sTestTypeExp + '/' + await sCSVFileName + '.csv'));
    for (var iEachCSVRow = 0; iEachCSVRow < await Object.keys(csvJSON).length; iEachCSVRow++)
    {
        if ((await csvJSON[iEachCSVRow].TestID === sTestIDExp) && (await csvJSON[iEachCSVRow].AdjID === sAdjID))
            {
                return await csvJSON[iEachCSVRow];
            }  
    }

}


getExcelRowCount(worksheet1 )
{
    return worksheet1.actualRowCount;
}

getColCount()
{
    return worksheet1.actualColumnCount;
}

readData(worksheet1, iCol , iRow)
{
    var row = worksheet1.getRow(iRow);
    return row.getCell(iCol).value;

}

readDataByColName(sColName, iRow)
{
    var row = worksheet1.getRow(0);
    row.eachCell(function(cell,colNumber)
    {
        if (cell.value == sColName){
            return readData(colNumber, iRow);
        }
        else{
            return "";
        }
    });
}


*/
}

module.exports = new CSVUtility(); 