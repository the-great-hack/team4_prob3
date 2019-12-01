import React, { useRef, useState } from "react";
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

function CreateCart(props) {
  const { teams } = props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formRef = useRef(null);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

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
    <div className="max-w-sm">
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
        ref={formRef}
        className="flex flex-col"
      >
        <SelectFormsy
          className="my-16"
          name="team_id"
          label="Select Team"
          value={""}
          variant="outlined"
          required
        >
          {teams &&
            teams.data.map(data => {
              return <MenuItem value={data.id}>{data.name}</MenuItem>;
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

export default CreateCart;
