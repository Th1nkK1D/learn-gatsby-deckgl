import React from "react"
import { graphql } from "gatsby"

import Map from '../components/map'
import Sidegraph from '../components/sidegraph'

class Main extends React.Component {
  state = {
    sidegraphIsOpen: false,
    focusArea: {}
  }

  render () {
    const locations = this.props.data.allLocationDataJson.nodes.slice(0, 5000).map(loc => ({
      timestamp: loc.timestampMs,
      position: [loc.longitudeE7/10000000, loc.latitudeE7/10000000],
      accuracy: loc.accuracy
    }))

    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <h2 style={{ position: 'fixed', zIndex: '100' }}>Hello Gatsby + Deck.gl</h2>
        <Map locations={locations} onSelectArea={object => this.setState({ sidegraphIsOpen: true, focusArea: object })}></Map>
        { this.state.sidegraphIsOpen && 
          <Sidegraph data={this.state.focusArea}></Sidegraph>
        }
        
      </div>
    )
  }
}

export default Main

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