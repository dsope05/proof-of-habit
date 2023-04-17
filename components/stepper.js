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
      <style>
        @import
        url(&apos;https://fonts.googleapis.com/css2?family=Chivo+Mono:ital,wght@0,100;0,200;0,400;0,500;0,600;0,900;1,100;1,200;1,400;1,500;1,800;1,900&display=swap&apos;);
      </style>
      <div className={styles.title}>#66DaysOfPoH</div>
      <div className={styles.date}>May 22-July 27, 2023</div>
      <div className={styles.subtitle}>
        Put in 66 reps for the type of person you wish to become.
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
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <div
            style={{ marginBottom: "20px", color: '#000' }}
            className={styles.section}
          >
            How it works:
          </div>
          <div style={{ marginBottom: "20px", color: '#000' }}>
            <b className={styles.darkColor}>0. Commit</b> ✍️ <br />
            Commit to the 66 days of PoH challenge by filling out the form
            below. You have until April 24th, 2024 to join.
          </div>
          <div className={styles.darkColor} style={{ marginBottom: "20px" }}>
            <b className={styles.darkColor}>1. Prime</b> 🫡 <br />
            We&apos;ll be sending you 2 emails every week to prime you for the
            challenge. These messages will teach you how to incorporate The Four
            Laws of Behavior Change by James Clear.
            <br />
            <div className={styles.list}>
              <ul className={styles.darkColor}>
                <li>April 24-May 1: Make it obvious</li>
                <li>May 1-8: Make it attractive</li>
                <li>May 8-15: Make it easy</li>
                <li>May 15-22nd: Make It Satisfying</li>
              </ul>
            </div>
          </div>
          <div className={styles.darkColor} style={{ marginBottom: "20px" }}>
            <b>2. Act</b> 👏
            <br />
            If you complete the assignments during the priming phase, you&apos;ll be
            invited to 1) be the first users of PoH, and 2) participate in the
            #66DaysOfPoH challenge.
            <br />
          </div>
          <div className={styles.darkColor} style={{ marginBottom: "20px" }}>
            <b>3. Celebrate</b> 🥳
            <br />
            Those who put in the reps at least 75% of the 66 days will receive a
            personalized digital collectible that represents their Proof of
            Habit.
          </div>
          <div
            style={{
              marginTop: "20px",
              marginBottom: "10px",
              "font-family": "Chivo Mono, monospace",
              "font-style": "italic",
              "font-weight": 800,
            }}
            className={styles.section}
          >
            Ready to commit?
          </div>
          <div>
            <span  className={styles.darkColor} style={{ marginRight: "10px" }}>Twitter Handle:</span>
            <Input
              placeholder="@seemcat"
              variant="standard"
              onChange={(e) => onChange(e, "handle")}
            />
          </div>
          <div>
            <span className={styles.darkColor} style={{ marginRight: "10px" }}>
              The person you wish to become¹:
            </span>
            <br />
            <textarea
              placeholder="the type of person who never misses a workout"
              variant="standard"
              onChange={(e) => onChange(e, "wish")}
            />
          </div>
          <div>
            <span  className={styles.darkColor} style={{ marginRight: "10px" }}>Email</span>
            <Input
              placeholder="poh@gmail.com"
              variant="standard"
              onChange={(e) => onChange(e, "phone")}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              width: "50%",
            }}
          >
            <Button variant="contained" onClick={submit}>
              LFG
            </Button>
          </div>
          <div className={styles.note}>
            <div className={styles.darkColor}>
            - - -
            </div>
            <br />
            <div className={styles.darkColor}>
              ¹ Think about the goal you want to achieve, and then the type of
              person who can achieve this goal.
            </div>
            <br />
            <br />
            <div className={styles.darkColor}>
              E.g. Goal = get a hot bod by summertime. Identity I aspire towards =
              the type of person who never misses a workout.{" "}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "50%",
            paddingLeft: "30px",
            borderLeft: "dashed 1px black",
          }}
        >
          {list.map((poh) => {
            return (
              <div key={poh.handle}>
                <span className={styles.handle}><a href={`https://twitter.com/${poh.handle}`}>{poh.handle}</a></span> <span className={styles.darkColor}> wishes to become </span><span className={styles.wish}>{poh.wish}</span>
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <br />
    </>
  );
}
