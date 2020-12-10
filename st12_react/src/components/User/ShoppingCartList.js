import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import "./ShoppingCart.scss";
import UserContext from "../../context/UserContext";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Axios from 'axios';


export default function ShoppingCartList(props) {

    const { userData } = useContext(UserContext);
    const [total, setTotal] = useState(0);
    const [data, setData] = useState(props.data);
    const [description, setDescription] = useState("")

    useEffect(() => {
        setTotal(calculateTotal());
    });
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            maxWidth: 752,
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }));
    const calculateTotal = () => {
        let total = 0;
        data.currentUserDishes.map((dish) => {
            total += dish.quantity * dish.dish_id.price;
        })
        return total.toFixed(2);
    };
    const config = {
        headers: {
            "x-auth-token": userData.token,
        }
    };
    const onDeleteClick = async (id) => {
        try {
            await Axios.delete('http://localhost:5000/shoppingCart/' + id, config);
            setData({
                currentUserDishes: data.currentUserDishes.filter((dish) => dish._id !== id)
            });

            NotificationManager.success('Dish was deleted from you shopping cart', 'Success', 2000);

        } catch {
            NotificationManager.error('Try again', 'Error', 2000);
        }


    };

    const onSubmitClick = async () => {
        try {
            let dishes = [];
            data.currentUserDishes.map((dish, index) => {
                dishes.push({
                    dish: dish.dish_id._id,
                    quantity: dish.quantity
                })
            });
            const order = {
                userID: userData.user.id,
                dishes,
                description,
                totalPrice: total

            }
            await Axios.post('http://localhost:5000/orders/', order, config);
            for (let i=0; i<data.currentUserDishes.length; i++){
                await Axios.delete('http://localhost:5000/shoppingCart/' + data.currentUserDishes[i]._id, config);
            };
            setData({ currentUserDishes: []});
            NotificationManager.success('The order was accepted', 'Success', 2000);

        } catch {
            NotificationManager.error('Try again', 'Error', 2000);
        }

    };

    const classes = useStyles();
    return (
        <Grid item xs={12} md={6} className="shoppingCartList">
            <div className="title">
                <p>Shopping Cart:</p>
            </div>
            <div className={classes.demo}>
                <List >
                    {data.currentUserDishes.map((row, index) => {
                        return (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar alt="Img" src={"http://localhost:5000/" + row.dish_id.image} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={row.dish_id.name}
                                />
                                <ListItemText
                                    primary={row.quantity + 'x' + row.dish_id.price + ',$'}
                                />
                                <ListItemSecondaryAction onClick={() => { onDeleteClick(row._id) }}>
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
            </div>
            <div className="title">
                <p>Total: {total + ',$'}</p>
            </div>
            <div className="addDescription">
                <input id="someid" placeholder="Add some descripton to order" required={false}
                    className="addDescriptionText" type="text" onChange={(e) => setDescription(e.target.value)}>
                </input>
            </div>
            <button className="shoppingCartListButton" onClick={() => onSubmitClick()}>Submit</button>
        </Grid>

    )
}
