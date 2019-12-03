var HTMLReport = require('protractor-html-reporter-2');
var fs = require('fs-extra');
var jasmineReporters = require('jasmine-reporters');
var DescribeFailureReporter = require('protractor-stop-describe-on-failure');


fs.emptyDir('screenshots/',function(err){

});

exports.config = {
    framework : "jasmine2",
    directConnect : "true",


    capabilities : {
        unexpectedAlertBehaviour : 'accept',
        browserName : 'chrome',
    },

    specs : [
      //  './Specs/Core/Portal/11200_TC10113_Portal_Cargo Release Issue.js',
      './Specs/Core/Portal/TC10011_Posses_Login.js',
    ],

    onPrepare :  function(){
        
        browser.manage().timeouts().implicitlyWait(10000);
        browser.manage().window().maximize();
        
        global.loginCSVFileName = 'login';
        //global.dtoLoginPg = require('./dataObjects/LoginDTO.js');
        global.dtoLoginPg = require('./dataObjects/dataObject.js');
      // global.dtoLogin = dtoLoginPg.loginDTO(loginCSVFileName, "User1");
      global.dtoLogin = dtoLoginPg.rowDTO(loginCSVFileName,"User1");
      
      //  global.dtoPortalInstrumentsPg = require('./dataObjects/PortalInstrumentsDTO.js');
        //global.dtojTPSsPg = require('./dataObjects/InstrumentsDTO.js');
        

        jasmine.getEnv().addReporter(DescribeFailureReporter(jasmine.getEnv()));




        /* jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll : true,
            savePath : './',
            filePrefix : 'xmlresults'
        })); */

        jasmine.getEnv().addReporter({
            specDone: async function (result){

                browser.getCapabilities().then(function (caps){
                    var browserName = caps.get('browserName');

                    browser.takeScreenshot().then(function (png){

                        var stream = fs.createWriteStream('screenshots/' + browserName + '-' + result.fullName + '.png');
                        stream.write(new Buffer(png, 'base64'));
                        stream.end();

                    });
                });
            }
        });
    },


    onComplete : function () {

        var browserName, browserVersion;
        var capsPromise = browser.getCapabilities();

        capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            platform = caps.get('platform');


            var HTMLReport = require('protractor-html-reporter-2');

            testConfig = {
                reportTitle : 'Protractor Test Execution Report',
                outputPath : './',
                outputFilename : 'ProtractorTestReport',
                screenshotPath : './screenshots',
                testBrowser : browserName,
                browserVersion : browserVersion,
                modifiedSuiteName : false,
                screenshotsOnlyOnFailure : true,
                testPlatform : platform
            };
            //new HTMLReport().from('xmlresults.xml', testConfig);

        });

    },


    suites:
    {
        SmokeSample : ['./specs/TS_BeforeAfter.js', './specs/TS2_Sample.js', './specs/TS3_Sample.js'],
        Smoke : ['./specs/10130_TC20908_TPS_SWIFT_OUT_SLC_Inward_Advise_Auto_Extend.js','./specs/10084_TC20201_TPS_SWIFT_OUT_Clean_Coll_Out_New_CAD.js'],
        MidSize : '',
        Extended : ''

    },
    jasmineNodeOpts:
    {
        showColors: true,
    },
};