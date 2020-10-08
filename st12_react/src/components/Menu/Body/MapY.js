import React from 'react';
import { YMaps, Map, ZoomControl, FullscreenControl, Placemark } from 'react-yandex-maps';
import "./Body.scss"


export const MapY = function(props){
    return (
        <YMaps>
            <div className="addr_card">
                <Map className="addr_map"
                     defaultState={{
                     center: props.center,
                     zoom: 15,
                     controls: [],
                    }}
                >
                    <ZoomControl options={{ float: 'right' }} />
                    <FullscreenControl />
                    <Placemark
                        modules={['geoObject.addon.balloon']}
                        defaultGeometry= {props.placemark}
                        properties={{
                            balloonContentBody:
                            props.addressDesc,
                        }}
                        />
                </Map>
                <h1 className="h1_add">{props.addressDesc}</h1>
            </div>
        </YMaps>
)
}
