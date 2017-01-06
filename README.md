# google-spreatsheet-manager
this is a wrapper of [google-spreatsheet](https://www.npmjs.com/package/google-spreadsheet)

## basic usage

```
let sheetID = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
let cred = path.join(__dirname, './cred.json')

export async function example(){
  let sheetManager = new SpreadSheetManager(sheetID,cred)
  let authResult = await sheetManager.auth()
  let sheets = await sheetManager.getSheets()
  let mainSheet = sheets.worksheets[0]

  let parserList = await sheetManager.cellsParser(mainSheet,parser)

  console.log(parserList)
}


function parser(cells){
  return cells.filter(function(cell, index) {
    return (cell.col == 1)
  }).map(function(cell, index) {
    return cell.value.toLowerCase()
  })
}
```


## API

### create manager
```
new SpreadSheetManager((String) sheet_id, (json)[auth], [options])
```
Create a new google spreadsheet object.   
 - sheet_id -- the ID of the spreadsheet (from its URL)
 - auth - (optional) an existing auth token
 - options - (optional)
  - visibility - defaults to public if anonymous
  - projection - defaults to values if anonymous


### auth
SpreadSheetManager.auth() -> void

### getSheets
SpreadSheetManager.getSheets() -> Array

### rowsParse
SpreadSheetManager.rowsParse((Object) sheet, (function) parser) -> Array

### cellsParse
SpreadSheetManager.cellsParse((Object) sheet, (function) parser) -> Array