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

function TeamView(props) {
  const { teams, getUpdatedTeams } = props;
  const [open, setDialog] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [teamId, setTeamId] = useState(false);

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

    const payload = {
      ...data,
      team_id: teamId
    };

    try {
      await axios
        .post(`${config.baseURL}/api/v1/team/member/store`, payload)
        .then(response => {
          if (response.data.data) {
            setSubmit(false);
            setSuccessMessage("Member is added");
            getUpdatedTeams();
          } else {
            setSubmit(false);
          }
        });
    } catch (err) {
      setError(true);
    }
    setSubmit(false);
  }

  const setDialogBox = teamId => {
    setTeamId(teamId);
    setDialog(true);
  };

  const handleDialogClose = () => {
    setDialog(false);
  };

  const renderTableForm = teamId => {
    return (
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
          label="User Name"
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
          type="email"
          name="email"
          label="Email"
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
            Member Added Successfully
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
    );
  };

  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <DialogBox
        handleDialogClose={handleDialogClose}
        open={open}
        title={"Add Member"}
      >
        {renderTableForm()}
      </DialogBox>
      <div className="flex items-center justify-between px-16 h-64 border-b-1">
        <Typography className="text-16">Teams</Typography>
      </div>

      <div className="table-responsive">
        <Table className="w-full min-w-full">
          <TableHead>
            <TableRow>
              <TableCell className="whitespace-no-wrap">Name</TableCell>
              <TableCell className="whitespace-no-wrap">Address</TableCell>
              <TableCell className="whitespace-no-wrap">
                Members count
              </TableCell>
              <TableCell className="whitespace-no-wrap">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {teams &&
              teams.data.map((item, index) => (
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
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}

export default TeamView;
