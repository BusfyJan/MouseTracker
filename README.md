# MouseTracker
An useful JavaScript plugin suitable for tracking distance traveled by specific user's mouse on the website

## Usage

### 1. Import MouseTracker plugin to your website

```html
	<script type="text/javascript" src="../dist/mouseTracker.min.js"></script>
```

### 2. Initialize and use plugin

```javascript
	//plugin initialization			
	var mt = MouseTracker({
		//configuration(optional)
		remember_user: true,
		distanceUnits: 'mm', //['mm', 'inch']
		onDistanceChanged: function(distance, gain){
			console.log("onDistanceChanged: " + distance + " - " + gain);
		}
	});	
```

### 3. API methods

```javascript
//get distance traveled
var distanceTraveled = mt.getDistanceTraveled();

//clearing distance traveled
mt.clearDistanceTraveled();
```
