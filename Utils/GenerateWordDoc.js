var fs = require("fs");
var docx = require("docx");
var oUtil = require("./CommonUtils.js");
var doc;
var sFilePath;
var {Document, Paragraph, Packer } = docx;

var Word = function() {

    this.createWord = function(fileName){
        sFilePath = "./results/" + fileName + "_" + oUtil.getNowDateTimeStr() + '.docx';

        doc = new Document();


        packer = new Packer();
        packer = toBuffer(doc).then((buffer) =>{
            fs.writeFileSync(sFilePath, buffer);

        });

    };


    this.captureScreenshot = function (sPara)
    {
        browser.takeScreenshot().then(function (png)
        {
            doc.createImage(Buffer.from(png, 'base64'), 600, 400);
            packer= new Packer();
            packer = toBuffer(doc).then((buffer) =>{
                fs.writeFileSync(sFilePath, buffer);
    
            });

        });
    };

    this.addTextToWord = function (sPara)
    {
        packer= new Packer();
        packer = toBuffer(doc).then((buffer) =>{
            fs.writeFileSync(sFilePath, buffer);

        });
    };
};
module.exports = new Word();