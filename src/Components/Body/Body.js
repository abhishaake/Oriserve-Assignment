import styles from "./Body.module.css";
import temp from "./logo192.png";

function Body() {
  const imgArr = new Array(20).fill(temp);

  return (
    <>
      <div id="container" className={styles.container}>
        <div id="gallery" className={styles.gallery}>
          <div id="image-container" className={styles.imageContainer}>
            {imgArr.map(function () {
              return (
                <div id="image-wrapper" className={styles.imageWrapper}>
                  <img className={styles.image} src={temp}></img>
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
