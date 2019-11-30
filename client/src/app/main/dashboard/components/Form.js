import React, { useRef, useState } from "react";
import {
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  Typography,
  LinearProgress
} from "@material-ui/core";
import { TextFieldFormsy, RadioGroupFormsy, SelectFormsy } from "@fuse";
import Formsy from "formsy-react";
import config from "app/config";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "app/store/actions";

function Form(props) {
  const { dispatchGetUserData, showMessage } = props;
  const [isFormValid, setIsFormValid] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState("");

  const formRef = useRef(null);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  async function handleSubmit(model) {
    window.scrollTo(0, 0);
    setSubmit(true);
    setError(false);
    try {
      await axios
        .post(`${config.baseURL}/api/user/update`, model)
        .then(response => {
          if (response.data) {
            setSubmit(false);
            dispatchGetUserData();
            showMessage({
              message: "Your profile information has been submitted"
            });
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
      <Typography className="h2 mb-24">Thank you for Signing Up!</Typography>
      <Typography className="h1">Please Complete the profile</Typography>
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
          name="firstName"
          label="First Name"
          variant="outlined"
          required
        />
        <TextFieldFormsy
          className="my-16"
          type="text"
          name="lastName"
          label="Last Name"
          variant="outlined"
          required
        />
        <TextFieldFormsy
          className="my-16"
          type="text"
          name="phoneNumber"
          label="Phone Number"
          variant="outlined"
        />
        <Typography className="subtitle1">Date of Birth</Typography>
        <TextFieldFormsy
          className="my-16"
          type="date"
          name="dob"
          required
          margin="normal"
          variant="outlined"
        />
        <TextFieldFormsy
          className="my-16"
          type="text"
          name="homeTown"
          label="Home Town"
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
          name="experience"
          label="Fitness Experience"
          required
          variant="outlined"
          multiline
        />

        <RadioGroupFormsy
          className="my-16"
          name="gender"
          label="Gender"
          required
          value=""
        >
          <FormControlLabel
            value="male"
            control={<Radio color="primary" />}
            label="Male"
          />
          <FormControlLabel
            value="female"
            control={<Radio color="primary" />}
            label="Female"
          />
          <FormControlLabel
            value="other"
            control={<Radio color="primary" />}
            label="Other"
          />
        </RadioGroupFormsy>

        <SelectFormsy
          className="my-16"
          name="trainingAreas"
          label="Training Areas?"
          value={["weightLifting"]}
          variant="outlined"
          required
          multiple
        >
          <MenuItem value="weightLifting">Weight Lifting</MenuItem>
          <MenuItem value="hiiTraining">
            High Intensity Interval Training
          </MenuItem>
          <MenuItem value="functionalTraining">Functional Training</MenuItem>
          <MenuItem value="calisthenics">Calisthenics</MenuItem>
          <MenuItem value="running">Running</MenuItem>
          <MenuItem value="yoga">Yoga</MenuItem>
          <MenuItem value="pilates">Pilates</MenuItem>
          <MenuItem value="boxing">Boxing</MenuItem>
          <MenuItem value="bodyWeightExercise">Body Weight Exercises</MenuItem>
          <MenuItem value="walking">Walking</MenuItem>
          <MenuItem value="swimming">Swimming</MenuItem>
          <MenuItem value="sportSpecific">Sport-Specific</MenuItem>
          <MenuItem value="mindfulness">Mindfulness</MenuItem>
          <MenuItem value="martialArts">Martial Arts</MenuItem>
          <MenuItem value="cycling">Cycling</MenuItem>
          <MenuItem value="nutrition">Nutrition</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </SelectFormsy>

        <SelectFormsy
          className="my-16"
          name="trainingStyle"
          label="Training Style"
          value="motivational"
          variant="outlined"
          required
        >
          <MenuItem value="motivational">Motivational</MenuItem>
          <MenuItem value="tactical">Tactical</MenuItem>
          <MenuItem value="collaborative">Collaborative</MenuItem>
          <MenuItem value="supportive">Supportive</MenuItem>
          <MenuItem value="addaptive">Adaptive</MenuItem>
        </SelectFormsy>

        <RadioGroupFormsy
          className="my-16"
          name="comfortWithInjuries"
          label="Are you comfortable working with Freelancers who have previous injuries?"
          required
          value=""
        >
          <FormControlLabel
            value="yes"
            control={<Radio color="primary" />}
            label="Yes"
          />
          <FormControlLabel
            value="no"
            control={<Radio color="primary" />}
            label="No"
          />
        </RadioGroupFormsy>

        <SelectFormsy
          className="my-16"
          type="text"
          name="cheatMeal"
          label="Certifications"
          required
          multiline
          variant="outlined"
          multiple
          value={["none"]}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="NASM">NASM</MenuItem>
          <MenuItem value="ACE">ACE</MenuItem>
          <MenuItem value="FM">FM</MenuItem>
          <MenuItem value="NSCA">NSCA</MenuItem>
          <MenuItem value="ACSM">ACSM</MenuItem>
          <MenuItem value="NESTA">NESTA</MenuItem>
          <MenuItem value="NCCPT">NCCPT</MenuItem>
          <MenuItem value="NCSF">NCSF</MenuItem>
          <MenuItem value="ISSA">ISSA</MenuItem>
          <MenuItem value="AFAA">AFAA</MenuItem>
          <MenuItem value="NFPT">NFPT</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </SelectFormsy>

        <SelectFormsy
          className="my-16"
          name="locations"
          label="Current location"
          value="charlottesville"
          variant="outlined"
          required
        >
          <MenuItem value="charlottesville">Charlottesville</MenuItem>
          <MenuItem value="denver">Denver</MenuItem>
          <MenuItem value="sanDiego">San Diego</MenuItem>
          <MenuItem value="barcelona">Barcelona</MenuItem>
        </SelectFormsy>

        {submit && <LinearProgress />}
        {error && (
          <Typography variant="subtitle1" className="mb-16">
            Something went wrong, please try again later!
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

// export default Form;

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      showMessage: Actions.showMessage,
      hideMessage: Actions.hideMessage
    },
    dispatch
  );
}

export default connect(
  null,
  mapDispatchToProps
)(Form);
