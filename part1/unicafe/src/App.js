import { useState } from 'react'

const Statistics = ({good,neutral,bad}) => {
    const all = bad+good+neutral
    const avg = (good+bad*-1)/all
    const pos = good/all*100
    if (all === 0) {
        return (
            <div>
                <h1>statistics</h1>
                No feedback given
            </div>
        )
    }
    return(
        <div>
            <h1>statistics</h1>
            <table>
                <tbody>
                <StatisticLine name={'good'} state={good}/>
                <StatisticLine name={'neutral'} state={neutral}/>
                <StatisticLine name={'bad'} state={bad}/>
                <StatisticLine name={'all'} state={all}/>
                <StatisticLine name={'average'} state={avg}/>
                <StatisticLine name={'positive'} state={pos} add={'%'}/>
                </tbody>
            </table>
        </div>
    )
}
const Button = ({handler,name, state, setter}) => {
    return(
        <button onClick={() => handler(name,state,setter)}>{name}</button>
    )
}

const StatisticLine = ({name, state, add}) => {
    return(
        <tr>
            <td>{name}</td>
            <td>{state} {add}</td>
        </tr>
    )
}
const App = () => {
    const handler = (name,state,setter) =>{
        const updatedState = state+1
        console.log('State of', name, ':', updatedState)
        setter(updatedState)
    }
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button name={'good'} setter={setGood} handler={handler} state={good}/>
            <Button name={'neutral'} setter={setNeutral} handler={handler} state={neutral}/>
            <Button name={'bad'} setter={setBad} handler={handler} state={bad}/>
            <Statistics  good={good} bad={bad} neutral={neutral} />
        </div>
    )
}

export default App