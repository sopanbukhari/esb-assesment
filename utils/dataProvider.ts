import fs from 'fs';

export class DataProvider{

static getTestDataFromJson(filePath:string): any[]
{
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data;
}

}
