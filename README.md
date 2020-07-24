## ALPS Gutenbreg Plugin

This plugin is designed to support the [ALPS for Wordpress](https://github.com/adventistchurch/alps-wordpress), to provide Gutenberg Blocks with ALPS markup.

---

This project was bootstrapped with [Create Guten Block](https://github.com/ahmadawais/create-guten-block).

Below you will find some information on how to run scripts.

>You can find the most recent version of this guide [here](https://github.com/ahmadawais/create-guten-block).

## 👉  `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

## 👉  `npm run build`
- Use to build production code for your block inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.

## 👉  `npm run eject`
- Use to eject your plugin out of `create-guten-block`.
- Provides all the configurations so you can customize the project as you want.
- It's a one-way street, `eject` and you have to maintain everything yourself.
- You don't normally have to `eject` a project because by ejecting you lose the connection with `create-guten-block` and from there onwards you have to update and maintain all the dependencies on your own.

# i18n
Install the WP-CLI from the official source https://wp-cli.org/

Generate `pot` file with command
```
wp i18n make-pot ./ languages/alps-gutenberg-blocks.pot --domain=alps-gutenberg-blocks
```

Use https://poedit.net/ to edit the language files and create new translations.
Open `alps-gutenberg-blocks.pot` in POEdit, create new translation and save to `languages/alps-gutenberg-blocks-{lang}.po`

Create a json file with locale data
```
wp i18n make-json languages/alps-gutenberg-blocks-{lang}.po --no-purge 
``` 
