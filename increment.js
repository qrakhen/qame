const fs = require("fs");

var file = fs.readFileSync("./package.json");
var prev = parseInt(fs.readFileSync("./prevbuild"));

var json = JSON.parse(file);
var version = json.version;
var split = version.split(".");
var build = split[3];

var newBuild = parseInt(build) + 1;

if (prev != parseInt(split[2])) {
    newBuild = 1;    
    console.log("new revision detected, resetting build counter");
}

json.version = split[0] + "." + split[1] + "." + split[2] + "." + newBuild.toString().padStart('0', 4);

console.log("incremented build counter (" + newBuild + ")");

fs.writeFileSync("package.json", JSON.stringify(json, null, 4));
fs.writeFileSync("prevbuild", split[2]);