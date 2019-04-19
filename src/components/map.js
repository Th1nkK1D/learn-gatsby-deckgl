import React from 'react';
import DeckGL, { ScatterplotLayer, GridLayer } from 'deck.gl'
import ReactMapGL from 'react-map-gl'

import MAPBOX_ACCESS_TOKEN from '../mapboxtoken'

const colors = [[255,254,195, 70],[255,219,178, 70],[255,183,160, 70],[255,146,143, 70],[250,103,126, 70],[232,64,116, 70],[193,49,120, 70],[151,35,123, 70],[108,23,126, 70],[54,16,128, 70]]

function getColorValue (points, cutoff) {
  return points[0].weight >= cutoff ? cutoff : points[0].weight
}

class Map extends React.Component {
  state = {
    viewport: {
      latitude: 13.7525,
      longitude: 100.494167,
      zoom: 12,
      pitch: 0,
      bearing: 0
    }
  }

  render() {
    const cutoffValue = this.props.locations[Math.round(this.props.locations.length*99/100)].weight

    const scatterPlot = new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: this.props.locations,
      opacity: 0,
      stroked: false,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 3,
      getPosition: d => d.position,
      getFillColor: [200, 0, 200]  
    })

    const grid = new GridLayer({
      id: 'grid-layer',
      getColorValue: p => getColorValue(p, cutoffValue),
      data: this.props.locations,
      colorRange: colors,
      pickable: true,
      extruded: false,
      cellSize: 243,
      opacity: 0.5,
      getPosition: d => d.position,
      onClick: ({ object }) => {
        this.props.onSelectArea(object)
      }
    })

    return (
      <DeckGL
        initialViewState={this.state.viewport}
        controller={true}
        layers={[grid, scatterPlot]}
      >
        <ReactMapGL 
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          {...this.state.viewport}
          onViewportChange={(viewport) => this.setState({viewport})}
        />
      </DeckGL>
    )
  }
}

export default Map