import React, { useState, useEffect, useRef } from 'react'
import { render } from 'react-dom'

const ActivityLog = ({ sourcePlayer, targetPlayer, type, weapon }) =>
  <li className={`eventLog eventType-${type}`}>
    <div className='sourcePlayer'>
      <img className='avatar' src={`./images/${sourcePlayer.avatar}`} />
      <span className='name'>{sourcePlayer.name}</span>
      <img className='weapon' src={`./images/${weapon.graphic}`} />
    </div>

    <div className='targetPlayer'>
      <span className='name'>{targetPlayer.name}</span>
      <img className='avatar' src={`./images/${targetPlayer.avatar}`} />
    </div>
  </li>

const App = () => {

  const [logs, setLogs] = useState([])
  const events = useRef(null)

  useEffect(() => {
    events.current = new EventSource('/api/game-events')

    // clean up
    return () => events.current.close()
  }, [])


  useEffect(() => {
    if (!events.current) return

    events.current.onmessage = e => {
      const gameEvent = JSON.parse(e.data)

      if(logs.length > 3){ // purge older events
        setLogs([...logs.slice(-2), gameEvent])

      } else {
        setLogs([...logs, gameEvent])
      }
    }

  }, [logs]);

  return <ul className='eventLogs'>
    { logs.map(log =>
      <ActivityLog
        key={log.id}
        sourcePlayer={log.sourcePlayer}
        targetPlayer={log.targetPlayer}
        type={log.type}
        weapon={log.weapon}
      />
    )}
  </ul>
}

render(<App />, document.querySelector('#container'))
