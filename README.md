# tap.jquery
A custom tap event for jQuery + automatic click to tap conversion

#### Package Managers
````
//Bower
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
    // if it's a touch device, this will fire on tap too!
});
 ```
