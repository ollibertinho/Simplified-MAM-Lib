const IOTA = require('iota.lib.js');
const Mam = require('mam.client.js');

function MAMLib(iota, seed) {
  
    this.iota = iota;
    this.seed = seed;
    let channelMode = "public";
    let sideKeyTrytes = null;

    let mamState = Mam.init(iota, seed);
    const initialRoot = Mam.getRoot(mamState);
    
    mamState = Mam.changeMode(mamState, channelMode, null);
    
    this.setChannelMode = function (mode, retrictedSideKeyTrytes) {
        console.log("Set channel-mode", mode);
        channelMode = mode;
        sideKeyTrytes = retrictedSideKeyTrytes;
        mamState = Mam.changeMode(mamState, mode, retrictedSideKeyTrytes);      
    }

    this.publishMessage = async function (data, callback) { 
        console.log("publish message",data);
        var messageResponse = await _fetchMessages(Mam.getRoot(mamState));
        mamState.channel.start = messageResponse.messages.length;
        var msg = await _publishMessage(mamState, iota.utils.toTrytes(data));
        callback(msg);
    }

    this.fetchMessages = async function(callback) {
        var messageResponse = await _fetchMessages(Mam.getRoot(mamState));
        callback(messageResponse);
    }

    // Publish a new message
    function _publishMessage(mamState, trytesMessage) {
        const message = Mam.create(mamState, trytesMessage);

        console.log("Root", message.root)
        console.log("Address", message.address)

        // Attach the payload
        console.log("Attaching, please wait...")
        return Mam.attach(message.payload, message.address)
            .then(() => message);
    }

    // Fetch message beginning at the specific root.
    function _fetchMessages(messageRoot) {
        console.log("Fetching Messages from Root", messageRoot);

        return Mam.fetch(messageRoot, channelMode, sideKeyTrytes)
            .then(response => {
                response.messages.forEach(messageTrytes => 
                {
                    console.log("Fetched Message", iota.utils.fromTrytes(messageTrytes));
                });
                console.log("Next Root", response.nextRoot);
                return response;
        });  
    }
}
module.exports = MAMLib;