const Course = ({course}) => {
    console.log("Generates Course Component")
    return(
        <div>
            <Header name = {course.name}/>
            <Content course = {course}/>
        </div>
    )
}

const Header = ({name}) => {
    console.log('Header Component Generated : ' + name)
    return (
        <h2>{name}</h2>
    )
}

const Content = ({course}) => {
    console.log('Content Component Generated')
    const collectionOfParts = course.parts.map((i) => {
        return <Part key={i.id} name={i.name} number={i.exercises}/>
    })

    return (
        <div>
            {collectionOfParts}
            <Total course = {course}/>
        </div>
    )
}

const Part = (props) => {
    console.log('Generate Part Component of ' + props.name)
    return (
        <p>{props.name} {props.number}</p>
    );
};

const Total = ({course}) => {
    console.log('Total Component Generated')
    const total = course.parts.reduce((sum, current) => {
        console.log('what is happening', sum, current)
        return sum + current.exercises
    }, 0 )

    console.log('final value of sum', total)

    return (
        <b> total of {total} exercises</b>
    )
}

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
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
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ]
    const collectionOfCourses =courses.map((course) => (
        <Course key={course.id} course={course}/>
    ))

    return (
        <div>
            <h1>Web Development Course</h1>
            {collectionOfCourses}
        </div>
    )
}

export default App