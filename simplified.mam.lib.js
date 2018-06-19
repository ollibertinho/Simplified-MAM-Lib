const Mam = require("mam.client.js");

function MAMLib(iota, seed, caching) {
  this.iota = iota;
  this.seed = seed;

  let channelMode = "public";
  let sideKeyTrytes = null;
  let mamState = Mam.init(iota, seed);

  let currentMessageCount = 0;
  let cachingInitialized = false;

  const initialRoot = Mam.getRoot(mamState);

  mamState = Mam.changeMode(mamState, channelMode, null);

  // Sets the cahnnel-mode
  // 'public', 'restricted', 'private'
  this.setChannelMode = function(mode, restrictedSideKeyTrytes) {
    console.log("set channel-mode", mode);
    channelMode = mode;
    sideKeyTrytes = restrictedSideKeyTrytes;
    mamState = Mam.changeMode(mamState, channelMode, sideKeyTrytes);
  };

  // publishes a message to the stream
  // asynchronously waits for the success message
  this.publishMessage = async function(data, callback) {
    console.log("publish message", data);
    try {
      if (caching && cachingInitialized) {
        currentMessageCount++;
      } else {
        if (caching === false || (caching && cachingInitialized === false)) {

          await Mam.fetch(initialRoot, channelMode, sideKeyTrytes).then((messageResponse) => {
            console.log(messageResponse);
            currentMessageCount = messageResponse.messages.length;
          }).catch((err)=>{
            callback(err, null);
          });
              
          if (caching) {
            cachingInitialized = true;
          }
        }
      }
    } catch(err) {
      callback(err, null);
    }
    mamState.channel.start = currentMessageCount;
    var msg = await _publishMessage(mamState, iota.utils.toTrytes(data))
    .then(() => {
      callback(null, msg);
    })    
    .catch((err) => {
      callback(err, null);
    });    
  };

  // asynchronosuly fetches all data from stream
  // callback is called when message is successfully fetched
  this.fetchMessages = async function(callback) {
    Mam.fetch(initialRoot, channelMode, sideKeyTrytes, data => {
      callback(iota.utils.fromTrytes(data));
    });
  };

  // publish a new message
  function _publishMessage(mamState, trytesMessage) {
    const message = Mam.create(mamState, trytesMessage);

    console.log("Root", message.root);
    console.log("Address", message.address);

    // attach the payload
    console.log("Attaching, please wait...");
    return Mam.attach(message.payload, message.address)
      .then(() => message);
  }
}
module.exports = MAMLib;
