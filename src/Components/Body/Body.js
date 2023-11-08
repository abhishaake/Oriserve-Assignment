import { useEffect, useState, useRef} from "react";
import styles from "./Body.module.css";
import { IMAGE_URL } from "../Constants/URL";
import { useInView } from 'react-intersection-observer';
import { RECENT_PICS_URL, SEACRH_PICS_URL } from '../Constants/URL';

function Body({props}) {
  const [pics, setPics] = useState([]);
  const[page, setPage] = useState(0);

  const { ref: ref1, inView: myElementIsVisible } = useInView();

  useEffect(()=>{
    if(!myElementIsVisible) return;
    if(page===0){
      setPage(1);
    }else{
      if(props.onSearch.value){
        props.getData(SEACRH_PICS_URL,page+1,props.onSearch.text);
      }
      else props.getData(RECENT_PICS_URL,page+1,null);
      
      setPage(page+1);
    }
  },[myElementIsVisible])

  useEffect(()=>{
    setPics(props.photos);
  },[props.photos])


  return (
    <>
      <div id="container" className={styles.container} onClick={()=>props.setSuggestionBox(false)}>
        <div id="gallery" className={styles.gallery}>
          <div ref={ref1} id="image-container" className={styles.imageContainer}>
            {pics.map(function (photo,index) {
              return (
                <div key={index} id="image-wrapper" className={styles.imageWrapper}>
                  
                  <img className={styles.image} src={IMAGE_URL + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg"}></img>
                  {pics?.length-index===15 && <div ref={ref1}></div>}
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
