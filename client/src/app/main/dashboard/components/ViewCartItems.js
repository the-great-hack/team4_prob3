import React, { useState, useRef } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Icon,
  LinearProgress,
  Button
} from "@material-ui/core";
import DialogBox from "app/main/components/DialogBox";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import axios from "axios";
import config from "app/config";

function ViewCartItems(props) {
  const { teams, getUpdatedTeams, openCartPage } = props;
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    axios.get(`${config.baseURL}/api/v1/cart/team/${teamId}`).then(res => {
      setCartItems(res.data);
    });
  }, []);

  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <div className="flex items-center justify-between px-16 h-64 border-b-1">
        <Typography className="text-16">Teams</Typography>
      </div>

      <div className="table-responsive">
        <Table className="w-full min-w-full">
          <TableHead>
            <TableRow>
              <TableCell className="whitespace-no-wrap">Cart</TableCell>
              <TableCell className="whitespace-no-wrap">Team Id</TableCell>
              <TableCell className="whitespace-no-wrap">Cart total</TableCell>
              <TableCell className="whitespace-no-wrap">Order Items</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cartItems &&
              cartItems.data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-no-wrap">
                    {item.name}
                  </TableCell>

                  <TableCell className="whitespace-no-wrap">
                    {item.delivery_address}
                  </TableCell>
                  <TableCell className="whitespace-no-wrap">
                    {item.member_count}
                  </TableCell>
                  <TableCell className="whitespace-no-wrap px-0">
                    <IconButton
                      onClick={() => setDialogBox(item.id)}
                      style={{ color: "green" }}
                    >
                      <Icon>add</Icon>
                    </IconButton>
                    <IconButton
                      onClick={() => openCartPage(item.id)}
                      style={{ color: "green" }}
                    >
                      <Icon>check</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}

export default ViewCartItems;
