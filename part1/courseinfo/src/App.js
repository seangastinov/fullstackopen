const Header = (props) => {
    console.log('Header Component Generated : ' + props.course)
    return (
        <div>
            <h1>
                {props.course}
            </h1>
        </div>
    )
}

const Content = (props) => {
    console.log('Content Component Generated')
    return (
        <div>
            <Part name={props.part1Name} number={props.part1Exercises} />
            <Part name={props.part2Name} number={props.part2Exercises} />
            <Part name={props.part3Name} number={props.part3Exercises} />
        </div>
    )
}

let part = 1;
const Part = (props) => {
    console.log('Generate Part ' + part + ' Component of ' + props.name)
    part++;
    return (
        <div>
            <p>
                {props.name} : {props.number}
            </p>
        </div>
    );
};

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
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header course = {course}/>
            <Content
                part1Name={part1.name}
                part1Exercises={part1.exercises}
                part2Name={part2.name}
                part2Exercises={part2.exercises}
                part3Name={part3.name}
                part3Exercises={part3.exercises}
            />
            <Total number1 = {part1.exercises}  number2 = {part2.exercises} number3 = {part3.exercises}/>
        </div>
    )
}

export default App