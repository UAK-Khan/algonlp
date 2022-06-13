import React from 'react';

type PropTypes = {
  visible?: boolean,
}

const MapComp = ({visible}: PropTypes) => {
  return (
    <div style={{visibility: !visible ? "hidden" : "visible"}}>
      <iframe
        title="Map"
        style={{border: 0, width: '100%', height: '270px'}}
        src="https://maps.google.com/maps?q=sukkur&t=&z=13&ie=UTF8&iwloc=&output=embed"
        frameBorder="0"
        allowFullScreen/>
    </div>
  );
};

MapComp.defaultProps = {
  visible: true,
}
export default MapComp;
