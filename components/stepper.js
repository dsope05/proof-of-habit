import * as React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectFormDataState, setFormDataState } from "../store/formDataSlice";
import styles from "../styles/sign-up.module.css";
import { UserContext } from "../magic/UserContext";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
  const [handle, setHandle] = React.useState("");
  const [open, openModal] = React.useState(false);
  const [wish, setWish] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [lfg, setLfg] = React.useState(false);
  const [list, updateList] = React.useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  React.useEffect(() => {
    const callPoH = async () => {
      const res = await fetch("/api/getPoH", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          updateList(res);
        });
    };
    callPoH();
  }, [lfg]);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const joinPoh = () => {
    router.push('/join')
  }

  const onChange = (e, id) => {
    const val = e.target.value;
    if (id === "phone") {
      setPhone(val);
    } else if (id === "wish") {
      setWish(val);
    } else if (id === "handle") {
      setHandle(val);
    }
  };
  const handleClose = () => openModal(false);
  const submit = async () => {
    const res = await fetch("/api/poh", {
      method: "POST",
      body: JSON.stringify({ phone, handle, wish }),
    })
      .then((res) => res.json())
      .then(() => {
        console.log("lfg");
        setLfg(true);
        openModal(true);
      });
  };
  console.log('list', list)

  return (
    <>
      <link href='https://fonts.googleapis.com/css?family=DM Sans' rel='stylesheet'/>
      <h2 className={styles.subtitle}>
        Put in 66 reps for the type of person you wish to become.
      </h2>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>66 Days of Poh</div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You&apos;re in! Now, for your first assignment: tell your friends you have committed to the #66DaysOfPoH challenge.
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link
              target="_blank"
              rel="noopener"
              href="https://twitter.com/intent/tweet?text=🫡+I+commit+to+the+%2366DaysOfPoH+challenge.+%0a%0a+Wanna+join?+https://proofofhabit.app/%0a%0a+cc+@proofofhabit"

            >
              <Button variant="outlined" sx={{ mt: 2 }}>
                tweet this
              </Button>
            </Link>
          </div>
        </Box>
      </Modal>
      <div className={styles.outerSquaresWrapper}>
        <div className={styles.innerSquaresWrapper}>
          <div className={styles.square}>
              <div className={styles.squareTitle}> 1. Commit ✍️ </div>
              <div>
                Commit to the 66 days of PoH challenge. 
                You have until April 24th, 2024 to join.
              </div>
          </div>
          <div className={styles.square}>
            <div className={styles.squareTitle1}> 2. Prime 🤲️ </div>
            <div>
              We&apos;ll be sending you 2 messages every week to prime you for the
              challenge. These messages will teach you how to incorporate The Four
              Laws of Behavior Change by James Clear.
            </div>
            <div className={styles.list}>
              <ul className={styles.darkColor}>
                <li>April 24-May 1: Make it obvious</li>
                <li>May 1-8: Make it attractive</li>
                <li>May 8-15: Make it easy</li>
                <li>May 15-22nd: Make It Satisfying</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.innerSquaresWrapper}>
          <div className={styles.square}>
            <div className={styles.squareTitle1}> 3. Act 👏 </div>
            <br />
            <div style={{ marginBottom: '20px'}}>
              If you complete the assignments during the priming phase, you&apos;ll be
              invited to:
            </div>
            <div>
              1) be one of the first users of PoH.
            </div>
            <div>
              2) participate in the
              #66DaysOfPoH challenge.
            </div>
          </div>
          <div className={styles.square}>
            <div className={styles.squareTitle}> 4. Celebrate 🥳 </div>
            <br />
            Those who put in the reps at least 75% of the 66 days will receive a
            personalized digital collectible that represents their Proof of
            Habit.
          </div>
        </div>
      </div>
      <div className={styles.readytocommit}>
        Ready to commit?
      </div>
      <button style={{
        marginLeft: '39px',
        marginBottom: '100px',
        borderRadius: '22px',
        padding: '12px',
        cursor: 'pointer',
        border: '1px solid grey',
        fontSize: '15px'
        }}
        className={styles.navButton}
        onClick={joinPoh}> Join for Free </button>
    </>
  );
}
