import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-74.5, 40], 
      zoom: 3 
    });

    //if (listings.length === 0) return;
    //listings.forEach(listing => {
      new mapboxgl.Marker({ color: "#3bb2d0" })
        .setLngLat([-74.5, 40])
        .addTo(mapRef.current);
    });
  //});
  return (
    <div
      style={{ height: '100%' }}
      ref={mapContainerRef}
      className="map-container"
    />
  );
};

export default Map;
