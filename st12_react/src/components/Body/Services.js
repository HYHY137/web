import React from 'react';
import "./Body.scss";
import {Card} from "./Card";
import banket from "../../images/Media_bankets.png";
import catering from "../../images/Media_catering.png";
import corporat from "../../images/Media_corporat.png";
import delivery from "../../images/Media_delivery.png";

export const Services = function(props){
    const content = {
        title:{ title:"Наши услуги",
                text: "“Клиент – это самый важный посетитель. Не он зависит от нас. Мы зависим от него. Он не прерывает нашу работу. Он – цель нашей работы. Он не по ту сторону нашего бизнеса. Он – его часть.”"
            },
        cards:[
            {img:catering, alt:"catering", title:"Кейтеринг", link:""},
            {img:banket, alt:"banket", title:"Банкеты", link:""},
            {img:corporat, alt:"corporat", title:"Корпоративное питание", link:""},
            {img:delivery, alt:"delivery", title:"Доставка еды на дом", link:""},
        ]
    }
    return(
        <div className="sevices">
            <div className="sevices_title">
                <h1 className="h1_sevices_title">{content.title.title}</h1>
                <p className="text_sevices_title">{content.title.text}</p>
            </div>
            <div className="cards">
                {
                    content.cards.map((card,index) =>{
                        return (
                            <Card key={index} img={card.img} alt={card.alt} title={card.title} link={card.title}/>
                        )
                    })
                }
                
            </div>
            <hr className="line"></hr>
        </div>

            

    )
}