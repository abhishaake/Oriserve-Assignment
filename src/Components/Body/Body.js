import { useEffect, useState, useRef} from "react";
import styles from "./Body.module.css";
import { IMAGE_URL } from "../Constants/URL";
import { useInView } from 'react-intersection-observer';
import { RECENT_PICS_URL, SEACRH_PICS_URL } from '../Constants/URL';
import Modal from 'react-modal';

function Body({props}) {
  const [pics, setPics] = useState([]);
  const[page, setPage] = useState(0); // stores the current page number
  const [showModal,setShowModal] = useState({
    show: false,
    data: null
  });

  // to apply infinte scroll
  const { ref: ref1, inView: myElementIsVisible } = useInView();

  useEffect(()=>{
    if(!myElementIsVisible) return;
    if(page===0){ //to prevent default when page loads for the first time
      setPage(1);
    }else{
      if(props.onSearch.value){
        // if current user has searched something
        props.getData(SEACRH_PICS_URL,page+1,props.onSearch.text);
      }
      else props.getData(RECENT_PICS_URL,page+1,null);
      
      setPage(page+1);
    }
  },[myElementIsVisible])

  useEffect(()=>{
    setPics(props.photos);
  },[props.photos])


  const modalStyle = {
    overlay:{
      width: '100%',
      height: '100%',
      
    }
  }

  return (
    <>
      <div id="container" className={styles.container} onClick={()=>props.setSuggestionBox(false)}>
        <div id="gallery" className={styles.gallery}>
          <div ref={ref1} id="image-container" className={styles.imageContainer}>

            {showModal && 
                <Modal
                  isOpen={showModal.show}
                  style={modalStyle}
                  className={styles.modal}
                >
                  <div><button onClick={()=>{setShowModal({show:false,data:null})}}>CLOSE X</button></div>
                  <img src={IMAGE_URL + showModal?.data?.server + "/" + showModal?.data?.id + "_" + showModal?.data?.secret + ".jpg"}></img>
                </Modal>}
            {pics && pics.map(function (photo,index) {
              return (
                <div key={index} id="image-wrapper" className={styles.imageWrapper}>
                  
                  <img onClick={()=>{setShowModal({show:true,data:photo})}}className={styles.image} src={IMAGE_URL + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg"}></img>
                  {pics?.length-index===15 && <div ref={ref1}></div>}
                </div>
              );
            })}
            {!pics && 
              <div className={styles.noResult}>
                <p>No result found for : <span>{props?.onSearch?.text?.slice(6)}</span></p>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
