import logo from './logo.svg';
import './App.css';
import Body from './Components/Body/Body';
import Navbar from './Components/Navbar/Navbar';
import { useEffect,useState } from 'react';
import { RECENT_PICS_URL, SEACRH_PICS_URL } from './Components/Constants/URL';
import axios from "axios";
function App() {

  const [photos, setPhotos] = useState([]);
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);
  useEffect(()=>{
    const getData=async()=>{
      try{
        const { data } = await axios.get(RECENT_PICS_URL);
        console.log(data); // photos.photo[]
        setPhotos(data.photos.photo);
      }
      catch(e){ 
        //
      }
    }

    getData();
  },[])

  const getSearchPic=async(text)=>{
    try{
      const { data } = await axios.get(SEACRH_PICS_URL + text);
      console.log(data); // photos.photo[]
      setPhotos(data.photos.photo);
    }
    catch(e){ 
      //
    }
  }

  const setSuggestionBox=(val)=>{
    setShowSuggestionBox(val);
  }

  return (<>
    <Navbar props={{getSearchPic,setSuggestionBox,showSuggestionBox}}/>
    <Body props={{photos,setSuggestionBox}}/>
  </>
  );
}

export default App;
