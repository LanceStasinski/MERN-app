import React, { CSSProperties, useRef, useEffect } from "react";

import classes from "./Map.module.css";

const Map: React.FC<{
  className?: string;
  style?: CSSProperties;
  center: google.maps.LatLngLiteral;
  zoom: number;
}> = (props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const {center, zoom} = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current as Element, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`${classes["map"]} ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
