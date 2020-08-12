# Overview:

Create a .csv file from a javascript object and download to client.

This package is a very simple function which uses [json2csv](https://mircozeiss.com/json2csv/) for parsing, the [Blob API](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob) to create a blob, and [file-saver](github.com/eligrey/FileSaver.js#readme) to download the resulting file to the client.

## useDownloadCsv

The `useDownloadCsv()` function signature looks like this:

```
useDownloadCsv(optional Object parseOpts)
```

useDownloadCsv uses the `parse` method from [json2csv](https://mircozeiss.com/json2csv/). The optional `parseOpts` parameter is passed as the `options` for the [json2csv](https://mircozeiss.com/json2csv/) `parse()` method. You can [read the docs for the available options here](https://mircozeiss.com/json2csv/#available-options).


useDownloadCsv **returns a function** with the following signature:

```
downloadCsv(required Object | Array data, optional String filename)
```

The data can be in any format accepted by [json2csv](https://mircozeiss.com/json2csv/). The optional filename parameter defaults to 'download.csv'. Note that if you specify the filename parameter you must include the .csv file extension.

This function will immediately (when invoked) parse the data and download to the client.

## Examples:

### Basic:

```
import useDownloadCsv from 'use-download-csv'

const downloadCsv = useDownloadCsv()

const data = [
    {
          "Column1": 'value',
          "Column2": 10
      },
      {
          "Column1": 'value',
          "Column2": 10
      },
      {
          "Column1": 'value',
          "Column2": 10
      },
      {
          "Column1": 'value',
          "Column2": 10
      },
]

document
    .getElementById('download_button')
    .addEventListener('click',()=>downloadCsv(data,'filename.txt'))
```

### React:
```
import React from 'react'
import useDownloadCsv from 'use-download-csv'

const data = [
    {
        "Column1": 'value',
        "Column2": 10
    },
    {
        "Column1": 'value',
        "Column2": 10
    },
    {
        "Column1": 'value',
        "Column2": 10
    },
    {
        "Column1": 'value',
        "Column2": 10
    },
]

const App = () => {

    const downloadCsv = useDownloadCsv()

    return (
        <button onClick={()=>downloadCsv(data,'some_file.csv')}>
            Download
        </button>
    )
}
```

### React with data fetching:

```
import React from 'react'
import useDownloadCsv from 'use-download-csv'

const App = () => {

    const downloadCsv = useDownloadCsv()

    const handleDownloadClick = async () => {
        const res = await fetch(`api/get-data`)
        const data = await res.json()
        if (res.ok) {
            downloadCsv(data, 'some_file.csv')
        }
    }

    return (
        <button onClick={handleDownloadClick}>
            Download
        </button>
    )
}
```

### React with data fetching and parseOpts:

```
import React from 'react'
import useDownloadCsv from 'use-download-csv'

const App = () => {

    const parseOpts = {
        eol: '\r\n',
        fields: ["Column1","Column2"],
        header: false
    }

    const downloadCsv = useDownloadCsv(parseOpts)

    const handleDownloadClick = async () => {
        const res = await fetch(`api/get-data`)
        const data = await res.json()
        if (res.ok) {
            downloadCsv(data, 'some_file.csv')
        }
    }

    return (
        <button onClick={handleDownloadClick}>
            Download
        </button>
    )
}
```