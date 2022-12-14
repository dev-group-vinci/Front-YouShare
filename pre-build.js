require("dotenv").config()
var fs = require('fs');

var str = `
export const environment = {
    apiUrl: '${process.env.BACK_URL}'
};
`;
fs.writeFile("./src/environment/environment.ts", str, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});