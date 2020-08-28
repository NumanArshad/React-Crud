import React from "react"
import Webcam from "react-webcam";
import ImageCropper from "./Imagecrop"

import { Grid } from '@material-ui/core';
const WebCam = () => {
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <div>

      <Grid container direction="column" justify="center" alignItems="center" spacing={2} style={{ marginTop: "30px" }} >

        <Grid item col={12} >
          <h2>Webcamera</h2>
        </Grid>
        <Grid item col={12} className="webcame">
          <Webcam
          
            audio={false}
            ref={webcamRef}
            height={'100%'}
            width={'100%'}
            screenshotFormat="image/jpeg"
          />
        </Grid>
        <Grid item>
          <button onClick={capture}>Capture photo</button>
        </Grid>
        <Grid item>
          <ImageCropper img={imgSrc} />
        </Grid>

      </Grid>


    </div>
  );
};

export default WebCam

      // https://www.npmjs.com/package/react-webcam
