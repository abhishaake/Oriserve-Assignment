import styles from "./Navbar.module.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

function Navbar({ data }) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [searchParam, setSearchParam] = useState("");
  const [query, setQuery] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const blurHandler = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100);
  };

  const handleCookies = (val) => {
    if (cookies.hasOwnProperty("queries")) {
      let q = cookies.queries.split(",");
      if (!q) {
        q = [val];
        setCookie("queries", q.toString());
      } else if (q && q.indexOf(val) !== -1) {
        // already present
      } else {
        q.push(val);
        setCookie("queries", q.toString());
      }
    } else {
      setCookie("queries", [val].toString());
    }
  };

  useEffect(() => {
    setQuery(cookies.queries?.split(","));
  }, [cookies]);

  const clearCookies = () => {
    removeCookie("queries");
    setQuery([]);
  };

  const update = (value) => {
    setSearchParam(value);
    handleCookies(value);
    data(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      data(searchParam);
      handleCookies(searchParam);
      setShowSuggestions(false);
    }
  };

  return (
    <>
      <div id="navbarContainer" className={styles.container}>
        <div className={styles.searchBox}>
          <div className={styles.heading}>Search Photos</div>
          <input
            value={searchParam}
            onKeyDown={(e) => handleKeyPress(e)}
            onChange={(e) => setSearchParam(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={blurHandler}
          />

          {showSuggestions && (
            <>
              <div id="querySuggestion" className={styles.suggestionBox}>
                {query?.slice(-4)?.map(function (item) {
                  return (
                    <div key={item} onClick={() => update(item)}>
                      {item}
                    </div>
                  );
                })}
                <button onClick={clearCookies}>Clear</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
