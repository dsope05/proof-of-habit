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

export default function Committed() {
  const [user, setUser] = React.useContext(UserContext);
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
  }, []);

  const goBack = () => {
    router.push('/')
  }
  console.log('list', list)

  return (
    <div style={{ backgroundColor: 'black', paddingBottom: '40px' }}>
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
          <button style={{
            borderRadius: '22px',
            padding: '12px',
            cursor: 'pointer',
            border: '1px solid grey',
            fontSize: '15px'
            }}
            className={styles.navButton}
            onClick={() => router.push('/join')}> Join poh </button>
        </div>
        </div>
      <link href='https://fonts.googleapis.com/css?family=DM Sans' rel='stylesheet'/>
      <div className={styles.committedTitle}>
        Welcome to your cohort.
      </div>
      <div className={styles.committed}>
        {list.map((poh) => {
              return (
                <div className={styles.wishesWrapper} key={poh.handle}>
                  <a className={styles.handle} href={`https://twitter.com/${poh.handle}`}>
                    {poh.handle}
                  </a>
                  <span className={styles.listWish}> 
                    wishes to become 
                  </span>
                  <span className={styles.wish}>
                    {poh.wish}
                  </span>
                </div>
              );
            })}
      </div>
    </div>
  </div>
  );
}