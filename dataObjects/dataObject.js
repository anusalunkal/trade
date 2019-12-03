var oCSVUtility=require("../Utils/CSVUtility.js")
class dataObjects{

async rowDTO(sFile,STestID){
    await console.log(sFile+" jjj "+STestID);
    return(await oCSVUtility.getRowValuesBasedOnTestID(sFile,STestID));
}

async getLoginusername(oRowObj){
    var convAsObj=await Object(oRowObj);
    return await oCSVUtility.dataParsing(convAsObj.UserName);
}

async getLoginPassword(oRowObj){
    var convAsObj=await Object(oRowObj);
    return await oCSVUtility.dataParsing(convAsObj.Password);
}








}
module.exports=new dataObjects();