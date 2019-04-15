import React from 'react'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'

const Sidegraph = ({ data }) => {
  const dayLabel = ['S', 'M', 'T', 'W', 'TH', 'F', 'SA']
  let dayCount = dayLabel.map(day => ({
    label: day,
    count: 0
  }))

  data.points.forEach(p => {
    const date = new Date(parseInt(p.timestamp))
    const bin = date.getDay()
    
    dayCount[bin].count++
  })

  return (
    <div style={{ position: 'fixed', right: 0, zIndex: 100, height: '100vh', width: '25vw' }}>
      <div style={{ backgroundColor: 'white', padding: '5px', margin: '10px' }}>
        <h3>{ data.position.join(', ')}</h3>
        <p>Total { data.count } points</p>
      </div>

      <div style={{ backgroundColor: 'white', padding: '5px', margin: '10px' }}>
        <strong>Day of week count</strong>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dayCount} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Sidegraph