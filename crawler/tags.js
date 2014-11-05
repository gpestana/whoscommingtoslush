var fs = require('fs')

var tags = []

var comp = {}
var speak = {}
var inv = {}

comp.tag = "#companies"
speak.tag = "#speakers"
inv.tag = "#investors"

tags.push(comp)
tags.push(speak)
tags.push(inv)

fs.writeFile('../data/tags.json', JSON.stringify(tags), 'utf-8')

