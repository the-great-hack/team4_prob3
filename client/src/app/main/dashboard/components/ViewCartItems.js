import React from "react";
import { Paper, Button } from "@material-ui/core";
import ReactTable from "react-table";
import _ from "@lodash";

function ViewCartItems(props) {
  const { cartItems } = props;

  const columns = [
    {
      Header: "Team Name",
      accessor: "name",
      headerStyle: { whiteSpace: "unset" },
      style: { whiteSpace: "unset" }
    },
    {
      Header: "Address",
      accessor: "delivery_address",
      headerStyle: { whiteSpace: "unset" },
      style: { whiteSpace: "unset" }
    },
    {
      Header: "City Name",
      accessor: "city_name",
      headerStyle: { whiteSpace: "unset" },
      style: { whiteSpace: "unset" }
    },
    {
      Header: "Members Count",
      accessor: "member_count",
      headerStyle: { whiteSpace: "unset" },
      style: { whiteSpace: "unset" }
    },
    {
      Header: "Status",
      headerStyle: { whiteSpace: "unset" },
      style: { whiteSpace: "unset" },
      Cell: cell => (
        <Button color="primary" variant="contained">
          Pending
        </Button>
      )
    },
    {
      Header: "Action",
      headerStyle: { whiteSpace: "unset" },
      style: { whiteSpace: "unset" },
      Cell: cell => (
        <Button color="secondary" variant="contained">
          Place Order
        </Button>
      )
    }
  ];

  const cartsHeaders = [
    {
      Header: "Team Id",
      accessor: "team_name",
      headerStyle: { whiteSpace: "unset" },
      style: { whiteSpace: "unset" }
    },
    {
      Header: "Total",
      accessor: "total",
      headerStyle: { whiteSpace: "unset" },
      style: { whiteSpace: "unset" }
    },
    {
      Header: "Item Name",
      accessor: "item_name",
      headerStyle: { whiteSpace: "unset" },
      style: { whiteSpace: "unset" }
    },
    {
      Header: "Restaurant",
      accessor: "restaurant_name",
      headerStyle: { whiteSpace: "unset" },
      style: { whiteSpace: "unset" }
    },
    {
      Header: "Schedule for",
      accessor: "schedule_for",
      headerStyle: { whiteSpace: "unset" },
      style: { whiteSpace: "unset" }
    }
  ];

  const formatResponse = data => {
    let newCart = data.carts.map(x => x.order_items);
    if (!newCart[0] || !newCart) {
      return [];
    }
    let response = newCart[0].map(item => {
      return {
        ...item,
        team_name: data.name,
        total: parseInt(item.total)
      };
    });
    return response;
  };

  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <ReactTable
        data={cartItems.data}
        columns={columns}
        pages={0}
        showPagination={false}
        SubComponent={row => {
          const nestedTable = formatResponse(row.original);
          const totalPrice = _.sumBy(nestedTable, "total");
          return (
            <div>
              <br />
              <p>Cart total amount: {totalPrice}</p>
              <ReactTable
                data={nestedTable}
                columns={cartsHeaders}
                showPagination={false}
              />
            </div>
          );
        }}
      />
    </Paper>
  );
}

export default ViewCartItems;
