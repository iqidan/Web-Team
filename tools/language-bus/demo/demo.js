const SimpleBig = require('simplebig');
const LanguageBus = require('../index');

const lanBus = new LanguageBus({origin_path: './demo/zh_cn.json'});

const targets = [
  {
    path:'./demo/zh_tw.json',
    transfer: SimpleBig.s2t
  },
  './demo/en.json'
];

lanBus.writeFiles(targets);
// lanBus.writeFiles('franch.json');