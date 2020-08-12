const { parse } = require('json2csv')
const { saveAs } = require('file-saver')

const useCsvDownloader = (parseOpts) => {
    return (data, filename) => {
        const csv = parse(data,parseOpts)
        const file = new Blob([csv], { type: 'text/csv;charset=utf-8' })
        saveAs(file, filename || 'download.csv')
    }
}

module.exports = useCsvDownloader