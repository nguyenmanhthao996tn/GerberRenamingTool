/**
 * This project is used for renaming Proteus Gerber files
 * to KiCad Gerber naming pattern. To start using, put all
 * Proteus Gerber files (*.gbr) into <\src> folder and run
 * ($npm start or $node app.js ProjectName). Then, results 
 * will be in <\dst> folder.
 * 
 * Good luck and have fun!
 * 
 * @author ThaoNguyen
 * @modified May 04, 2019 23:02
 */


var fs = require('fs');
var inputPath = __dirname + "\\src\\";
var outputPath = __dirname + "\\dst\\";
var projectName = "DefaultName";

var nameList = ["Bottom Copper",
    "Bottom Silk Screen",
    "Bottom SMT Paste",
    "Bottom Solder Resist",
    "Drill",
    "Mechanical 1",
    "Top Copper",
    "Top Silk Screen",
    "Top SMT Paste",
    "Top Solder Resist"];

var namesMap = {
    "Bottom Copper": "gbl",
    "Bottom Silk Screen": "gbo",
    "Bottom SMT Paste": "gbp",
    "Bottom Solder Resist": "gbs",
    "Drill": "drl",
    "Mechanical 1": "gko",
    "Top Copper": "gtl",
    "Top Silk Screen": "gto",
    "Top SMT Paste": "gtp",
    "Top Solder Resist": "gts"
};

if (process.argv.length == 3) {
    projectName = process.argv[2];
}

fs.readdir(inputPath, function (err, fileList) {
    fileList.forEach((sourceFileName, index) => {
        nameList.forEach((item, index) => {
            if (sourceFileName.includes(item)) {
                fs.copyFile(inputPath + sourceFileName, outputPath + projectName + '.' + namesMap[item], (err) => {
                    if (err) {
                        console.log(sourceFileName + ' ===> ' + projectName + '.' + namesMap[item] + ': FAIL');
                    }
                    else {
                        console.log(sourceFileName + ' ===> ' + projectName + '.' + namesMap[item] + ': OK');
                    }
                });
            }
        });
    });
});