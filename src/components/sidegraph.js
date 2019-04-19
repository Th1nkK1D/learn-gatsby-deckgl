import React from 'react'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'

const Sidegraph = ({ weights, selectedData }) => {
  const maxWeight = weights[weights.length-1]
  const minWeight = weights[0]

  const binLabel = [1, 2, 3, 4, 5, 6]

  let binCount = binLabel.map(bin => ({
    label: minWeight+Math.floor(maxWeight*bin/binLabel.length),
    count: 0
  }))

  weights.forEach(p => {
    const bin = Math.floor((p-minWeight)*binLabel.length/maxWeight)
    // console.log(bin >= binLabel.length ? binLabel.length - 1 : bin)
    binCount[bin >= binLabel.length ? binLabel.length - 1 : bin].count++
  })

  console.log(binCount)

  return (
    <div style={{ position: 'fixed', right: 0, zIndex: 100, height: '100vh', width: '25vw' }}>
      <div style={{ backgroundColor: 'white', padding: '5px', margin: '10px' }}>
        <h2>FID { selectedData.points[0].fid }</h2>
        <p>Center: { selectedData.points[0].position.join(', ')}</p>
        <strong>Weight: { selectedData.points[0].weight }</strong>
      </div>

      <div style={{ backgroundColor: 'white', padding: '5px', margin: '10px' }}>
        <strong>Weight Histrogram</strong>
        <p>Count (not 0) = {weights.length}</p>
        <p> Min = {minWeight}, Max = {maxWeight}</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={binCount} >
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