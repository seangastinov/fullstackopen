const PersonForm = ({newName, nameHandler, newNumber, phoneHandler,addHandler})=>{
    return(
        <form>
            <div>
                name: <input value={newName}
                             onChange = {nameHandler}
                             id="newNameInput"
                             placeholder="Enter name"/>
            </div>
            <div>
                number: <input value={newNumber}
                               onChange = {phoneHandler}
                               id="newPhoneInput"
                               placeholder="Enter phone number"/>
            </div>
            <div>
                <button type="submit" onClick={addHandler}>add</button>
            </div>
        </form>
    )
}

export default PersonForm;