const fs = require('fs');
const stringify = require('json-stringify-safe');

async function parseData(input) {
    return new Promise((resolve, reject) => {
        let partialData = [];
        partialData.push(input.childNodes[1].childNodes[2].childNodes[3].childNodes[7]); //round 1
        partialData.push(input.childNodes[1].childNodes[2].childNodes[3].childNodes[9]); //round 2
        partialData.push(input.childNodes[1].childNodes[2].childNodes[3].childNodes[11]); //round 3
        // console.log(partialData);
        resolve(partialData);
    });
}
async function processData() {
    let arr = fs.readdirSync('./games/');
    for (let i = 0; i < arr.length; i++) {
        process.stdout.write(`processing ${arr[i]}...  {${i}/${arr.length}}               \r`);
        let parsed = await parseData(JSON.parse(fs.readFileSync(`./games/${arr[i]}`).toString()));
        fs.writeFileSync(`./parsed/${arr[i]}.json`, stringify(parsed));
        process.stdout.write(`processed ${arr[i]}!  {${i}/${arr[i].length}}\r`);
        fs.rmSync(`./games/${arr[i]}`);
        process.stdout.write(`deleted ${arr[i]}                                 \r`);
    }
}
processData();