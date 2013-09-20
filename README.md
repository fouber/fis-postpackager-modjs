# fis-postpackager-modjs

a postpackager plugin for fis to process map.json and create map.js for modjs

## usage

    $ npm install -g fis-postpackager-modjs
    $ vi path/to/project/fis-conf.js

```javascript
//file : path/to/project/fis-conf.js
fis.config.set('modules.postpackager', 'modjs');
//settings
fis.config.set('settings.postpackager.modjs.subpath', 'pack/map.js');
```