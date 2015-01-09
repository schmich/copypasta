// http://www.tamasoft.co.jp/en/general-info/unicode.html
// '0': 48
// 'A': 65
// 'a': 97

function delta(text, delta) {
  return String.fromCharCode(text.charCodeAt(0) + delta);
}

function tr(text, map) {
  return text.toLowerCase().replace(/[a-z]/g, function(match) {
    return map[match.charCodeAt(0) - 97];
  });
}

var copypasta = {
  fullWidth: function(text) {
    return text.replace(/[!-~]/g, function(match) {
      return delta(match, 65248);
    });
  },

  circles: function(text) {
    return text.replace(/[a-z]/g, function(match) {
      return delta(match, 74960 - 97);
    }).replace(/[A-Z]/g, function(match) {
      return delta(match, 74934 - 65);
    });
  },

  parens: function(text) {
    var map = '⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵';
    return tr(text, map);
  },

  curvy: function(text) {
    // Missing: k t z.
    var map = 'ᗩᗷᑕᗪᗴᖴᘜᕼᒑᒍKᒪᗰᑎʘᑭᑫᖇᔕTᑌᐯᗯᚷϓZ';
    return tr(text, map);
  },

  flipCaps: function(text) {
    var map = 'ꓯꓭꓛꓷꓱꓞꓨꓧꓲꓩꓘꓡꓟꓠꓳꓒQꓤꓢꓕꓵꓥꓪꓫꓬꓜ';
    return tr(text, map);
  },

  flip: function(text) {
    var map = 'ɐqɔpǝɟbɥıɾʞןɯuodbɹsʇnʌʍxʎz';
    return tr(text, map).split('').reverse().join('');
  },

  mirror: function(text) {
    // TODO: Option to not reverse.
    var map = 'ɒdɔbɘʇǫʜiႱʞlmnoqpɿƨƚuvwxyz';
    return tr(text, map).split('').reverse().join('');
  },

  ransom: function(text) {
    // TODO
    // I'м ℓαυgнιηg ѕтяαιgнт тσ ∂α вαηк ωιтн тнιѕ! ♪♪♪♪ нαω нαω нαω нααααω, нαω, нαω! ♪♪ 
    return text;
  },

  smallCaps: function(text) {
    // Missing: q x.
    var map = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘqʀsᴛᴜᴠᴡxʏᴢ';
    return tr(text, map);
  },

  superscript: function(text) {
    // TODO; ⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ⁺ ⁻ ⁼ ⁽ ⁾ ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ ₊ ₋ ₌ ₍ ₎ 
    // Missing: q.
    var map = 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ';
    return tr(text, map);
  },

  superscriptCaps: function(text) {
    // Missing: c f q s x y z.
    var map = 'ᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾqᴿˢᵀᵁⱽᵂˣʸᶻ';
    return tr(text, map);
  },
};

var abc = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
console.log(copypasta.parens(abc));

// TODO
// Convert to HTML or straight Unicode characters
// Braille: see http://en.wikipedia.org/wiki/Braille_ASCII
// Descenders/ascenders
// command-line interface
// copy to clipboard
// copypasta --circles "hello, world"
// website
