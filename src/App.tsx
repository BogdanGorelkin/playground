import React from 'react'
import { ConfigProvider, notification } from 'antd'
import { OppoForm } from './features/form/OppoForm'


export default function App() {
  return (
    <ConfigProvider>
      <OppoForm/>
    </ConfigProvider>
  )
}
