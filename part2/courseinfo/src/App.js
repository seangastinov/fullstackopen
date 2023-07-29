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
            <Part name={course.parts[0].name} number={course.parts[0].exercises} />
            <Part name={course.parts[1].name} number={course.parts[1].exercises} />
            <Part name={course.parts[2].name} number={course.parts[2].exercises} />
        </div>
    )
}

let part = 1;
const Part = (props) => {
    console.log('Generate Part ' + part + ' Component of ' + props.name)
    part++;
    return (
        <p>{props.name} : {props.number}</p>
    );
};

// const Total = (props) => {
//     console.log('Compute number of exercises')
//     return (
//         <div>
//             <p> Number of exercises : {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
//         </div>
//     )
// }

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
            }
        ]
    }

    return <Course course={course} />
}

export default App