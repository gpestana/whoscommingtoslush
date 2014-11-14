var fs  = require('fs'), 
request = require('request'),
cheerio = require('cheerio')


//http://www.slush.org/companies/whos-coming/?q=companies&pl=6
var speakersURL = 'http://www.slush.org/speakers/'
var sep = '<div class="item company moreinfo">'

var no_img = "background-image:url('http://files.slush.org/mediacontent/');"
var white_img = "http://wallfoy.com/wp-content/uploads/2013/12/White-Color-92.jpg"


var speakers = []

var parse = function(i, cb) {
  request(speakersURL+i, function(err, res, body) {
    if(!err && res.statusCode == 200) {
      var $ = cheerio.load(body)
      var more = $('.ajaxloadinstant')
      $('div.item.company.moreinfo').each(function(i, el) {
        var c = {}   
        var entry = $(this).prev()
        c.title = entry.find('.title').text()    
        c.desc = entry.find('.description').text()    
        c.full_desc = entry.find('.fulldescription p').text()            
        c.speaks = entry.find('.speaks').text()    

        var img = entry.find('.image').attr('style')

       if(img == no_img){
          c.img = white_img
        } else if(img) {
          c.img = img.split("'")[1]
        }

        c.type = "SPEAKER"
        if(c.title) speakers.push(c) 
      })
  
    cb()
    }
  })
}

parse(0, function() {
  console.log('speakers fetched: '+speakers.length)
  fs.writeFile('../data/speakers.json', JSON.stringify(speakers) , 'utf-8');
})
