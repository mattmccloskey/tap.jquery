# tap.jquery
A custom tap event for jQuery + automatic click to tap conversion

#### Package Managers
````
// Bower
bower install --save tap-jquery
````
#### Example
```javascript
$(el).on('tap', function(e){
    // Tapped!
});
 ```

```javascript
$(el).on('click', function(e){
    // if it's a touch device, this will fire on tap instead of click!
});
 ```

If you want you can turn off click to tap conversion
```javascript
// Put this before your tap.jquery.js script
window.convertClicksToTaps = false;
```

Or override tap conversion per event
```javascript
$(el).on('click.notaps', function(e){
    // Fires on click, not on tap
});
```
