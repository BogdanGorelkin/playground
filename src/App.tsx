import React from 'react'
import { ConfigProvider, notification } from 'antd'
import { OppoForm } from './features/form/OppoForm'
import LotoSpin from './components/LotoSpin'


export default function App() {
  return (
    <ConfigProvider>
      <LotoSpin/>
    </ConfigProvider>
  )
}
