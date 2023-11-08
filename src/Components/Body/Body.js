import { useEffect, useState } from "react";
import styles from "./Body.module.css";
import { IMAGE_URL } from "../Constants/URL";

function Body({props}) {
    const [pics, setPics] = useState([]);

  useEffect(()=>{
    setPics(props.photos);
  },[props.photos])


  return (
    <>
      <div id="container" className={styles.container} onClick={()=>props.setSuggestionBox(false)}>
        <div id="gallery" className={styles.gallery}>
          <div id="image-container" className={styles.imageContainer}>
            {pics.map(function (photo) {
              return (
                <div key={photo.id} id="image-wrapper" className={styles.imageWrapper}>
                  <img className={styles.image} src={IMAGE_URL + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg"}></img>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
