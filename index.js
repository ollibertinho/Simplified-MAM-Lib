var SimpleMAM = require("./simplified.mam.lib.js");
var IOTA = require('iota.lib.js');

var seed = 'YOUR 81 CHARS LONG SEED';
var iota = new IOTA({ provider: 'https://field.carriota.com:443' })
var mam = new SimpleMAM(iota, seed, true);
mam.publishMessage('tangle-army rocks!');
