const SingleCountry = ({name,capital, area,languages,flag})=>{
    return (
        <div>
            <h1>{name}</h1>
            <>capital {capital}</>
            <br/>
            <>area {area}</>
            <p> <b>languages :</b> </p>
            <ul>
                {/*Returns an array of all the keys (language codes) from the languages object*/}
                {Object.keys(languages).map((langCode) => {
                    console.log('langCode', langCode)
                    return(
                        <li key={langCode}>
                            {languages[langCode]}
                        </li>
                    )}
                )}
            </ul>
            <img src={flag} alt='flag'/>
        </div>
    )
}
export default SingleCountry