#!/usr/bin/env node

var copypasta = require('../lib/copypasta');

var opts = require('nomnom')
  .options({
    text: {
      position: 0,
      help: 'The text to transform.',
      required: true
    },
    'full-width': {
      flag: true
    },
    circles: {
      flag: true
    },
    parens: {
      flag: true
    },
    curvy: {
      flag: true
    },
    flip: {
      flag: true
    },
    mirror: {
      flag: true
    },
    /*ransom: {
      flag: true
    },*/
    'small-caps': {
      flag: true
    },
    subscript: {
      flag: true
    },
    superscript: {
      flag: true
    },
    braille: {
      flag: true
    }
  }).parse();

function flagName(method) {
  return method.replace(/[A-Z]/g, function(match) {
    return '-' + match[0].toLowerCase();
  });
}

for (var method in copypasta) {
  var flag = flagName(method);
  if (opts[flag]) {
    var xform = copypasta[method];
    var text = xform(opts.text.toString());
    console.log(text);
    break;
  }
}
