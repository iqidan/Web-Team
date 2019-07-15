const SimpleBig = require('simplebig');
const LanguageBus = require('../index');

const lanBus = new LanguageBus({origin_path: 'zh_cn.json'});

const targets = [
  {
    path:'zh_tw.json',
    transfer: SimpleBig.s2t
  },
  'en.json'
];

lanBus.writeFiles(targets);
// lanBus.writeFiles('franch.json');