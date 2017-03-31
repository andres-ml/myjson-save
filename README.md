# myjson-save

Plugin meant for web pages that allows you to easily save data both locally and remotely to [MyJson](http://myjson.com/)

## Example usage

Add the script to the page
```html
<script src="/path/to/myjson-save/mjs.js"></script>
```


```javascript
// initialize your data object
var data = {foo: [], bar: []};

// listen for mjs load
$(document.body).on('load.mjs', function(evt) {
    // data.foo will contain whichever information was saved in previous session,
    // or its initial value ([]) if it's the first time
    console.log(data.foo)
});

// initialize
$(function() {
    MJS.init(data);
});

...

data.foo.push('hi!');
MJS.save();	// save data. data object is already bound to the plugin, no need to pass it
```

## GUI

![Imgur](http://i.imgur.com/XNRmz4b.png)

This plugin optinally inserts a floating element to the DOM which allows the user to control the saved data, and:
* Link saved data to another instance of another browser (e.g. share with friends) (copy the binId and paste somewhere else)
* Reset the data (by deleting the binId)

## Live demo

You can see the code in action in [steplists](https://github.com/andres-ml/steplists/), one of my projects in github.

## Disclaimer

* Do not use to store any sensitive or important data. This project has not been properly tested and is at most as reliable as [MyJson](http://myjson.com/), which, as a free service, does not guarantee your data won't be lost. Furthermore, anyone who can guess your binId would have access to the saved data.
* Even though multiple instances can link to the same binId, concurrent access is not supported (unless handled outside of this plugin), and consecutive saves from each instance would override the previous ones.