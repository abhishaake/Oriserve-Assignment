
import styles from './Navbar.module.css';
import {useCookies} from 'react-cookie';
import {useState} from 'react';

function Navbar({data}){

    const [cookies, setCookie, removeCookie] = useCookies(['queries']);
    const [searchParam,setSearchParam] = useState('');
    const query = [
        {label: 'apple'},
        {label: 'banana'},
        {label: 'pear'}
    ];
    const [showSuggestions, setShowSuggestions] = useState(false);
    const blurHandler=()=>{
        setTimeout(()=>{
            setShowSuggestions(false);
        },100);
    }

    const update=()=>{
        // data("heyyyy");
    }

    return (<>
        <div id="navbarContainer" className={styles.container} onClick={update}>
            <div className={styles.searchBox}>
                <div className={styles.heading}>Search Photos</div>
                <input value={searchParam} onChange={(e)=>setSearchParam(e.target.value)} onFocus={()=>setShowSuggestions(true)} onBlur={blurHandler}/>

                {showSuggestions && 
                    <>
                        <div id='querySuggestion' className={styles.suggestionBox}>
                            {
                                query.map(function(item){
                                    return(
                                        <div key={item.label} onClick={()=>setSearchParam(item.label)}> 
                                            {item.label}
                                        </div>
                                    );
                                })
                            }
                            <button>Clear</button>
                        </div>
                    </>
                }
            </div>
        </div>  
    </>);
}

export default Navbar;