

// var fs = require('fs');
// var path = require('path');
// var loaderUtils = require("loader-utils");
module.exports = function(fileContent) {
	if(/module\.exports\s?=/.test(fileContent)) {
		fileContent = fileContent.replace(/module\.exports\s?=\s?/, '');
	}
	else fileContent = JSON.stringify(fileContent);
	fileContent = HandleHtml(fileContent, "");
	fileContent = Handleimg(fileContent, "");
    //debugger
	return "module.exports = "+fileContent
};

function HandleHtml(fileContent) {
	return fileContent.replace(/@html\(\\?[\'\"][^\'\"]+\\?[\'\"]\);?/g, function(str){
		var childFileSrc = str.replace(/[\\\'\"\>\(\);]/g, '').replace('@html', '');
		return "\"+require("+JSON.stringify("html-loader!"+childFileSrc)+")+\""; //这样可以处理 导入的HTML 里面还有导入HTML
	});
}
function Handleimg(fileContent) {
	return fileContent.replace(/@img\(\\?[\'\"][^\'\"]+\\?[\'\"]\);?/g, function(str){
		var childFileSrc = str.replace(/[\\\'\"\>\(\);]/g, '').replace('@img', '');
		return "\"+JSON.stringify(require("+JSON.stringify(childFileSrc)+"))+\""; //这是图片 我处理处理不了 转换城HTML 给别人处理
	});
}

