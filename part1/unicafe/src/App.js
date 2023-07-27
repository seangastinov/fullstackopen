import { useState } from 'react'


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
              <button onClick={() => handler('good',good,setGood)}>good</button>
              <button onClick={() => handler('neutral', neutral, setNeutral)}>neutral</button>
              <button onClick={() => handler('bad',bad,setBad)}>bad</button>
              <h1>statistics</h1>
              <>good {good}</>
              <br/>
              <> neutral {neutral}</>
              <br/>
              <>bad {bad}</>
          </div>
      )
    }

export default App