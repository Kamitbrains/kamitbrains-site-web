$(document).ready(function (e) {
    
    $('.tooltip-html').each(function () {
        $this = $(this);        
        $this.tooltipster({
            content: $this.parents('.focus-box').find('p.hide').clone().removeClass('hide'),
            // setting a same value to minWidth and maxWidth will result in a fixed width
            minWidth: 300,
            maxWidth: 300,
            position: 'bottom',
            theme: 'tooltipster-punk',
            interactive: true
        }); 
    });
    
    $('form.contact-form').submit(function (e) {
        e.preventDefault();
        var $self  = $(this);
        var datas = $self.serialize();
        $.post('/sendmail', datas).then(function (response) {
            console.log(response);
            if(response.status){
                swal('Okay...', response.text, 'success');                    
                $self.find(':input').val('');
            }else{
                swal('Oops...', response.text, 'error');
            }
        });
    });
});


/*
* GMAP APP
*/

var map;
function initMap() {
  // The latitude and longitude of your business / place
  var position = [4.0364066, 9.7260303];
  var latLng = new google.maps.LatLng(position[0], position[1]);


  map = new google.maps.Map(document.getElementById('googlemaps'), {
      center: latLng,
      zoom: 16, // initialize zoom level - the max value is 21
      streetViewControl: false, // hide the yellow Street View pegman
      scaleControl: true, // allow users to zoom the Google Map
      mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  // Show the default red marker at the location
  marker = new google.maps.Marker({
      position: latLng,
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP
  });
}



/*
* INSTAGRAM APP
*/

        // Get a specific user, and filter on criteria (a specific hash tag in this case)
        // var feed = new Instafeed({
        //   get: 'user',
        //   userId: [user_id],
        //   accessToken: '[accessToken]',
        //   resolution: 'low_resolution',
        //   filter: function(image) {
        //     return image.tags.indexOf('somehashtag') >= 0;
        //   }
        // });
        // feed.run();

        // Search all of Instagram for a certain hash tag
        var ID_igornathan2337 = 3153023763; //igornathan2337
        var ID_nkaurelien = 4377689011; //igornathan2337

        var feed = new Instafeed({
            get: 'tagged',
            //userId: ID_nkaurelien,
            clientId: '617498aaa5954c3991754404a1abbdcf',
            accessToken: '617498aaa5954c3991754404a1abbdcf',
            tagName: 'kamitbrains',
            resolution: 'low_resolution',
            filter: function(image) {
                console.log('instagram', image);
                
                //return image.tags.indexOf('TAG_NAME') >= 0;
            }
        });
        feed.run();