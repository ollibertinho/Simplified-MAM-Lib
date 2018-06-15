# Simplified-MAM-Lib
Easy-to-use module based on the official IOTA-MAM-Library.

## How to use

### Constructor

```
MAMLib(iota, seed) 
```
* iota **iota** (instance of the IOTA library)
* seed **string** (seed of the channel)

### Set Channel-Mode 

Sets the channel-mode (public, restricted).
Default is public.

```
setChannelMode(mode, retrictedSideKeyTrytes)
```
* mode **string** ('public','restricted')
* retrictedSideKeyTrytes **string** (optional: side-key)

### Publish Messages

Asynchronous method for publishing messages. Callback-function will be called, when message is published.

```
publishMessage(data, callback)
```

* data **string**
* callback **function(data)**

### Fetch Messages

Asynchronous method for fetching channel-data. Callback-function will be called, when fetching is completed.

```
fetchMessages(callback)
```

* callback **function(data)**

## Authors

* **ollibertinho** - *Tangle-Army* - [Tangle.Army](https://tangle.army)
