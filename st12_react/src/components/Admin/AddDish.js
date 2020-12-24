import React, { useState, useContext } from 'react';
import UserContext from "../../context/UserContext";
import DataContext from "../../context/DataContext";
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import ErrorNotice from '../misc/ErrorNotice';
import Form from '../misc/Form';

export default function AddDish() {
    const { userData} = useContext(UserContext);
    const { data } = useContext(DataContext);

    const [category, setCategory] = useState();
    const [description, setDescription] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState(0);
    const [image, setImg] = useState();
    const [error, setError] = useState();

    const history = useHistory();
    const form = {
        formClass: "login_input_fields",
        fields: [
            {
                label: { htmlFor: "add-name", className: "login_label", text: "Name" },
                input: { id: "add-name", placeholder: "Enter new dish name", className: "register_input", type: "text", onChange: (e) => setName(e.target.value) }
            },
            {
                label: { htmlFor: "add-category", className: "login_label", text: "Category" },
                input: { id: "add-category", dropdown: true, options:[{value:"salad", text: "Salad"}, {value:"starter", text: "Starter"}, 
                {value:"soup", text: "Soup"}, {value:"mainDish", text: "Main Dish"}, {value:"drink", text: "Drink"}, {value:"desert", text: "Desert"},],
                className: "register_input", value: category, type: "text", onChange: (e) => setCategory(e.target.value) }
            },
            {
                label: { htmlFor: "add-price", className: "login_label", text: "Price, $" },
                input: { id: "add-price", placeholder: "Input price", step:"0.01", value:0,  className: "register_input", type: "number", onChange: (e) => setPrice(e.target.value) }
            },
            {
                label: { htmlFor: "register-description", className: "login_label", text: "Description" },
                input: { id: "register-description", placeholder: "Input description", className: "register_input", type: "text", onChange: (e) => setDescription(e.target.value) }
            },
            {
                label: { htmlFor: "register-img", className: "login_label", text: "Image" },
                input: { id: "register-img", placeholder: "Input image", className: "file_input", type: "file", onChange: (e) => {setImg(e.target.files[0]); console.log(e.target.files[0])} }
            }
        ],
        button: { className: "register_button", value: "Save" }
    }




    const config = {
        headers:{  "x-auth-token": userData.token,
                    "Content-Type": 'multipart/form-data' 
        }
        
    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            let newData = new FormData();
            newData.append("image", image);
            newData.append("description", description);
            newData.append("name", name);
            newData.append("price", price);
            newData.append("category", category);

            const res = await Axios.post("http://localhost:5000/dish/", newData, config);
            data.dishes.push(res.data);
            history.push("/menu/edit");
            setError();
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    }
    return (
        <div className="register_form" >
            <h2 className="login_form_header">New dish:</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <Form onSubmit={submit}  formClass={form.formClass} fields={form.fields} button={form.button}/>
        </div>
    )
}

