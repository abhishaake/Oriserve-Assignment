import logo from './logo.svg';
import './App.css';
import Body from './Components/Body/Body';
import Navbar from './Components/Navbar/Navbar';
import { useEffect,useState } from 'react';
import { RECENT_PICS_URL, SEACRH_PICS_URL } from './Components/Constants/URL';
import axios from "axios";

function App() {

  const [photos, setPhotos] = useState([]);
  useEffect(()=>{
    const getData=async()=>{
      try{
        const { data } = await axios.get(RECENT_PICS_URL);
        console.log(data); // photos.photo[]
        setPhotos(data.photos.photo);
      }
      catch(e){ 

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

    }
  }

  const check=(str)=>{
    console.log(str);
  }

  return (<>
    <Navbar data={getSearchPic}/>
    <Body data={photos}/>
  </>
  );
}

export default App;
