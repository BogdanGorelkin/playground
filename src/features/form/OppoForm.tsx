import React, { useState } from 'react'
import { Button, Form, Input, Select, Card, Typography, Row} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../app/store'
import { OppoFormInterface, fetchForm } from './redux/formSlice'
import './oppo-form.scss'
import useStatusListener from '../../app/useStatusListener'

const oppoStatus = [
  {
    K_OPPO_STATUS: 1,
    STATUS: "1. Initial Contact",
    SUCCESS: 0
  },
  {
    K_OPPO_STATUS: 2,
    STATUS: "2. Demonstration",
    SUCCESS: 25
  },
  {
    K_OPPO_STATUS: 3,
    STATUS: "3. Proposal",
    SUCCESS: 50
  },
  {
    K_OPPO_STATUS: 4,
    STATUS: "4. Negotiation",
    SUCCESS: 75
  },
  {
    K_OPPO_STATUS: 5,
    STATUS: "5. Order",
    SUCCESS: 100
  }
]

export function OppoForm() {
  const [form] = Form.useForm<OppoFormInterface>()
  const dispatch = useDispatch<AppDispatch>()
  const fetchStatus = useSelector((state: RootState) => state.oppoForm.fetchFormStatus)
  const fetchedData = useSelector((state: RootState) => state.oppoForm.formData)
  const {isLoading} = useStatusListener(fetchStatus)

  return (
    <div className='oppo-container'>
    <Card style={{ width: '30em', alignSelf: 'center'}}>
      <Form
        form={form}
        style={{width: "100%"}}
        onFinish={(values) => dispatch(fetchForm(values))}
        disabled={isLoading}
      >
        <Row>
          <Form.Item
            style={{flex: 1}}
            name={'status'}
          >
            <Select placeholder="Select status" options={oppoStatus.map(oppo => ({value: oppo.K_OPPO_STATUS, label: oppo.STATUS}))} 
              onSelect={(selected) => {
                const newSuccess = oppoStatus.find(oppo => oppo.K_OPPO_STATUS === selected)?.SUCCESS 
                form.setFieldValue('success', newSuccess)
              }}
            />
          </Form.Item>
          <Form.Item
            name={'success'}
          >
            <Input style={{width: '8em'}} placeholder="success" type='number' min={0} max={100} step={1} 
              onChange={(e) => {
              const newStatus = oppoStatus.find(oppo => oppo.SUCCESS === Number(e.target.value))?.STATUS
              form.setFieldValue('status', newStatus)
              }}
            />
          </Form.Item>
        </Row>

        <Button htmlType="submit" loading={isLoading}>Submit</Button>
      </Form>
      <Typography>
        <pre className="output">Waiting for{fetchedData && ' new'} form submit...</pre>
        <pre>status: {fetchedData?.status}</pre>
        <pre>success: {fetchedData?.success}</pre>
      </Typography>
    </Card>
    </div>
  )
}
