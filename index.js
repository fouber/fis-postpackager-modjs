/*
 * fis
 * http://fis.baidu.com/
 */

'use strict';

module.exports = function(ret, conf, settings, opt){ //打包后处理
    var map = {
        res : {},
        pkg : {}
    };
    fis.util.map(ret.map.res, function(id, res){
        var r = map.res[id] = {};
        if(res.deps) {
            r.deps = res.deps;
        }
        //有打包的话就不要加url了，以减少map.js的体积
        if(res.pkg) {
            r.pkg = res.pkg;
        } else {
            r.url = res.uri;
        }
        // 是否给map.js添加type属性
        if(settings.useType) {
            r.type = res.type;
        }
    });
    fis.util.map(ret.map.pkg, function(id, res){
        var r = map.pkg[id] = {};
        r.url = res.uri;
        if(res.deps) r.deps = res.deps;
    });
    var code = 'require.resourceMap(' + JSON.stringify(map, null, opt.optimize ? null : 4) + ');';
    //构造map.js配置文件
    var subpath = (settings.subpath || 'pkg/map.js').replace(/^\//, '');
    var file = fis.file(fis.project.getProjectPath(), subpath);
    file.setContent(code);
    ret.pkg[file.subpath] = file;
    var script = '<script src="' + file.getUrl(opt.hash, opt.domain) + '"></script>';
    fis.util.map(ret.src, function(subpath, file){
        if(file.isHtmlLike && file.noMapJs !== false){ //类html文件
            var content = file.getContent();
            content = content.replace(/<\/head>/, script + '\n$&');
            file.setContent(content);
        }
    });
};
