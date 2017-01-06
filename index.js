import spreadsheet from 'google-spreadsheet'
import fs from 'fs-extra'

export default class googleSpreadsheetManager {
  constructor(sheetID,cred){
    this.sheet = new spreadsheet(sheetID)
    this.cred = JSON.parse(fs.readFileSync(cred))
  }

  auth(){
    return new Promise((resolve,reject)=>{
      this.sheet.useServiceAccountAuth(this.cred,function(err){
        if(err){
          return reject(err)
        }else{
          resolve('auth complete')
        }
      })
    })
  }

  getSheets(){
    return new Promise((resolve,reject)=>{
      this.sheet.getInfo(function(err,sheet_info){
        if(err){
          reject(err)
        }else{
          resolve(sheet_info)
        }
      })
    })
  }

  rowsParse(sheet,parser,variable){
    return new Promise((resolve,reject)=>{
     sheet.getRows(function(err,rows){
      if(err){
        reject(err)
      }else{
        let messages = parser(rows,variable)
        resolve(messages)
      }
     }) 
    })
  }

  cellsParser(sheet,parser){
    return new Promise((resolve,reject)=>{
      sheet.getCells(function(err,cells){
        let value = parser(cells)
        resolve(value)
      })
    })
  }
}