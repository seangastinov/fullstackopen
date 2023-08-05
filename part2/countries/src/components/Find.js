const Find = ({handler, state}) => {

    return (
            <form>
                <div>
                    find countries <input value={state}
                                          onChange = {handler}
                                          id="newNameFind"
                                          placeholder="Enter countries"/>
                </div>
            </form>
    )
}

export default Find
