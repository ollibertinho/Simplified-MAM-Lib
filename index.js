var SimpleMAM = require("./simplified.mam.lib.js");
var IOTA = require('iota.lib.js');

var seed = '9TANGLEARMYROCKS9999999TA9999999999999999TANGLEARMYROCKS9999999999999999999999999';
var root = 'YJ9TMRGVPBWDSUZEHAZMIGIC9XIBRILJYBIGHWZSEPIAQMCOEMMBQQQK9WOATIDYUWNAL9HAEPHODPFQI';

var iota = new IOTA({ provider: 'https://field.carriota.com:443' })
var mam = new SimpleMAM(iota, seed, true);
/*
mam.fetchMessages(function(msg) {
    console.log("Message fetched... ", msg);
})
.then(() => {
    console.log("success");   
}).catch((err) => {
    console.log(err);  
});
*/
mam.publishMessage('tangle-army rocks!', function(err, data) { 
    if (err) {
        console.log(err);
    } else {
        console.log("Message published.");  
    }
});