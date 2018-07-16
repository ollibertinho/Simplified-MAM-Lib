const Mam = require("mam.client.js");

function MAMFetchData(iota, root) {
  this.root = root;
  this.iota = iota;
  this.sideKey = null;
  this.mode = "public";
}
// static asynchronosuly method which fetches all data from root stream
// callback is called when message is successfully fetched
MAMLib.fetchMessages = async function(mamdata, callback) {
  if (mamdata instanceof MAMFetchData === false) {
    throw "mamdata must be an instance of MAMFetchData";
  }
  Mam.init(mamdata.iota);
  await Mam.fetch(mamdata.root, mamdata.mode, mamdata.sideKey, data => {
    var parsed = null;
    try {
      parsed = mamdata.iota.utils.fromTrytes(data);
    } catch (err) {
      console.log(err);
      parsed = data;
    } finally {
      callback(parsed);
    }
  });
};

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
        mamState.channel.start = currentMessageCount;
        const message = Mam.create(mamState, iota.utils.toTrytes(data));
        await _publishMessage(message)
          .then((retVal) => 
          {
            if(retVal instanceof Error) {
              callback(retVal, null);
            } else {
              callback(null, message);
            }
          });
      } else {
        if (caching === false || (caching && cachingInitialized === false)) {
          await Mam.fetch(initialRoot, channelMode, sideKeyTrytes)
            .then(messageResponse => {
              console.log(messageResponse);
              currentMessageCount = messageResponse.messages.length;
              const message = Mam.create(mamState, iota.utils.toTrytes(data));
              _publishMessage(message)
                .then((retVal) => 
                {
                  if(retVal instanceof Error) {
                    callback(retVal, null);
                  } else {
                    callback(null, message);
                  }
                });
            })
            .catch(err => {
              callback(err, null);
            });

          if (caching) {
            cachingInitialized = true;
          }
        }
      }
    } catch (err) {
      callback(err, null);
    }
  };

  // publish a new message
  function _publishMessage(message) {
   
    console.log("Root", message.root);
    console.log("Address", message.address);

    // attach the payload
    console.log("Attaching, please wait...");
    return Mam.attach(message.payload, message.address);
  }
}

module.exports = {
  MAMLib: MAMLib,
  MAMFetchData: MAMFetchData
};
