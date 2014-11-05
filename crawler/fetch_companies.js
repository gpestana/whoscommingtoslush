var fs  = require('fs'), 
request = require('request'),
cheerio = require('cheerio')


//http://www.slush.org/companies/whos-coming/?q=companies&pl=6
var companiesURL = 'http://www.slush.org/companies/whos-coming/?q=companies&pl='
var sep = '<div class="item company moreinfo">'

var companies = []

var parse = function(i, cb) {
  request(companiesURL+i, function(err, res, body) {
    if(!err && res.statusCode == 200) {
      var $ = cheerio.load(body)
      var more = $('.ajaxloadinstant')
      $('div.item.company.moreinfo').each(function(i, el) {
        var c = {}   
        var entry = $(this).prev()
        var tiny = entry.find('.tiny') 
        c.title = entry.find('.title').text()    
        c.info = tiny.first().text()
        c.type = tiny.first().next().text()
        c.desc = entry.find('.description').text()    
        c.full_desc = entry.find('.fulldescription').text()    
        c.url = entry.find('.wwwurl').children().attr('href')   
        
        if(c.title) companies.push(c)  
      })
  
    if($('div.item.company.moreinfo').text() != '') parse(i+1, cb)
    else cb()
    }
  })
}

parse(0, function() {
  console.log('companies fetched: '+companies.length)
  fs.writeFile('../data/companies.json', JSON.stringify(companies) , 'utf-8');
})
