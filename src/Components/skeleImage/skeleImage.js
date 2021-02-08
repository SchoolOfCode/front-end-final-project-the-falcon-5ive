import React, { useState } from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export default function SkeleImage({ className, src, alt, width, height }) {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <Skeleton animation="wave" variant="rect" />}

      <img
        width={width}
        height={height}
        className={className}
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        style={{ opacity: loading ? 0 : 1 }}
      />
    </>
  );
}
