var htmlencode = require('htmlencode').htmlEncode;
var examples = require('./examples').examples;

var Annotated = function () { };

Annotated.addToHead = function (params) {
  return `
  <script type="text/javascript">
    window.annotated = {
      '${params.name}': ${JSON.stringify(examples[params.name])}
    };
  </script>\n`;
};

Annotated.addToBody = function (params) {
  return '<div class="annotated-example" data-id="' + htmlencode(params.name) + '"></div>';
};

Annotated.initialize = function (req, params, handlers, cb) {
  // Initialize the content package
  params.headContent += Annotated.addToHead(params);
  params.bodyContent += Annotated.addToBody(params);

  cb();
};

Annotated.register = function (handlers) {
  handlers.contentPackages['acos-annex-vb'] = Annotated;
  handlers.contentTypes.annotated.installedContentPackages.push(Annotated);
};

Annotated.namespace = 'acos-annex-vb';
Annotated.contentTypeNamespace = 'annotated';
Annotated.packageType = 'content';

Annotated.meta = {
  'name': 'acos-annex-vb',
  'shortDescription': 'webex annotated examples for vb',
  'description': '',
  'author': 'PAWS Lab',
  'license': 'MIT',
  'version': '0.0.1',
  'url': '',
  'teaserContent': Object.keys(examples).slice(0, 5),
  'contents': examples,
};

module.exports = Annotated;
