import React, { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import './loto-spin.scss'
import { Button } from 'antd'

const data = [
  { option: 'Бикрам (10)' },
  { option: 'Книга' },
  { option: 'Дайсон' },
  { option: 'Крути еще раз' },
  { option: 'Вело-сноу шлем' },
  { option: 'Скальники' },
]

export default function LotoSpin(){
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length)
      setPrizeNumber(newPrizeNumber)
      setMustSpin(true)
    }
  }

  return (
    <div className='loto-spin-container'>
    <span className='text'> Олеся, поздравляю с международным женским днём! <br/>Я не придумал что тебе подарить, поэтому доверимся технологиям! <br/> Крутите барабан!!!</span>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={['#df3428', '#ff5722', '#3f51b5', '#6495ED', '#556B2F', '#DAA520', '#E6E6FA']}
        textColors={['#ffffff']}
        onStopSpinning={() => {
          setMustSpin(false)
        }}
      />
      <Button onClick={handleSpinClick} className='start-spin'>SPIN</Button>
    </div>
  )
}