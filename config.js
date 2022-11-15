const srcPath = 'src';
const buildPath = 'web';

module.exports = function() {
  return  {
    paths: {
      src: {
        root: srcPath,
        html: srcPath,
        scss: `${srcPath}/scss`,
        images: `${srcPath}/img`,
        js: `${srcPath}/js`
      },
      build: {
        root: buildPath,
        html: buildPath,
        css: `${buildPath}/css`,
        images: `${buildPath}/img`,
        js: `${buildPath}/js`
      }
    }
  }
}
