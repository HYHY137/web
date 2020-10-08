import React from 'react';
import "./Body.scss";
import {MapY} from "./MapY";

export const Addresses = function(){
    const addresses = [
      {mapCenter:[53.906130, 27.544630], placemark:[53.906130, 27.544630], addressDesc: "г.Минск, ул.Обойная д.12"},
      {mapCenter:[53.916700, 27.558480], placemark:[53.916700, 27.558480], addressDesc: "г.Минск, ул.Машерова д.25"}
    ]
    return (
        <div className="addresses" id="addresses">
          <h1 className="h1_sevices_title">Наши адреса</h1>
          <div className="addresses_cards">
              {
                addresses.map((address,index)=>{
                  return(
                    <MapY key={index} center={address.mapCenter} placemark={address.placemark}
                          addressDesc={address.addressDesc}/>
                  )
                })
              }
          </div>
      </div>
    )
}