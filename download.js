const https = require('https');
const parse5 = require('parse5');
const stringify = require('json-stringify-safe');
const fs = require('fs');

async function pullsingle(i) {
    return new Promise((resolve, reject) => {
        https.get(`https://www.j-archive.com/showgame.php?game_id=${i}`, (res) => {
            let rec = "";
            res.on('data', (d) => {
                rec += d;
            });
            res.on('close', () => {
                resolve(rec);
            });
            res.on('error', (err) => {
                reject(err);
            });
        });
    });
}

export async function getall() {
    for (let i = 1; i <= 7220; i++) {
        process.stdout.write(`Requesting game id ${i}...                  \r`);
        fs.writeFileSync(`./games/${i}.game`, stringify(parse5.parse(
            await pullsingle(i)
        )));
    }
}
getall();