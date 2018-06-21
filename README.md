# Simplified-MAM-Lib
Easy-to-use module based on the official IOTA-MAM-Library.

## How to use

### Constructor

```
MAMLib(iota, seed, caching) 
```
* iota **iota** (instance of the IOTA library)
* seed **string** (seed of the channel)
* caching **boolean** (activates message-index-caching)

### Set Channel-Mode 

Sets the channel-mode (public, restricted, private).
Default is public.

```
setChannelMode(mode, restrictedSideKeyTrytes)
```
* mode **string** ('public','restricted', 'private')
* restrictedSideKeyTrytes **string** (optional: side-key)

### Publish Messages

Asynchronous method for publishing messages. 
Callback-function will be called, when message is successfully published.

```
publishMessage(data, callback)
```

* data **string**
* callback **function(data)**

### Fetch Messages

Static method for fetching channel-data. 
Callback-function will be called, once a message is received.


```
fetchMessages(mamdata, callback)
```
* mamdata **MAMFetchData**
* callback **function(data)**


```
function MAMFetchData(iota, root) {
  this.root = root;
  this.iota = iota;
  this.sideKey = null;
  this.mode = "public";
}
```
* iota **iota** (instance of the IOTA library)
* root **string** (root-address of the channel)

## Authors

* **ollibertinho** - *Tangle-Army* - [Tangle.Army](https://tangle.army)
