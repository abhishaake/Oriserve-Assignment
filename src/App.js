import './App.css';
import Body from './Components/Body/Body';
import Navbar from './Components/Navbar/Navbar';
import { useEffect,useState } from 'react';
import axios from "axios";
import { RECENT_PICS_URL } from './Components/Constants/URL';

function App() {

  const [photos, setPhotos] = useState([]);
  const [showSuggestionBox, setShowSuggestionBox] = useState(false); // to show/hide the suggestion box
  const [onSearch,setOnSearch] = useState({ // enable/disable search mode
    value: false,
    text: null
  });
  useEffect(()=>{
    getData(RECENT_PICS_URL,1,null);// loading the data when the page loads the 1st time
  },[])

  const searchHandler=(_case,val)=>{ // updating the search mode
    setOnSearch({
      value: _case,
      text: val
    });
  }
  const getData=async(url,pageNum,text)=>{
    try{
      const { data } = await axios.get(url + pageNum + text);
      // console.log(data); // photos.photo[]

      if(pageNum===1){ // handling the case if no photos are returned , if empty , null should passed

        if(data.photos.photo.length===0) setPhotos(null);
        else setPhotos(data.photos.photo);
      }
      else setPhotos([...photos,...data.photos.photo]); // spreading the array 
    }
    catch(e){ 
      console.error("Error fetching data: ",e);
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
