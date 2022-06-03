const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const HtmlTableToJson = require('html-table-to-json');

getApi = async (value) => {
  const config = {
    method: 'get',
    url: 'https://codequiz.azurewebsites.net',
    headers: {
      'Content-Type': 'text/html',
      'Cookie': 'hasCookie=true'
    }
  }
  
  await axios(config).then(resp => {
    const html = resp.data
    const dom = new JSDOM(html)
    const tableTag = dom.window.document.getElementsByTagName('table')[0].innerHTML
    const tableRealTag = tableTag.replace("tbody","table")
    const jsonTables = HtmlTableToJson.parse(tableRealTag)
    const objectData = jsonTables.results[0]
    let result = objectData.filter(x => x["Fund Name"] == value)
    if(result.length != 0) {
      console.log(result[0].Nav) 
    } else{
      console.log("Not found Fund Name")
    }
  });
}

main = () => {
  var fundName = process.argv[2];
  getApi(fundName)
}

main()
