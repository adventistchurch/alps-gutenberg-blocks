## ALPS Gutenbreg Plugin

This plugin is created to support the [ALPS for Wordpress](https://github.com/adventistchurch/alps-wordpress),
to provide Gutenberg Blocks with ALPS markup.

---

This project is based on [Create Guten Block](https://github.com/ahmadawais/create-guten-block).

## Local development

### 👉 Init
On first run of the plugin locally you should install required dependencies
```
npm install
composer install
```

Composer could be downloaded from https://getcomposer.org/

### Link to the WP installation
You should link the `build/alps-gutenberg-blocks` into `wp-content/plugins` of the local WP.

```
ln -s path/to/plugin/ path/to/wp/wp-content/plugins/alps-gutenberg-blocks
```

The `alps-gutenbers-blocks` directory should appear in `wp-content/plugins`.

### 👉  `npm run dev`
- Use to compile and run the blocks in development mode.
- Watches for any changes and reports back any errors in your code.

### 👉  `npm run project:build-blocks`
- Use to build production code for your blocks inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.

### 👉  `npm run project:set-version`
- Use to sync the current version in code with `CHANGELOG.md`
- Sets the plugin version in `package.json`, `plugin.php`, commits the changes and creates a related git tag.
- Push result to the GitHub to run the build and release processes.

## i18n
### 👉  `npm run i18n:update-pot`
- Use to generate master file for internationalization.
- Scans the project files for localizable strings and dumps them to the `languages/alps-gutenberg-blocks.pot`
- Open `alps-gutenberg-blocks.pot` with [POEdit](https://poedit.net/) to create new and update existing locale files with string translations.
- Translation files should be named as `languages/alps-gutenberg-blocks-{lang_LANG}.po`
- Set language code in `en_US` format.

### 👉  `npm run i18n:create-json`
- Use to convert `.po` files to `.json`
- Iterates over each `.po` file in `languages` and generates `.json` file with strings.
- `.po` file names should be like `alps-gutenberg-blocks-en_US.po`
- `.json` files are used for js scripts.

## Plugin release
### 👉  `npm run wp:plugin:build`
- Use on Continuous Integration server to create a plugin archive for distribution
- Builds plugin artifacts in `build` directory
- `alps-gutenberg-blocks` directory with plugin files
- `alps-gutenberg-blocks.zip` – plugin distribution archive
- `alps-gutenberg-blocks.json` – plugin metadata for Wordpress updates

### 👉  `npm run wp:plugin:release`
- Use on Continuous Integration server to publish the new version
- Uploads `alps-gutenberg-blocks.zip` and `alps-gutenberg-blocks.json` to CN
- Creates GitHub release for manual installation

## CI Config
Build script uses Environment Variables to get the config

| Var | Description | Example |
|-----|-------------|---------|
|**CDN_HOST**| SSH host | some.server.com |
|**CDN_USER**| SSH user | username |
|**CDN_PRIVATE_KEY**| SSH private key content (multiline) |  |
|**CDN_PRIVATE_KEY_PASS**| SSH private key passphrase |  |
|**CDN_ROOT_PATH**| Path on server for artifacts uploading | /var/www |
