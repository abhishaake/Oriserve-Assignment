import styles from "./Navbar.module.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { RECENT_PICS_URL, SEACRH_PICS_URL } from '../Constants/URL';

function Navbar({ props }) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [searchParam, setSearchParam] = useState(""); // stores the search box text
  const [query, setQuery] = useState([]); // stores the items from cookies user hass


  const handleCookies = (val) => {
    if(!val) return;

    if (cookies.hasOwnProperty("queries")) {
      let q = cookies.queries.split(",");
      if (!q) { // if empty, add the cookie
        q = [val];
        setQuery(q);
        setCookie("queries", q.toString());
      } else if (q && q.indexOf(val) !== -1) {
        // already present
      } else { // cookie present, add the value
        q.push(val);
        setQuery(q);
        setCookie("queries", q.toString());
      }
    } else {
      setQuery([val]);
      setCookie("queries", [val].toString());
    }
  };

  useEffect(() => {
    setQuery(cookies?.queries?.split(","));
  }, []);

  const clearCookies = () => { // clearing out cookie data
    setQuery([]);
    removeCookie("queries");
  };

  const update = (value) => {
    setSearchParam(value); // updating state
    handleCookies(value);
    props.searchHandler(true,"&text="+value); // setting the app to search mode
    props.getData(SEACRH_PICS_URL,1,"&text="+value); // fetching data
    props.setSuggestionBox(false); 
    window.scrollTo(0, 0); //scroll top of the page
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if(searchParam){
        props.searchHandler(true,"&text="+searchParam);
        props.getData(SEACRH_PICS_URL,1,"&text="+searchParam);
      }
      else{
        props.searchHandler(false,null);
        props.getData(RECENT_PICS_URL,1,null);
      }
      handleCookies(searchParam);
      props.setSuggestionBox(false);
    }
    window.scrollTo(0, 0); // to scroll to top of the page
  };

  const onTextChangeHandler=(val)=>{
    setSearchParam(val);
    if(!val || val.length<3) return; // no fetching if input text is less than 3 characters
    props.searchHandler(true,"&text="+val);
    props.getData(SEACRH_PICS_URL,1,"&text="+val);
  }

  useEffect(()=>{
    setTimeout(() => {
      handleCookies(searchParam); // only update cookie when user has searched for more than 3 char and data has been loaded successfully
      window.scrollTo(0, 0); // to scroll to top of the page
    }, 500);
  },[props.showSuggestionBox]);

  return (
    <>
      <div id="navbarContainer" className={styles.container} >
        <div className={styles.searchBox}>
          <div className={styles.heading}>Search Photos</div>
          <input
          placeholder="Search..."
            value={searchParam}
            onKeyDown={(e) => handleKeyPress(e)}
            onChange={(e) => onTextChangeHandler(e.target.value)}
            onClick={()=>props.setSuggestionBox(true)}
            onFocus={() => props.setSuggestionBox(true)}
          />

          {props.showSuggestionBox && query?.length>0 && (
            <>
              <div id="querySuggestion" className={styles.suggestionBox}>
                {query?.slice(-4)?.map(function (item) {
                  return (
                    <div key={item} onClick={()=>{update(item)}}>
                      {item}
                    </div>
                  );
                })}
                <button onClick={()=>clearCookies()}>Clear</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
