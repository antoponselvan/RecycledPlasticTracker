
import { GoogleMap, LoadScript, Marker, MarkerF  } from '@react-google-maps/api';

const containerStyle = {
    width: '1000px',
    height: '600px'
  };

const ReactGoogleMap = ({center, positions}) => {
  return (
    <LoadScript
      googleMapsApiKey=""
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <>
        {
            positions.map((position,idx)=><MarkerF key={idx}
            position={position} label={String(idx+1)}/>)
        }
        <MarkerF
          position={positions[0]} label="1"/>
        </>
      </GoogleMap>
    </LoadScript>
  )
}

export default ReactGoogleMap