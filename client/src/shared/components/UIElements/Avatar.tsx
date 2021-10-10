import React from "react";

import classes from "./Avatar.module.css";

const Avatar: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  image: string;
  alt: string;
  width?: number;
}> = (props) => {
  return (
    <div className={`${classes.avatar} ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
