import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ArrowBack, Button, Shuffle, Spinner } from '../components'
import PlayerCountContext from '../PlayerCountContext'

interface SpinnerPageProps {}

export const SpinnerPage: React.FC<SpinnerPageProps> = () => {
  const { playerCount, setPlayerCount } = useContext(PlayerCountContext)!
  const [isRotationClockwise, setIsRotationClockwise] = useState(true)
  const [startPlayer, setStartPlayer] = useState(0)
  const [angle, setAngle] = useState({ next: 0, prev: 0 })

  const chooseStartPlayer = useCallback(() => {
    setIsRotationClockwise(state => !state)

    const newStartPlayer =
      Math.floor(Math.random() * Math.floor(playerCount)) + 1

    setStartPlayer(newStartPlayer)

    const next = (360 / playerCount) * newStartPlayer + 225
    setAngle(state => ({
      prev: state.next,
      next
    }))
  }, [playerCount])

  useEffect(() => {
    chooseStartPlayer()
  }, [])

  const reset = () => {
    setPlayerCount(0)
    setStartPlayer(0)
  }

  return (
    <>
      <Spinner
        startPlayer={startPlayer}
        playerCount={playerCount}
        chooseStartPlayer={chooseStartPlayer}
        angle={angle}
        isRotationClockwise={isRotationClockwise}
      />
      <p className='text-sm font-bold text-gray-700'>(YOU)</p>
      <div
        // initial={{ opacity: buttonRowOpacity }}
        // animate={{ opacity: buttonRowOpacity }}
        className='grid grid-cols-2 gap-4 mt-12'
      >
        <Button
          handleClick={reset}
          colorStyle='text-red-900 bg-red-300 hover:bg-red-200'
        >
          <>
            <ArrowBack height='24' width='24' />
            RESET
          </>
        </Button>
        <Button
          handleClick={chooseStartPlayer}
          colorStyle='text-green-900 bg-green-400 hover:bg-green-300'
        >
          <>
            <Shuffle height='24' width='24' />
            REROLL
          </>
        </Button>
      </div>
    </>
  )
}

export default SpinnerPage
