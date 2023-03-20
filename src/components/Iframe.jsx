import React from "react";

const Iframe = ({ source }) => {
  if (!source) {
    return <div>Loading...</div>;
  }

  const src = source;
  return (
    // basic bootstrap classes. you can change with yours.
    <div className="emdeb-responsive">
      <iframe src={src} style={{ height: "450px" }}></iframe>
    </div>
  );
};

export default Iframe;
