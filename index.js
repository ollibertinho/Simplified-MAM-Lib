var SimpleMAM = require("./simplified.mam.lib.js");
var IOTA = require("iota.lib.js");

//Exmaple fetching
var root =
  "9HDASXULRQSZPGIPXXKFSQZCIVMA9XPLDBCWSBAQHUZDDNSPDANJZANOKIXLFUZIXGIDOMNHZBXUOGOSO";
var fetchData = new SimpleMAM.MAMFetchData(root);
SimpleMAM.MAMLib.fetchMessages(fetchData, function(msg) {
  console.log("Message fetched... ", msg);
}).catch(err => {
  console.log("ERROR:", err);
});

/*
//Exmpmle publishing
var iota = new IOTA({ provider: "https://field.carriota.com:443" });
var seed =
  "9TANGLEARMYROCKS9999999TANGLEARMY99999999TANGLEARMYROCKS9999999999999999999999999";
var mam = new SimpleMAM.MAMLib(iota, seed, true);

mam.publishMessage("tangle-army rocks!", function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("Message published.", data);
  }
});
*/
