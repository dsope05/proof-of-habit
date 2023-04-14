import * as React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormDataState,
  setFormDataState,
} from "../store/formDataSlice";
import styles from "../styles/sign-up.module.css";
import { UserContext } from "../magic/UserContext";

const steps = ["About You (The Author)", "About the Newsletter", "For nujen"];

const textInputSxLong = {
  backgroundColor: "white",
  marginBottom: "10px",
  width: "70%",
  minWidth: "300px",
  fontFamily: "Nunito Sans",
};

const textInputSx = {
  backgroundColor: "white",
  marginBottom: "10px",
  width: "30%",
  minWidth: "300px",
  fontFamily: "Nunito Sans",
};

const multiLineTextInputSx = {
  backgroundColor: "white",
  marginBottom: "10px",
  width: "70%",
  minWidth: "300px",
  fontFamily: "Nunito Sans",
};

export default function HorizontalLinearStepper() {
  // const [formData, updateFormData] = React.useState({});
  const [user, setUser] = React.useContext(UserContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const router = useRouter();
  const formDataState = useSelector(selectFormDataState);
  const dispatch = useDispatch();

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onChange = (e) => {
    const newFormData = { ...formDataState, [e.target.id]: e.target.value };
    dispatch(setFormDataState(newFormData));
  };

  return (
    <>
      <div className={styles.title}>Proof Of Habit</div>
      <div className={styles.tagline}>
        <b>
          👋 Welcome to PoH
        </b>
      </div>
      <br />
      <br />
    </>
  );
}
