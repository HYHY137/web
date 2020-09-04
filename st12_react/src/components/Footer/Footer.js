import React from 'react';
import "./Footer.scss";
import telegram from "../../images/telegram.png";
import instagram from "../../images/instagram.png";
import email from "../../images/email.png";
import telephone from "../../images/phone.png";
import logo from "../../images/logo.png";

export const Footer = function(props){
    const content = {
        links:[
            {href:"", text:"Главная"},
            {href:"", text:"О нас"},
            {href:"", text:"Услуги"},
            {href:"", text:"Отзывы"},
        ],
        socials:[
            {href:"https://t.me/m_loika", src: telegram, alt:"telegram"},
            {href:"https://www.instagram.com/stolovaya12/", src: instagram, alt:"instagram"},
            {href:"mailto:max.loiko@mail.ru", src: email, alt:"email"},
            {href:"tel:375-29-444-44-44", src: telephone, alt:"telephone"},
        ]
    }
    return(
        <div className="footer">
            <div className="footer_links">
            {
                content.links.map((link,index) =>{
                    if (index===1){
                        return ([
                            <a key={index} className="footer_link" href={link.href}>{link.text}</a>,
                            <img key={index + Math.random()} src={logo} className="footer_logo" alt="logo"></img>
                        ]);
                    }
                    else{
                        return(
                        <a key={index} className="footer_link" href={link.href}>{link.text}</a>
                    )}
                    })
            }
            </div>
            <hr className="line"></hr>
            <div className="footer_social">
                {
                    content.socials.map((social,index)=>{
                        return(
                            <a key={index} href={social.href} className="social_link">
                                <img alt={social.alt} src={social.src}
                                className="social_icon"></img>
                            </a>
                        )
                    }
                    )
                }
            </div>
        </div>  
    )
}