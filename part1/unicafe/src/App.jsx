import { useState } from 'react'

const Header = ({title}) => <><h1>{title}</h1></> 

const Button = ({handleClick, text}) => {
  return (
    <>
      <button onClick={handleClick}>
        <label>{text}</label>
      </button>
    </>
  )
}
const StatisticLine = (props) => {
  if(props.text === 'positive') return<><td>{props.text} {props.value}%</td></>
  return (
    <>
      <td>{props.text} {props.value}</td>
    </>
  )
}

const Statistics = (props) => {
  if(props.all === 0 ) {
    return (
      <>
        <h1>{props.title}</h1>
        <p>No Feedback Given</p>
      </>
    )
  }


  return (
    <>
      <h1>{props.title}</h1>
      <table>
        <tbody>
          <tr><StatisticLine text='good' value={props.good}/></tr>
          <tr><StatisticLine text='neutral' value={props.neutral}/></tr>
          <tr><StatisticLine text='bad' value={props.bad}/></tr>
          <tr><StatisticLine text='all' value={props.all}/></tr>
          <tr><StatisticLine text='average' value={(props.good - props.bad)/props.all}/></tr>
          <tr><StatisticLine text='positive' value={(props.good * 100)/props.all}/></tr>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)


  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    console.log(good)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    console.log(neutral)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    console.log(bad)
  }

  return (
    <div>
      <Header title='Give Feedback'/>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Statistics title='Statistics' good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App