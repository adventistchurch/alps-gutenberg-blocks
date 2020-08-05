#!/bin/bash

POT_TMP_FILE=languages/tmp.pot
POT_FILE=languages/alps-gutenberg-blocks.pot
TEXT_DOMAIN=alps-gutenberg-blocks

rm -f $POT_FILE
touch $POT_FILE
touch $POT_TMP_FILE

# Extract messages from PHP files
for file in $(find ./src -iname '*.php'); do
  xgettext \
    --from-code=UTF-8 \
    --keyword=__:1,2c \
    --keyword=_e:1,2c \
    --join-existing \
    --output=$POT_TMP_FILE \
    $file
done

# Extract messages from JS files
for file in $(find ./src -iname '*.js'); do
  xgettext \
    --language=JavaScript \
    --from-code=UTF-8 \
    --keyword=__:1,2c \
    --join-existing \
    --output=$POT_TMP_FILE \
    $file
done

# Replace the Content-Type header with UTF-8 charset. msggrep not work with "charset=CHARSET".
sed -i'.bak' -e 's/charset=CHARSET/charset=UTF-8/g' $POT_TMP_FILE

# Filter the needed text domain in pot file
msggrep \
  --msgctxt \
  --regexp="^${TEXT_DOMAIN}$" \
  --output-file=$POT_FILE \
  $POT_TMP_FILE

rm -f $POT_TMP_FILE

# Remove backup file, created by sed. "-i" is required in macOS version of sed.
rm -f $POT_TMP_FILE.bak
