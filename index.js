/*! pandoc-docx-toc | (C) 2014 Mike Henderson <mvhenderson@tds.net> | License: MIT */
'use strict';

var defaults = {
  template: [
    '<w:sdt>',
    '  <w:sdtPr>',
    '    <w:id w:val="-2085054326"/>',
    '    <w:docPartObj>',
    '      <w:docPartGallery w:val="Table of Contents"/>',
    '      <w:docPartUnique/>',
    '    </w:docPartObj>',
    '  </w:sdtPr>',
    '  <w:sdtEndPr>',
    '    <w:rPr>',
    '      <w:rFonts w:asciiTheme="minorHAnsi" w:eastAsiaTheme="minorHAnsi" w:hAnsiTheme="minorHAnsi" w:cstheme="minorBidi"/>',
    '      <w:b/>',
    '      <w:bCs/>',
    '      <w:noProof/>',
    '      <w:color w:val="auto"/>',
    '      <w:sz w:val="22"/>',
    '      <w:szCs w:val="22"/>',
    '    </w:rPr>',
    '  </w:sdtEndPr>',
    '  <w:sdtContent>',
    '    <w:p w:rsidR="00487AFF" w:rsidRDefault="00487AFF">',
    '      <w:pPr>',
    '        <w:pStyle w:val="TOCHeading"/>',
    '      </w:pPr>',
    '      <w:r>',
    '        <w:t>Table of Contents</w:t>',
    '      </w:r>',
    '    </w:p>',
    '    <w:p w:rsidR="00487AFF" w:rsidRDefault="00487AFF">',
    '      <w:fldSimple w:instr=" TOC \\o &quot;1-3&quot; \\h \\z \\u ">',
    '        <w:r>',
    '          <w:rPr>',
    '            <w:b/>',
    '            <w:bCs/>',
    '            <w:noProof/>',
    '          </w:rPr>',
    '          <w:t>No table of contents entries found.</w:t>',
    '        </w:r>',
    '      </w:fldSimple>',
    '    </w:p>',
    '  </w:sdtContent>',
    '</w:sdt>',
  ].join('')
};

module.exports = function toc(options) {
  var template = options.template || defaults.template;

  var json = '';
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', function (data) {
    json += data;
  });
  process.stdin.on('end', function () {
    var format = (process.argv.length > 2 ? process.argv[2] : '');
    if (format === 'docx') {
      var pandoc = JSON.parse(json);

      var raw = {
        t: 'RawBlock',
        c: [
          'openxml',
          template
        ]
      };

      pandoc[1].unshift(raw);
      json = JSON.stringify(pandoc);
    }  
    process.stdout.write(json);
  });
}

