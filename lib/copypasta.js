// http://www.tamasoft.co.jp/en/general-info/unicode.html
// '0': 48
// 'A': 65
// 'a': 97

// TODO
// Convert to HTML or straight Unicode characters
// Numbers
// Zalgo text, descenders/ascenders: http://www.marlborotech.com/Zalgo.html
// command-line interface
// copy to clipboard
// copypasta --circles "hello, world"
// website

function offset(text, delta) {
  return String.fromCharCode(text.charCodeAt(0) + delta);
}

function lowerAlphaMap(text, map) {
  return text.toLowerCase().replace(/[a-z]/g, function(match) {
    return map[match.charCodeAt(0) - 97];
  });
}

function alphaMap(text, lowerMap, upperMap) {
  return text.replace(/[a-z]/g, function(match) {
    return lowerMap[match.charCodeAt(0) - 97];
  }).replace(/[A-Z]/g, function(match) {
    return upperMap[match.charCodeAt(0) - 65];
  });
}

function numMap(text, map) {
  return text.replace(/[0-9]/g, function(match) {
    return map[match.charCodeAt(0) - 48];
  });
}

var copypasta = {
  fullWidth: function(text) {
    return text.replace(/[!-~]/g, function(match) {
      return offset(match, 65248);
    });
  },

  circles: function(text) {
    var lowerMap = "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ";
    var upperMap = "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ";
    var numericMap = "⓪①②③④⑤⑥⑦⑧⑨";
    return numMap(alphaMap(text, lowerMap, upperMap), numericMap);
  },

  parens: function(text) {
    var map = '⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵';
    return lowerAlphaMap(text, map);
  },

  curvy: function(text) {
    // Missing: k t z.
    var map = 'ᗩᗷᑕᗪᗴᖴᘜᕼᒑᒍKᒪᗰᑎʘᑭᑫᖇᔕTᑌᐯᗯᚷϓZ';
    return lowerAlphaMap(text, map);
  },

  flip: function(text) {
    var lowerMap = 'ɐqɔpǝɟbɥıɾʞןɯuodbɹsʇnʌʍxʎz';
    var upperMap = 'ꓯꓭꓛꓷꓱꓞꓨꓧꓲꓩꓘꓡꓟꓠꓳꓒQꓤꓢꓕꓵꓥꓪꓫꓬꓜ';
    return alphaMap(text, lowerMap, upperMap).split('').reverse().join('');
  },

  mirror: function(text) {
    // TODO: Option to not reverse.
    var map = 'ɒdɔbɘʇǫʜiႱʞlmnoqpɿƨƚuvwxyz';
    return lowerAlphaMap(text, map).split('').reverse().join('');
  },

  ransom: function(text) {
    // TODO
    // I'м ℓαυgнιηg ѕтяαιgнт тσ ∂α вαηк ωιтн тнιѕ! ♪♪♪♪ нαω нαω нαω нααααω, нαω, нαω! ♪♪ 
    return text;
  },

  smallCaps: function(text) {
    // Missing: q x.
    var map = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘqʀsᴛᴜᴠᴡxʏᴢ';
    return lowerAlphaMap(text, map);
  },

  subscript: function(text) {
    var map = {
      '0': '₀',
      '1': '₁',
      '2': '₂',
      '3': '₃',
      '4': '₄',
      '5': '₅',
      '6': '₆',
      '7': '₇',
      '8': '₈',
      '9': '₉',
      '+': '₊',
      '-': '₋',
      '=': '₌',
      '(': '₍',
      ')': '₎' 
    };

    return text.replace(/[0-9+\-=()]/g, function(match) {
      return map[match];
    });
  },

  superscript: function(text) {
    // Missing: q.
    var lowerMap = 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ';

    // Missing: c f q s x y z.
    var upperMap = 'ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾqᴿˢᵀᵁⱽᵂˣʸᶻ';

    var numMap = {
      '0': '⁰',
      '1': '¹',
      '2': '²',
      '3': '³',
      '4': '⁴',
      '5': '⁵',
      '6': '⁶',
      '7': '⁷',
      '8': '⁸',
      '9': '⁹',
      '+': '⁺',
      '-': '⁻',
      '=': '⁼',
      '(': '⁽',
      ')': '⁾'
    };

    return alphaMap(text, lowerMap, upperMap).replace(/[0-9+\-=()]/g, function(match) {
      return numMap[match];
    });
  },

  braille: function(text) {
    var order = " A1B'K2L@CIF/MSP\"E3H9O6R^DJG>NTQ,*5<-U8V.%[$+X!&;:4\\0Z7(_?W]#Y)=";
    return text.toUpperCase().replace(/[ -_]/g, function(match) {
      return String.fromCharCode(0x2800 + order.indexOf(match[0]));
    });
  },
};

module.exports = copypasta;
