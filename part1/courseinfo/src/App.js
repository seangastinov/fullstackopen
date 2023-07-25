const Header = (props) => {
    console.log('Header : ' + props.course)
    return (
        <div>
            <h1>
                {props.course}
            </h1>
        </div>
    )
}

const Content = (props) => {
    console.log('Content : ' + props.name)
    return (
        <div>
            <p>{props.name} : {props.number}</p>
        </div>
    )
}

const Total = (props) => {
    console.log('Compute number of exercises')
    return (
        <div>
            <p> Number of exercises {props.number1 + props.number2 + props.number3}</p>
        </div>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course = {course}/>
            <Content name = {part1} number = {exercises1}/>
            <Content name = {part2} number = {exercises2}/>
            <Content name = {part3} number = {exercises3}/>
            <Total number1 = {exercises1}  number2 = {exercises2} number3 = {exercises3}/>
        </div>
    )
}

export default App