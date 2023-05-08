import React, { useRef, useEffect, useState } from 'react';
import styles from "../../styles/proof.module.css";
import Header from "../../components/header";
import { useRouter } from "next/router";

const ImageGrid = ({ images }) => {
  images = images.slice(0,3)
  return (
    <div className={styles["image-grid"]}>
      {images.map((image, index) => {
        console.log('imaaa', image)
        const twitter = image.twitter || '';
        let color;
        if(index%3 === 0) {
          color = 'pink'
        } else if (index%2 === 0){
          color = 'blue'
        } else {
          color = 'green'
        }
        console.log('twitter', twitter)
        const handle = twitter[0] === '@' ? twitter : '@' + twitter;
        return (
          <div key={index} className={`${styles['grid-item']} ${styles['grid-item-1']}`}>
            <div className={`${styles.polariod} ${styles[color]}`}>
              <img className={styles.picture} src={image.image} alt={`Random sized image ${index}`} />
              <span style={{ marginLeft: '3px', fontSize: '13px', fontWeight: 'bold', fontStyle: 'italic', color: 'black', marginRight: '5px'}}>
                {handle}
              </span>
              <span style={{ color: 'black', fontStyle: 'italic', fontSize: '12px'}}>
                #{image.rep}
              </span>
            </div>
          </div>
        )})}
    </div>
  );
};

export default function Proof() {
  const router = useRouter();
  console.log('routeroooo', router)
  const handle = router.query.handle;
  const [proofs, updateProofs] = useState([]);
  React.useEffect(() => {
    console.log('routerxx', router.query)
    const queryProofs = async () => {
      const res = await fetch("/api/queryUserProofs", {
        method: "POST",
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          handle,
        })
      })
        .then((res) => res.json())
        .then((res) => {
          updateProofs(res);
        });
    };
    if (handle) {
      queryProofs();
    }
  }, [handle]);

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