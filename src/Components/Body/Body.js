import { useEffect, useState } from "react";
import styles from "./Body.module.css";
import { IMAGE_URL } from "../Constants/URL";

function Body({data}) {
    const [photos, setPhotos] = useState([]);

  useEffect(()=>{
    setPhotos(data);
  },[data])

  return (
    <>
      <div id="container" className={styles.container}>
        <div id="gallery" className={styles.gallery}>
          <div id="image-container" className={styles.imageContainer}>
            {photos.map(function (photo) {
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
