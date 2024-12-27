import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
  
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 12
    });


    return () => 
        map.remove();

  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ height: '550px', border: 'solid 2px black', borderRadius: "20px", margin:"0", zIndex:"100"}}
    />
  );
};

export default Map;
