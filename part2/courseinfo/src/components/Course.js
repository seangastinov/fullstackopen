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

export default Course