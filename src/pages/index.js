import React from "react"
import { graphql } from "gatsby"

import Map from '../components/map'
import Sidegraph from '../components/sidegraph'

function measureDistance(lat1, lon1, lat2, lon2){  // generally used geo measurement function
  var R = 6378.137; // Radius of earth in KM
  var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d * 1000; // meters
}

class Main extends React.Component {
  state = {
    sidegraphIsOpen: false,
    focusArea: {}
  }

  render () {
    const locations = this.props.data.allGridSampleCsv.nodes.map(loc => ({
      fid: loc.fid,
      position: [parseFloat(loc.cen_long), parseFloat(loc.cen_lat)],
      weight: Number(loc.sum_cust)
    })).sort((a,b) => a.weight-b.weight)
    
    // for (let i = 0; i <= 20; i++) {
    //   console.log(measureDistance(locations[i].position[1], locations[i].position[0], locations[i+1].position[1], locations[i+1].position[0]))
    // }

    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        {/* <h2 style={{ position: 'fixed', zIndex: '100' }}>Hello Gatsby + Deck.gl</h2> */}
        <Map locations={locations} onSelectArea={object => this.setState({ sidegraphIsOpen: true, focusArea: object })}></Map>
        { this.state.sidegraphIsOpen && 
          <Sidegraph weights={locations.map(l => l.weight).filter(w => w > 0)} selectedData={this.state.focusArea}></Sidegraph>
        }
        
      </div>
    )
  }
}

export default Main

export const query = graphql`
  query {
    allGridSampleCsv {
      nodes {
        fid,
        cen_lat,
        cen_long,
        sum_cust
      }
    }
  }
`