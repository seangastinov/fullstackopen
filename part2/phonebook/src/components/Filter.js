const Filter = ({state,handler}) =>{
    return(
        <form>
            <div>
                filter shown with <input value={state}
                                         onChange = {handler}
                                         id="newNameFilter"
                                         placeholder="Enter filter"/>
            </div>
        </form>
    )
}

export default Filter