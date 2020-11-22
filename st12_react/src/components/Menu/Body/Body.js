import React, { useContext, useState } from 'react';
import { Links } from "../../Home/Header/Links";
import "./MenuBody.scss";
import DataContext from "../../../context/DataContext";
import UserContext from "../../../context/UserContext";
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import Card from 'react-bootstrap/Card';
import CounterInput from "react-counter-input";
import { InputNumber, InputGroup } from 'rsuite';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function Body() {
    const links = [
        { ref: "container", label: "Салаты" },
        { ref: "services", label: "Закуски" },
        { ref: "aboutUs", label: "Супы" },
        { ref: "services", label: "Второе" },
        { ref: "services", label: "Напитки" },
        { ref: "addresses", label: "Десерты" },
    ];

    const { data, setData } = useContext(DataContext);
    const { userData, setUserData } = useContext(UserContext);



    const salads = data.dishes.filter((dish) => {
        return dish.category === "salad";
    });
    const starters = data.dishes.filter((dish) => {
        return dish.category === "starter";
    });
    const soups = data.dishes.filter((dish) => {
        return dish.category === "soup";
    });
    const mainDishes = data.dishes.filter((dish) => {
        return dish.category === "mainDish";
    });
    const drinks = data.dishes.filter((dish) => {
        return dish.category === "drink";
    });
    const deserts = data.dishes.filter((dish) => {
        return dish.category === "desert";
    });
    const sections = [
        {object: salads, label:"Салаты"},
        {object: starters, label:"Закуски"},
        {object: soups, label:"Супы"},
        {object: mainDishes, label:"Второе"},
        {object: drinks, label:"Напитки"},
        {object: deserts, label:"Десерты"},
    ];
    const getCount = (index) =>{
        const div = document.getElementById("card" + index);
        let count = div.getElementsByTagName('input')[0].value;
        return count;
    };
    const onCountChange = (index, price)  =>{
        const count = getCount(index);
        const div = document.getElementById("card" + index);
        div.querySelector(".cardPriceNumber").innerHTML = count * price + ',$';
    }
    const onAddToCartClick = async (dishID, index) =>{
        try{
        const config = {
            headers:{ "x-auth-token": userData.token, 
            } 
        };
        const newEntry = {
            userID: userData.user.id,
            count: getCount(index),
            dishID: dishID,
        };
       
        const res = await Axios.post("http://localhost:5000/shoppingCart/", newEntry, config);
       

            NotificationManager.success('Dish was added to you shopping cart', 'Success', 3000);
        } catch{
            NotificationManager.error('Try again', 'Error', 3000);
        }
    }

    return (
        <div>
            <hr className="menu_links_line"></hr>
            <Links links={links} className="menu_navigation_links" />
            <hr className="menu_links_line"></hr>
            {
                sections.map((section, sectionIndex) => {
                    return (
                        <div >
                            <h2 className="menu_section_header">{section.label}:</h2>
                            <div className="menu_section">
                                {
                                    section.object.map((dish, index) => {
                                        return (
                                            <Card className="menu_card" id={"card" + index}>
                                                <Card.Body className="menu_card_body">
                                                    <div className="menuCardImg">
                                                        <Card.Img variant="top" src={"http://localhost:5000/" + dish.image} className="menuCardImg" />
                                                    </div>
                                                    <Card.Title className="cardTitle">{dish.name}</Card.Title>
                                                    <Card.Text className="cardDescription">{dish.description}</Card.Text>
                                                    <div className="menuCardPrice">
                                                        <Card.Text className="cardPriceText">Price:</Card.Text>
                                                        <Card.Text className="cardPriceNumber">{dish.price + ",$"}</Card.Text>
                                                    </div>
                                                    <div className="addToCart" >
                                                        <div className="addToCartSection">
                                                            <CounterInput
                                                                wrapperStyle={{
                                                                    width: "100%",
                                                                    height: "100%"
                                                                }}
                                                                btnStyle={{
                                                                    display: "inline-flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    padding: "0",
                                                                    textAlign: "center",
                                                                    height: "100%",
                                                                    width: "25%",
                                                                    userSelect: "none",
                                                                    backgroundColor: "#ffffff",
                                                                    border: "0.1em solid #F7941E",
                                                                    borderRadius: "10%",

                                                                }}
                                                                inputStyle={{ width: "50%" }}
                                                                count={1}
                                                                onCountChange={() => onCountChange(index, dish.price)}
                                                                min={0}
                                                                max={1000}
                                                            />

                                                        </div>
                                                        <div className="addToCartSection">
                                                            <button className="addToCartButton" onClick={() => onAddToCartClick(dish._id, index)}>Add to card</button>
                                                              
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        );
                                    })
                                }
                            </div>

    
                        </div>
                        
                    )
                })
            }
         <NotificationContainer/> 
        </div>
    )
}
