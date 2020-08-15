import { promises as fs } from 'fs'

global.fileNameJson = './file/Sacramentorealestatetransactions.json'
global.fileNameCSV = './file/Sacramentorealestatetransactions.csv'

const csv2json = async(separator) => {
    try {
        const data = await fs.readFile(global.fileNameCSV)
        const text = data.toString()
        const output = text.split(separator)
        await fs.appendFile(global.fileNameJson, '[')
        for (let index = 1; index < output.length - 1; index++) {
            const indice = output[0].split(',')
            const line = output[index].split(',')
            let inner = '{';
            if (index != output.length - 2) {
                for (let i = 0; i < indice.length; i++) {
                    if (i != indice.length - 1) {
                        inner = `${inner}"${indice[i].trim()}":"${line[i].trim()}",`
                    } else {
                        inner = `${inner}"${indice[i].trim()}":"${line[i].trim()}"},`
                    }
                }
                await fs.appendFile(global.fileNameJson, inner)
            } else if (output[index].trim() !== "") {
                for (let i = 0; i < indice.length; i++) {
                    if (i != indice.length - 1) {
                        inner = `${inner}"${indice[i].trim()}":"${line[i].trim()}",`
                    } else {
                        inner = `${inner}"${indice[i].trim()}":"${line[i].trim()}"}]`
                    }
                }
                await fs.appendFile(global.fileNameJson, inner)
            }
        }
    } catch (err) {
        console.log('Error:', err);
    }
};
csv2json('\n')