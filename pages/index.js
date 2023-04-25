import { useState, useContext, useEffect } from "react";
import styles from "../styles/sign-up.module.css";
import dynamic from "next/dynamic";
import Welcome from "../components/stepper";
import { useRouter } from "next/router";
import { UserContext } from "../magic/UserContext";
import {
  selectSubscriptionStatusState,
  setSubscriptionStatusState,
} from "../store/subscriptionStatusSlice";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { style } from "@mui/system";
import Link from "@mui/material/Link";

export default function Signup() {
  const [user, setUser] = useContext(UserContext);
  const [openDialog, setOpenDialog] = useState(true);
  const [view, updateView] = useState("loading");
  const router = useRouter();
  const dispatch = useDispatch();
  const { freeTrial, subscription } = useSelector(
    selectSubscriptionStatusState
  );
  useEffect(() => {
    updateView('main')
  },[view])
  /*
  useEffect(() => {
    const asyncCalls = async () => {
      if (user?.email && !subscription && !freeTrial) {
        checkSubscription(user.email).then(({ sub, tri }) => {
          const subscriptionState = {
            subscription: "inactive",
            freeTrial: "inactive",
          };
          if (sub.status === "active") {
            subscriptionState.subscription = "active";
          }
          if (tri.status === "active") {
            subscriptionState.freeTrial = "active";
          } else if (tri.status === "noRecord") {
            subscriptionState.freeTrial = "noRecord";
          }
          dispatch(setSubscriptionStatusState(subscriptionState));
        });
      }
    };
    asyncCalls();
  }, [user]);
  */

  /*
  useEffect(() => {
    const asyncCalls = async () => {
      if (
        subscription === "active" ||
        freeTrial === "active" ||
        freeTrial === "noRecord"
      ) {
        updateView("active");
      } else if (!user || user?.loading || !freeTrial || !subscription) {
        updateView("loading");
      } else if (!user?.issuer) {
        router.push("/login");
      } else {
        updateView("inactive");
        setOpenDialog(true);
      }
    };
    asyncCalls();
  }, [user, subscription, freeTrial]);
  */

  const goBack = () => {
    router.push("/");
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleUpgrade = () => {
    setOpenDialog(false);
    router.push("/");
  };

  const joinPoh = () => {
    router.push("/join");
  };

  const handleClose = () => {
    setOpenDialog(false);
    router.push("/");
  };
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.header}>
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
          <button style={{
            borderRadius: '22px',
            padding: '12px',
            cursor: 'pointer',
            border: '1px solid grey',
            fontSize: '15px'
            }}
            className={styles.navButton}
            onClick={joinPoh}> Join poh </button>
        </div>
      </div>
      {view === "loading" && (
        <>
          <div className={`${styles.main} ${styles.loader}`}>
            <CircularProgress />
          </div>
        </>
      )}
      {view === "main" && (
        <>
          <div className={styles.main}>
            <Welcome />
          </div>
        </>
      )}
      {view === "inactive" && (
        <>
          <div className={styles.main}>
            <Dialog
              open={openDialog}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Sorry, your free trial is over!"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Please upgrade your subscription for unlimited newsletters.
                </DialogContentText>
                <DialogContentText id="alert-dialog-description">
                  <div style={{ marginTop: "20px", marginBottom: "-20px" }}>
                    Thank you for using nujen!
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <a
                  href={process.env.STRIPE_CHECKOUT_URL}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Button onClick={handleUpgrade} autoFocus>
                    Upgrade
                  </Button>
                </a>
              </DialogActions>
            </Dialog>
          </div>
        </>
      )}
    </div>
  );
}
