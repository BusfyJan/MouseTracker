/**
* MouseDistanceTracker main file
* @author Jan Busfy
*/
(function(){
	
	/**
	* Default values for plugin initialization
	*/ 
	var DEFAULTS = {
		remember_user: false		
	};

	/**
	* API - interface to interact with the plugin
	* Instance of this class is returned to the user
	* @param delegate - delegate for handling user requests
	*/
	function API(delegate){
		//this object
		var _this = this;


		/**
		* Test function for testing purposes
		*/ 
		_this.test = function(){
			console.log("API TEST");
		};
	};

	/**
	* MouseDistanceTracker - main initialization object
	* @param array config - plugin init config
	*/
	function MouseDistanceTracker(config){
		//this object
		var _this = this;	
		
		//default config		
		_this.config = DEFAULTS;

		//managers
		_this.trackingManager = new TrackingManager();
		_this.storageManager = new StorageManager();		


		/**
		* Initialization function
		* @param array config - user filled config
		*/
		_this.init = function(config){	
			//update defaults with user filled config		
			_this.updateConfig(config);			

			//initialize mouse tracking manager
			_this.trackingManager.init();

			//initialize storage manager
			_this.storageManager.init();

			//load storage data if remember_user is true
			if(true === _this.config.remember_user){
				console.log("REMEMBER");
			}			
		};

		/**
		* Updates config with values user has filled
		* @param array config - user filled config
		*/ 
		_this.updateConfig = function(config){
			//replace defaults with filled values from user
			for(var i in config){
				_this.config[i] = config[i];
			}
		}

		_this.init(config);
		return new API();	
	};	

	/**
	* TrackingManager provides support for handling mouse events
	*/
	function TrackingManager(){
		//this object
		var _this = this;

		//utility
		_this.utility = new Utility();

		//last position coordinates of mouse
		_this.lastMousePosition = {x: 0, y: 0};

		/**
		* Initializes tracking events and handler functions
		*/
		_this.init = function(){			
			//bind mouse callbacks
			_this.bindCallbacks();
		};


		/**
		* Binds mouse callbacks
		*/
		_this.bindCallbacks = function(){
			//bind 'mousemove' callback
			document.addEventListener("mousemove", _this.handleMouseMove);
		};

		/**
		* Triggered on 'mousemove' event
		* @param array event - event data
		*/
		_this.handleMouseMove = function(event){			
			var newPosition = {x: event.pageX, y: event.pageY};			
			var distanceTraveled = _this.utility.computeDistance(
				_this.lastMousePosition, newPosition
			);
			console.log(distanceTraveled);
			_this.lastMousePosition = newPosition;			
		};		
	};	

	/**
	* StorageManager provides support for data persistence
	*/
	function StorageManager(){
		//this object
		var _this = this;

		_this.init = function(){
					
		};
	};

	/**
	* Utility provides support for various operations( f.e. distance calculation, ...)
	*/
	function Utility(){
		//this object
		var _this = this;


		/**
		* Computes the distance between two points in 2D area
		* @param array pointX - first point
		* @param array pointY - second point
		* @return float - distance
		*/
		_this.computeDistance = function(pointX, pointY){
			return Math.sqrt(
				Math.pow((pointX.x - pointY.x), 2) + Math.pow(pointX.y - pointY.y, 2)
			);
		};
	};


	//show API to the world
	window.MouseDistanceTracker = MouseDistanceTracker;

})();