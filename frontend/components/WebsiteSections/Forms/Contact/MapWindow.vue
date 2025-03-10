<template>
    


    <div class="slab_container">

        <div class="text_box">
        <h1 class="slab_title">Come Visit Us</h1>
        <!-- <div class="bullet_box">
            <div class="bullet">•</div>
        <h2 class="bullet_title">We inject things into you.</h2>
        </div> -->
        </div>

        <div class="contact_button">Contact</div>

    <!-- <img data-speed="auto" class="slab_img" src="~assets/content/map_1.webp"> -->




    <div data-speed="auto" id="map"  class="map" ></div>



    </div>
    
    
    </template>
    
    <script setup>





    let map;
    
    
    onMounted(() => {
        setTimeout(() => {
        window.initMap = function() {
            const mapOptions = {
        center: { lat: 34.030651, lng: -84.353233 }, // Example coordinates (New York City)
        zoom: 13,
        styles: night,
        disableDefaultUI: true
    };
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
    }
    
      // Load the Google Maps script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDogtbRytue4x1mRI75hw7i8iUL8oNDhJI&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
    }, 10);
    });
    
    
    
    const night =  [
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#242f3e" }],
              },
              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
              },
              {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
              },
            ]
    
    
    </script>
    
    
    
    <style scoped>
    
    .text_box{
        position: absolute;
        z-index:2;
        top:5%;
        left:5%;
    }
    .slab_title{
        font-size:5vw;
        font-weight:900;
        color:#fff;
        z-index:2;
        text-transform: capitalize;
        text-shadow: 0.035em 0.035em 5px rgba(0, 0, 0, 0.45);
    }

    .bullet_title{
        font-size:2vw;
        font-weight:400;
        color:#fff;
        text-shadow: 0.035em 0.035em 5px rgba(0, 0, 0, 0.45);
    }

    .bullet{
        font-size:4.5vw;
        font-weight:400;
        color:#fff;
        margin-top:-2%;
        margin-right:2%;
        text-shadow: 0.035em 0.035em 5px rgba(0, 0, 0, 0.45);
    }

    .bullet_box{
        display:flex;
        align-items:center;
        margin-top:4%;
    }

    .contact_button{
        position: absolute;
        z-index:2;
        bottom:5%;
        right:5%;
        font-size:2vw;
        font-weight:400;
        background-color:#fff;
        border: 1px solid #fff;
        padding: 1% 2%;
        cursor:pointer;
        border-radius:5px;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2); 
        transition: all 0.3s ease-in-out;
    }

    .contact_button:hover{
        background-color:#ffffff21;
        backdrop-filter: blur(5px);
        color:#fff;
        border: 1px solid #fff;
        box-shadow: 0px 8px 18px 0px rgba(0, 0, 0, 0.8); 

    }
    
    
    .slab_container{
      position: relative;
     min-height: 90vh;
     width: 100%;
     overflow: hidden;
     margin-top:20%;
     margin-bottom:10%;
    }
    .slab_img{
      position: absolute;
      bottom: 0;
      width:100%;
      height:100%;
    }
    
    
    .map{
        position: absolute;
      bottom: 0;
    width:100%;
    height:150%;
}

    
    
    @media only screen and (min-width: 0px) and (max-width: 576px) {

    
    }
    
    @media only screen and (min-width: 576px) and (max-width: 768px) {
    

    
    }
    
    @media only screen and (min-width: 768px) and (max-width: 992px) {
    

    
    }
    
    @media only screen and (min-width: 992px) and (max-width: 1200px) {

    
    }
    
    @media only screen and (min-width: 1200px) and (max-width: 1400px) {
    }
    
    @media only screen and (min-width: 1400px) and (max-width: 1600px) {
    }
    
    @media only screen and (min-width: 1600px) and (max-width: 5600px) {
    }
    
    
    
    
    </style>