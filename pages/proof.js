import React, { useRef, useEffect, useState } from 'react';
import styles from "../styles/proof.module.css";
import Header from "../components/header";

const ImageGrid = ({ images }) => {
  return (
    <div className={styles["image-grid"]}>
      {images.map((image, index) => {
        let gridItem;
        if(index%3 === 0 && index > 0) {
          gridItem = 'grid-item-x'
        } else {
          gridItem = 'grid-item-1'
        }
        return (
          <div key={index} className={`${styles['grid-item']} ${styles[gridItem]}`}>
            <img src={image.image} alt={`Random sized image ${index}`} />
          </div>
        )})}
    </div>
  );
};

export default function Proof () {
  const [proofs, updateProofs] = useState([]);
  React.useEffect(() => {
    const queryProofs = async () => {
      const res = await fetch("/api/queryProofs", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((res) => {
          updateProofs(res);
        });
    };
    queryProofs();
  }, []);

  return (
    <div style={{ backgroundColor: 'black'}}>
      <Header />
      <div className={styles.main}>
        <div className={styles.title}>#66DaysofPoH</div>
        <ImageGrid images={proofs}/>
      </div>
    </div>
  )
}