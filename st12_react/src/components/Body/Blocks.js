import React from 'react';
import "./Body.scss";
import food1 from "../../images/food1.png";
import team from "../../images/team.png";
import {BlockImg} from "./BlockImg";
import {BlockContent} from "./BlockContent";


export const Blocks = function(props){
    const content = {
        title1: "Сбалансированное меню на каждый день.",
        text1:"Бесконтактная доставка и оплата по QR-коду.",
        title1Class:"h1_block1_content",
        text1Class:"text_block1_content",
        title4:"Мы - команда профессионалов",
        text4:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam harum sequi libero! Porro perspiciatis doloribus reprehenderit magnam culpa nisi aliquam reiciendis laborum, eligendi exercitationem consequatur soluta asperiores provident dolores quisquam.",
        title4Class:"h1_block4_content",
        text4Class:"text_block4_content",
    }
    return(
        <div className="blocks">
            <BlockContent button={true} title={content.title1} text={content.text1} titleClass={content.title1Class} textClass={content.text1Class}/>
            <BlockImg img={food1} />
            <BlockImg img={team} id="aboutUs" />
            <BlockContent button={false} title={content.title4} text={content.text4} titleClass={content.title4Class}  textClass={content.text4Class}/>
        </div>
    )
}