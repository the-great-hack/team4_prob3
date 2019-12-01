import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Typography,
  LinearProgress,
  MenuItem
} from "@material-ui/core";
import { SelectFormsy } from "@fuse";
import Formsy from "formsy-react";
import config from "app/config";
import axios from "axios";

function EditCart(props) {
  const { teams, carts, teamId } = props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [cart, setCart] = useState("");
  const [isRestaurantSelected, setIsRestaurantSelected] = useState("");
  const [restaurants, setRestaurant] = useState(0);

  useEffect(() => {
    axios.get(`${config.baseURL}/api/v1/cart/team/${teamId}`).then(res => {
      setCart(res.data);
    });
    axios.get(`${config.baseURL}/api/v1/restaurant`).then(res => {
      setRestaurant(res.data);
    });
  }, []);

  const formRef = useRef(null);

  const disableButton = () => {
    setIsFormValid(false);
  };

  const enableButton = () => {
    setIsFormValid(true);
  };

  const selectRestaurant = async value => {
    await axios
      .get(`${config.baseURL}/api/v1/menu/restaurant/${value}`)
      .then(res => {
        setIsRestaurantSelected(res.data);
      });
  };

  async function handleSubmit(data) {
    setSubmit(true);
    setError(false);
    setSuccessMessage(false);
    try {
      await axios
        .post(`${config.baseURL}/api/v1/cart/create`, data)
        .then(response => {
          if (response.data.data) {
            setSubmit(false);
            setSuccessMessage("Cart Created");
          } else {
            setSubmit(false);
          }
        });
    } catch (err) {
      setError(true);
    }
    setSubmit(false);
  }

  return (
    <div className="max-w-md min-w-md m-auto">
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
        ref={formRef}
        className="flex flex-col"
      >
        <SelectFormsy
          className="my-16"
          name="cart"
          label="Select Cart"
          variant="outlined"
          required
        >
          {cart &&
            cart.data.map(data => {
              return (
                <MenuItem value={data.id} key={data.id}>
                  {data.id}
                </MenuItem>
              );
            })}
        </SelectFormsy>

        <SelectFormsy
          className="my-16"
          name="restaurants"
          label="Select Restaurant"
          variant="outlined"
          onChange={e => selectRestaurant(e.target.value)}
          required
        >
          {restaurants &&
            restaurants.data.map(data => {
              return (
                <MenuItem value={data.id} key={data.id}>
                  {data.name}
                </MenuItem>
              );
            })}
        </SelectFormsy>

        {isRestaurantSelected && (
          <SelectFormsy
            className="my-16"
            name="restaurants"
            label="Select Menu"
            variant="outlined"
            required
          >
            {isRestaurantSelected &&
              isRestaurantSelected.data.map(data => {
                return (
                  <MenuItem value={data.id} key={data.id}>
                    {data.name}
                  </MenuItem>
                );
              })}
          </SelectFormsy>
        )}

        {submit && <LinearProgress />}
        {error && (
          <Typography variant="subtitle1" className="mb-16">
            Something went wrong, please try again later!
          </Typography>
        )}
        {successMessage && (
          <Typography variant="subtitle1" className="mb-16">
            {successMessage}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mx-auto my-16"
          aria-label="LOG IN"
          disabled={!isFormValid}
        >
          Submit
        </Button>
      </Formsy>
    </div>
  );
}

export default EditCart;
