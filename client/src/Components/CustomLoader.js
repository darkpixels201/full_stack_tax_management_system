import Lottie from 'lottie-react'
import React from 'react'
import loader from "../Assets/json/thickLoader.json";


const CustomLoader = ({height, width, customLoaderStyle}) => {
  return (
    <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            // left: "12%",
           ...customLoaderStyle 
          }}
        >
          <Lottie
            animationData={loader}
            style={{
              height: height || 150,
              width: width || 150,
            }}
          />
        </div>
  )
}

export default CustomLoader