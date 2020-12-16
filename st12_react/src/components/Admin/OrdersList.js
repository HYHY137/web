import React, { useContext, useState, useEffect } from 'react';
import UserContext from "../../context/UserContext";
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import "../../App.scss";
import { useHistory } from "react-router-dom";

export default function EditOrders(props) {
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const onOpenButtonClick = (id) =>{
      history.push("/orderDetails/" + id);
    }
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.069, },
        { field: 'techID', hide: true, flex: 0.00001,},
        
        {
          field: 'time',
          type: 'dateTime',
          headerName: 'Time',
          flex: 0.2,  
        },
        { field: 'description', headerName: 'Desctiption', flex: 0.29,},
        { field: 'email', headerName: 'Email', flex: 0.24, },
        { field: 'total', headerName: 'Total', flex: 0.09,},
        { field: '', headerName: '', flex: 0.11,
          renderCell: (params) => (
            <strong>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick ={()=> onOpenButtonClick(params.getValue('techID'))}
              >
                Open
              </Button>
            </strong>
          ),
        },
        
      ];

      return (
        <div className="ordersList">
          <DataGrid rows={props.rows} columns={columns} pageSize={10} />
        </div>
      );
    }