import { useState } from 'react'
const Most = ({anecdotes, allVotes}) => {
    const maxElement = Math.max(...allVotes)
    //it won't work if  Math.max(allVotes) because Math.max takes multiple arguments
    //i.e. Math.max(10, 5, 7, 20, 15, 30)
    //therefore to spread the array into multiple argument --> use ... operator
    const index = allVotes.indexOf(maxElement)
    console.log(allVotes)
    console.log(maxElement, index)

    return(
        <div>
            <h1>Anecdote with most votes</h1>
            {anecdotes[index]}
            <br/>
            has {allVotes[index]} votes
        </div>
      )
}
const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
    const [selected, setSelected] = useState(0)
    const [allVotes, setVotes] = useState([0])
    //initialize with array of length 1 with element 0

  const handler = () =>{
    const updatedState = selected + 1
    if(updatedState === anecdotes.length){
      console.log('Going back to state of selected : 0')
      setSelected(0)
    }
    else {
      //Will add new element 0 --> In the end allVotes[8]==0 --> No anecdotes
      const copy = [...allVotes, 0]
      console.log('State of selected :', updatedState)
      setSelected(updatedState)
      console.log('copy allVotes')
      setVotes(copy)
    }
  }
  const handlerVote = () =>{
    const copy = [...allVotes]
    copy[selected] += 1
    console.log('vote pressed')
    setVotes(copy)
  }
  return (
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
        <br/>
        has {allVotes[selected]} votes
        <br/>
          <button onClick={() => handlerVote(selected,setSelected)}>
              vote
          </button>
          <button onClick={() => handler(selected,setSelected)}>
              next anecdote
          </button>
        <Most anecdotes={anecdotes} allVotes={allVotes}/>
      </div>
  )
}

export default App