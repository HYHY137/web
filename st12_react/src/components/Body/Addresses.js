import React from 'react';
import "./Body.scss";
import {MapY} from "./Map";

export const Addresses = function(){
    const addresses = [
      {mapCenter:[53.906130, 27.544630], placemark:[53.906130, 27.544630], addressDesc: "г.Минск, ул.Обойная д.12"},
      {mapCenter:[53.916700, 27.558480], placemark:[53.916700, 27.558480], addressDesc: "г.Минск, ул.Машерова д.25"}
    ]
    return (
        <div className="addresses">
          <h1 className="h1_sevices_title">Наши адреса</h1>
          <div className="addresses_cards">
              {
                addresses.map((address,index)=>{
                  return(
                    <MapY center={address.mapCenter} placemark={address.placemark}
                          addressDesc={address.addressDesc}/>
                  )
                })
              }
          </div>

        {/* <div className="addresses_cards">
          <div className="addr_card">
            <iframe title="Oboynaya12" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.4432409091546!2d27.54251131599263!3d53.90609914033645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcfeda0fee14f%3A0x844d37ee422b7481!2z0YPQuy4g0J7QsdC-0LnQvdCw0Y8gMTIsINCc0LjQvdGB0Lo!5e0!3m2!1sru!2sby!4v1597851196410!5m2!1sru!2sby" 
            className="addr_map" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
            <h1 className="h1_add">г.Минск, ул.Обойная д.12</h1>
          </div>
          <div className="addr_card">
            <iframe title="Masherova25" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2349.833117828077!2d27.55707771599286!3d53.91694133951841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcf9086968fb9%3A0x65bd39ccb96e82a3!2z0L_RgNC-0YHQvy4g0JzQsNGI0LXRgNC-0LLQsCAyNSwg0JzQuNC90YHQug!5e0!3m2!1sru!2sby!4v1597851148483!5m2!1sru!2sby"
            className="addr_map" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
            <h1 className="h1_add">г.Минск, просп.Машерова д.25</h1>
          </div>
        </div> */}
      </div>
    )
}