import styles from "./Navbar.module.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

function Navbar({ props }) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [searchParam, setSearchParam] = useState("");
  const [query, setQuery] = useState([]);


  const handleCookies = (val) => {
    if (cookies.hasOwnProperty("queries")) {
      let q = cookies.queries.split(",");
      if (!q) {
        q = [val];
        setQuery(q);
        setCookie("queries", q.toString());
      } else if (q && q.indexOf(val) !== -1) {
        // already present
      } else {
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

  const clearCookies = () => {
    setQuery([]);
    removeCookie("queries");
  };

  const update = (value) => {
    setSearchParam(value);
    handleCookies(value);
    props.getSearchPic(value);
    props.setSuggestionBox(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      props.getSearchPic(searchParam);
      handleCookies(searchParam);
      props.setSuggestionBox(false);
    }
  };


  return (
    <>
      <div id="navbarContainer" className={styles.container} >
        <div className={styles.searchBox}>
          <div className={styles.heading}>Search Photos</div>
          <input
            value={searchParam}
            onKeyDown={(e) => handleKeyPress(e)}
            onChange={(e) => setSearchParam(e.target.value)}
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
