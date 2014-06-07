#!/usr/bin/env bash

cd $(dirname "$0")

pandoc --version &> /dev/null \
  || (echo "Pandoc must be installed to run tests" && exit 0)

pandoc -o test.docx -F ../bin/docx-toc.js test.md \
  || (echo "FAIL: table of contents" && exit 1)

open -W test.docx
rm -f *.docx

