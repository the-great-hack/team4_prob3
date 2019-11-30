import React, { useRef, useState } from "react";
import { Button, Typography, LinearProgress } from "@material-ui/core";
import { TextFieldFormsy } from "@fuse";
import Formsy from "formsy-react";
import config from "app/config";
import axios from "axios";

function AddTeam(props) {
  const { getTeams } = props;
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
    let payload = {
      ...data,
      city_id: 1
    };
    try {
      await axios
        .post(`${config.baseURL}/api/v1/team/store`, payload)
        .then(response => {
          if (response.data.data) {
            setSubmit(false);
            setSuccessMessage("Your Team has been added");
            getTeams();
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
        <TextFieldFormsy
          className="my-16"
          type="text"
          name="name"
          label="Team Name"
          validations={{
            minLength: 4
          }}
          validationErrors={{
            minLength: "Min character length is 4"
          }}
          variant="outlined"
        />
        <TextFieldFormsy
          className="my-16"
          type="text"
          name="delivery_address"
          label="Delivery Address"
          validations={{
            minLength: 4
          }}
          validationErrors={{
            minLength: "Min character length is 4"
          }}
          variant="outlined"
        />

        {submit && <LinearProgress />}
        {error && (
          <Typography variant="subtitle1" className="mb-16">
            Something went wrong, please try again later!
          </Typography>
        )}
        {successMessage && (
          <Typography variant="subtitle1" className="mb-16">
            Team Added Successfully
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

export default AddTeam;
