import styles from "../styles/proof.module.css";
import Header from "../components/header";
import Camera from "../components/camera";

export default function Proof () {
  return (
    <div style={{ backgroundColor: 'black'}}>
      <Header />
      <div className={styles.main}>
        <Camera />
      </div>
    </div>
  )
}