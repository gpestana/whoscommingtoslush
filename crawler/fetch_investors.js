var fs  = require('fs'), 
request = require('request'),
cheerio = require('cheerio')


var investorsURL = 'http://www.slush.org/investors/attending-investors/?q=investors&pl='
var sep = '<div class="item company">'

var investors = []

var parse = function(i, cb) {
  request(investorsURL+i, function(err, res, body) {
    if(!err && res.statusCode == 200) {
      var $ = cheerio.load(body)
      var more = $('.ajaxloadinstant')
      $('div.item.company').each(function(i, el) {
        var c = {}   
        var entry = $(this).prev()
        c.title = entry.find('.title').text()    
        c.full_desc = entry.find('p').text()
             
        var img = entry.find('.image').attr('style')
      
        if(img) {
          c.img = img.split("'")[1]
        }
      
        c.type = '@investor' 

        if(c.title) {
          investors.push(c)
          console.log(c.title)
          console.log(c.full_desc)
          console.log(c.img)
        }  
      })
 
    if($('div.loadmorehere').text() != '') parse(i+1, cb)
    else cb()
    }
  })
}

parse(0, function() {
  console.log('investors fetched: '+investors.length)
  fs.writeFile('../data/investors.json', JSON.stringify(investors) , 'utf-8');
})
