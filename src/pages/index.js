import React from "react"
import { graphql } from "gatsby"
import Map from '../components/map'

export default ({ data }) => {
  const locations = data.allLocationDataJson.nodes.slice(0, 5000).map(loc => ({
    timestamp: loc.timestampMs,
    position: [loc.longitudeE7/10000000, loc.latitudeE7/10000000],
    accuracy: loc.accuracy
  }))

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <h2 style={{ position: 'fixed', zIndex: '100' }}>Hello Gatsby + Deck.gl</h2>
      <Map locations={locations}></Map>
    </div>
  )
}

export const query = graphql`
  query {
    allLocationDataJson {
      nodes {
        timestampMs,
        latitudeE7,
        longitudeE7,
        accuracy
      }
    }
  }
`