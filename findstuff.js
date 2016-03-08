var geocoder;
	
	function initialize() {
  // Create the autocomplete object, restricting the search
  // to geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
      { types: ['geocode'] });
  
    geocoder = new google.maps.Geocoder();
}

   function compare(latLngA){
   
         console.log(latLngA);
		 
		 var distances = [];
		 
		 var length = stadiums.length;
		 
		 for(var i = 0; i < length; i++){
		 var latLngB = new google.maps.LatLng(stadiums[i].lat, stadiums[i].lng);
		 
		 var distance = google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB);
         
		 distance = (distance/1000)*0.6214;	
		
		 distance = +(Math.round(distance + "e+2")  + "e-2");
		 
		 distances.push(distance);
		 
		 }
         
		 var min = Math.min.apply(Math, distances);
		 
		 var mindex = distances.indexOf(min);
		 
		 loc = stadiums[mindex].club;
		 stad = stadiums[mindex].stadium;
         html = 'You\'re nearest club is '+ loc +'. They play at '+stad+' which is '+ min + ' miles away.';
         document.getElementById('message').innerHTML = html;
   
   }

   function getLatLng() {
   
   //get value of input
    var place = document.getElementById('autocomplete').value;
    
	//do geocode stuff
	geocoder.geocode( { address: place }, function (results, status){
	
	  if(status == google.maps.GeocoderStatus.OK){
	     
		 var lat = results[0].geometry.location.lat();
		 var lng = results[0].geometry.location.lng();
		 latLngA = new google.maps.LatLng(lat, lng);
         
         compare(latLngA);		 
	   }
	   
	});
	
	
   
   }