var app = angular.module('myApp', []);

app.config(['$httpProvider', function($httpProvider, $routeProvider, $locationProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);


app.controller('AreaCtrl', function ($scope, $http, $q ,$interval) {
	$scope.areas = [];
  	$scope.places = [];
	$scope.markers = [];
	$scope.uniqueLocations =[];
	
	$scope.map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 8,
	  center: {lat: 21.1458, lng: 79.0882},
	  mapTypeId: 'roadmap'
	  /*satellite,hybrid,terrain,roadmap*/
	});
	
	           
										
	$scope.list = function() {
		var defer = $q.defer()  
		var url = 'http://localhost:3000/digital_transformation/users_area';
		$http({
			method: 'GET',
			url: url
		}).then(function successCallback(response) {
			$scope.areas = response.data.areas;
			defer.resolve('data received!')
		}, function errorCallback(response) {
			$scope.areas = [];
			defer.reject('error')
		});

	return defer.promise;
	};
	 
	 
	$interval(function(){      	
		$scope.list().then(function(string) {
			if($scope.areas) {
				var x = {};
				for(var k in $scope.areas){
				  if(x[$scope.areas[k]["location"]] == undefined)
					 x[$scope.areas[k]["location"]] = [];
					 x[$scope.areas[k]["location"]].push($scope.areas[k]["ph_value"])
					 
					$scope.places.push(new google.maps.LatLng( $scope.areas[k].latitude, $scope.areas[k].longitude));
					var latLng = new google.maps.LatLng( $scope.areas[k].latitude, $scope.areas[k].longitude);
					var marker = new google.maps.Marker({position: latLng, map: $scope.map, title: $scope.areas[k].location});
					$scope.markers.push(marker);	
				}
				
				$scope.heatmapObject = new google.maps.visualization.HeatmapLayer({
				data: $scope.places,
				map: $scope.map
				}); 
				
				var redCount=0;
				var greenCount=0;
				var redPer=0;
				var greenPer=0; 				
				var totalRedCount=0;
				var totalGreenCount=0;
				var totalCount=0;
				
				$scope.uniqueLocations=[];
				
				for (var key in x) {				
					 if (x.hasOwnProperty(key)) {
						//console.log(key + " : " + x[key]);					
						for(k=0; k < x[key].length; k++) {
							if(x[key][k] < 7){
								redCount++;
							}else{
								greenCount++;
							}
						}  
						redPer = redCount*100/x[key].length;
						greenPer = greenCount*100/x[key].length;
						
						totalRedCount = totalRedCount+redCount;
						totalGreenCount = totalGreenCount+greenCount;
						totalCount = totalCount+x[key].length;	
										
						$scope.uniqueLocations.push( { "name": key+' ('+x[key].length+')', "redPer":Math.round(redPer),"greenPer":Math.round(greenPer),
													"totalRedCount":Math.round(totalRedCount),"totalGreenCount":Math.round(totalGreenCount),"totalCount":Math.round(totalCount)});	
						
						redCount=0;
						greenCount=0;
						redPer=0;
						greenPer=0;					
					}							
				}			
				
				var redAvgPer = totalRedCount*100/totalCount;
				var greenAvgPer = totalGreenCount*100/totalCount;
				
				if(totalRedCount > totalGreenCount){					
					test(100 - Math.round(redAvgPer));					
				}else{
					test(Math.round(greenAvgPer));			
				}
					
			}			   
		}, function(error) {
		console.error(error)
		});
	},2000);  
	
});

app.filter('unique', function() {
   return function(collection, keyname) {
      var output = [], 
          keys = [];

      angular.forEach(collection, function(item) {
          var key = item[keyname];
          if(keys.indexOf(key) === -1) {
              keys.push(key);
              output.push(item);
          }
      });
      return output;
   };
});
