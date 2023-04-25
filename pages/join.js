import * as React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectFormDataState, setFormDataState } from "../store/formDataSlice";
import styles from "../styles/sign-up.module.css";
import { UserContext } from "../magic/UserContext";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const modalStyle = {
  borderRadius: '10px',
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: 'black'
};

export default function Join() {
  // const [formData, updateFormData] = React.useState({});
  const [user, setUser] = React.useContext(UserContext);
  const [handle, setHandle] = React.useState("");
  const [open, openModal] = React.useState(false);
  const [wish, setWish] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [lfg, setLfg] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

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
  const goBack = () => {
    router.push('/')
  }
  const handleClose = () => {
    openModal(false)
    router.push('/committed')
  };
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

  return (
    <div className={styles.main}>
      <div className={styles.joinHeader}>
        <p
          onClick={goBack}
          style={{
            fontFamily: 'DM Sans',
            cursor: "pointer",
            marginLeft: "40px",
            color: 'white',
            fontSize: "32px",
            paddingTop: '20px'
          }}
        >
          poh
        </p>
        <div className={styles.rightHeader}>
          <Link
            sx={{ color: 'white' }}
            underline="none"
            target="_blank"
            rel="noopener"
            href="https://twitter.com/proofofhabit"
          >
          <span style={{ marginRight: '20px', cursor: 'pointer' }} className={styles.contact}>
            Twitter
          </span>
          </Link>
          <span onClick={() => router.push('/committed')} style={{ marginRight: '20px', cursor: 'pointer' }} className={styles.contact1}>
            Cohort 1
          </span>
        </div>
      </div>
      <link href='https://fonts.googleapis.com/css?family=DM Sans' rel='stylesheet'/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You&apos;re in! Now, tell your friends you&apos;ve committed to the #66DaysOfPoH challenge.
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link
              target="_blank"
              rel="noopener"
              href="https://twitter.com/intent/tweet?text=🫡+I+commit+to+the+%2366DaysOfPoH+challenge.+%0a%0a+Wanna+join?+https://proofofhabit.app/%0a%0a+cc+@proofofhabit"

            >
              <button style={{
                marginTop: '10px',
                borderRadius: '22px',
                padding: '12px',
                cursor: 'pointer',
                border: '1px solid grey',
                fontSize: '15px',
                width: '100px'
                }}
                onClick={handleClose}
                className={styles.navButton2}>
                tweet this </button>
            </Link>
          </div>
        </Box>
      </Modal>
      <div className={styles.joinBody}>
        <div className={styles.listItem}>
          <div className={styles.listItemTitle}>Twitter Handle:</div>
          <Input
            sx={{ backgroundColor: 'white' }}
            placeholder="@seemcat"
            variant="standard"
            onChange={(e) => onChange(e, "handle")}
          />
        </div>
        <div className={styles.listItem}>
          <div className={styles.listItemTitle}>
            The person you wish to become¹:
          </div>
          <textarea
            style={{ fontFamily: 'DM Sans', fontSize: '16px'}}
            rows="6"
            cols="30"
            placeholder="the type of person who never misses a workout"
            variant="standard"
            onChange={(e) => onChange(e, "wish")}
          />
        </div>
        <div className={styles.listItem}>
          <div className={styles.listItemTitle}>
            Email
          </div>
          <Input
            sx={{ backgroundColor: 'white'}}
            placeholder="poh@gmail.com"
            variant="standard"
            onChange={(e) => onChange(e, "phone")}
          />
        </div>
        <div
        >
        <button style={{
          borderRadius: '22px',
          padding: '12px',
          cursor: 'pointer',
          border: '1px solid grey',
          fontSize: '15px',
          width: '100px'
          }}
          className={styles.navButton}
          onClick={submit}>
            LFG
          </button>
          </div>
        <div className={styles.note}>
          <div className={styles.dots}>
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
    </div>
  );
}