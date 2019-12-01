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
  const [isFormValid, setIsFormValid] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [cart, setCart] = useState("");

  useEffect(() => {
    axios.get(`${config.baseURL}/api/v1/cart/1/items`).then(res => {
      setCart(res.data);
    });
  }, []);

  const formRef = useRef(null);

  const disableButton = () => {
    setIsFormValid(false);
  };

  const enableButton = () => {
    setIsFormValid(true);
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

  let temp = [
    {
      id: 1,
      label: "something"
    },
    {
      id: 3,
      label: "herer"
    },
    {
      id: 2,
      label: "Asdfs"
    }
  ];
  return (
    <div className="max-w-md min-w-md m-auto">
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
        ref={formRef}
        className="flex flex-col"
      >
        <Typography variant="subtitle" className="mb-16">
          Cart total: {cart.data && cart.data.cart_total} Rs
        </Typography>
        <Typography variant="subtitle" className="mb-16">
          Team Id:
          {cart.data && cart.data.team_id}
        </Typography>
        <SelectFormsy
          className="my-16"
          name="cart"
          label="Edit Items"
          variant="outlined"
          required
          value={[1, 2]}
          multiple
        >
          {cart &&
            temp.map(data => {
              return (
                <MenuItem value={data.id} key={data.id}>
                  {data.label}
                </MenuItem>
              );
            })}
        </SelectFormsy>

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
