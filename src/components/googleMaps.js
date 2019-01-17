import React from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
    return (
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{lat: 43.46, lng: 11.8792}}>
            {props.markers.map((marker, i) => {
                return <Marker position={{lat: marker.latitude, lng: marker.longtitude}} key={i}/>
            })}

        </GoogleMap>)
}));

export default MyMapComponent;

