// http://www.tamasoft.co.jp/en/general-info/unicode.html
// '0': 48
// 'A': 65
// 'a': 97

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

var copypasta = {
  fullWidth: function(text) {
    return text.replace(/[!-~]/g, function(match) {
      return offset(match, 65248);
    });
  },

  circles: function(text) {
    return text.replace(/[a-z]/g, function(match) {
      return offset(match, 74960 - 97);
    }).replace(/[A-Z]/g, function(match) {
      return offset(match, 74934 - 65);
    });
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
    // TODO; ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ ₊ ₋ ₌ ₍ ₎ 
    return text;
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
};

var abc = 'a b c d e f g h i j k l m n o p q r s t u v w x y z 0 1 2 3 4 5 6 7 8 9 + - = ( )';
console.log(copypasta.flip(abc));

// TODO
// Convert to HTML or straight Unicode characters
// Braille: see http://en.wikipedia.org/wiki/Braille_ASCII
// Numbers
// Descenders/ascenders
// command-line interface
// copy to clipboard
// copypasta --circles "hello, world"
// website
