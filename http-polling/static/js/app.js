import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'

const POLL_INTERVAL = 5000

const ActivityLog = ({ placeholder }) => <li>{placeholder}</li>

const App = () => {

  const [logs, setLogs] = useState([])

  useEffect(() => {
    setInterval(() =>
      // fetch()
      setLogs([...logs, Date.now()])
    ,POLL_INTERVAL)
  })

  return <ul>
    { logs.map(log => <ActivityLog key={log} placeholder={log} />) }
  </ul>
}

render(<App />, document.querySelector('#container'))
