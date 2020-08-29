import React from 'react'
import './Header.scss';

export const Links = function(prop){
    const links = prop.links.map((link,index) => 
        <a className="header_link" key={index} href={link.href}>{link.label}</a>
    );
    return(
        <div className="navigation_links">
            {links}
        </div>
    )
     
}