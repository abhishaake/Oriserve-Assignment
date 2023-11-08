import './App.css';
import Body from './Components/Body/Body';
import Navbar from './Components/Navbar/Navbar';
import { useEffect,useState } from 'react';
import axios from "axios";
import { RECENT_PICS_URL } from './Components/Constants/URL';

function App() {

  const [photos, setPhotos] = useState([]);
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);
  const [onSearch,setOnSearch] = useState({
    value: false,
    text: null
  });
  useEffect(()=>{
    getData(RECENT_PICS_URL,1,null);
    
  },[])

  const searchHandler=(val)=>{
    setOnSearch({
      value: true,
      text: val
    });
  }
  const getData=async(url,pageNum,text)=>{
    try{
      const { data } = await axios.get(url + pageNum + text);
      console.log(data); // photos.photo[]
      if(pageNum===1){
        setPhotos(data.photos.photo);
      }
      else setPhotos([...photos,...data.photos.photo]);
    }
    catch(e){ 
      //
    }
  }

  const setSuggestionBox=(val)=>{
    setShowSuggestionBox(val);
  }

  return (<>
    <Navbar props={{setSuggestionBox,showSuggestionBox,searchHandler,getData}}/>
    <Body props={{photos,setSuggestionBox,getData,onSearch}}/>
  </>
  );
}

export default App;
