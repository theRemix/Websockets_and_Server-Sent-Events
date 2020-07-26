import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'

const wssProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:')
const wssUrl = `${wssProtocol}//${window.location.hostname}:${window.location.port}`
const socket = new WebSocket(wssUrl);

const ActivityLog = ({ sourcePlayer, targetPlayer, weapon }) =>
  <li className='eventLog eventAnimate'>
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

  useEffect(() => {

    socket.onmessage = e => {
      const gameEvent = JSON.parse(e.data)

      if(logs.length > 3){ // purge older events
        setLogs([...logs.slice(-2), gameEvent])

      } else {
        setLogs([...logs, gameEvent])
      }
    }

  }, [logs])



  return <ul className='eventLogs'>
    { logs.map(log =>
      <ActivityLog
        key={log.id}
        sourcePlayer={log.sourcePlayer}
        targetPlayer={log.targetPlayer}
        weapon={log.weapon}
      />
    )}
  </ul>
}

render(<App />, document.querySelector('#container'))
