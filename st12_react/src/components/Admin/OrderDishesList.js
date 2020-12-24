import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import UserContext from "../../context/UserContext";
import { NotificationManager } from 'react-notifications';
import Axios from 'axios';


export default function ShoppingCartList(props) {

    const { userData } = useContext(UserContext);
    const [data, setData] = useState(props.data);

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

    const config = {
        headers: {
            "x-auth-token": userData.token,
        }
    };

    const onSubmitClick = async () => {
        try {
            await Axios.delete('http://localhost:5000/orders/' + data.id, config);
            setData({ dishes: []});
            NotificationManager.success('The order was accepted', 'Success', 2000);

        } catch {
            NotificationManager.error('Try again', 'Error', 2000);
        }

    };

    const classes = useStyles();
    return (
        <Grid item xs={12} md={6} className="shoppingCartList">
            <div className="title">
                <p>Order:</p>
            </div>
            <div className={classes.demo}>
                <List >
                    {data.dishes.map((row, index) => {
                        return (
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar alt="Img" src={"http://localhost:5000/" + row.dish.image} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={row.dish.name}
                                />
                                <ListItemText
                                    primary={row.quantity + 'x' + row.dish.price + ',$'}
                                />
                            </ListItem>
                        )
                    })}
                </List>
            </div>
            <div className="title">
                <p>Total: {data.total + ',$'}</p>
            </div>
            <div className="orderdDetailsFields">
                <p>Description to order: {data.description}</p>
            </div>
            <div className="orderdDetailsFields">
                <p>User phone number: {data.phoneNumber}</p>
            </div>
            <button className="shoppingCartListButton" onClick={() => onSubmitClick()}>Accept</button>
        </Grid>

    )
}
