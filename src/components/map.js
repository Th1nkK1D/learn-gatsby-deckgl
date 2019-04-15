import React from 'react';
import DeckGL, { ScatterplotLayer, GridLayer } from 'deck.gl'
import ReactMapGL from 'react-map-gl'

import MAPBOX_ACCESS_TOKEN from '../data/mapboxtoken'

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
    const scatterPlot = new ScatterplotLayer({
      id: 'scatterplot-layer',
      data: this.props.locations,
      opacity: 0.1,
      stroked: false,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 2,
      lineWidthMinPixels: 1,
      getPosition: d => d.position,
      getFillColor: [200, 0, 200]  
    })

    const grid = new GridLayer({
      id: 'grid-layer',
      data: this.props.locations,
      colorRange: [[50, 240, 100, 45],[50, 240, 100, 95],[50, 240, 100, 135],[50, 240, 100, 175],[50, 240, 100, 215],[50, 240, 100, 255]],
      pickable: true,
      extruded: false,
      cellSize: 600,
      elevationScale: 4,
      opacity: 0.5,
      getPosition: d => d.position,
      onClick: ({ object }) => {
        this.props.onSelectArea(object)
      }
    });

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