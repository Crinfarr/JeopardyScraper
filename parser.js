const fs = require('fs');

const files = fs.readdirSync('./parsed/');

async function parse(data) {
    let tables = extractTables(data);
    let rawtbl = [];
    tables.forEach((table) => {
        table.childNodes[1].childNodes.forEach(row => {
            console.log(row.childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].value);
            let raw = [
                row.childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].value,
                row.childNodes[3].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].value,
                row.childNodes[5].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].value,
                row.childNodes[7].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].value,
                row.childNodes[9].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].value,
                row.childNodes[11].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].value
            ];
            rawtbl.push(raw);
        });
    });
}

function extractTables(data) {
    return [
        data[0].childNodes[3],
        data[1].childNodes[2],
        data[2].childNodes[3]
    ];
}

async function parseAll() {
    for (let i = 0; i <= /*files.length*/ 3; i++) {
        await parse(JSON.parse(fs.readFileSync(`./parsed/${files[i]}`).toString()));
    }
}

parseAll();