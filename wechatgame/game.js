"use strict";
var g_gameVersion = '1.0.0'

//引入天幕SDK，无需接入天幕的项目请注释以下TMSDK注释块包围下的代码
//---------TMSDK----------
if (typeof wx !== 'undefined') {
  require("./tmsdk/tm_sdk.min")

  wx.tmSDK.init({
    hideRequestLog: false,
    appVersion: g_gameVersion
  })
}

const data = wx.getSystemInfoSync();
if (data.platform != 'ios' && data.platform != "devtools") {
    wx.__first__canvas = wx.createCanvas();
    const first_scene = require("./first-screen.js");
    let path = 'assets/start-scene/native/b5' + '/b5b263e8-f0c7-4c27-bab0-bd581c0a82bd.png'
    first_scene.drawImg(path);
}

require('adapter-min.js');

__globalAdapter.init();

requirePlugin('cocos');

__globalAdapter.adaptEngine();

require('./ccRequire');

require('./src/settings'); // Introduce Cocos Service here


require('./main'); // TODO: move to common
// Adjust devicePixelRatio


cc.view._maxPixelRatio = 4;

if (cc.sys.platform !== cc.sys.WECHAT_GAME_SUB) {
  // Release Image objects after uploaded gl texture
  cc.macro.CLEANUP_IMAGE_CACHE = true;
}

window.boot();