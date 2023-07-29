const Course = (props) => {
    console.log("Generates Course Component")
    return(
        <div>
            <Header name = {props.course.name}/>
            <Content course = {props.course}/>
        </div>
    )
}

const Header = ({name}) => {
    console.log('Header Component Generated : ' + name)
    return (
        <h1>{name}</h1>
    )
}

const Content = ({course}) => {
    console.log('Content Component Generated')
    return (
        <div>
            <Part name={course.parts[0].name} number={course.parts[0].exercises}/>
            <Part name={course.parts[1].name} number={course.parts[1].exercises}/>
            <Part name={course.parts[2].name} number={course.parts[2].exercises}/>
            <Part name={course.parts[3].name} number={course.parts[3].exercises}/>
            <Total course = {course}/>
        </div>
    )
}

let part = 1;
const Part = (props) => {
    console.log('Generate Part ' + part + ' Component of ' + props.name)
    part++;
    return (
        <p>{props.name} {props.number}</p>
    );
};

const Total = ({course}) => {
    console.log('Compute number of exercises')
    return (
        <b> total of {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises + course.parts[3].exercises} exercises</b>
    )
}

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            }
        ]
    }

    return <Course course={course} />
}

export default App