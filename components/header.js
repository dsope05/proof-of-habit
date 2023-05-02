import Link from "@mui/material/Link";
import styles from "../styles/sign-up.module.css";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const goBack = () => {
    router.push('/');
  };
  return (
      <div className={styles.header1}>
        <p
          onClick={goBack}
          style={{
            cursor: "pointer",
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
  );
};

export default Header;