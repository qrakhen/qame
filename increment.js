/**
 * Simple build incrementer. Everytime build.sh/.bat is triggered, this will finally increment this version's build number. 
 */

const fs = require("fs");

const 
    f = fs.readFileSync("./package.json"),
    p = parseInt(fs.readFileSync("./prevbuild")),
    j = JSON.parse(f),
    v = j.version,
    s = v.split("."),
    b = s[3],
    n = parseInt(b) + 1;

if (p != parseInt(s[2])) {
    n = 1;
    console.warn("new revision detected, resetting build counter");
}

j.version = s[0] + "." + s[1] + "." + s[2] + "." + n.toString().padStart('0', 4);

console.log("incremented build counter (" + n-1 + " > " + n + ")");

fs.writeFileSync("package.json", JSON.stringify(j, null, 4));
fs.writeFileSync("prevbuild", s[2]);