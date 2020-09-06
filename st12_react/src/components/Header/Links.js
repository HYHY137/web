import React from 'react';
import "./Header.scss";
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { Link } from 'react-scroll'

export const Links = function(prop){
    return(
        <div className="navigation_links">
            {
                prop.links.map((link,index) => {
                return(
                    <Link key={index} to={link.ref} activeClass="active" className="test6" spy={true} smooth={true} duration={500}>{link.label}</Link>
                )}
                )
            }
        </div>
    )
     
}