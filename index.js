var SimpleMAM = require("./simplified.mam.lib.js");
var IOTA = require("iota.lib.js");

/*
var root = "9HDASXULRQSZPGIPXXKFSQZCIVMA9XPLDBCWSBAQHUZDDNSPDANJZANOKIXLFUZIXGIDOMNHZBXUOGOSO";
//static function
SimpleMAM.fetchMessages(root, function(msg) {
  console.log("Message fetched... ", msg);
})
  .then(() => {})
  .catch(err => {
    console.log("ERROR:", err.stack);
  });
*/

var seed = "9TANGLEARMYROCKS9999999TANGLEARMY99999999TANGLEARMYROCKS9999999999999999999999999";
var iota = new IOTA({ provider: "https://field.carriota.com:443" });
var mam = new SimpleMAM(iota, seed, true);
mam.publishMessage("tangle-army rocks!", function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("Message published.", data);
  }
});
