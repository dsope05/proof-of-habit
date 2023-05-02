import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from 'react';
import styles from "../styles/proof.module.css";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [captured, setCaptured] = useState(false);
  const [dataUrl, setDataUrl] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(error => {
        console.error('Error accessing the camera:', error);
      });
  }, []);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const canvasDataUrl = canvas.toDataURL('image/jpeg');

    // Toggle visibility of video and canvas
    video.style.display = 'none';
    canvas.style.display = 'block';

    setCaptured(true);
    setDataUrl(canvasDataUrl);
  };

  const retakePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    // Toggle visibility of video and canvas
    video.style.display = 'block';
    canvas.style.display = 'none';

    setCaptured(false);
  };

  const change = (e) => {
    setEmail(e.target.value)
  }

  const submit = async () => {
    console.log('DDD', email)
    if (dataUrl && email) {
      await fetch("/api/submitProof", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dataUrl,
          email,
        })
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('submit res', res)
          router.push('/proof')
        });
    }
  };

  return (
    <div>
      <div className={styles.videoContainer}>
        <video ref={videoRef} className={styles.video} autoPlay playsInline muted></video>
        <canvas ref={canvasRef} className={styles["captured-image"]} style={{ display: 'none' }}></canvas>
      </div>
      <div style={{ marginTop: '10px', marginBottom: '20px'}}>
        {captured ? (
          <Button variant="contained" sx={{ marginTop: '10px', marginBottom: '20px' }} onClick={retakePhoto}>Retake Photo</Button>
        ) : (
          <Button variant="contained" sx={{ marginTop: '10px', marginBottom: '20px' }} onClick={capturePhoto}>Take Photo</Button>
        )}
        <div style={{ marginBottom: '20px'}}>
          EMAIL: <Input sx={{ backgroundColor: 'white'}} style={{ marginLeft: '10px', marginBottom: '30px' }} onChange={change}/>
        </div>
          <Button variant="contained" onClick={submit}>Submit Proof of Habit</Button>
      </div>
    </div>
  );
};

export default Camera;