import React, { useState, useContext, useEffect } from 'react';
import UserContext from "../../context/UserContext";
import DataContext from "../../context/DataContext";
import Header from "../Menu/Header/Header";
import { useHistory, useParams } from "react-router-dom";
import Axios from 'axios';
import ErrorNotice from '../misc/ErrorNotice';
import Form from '../misc/Form';
import Card from 'react-bootstrap/Card';


export default function EditDish() {
    const { id } = useParams();
    const { data } = useContext(DataContext);
    const { userData } = useContext(UserContext);
    let currentDish = data.dishes.find((dish) => {
        return dish._id === id;
    });
    const [category, setCategory] = useState(currentDish.category);
    const [description, setDescription] = useState(currentDish.description);
    const [name, setName] = useState(currentDish.name);
    const [price, setPrice] = useState(currentDish.price);
    const [image, setImg] = useState(currentDish.image);
    const [error, setError] = useState();
    const history = useHistory();
    const form = {
        formClass: "login_input_fields",
        fields: [
            {
                label: { htmlFor: "add-name", className: "login_label", text: "Name" },
                input: { id: "add-name", placeholder: "Enter new dish name", value: name, className: "register_input", type: "text", onChange: (e) => setName(e.target.value) }
            },
            {
                label: { htmlFor: "add-category", className: "login_label", text: "Category" },
                input: {
                    id: "add-category", dropdown: true, options: [{ value: "salad", text: "Salad" }, { value: "starter", text: "Starter" },
                    { value: "soup", text: "Soup" }, { value: "mainDish", text: "Main Dish" }, { value: "drink", text: "Drink" }, { value: "desert", text: "Desert" },],
                    className: "register_input", value: category, type: "text", onChange: (e) => setCategory(e.target.value)
                }
            },
            {
                label: { htmlFor: "add-price", className: "login_label", text: "Price, $" },
                input: { id: "add-price", placeholder: "Input price", step: "0.01", value: price, className: "register_input", type: "number", onChange: (e) => setPrice(e.target.value) }
            },
            {
                label: { htmlFor: "register-description", className: "login_label", text: "Description" },
                input: { id: "register-description", placeholder: "Input description", value: description, className: "register_input", type: "text", onChange: (e) => setDescription(e.target.value) }
            },
            {
                label: { htmlFor: "register-img", className: "login_label", text: "Image" },
                input: { id: "register-img", placeholder: "Input image", className: "file_input", type: "file", onChange: (e) => setImg(e.target.files[0])}
            }
        ],
        button: { className: "register_button", value: "Save" }
    }




    const config = {
        headers: {
            "x-auth-token": userData.token,
            "Content-Type": 'multipart/form-data'
        }

    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            let newData = new FormData();
            newData.append("id", id);
            if (image !== currentDish.image) {
                newData.append("image", image);
                newData.append("oldImage", currentDish.image)
            }
            newData.append("description", description);
            newData.append("name", name);
            newData.append("price", price);
            newData.append("category", category);

            await Axios.put("http://localhost:5000/dish/" + id, newData, config);
            history.push("/menu/editDish/" + id);
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }
    return (
        <div className="bodyEditDish" >
            <h2 className="login_form_header">Edit dish:</h2>
            <div className="editВish_body">
                <Card className="editDish_example">
                    {
                        image !== currentDish.image ? <Card.Img variant="top" src={URL.createObjectURL(image)} className="cardImg" /> : <Card.Img variant="top" src={"http://localhost:5000/" + image} className="cardImg" />
                    }

                    <Card.Body className="card-body">
                        <Card.Title className="cardTitle">{name}</Card.Title>
                        <Card.Text className="cardDescription">{description}</Card.Text>
                        <div className="cardPrice">
                            <Card.Text className="cardPriceText">Price:</Card.Text>
                            <Card.Text className="cardPriceNumber">{price + ",$"}</Card.Text>
                        </div>
                    </Card.Body>
                </Card>
                <div className="editDish_form">
                    {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
                    <Form onSubmit={submit} formClass={form.formClass} style={{ height: "100%" }} fields={form.fields} button={form.button} />
                </div>

            </div>


        </div>
    )
}