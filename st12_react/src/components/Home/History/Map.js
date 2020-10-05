import React from 'react';
import {GoogleMap, withScriptjs, withGoogleMap} from 'react-google-maps'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>{
        return(
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{lat: 53.916700,lng:27.558480}}>
            </GoogleMap>
        )
        }
    )
)

export const Map = function(){
    const key="AIzaSyAGGDUWPIOEvZcuQacvE_whggnBZKlWqjA"
    return(
        <div className="addr_card">
            <MyMapComponent googleMapURL= {`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`+"&"+key} 
            loadingElement= {<div style={{ height: `100%` }} />}
            containerElement= {<div style={{ height: `100%` }} />}
            mapElement= {<div style={{ height: `100%` }} />}
            />
            
        </div>
    )
}