import * as React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormDataState,
  setFormDataState,
} from "../store/formDataSlice";
import styles from "../styles/sign-up.module.css";
import { UserContext } from "../magic/UserContext";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
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
    console.log("LFG");
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

  return (
    <>
      <div className={styles.title}>#66DAYSOFPOH</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You&apos;re in! Now, for your first HW: tell your frens who you aspire to become...
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
            <Link target="_blank" rel="noopener" href="https://twitter.com/compose/tweet">
              <Button variant="outlined" sx={{ mt: 2 }}>
                tweet this
              </Button>
            </Link>
          </div>
        </Box>
      </Modal>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
          <div style={{ marginBottom: "20px", width: "300px" }}>
            Commit to putting in reps for the type of person you wish to become.
          </div>
          <div style={{ marginBottom: "10px", width: "300px" }}>
            How it works:
          </div>
          <div style={{ marginBottom: "10px", width: "300px" }}>1. prime</div>
          <div style={{ marginBottom: "10px", width: "300px" }}>2. act</div>
          <div style={{ marginBottom: "10px", width: "300px" }}>
            2. celebrate
          </div>
          <div style={{ marginBottom: "10px", width: "300px" }}>
            READY TO make a Commit?
          </div>
          <div>
            <span style={{ marginRight: "10px" }}>Twitter Handle:</span>
            <Input
              placeholder="@pitou"
              variant="standard"
              onChange={(e) => onChange(e, "handle")}
            />
          </div>
          <div>
            <span style={{ marginRight: "10px" }}>
              The person you wish to become:
            </span>
            <Input
              placeholder="Be a strong cat"
              variant="standard"
              onChange={(e) => onChange(e, "wish")}
            />
          </div>
          <div>
            <span style={{ marginRight: "10px" }}>phone #</span>
            <Input
              placeholder="555-555-5555"
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
            <Button variant="outlined" onClick={submit}>
              LFG
            </Button>
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
                {poh.handle}: {poh.wish}
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
