import React from 'react';
import { connect } from "react-redux";
import M from 'materialize-css';

import 'ol/ol.css';
import { Map as olMap } from 'ol';
import View from 'ol/View';
import { Vector as VectorL, Tile} from 'ol/layer';
import { OSM, Vector, XYZ } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import WKT from 'ol/format/WKT';

import './Map.css';
import { getRequest, getRequestError, getRequestLoading } from '../store/reducer';


/**
 * Data model for the Processing Request object. 
 */
class ProcessingRequest {
  constructor(data) {
    this.data = data;
  }

  get geometry() {
    return this.data.polygon.geometry
  }

  get tiles() {
    return this.data.result.tiles_color
  }

}

/**
 * Map Component
 */
class Map extends React.Component {
  /**
   * Creates the Map object and renders the map
   */
  componentDidMount() {
    // Create a Map object
    this.map = new olMap({
      target: 'map',
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([37.41, 8.82]),
        zoom: 11
      })
    });

    // Update the map, or handle errors
    this.onMapLoad();
  }

  /**
   * Updates the map's tileset
   */
  componentDidUpdate() {
    if (!this.props.error) {
      this.onMapLoad();
    } else {
      this.handleError();
    }
  }

  /**
   * Parses error and shows a corresponding toast notification.
   */
  handleError() {
    const errorMap = {
      '401': 'User with given API key not found! Please submit the search using a valid key.',
      '404': 'Processing request with the given ID does not exist.',
      'default': 'Load error occured.'
    }
    // In case of load error remove the tile layer
    this.removeCurrentTiles();
    const message = errorMap[this.props.error] ? errorMap[this.props.error] : errorMap.default
    // Remove any previous toasts
    M.Toast.dismissAll();
    M.toast({
      html: message,
      displayLength: 5000,
      classes: 'toast-error'
    })

  }

  /**
   * Removes the current Tile from the map
   */
  removeCurrentTiles() {
    if (this.tileLayer) {
      this.map.removeLayer(this.tileLayer) ;
      this.tileLayer = null;
    }
  }

  /**
   * Used to load the Map's settings (tileset) from the store state 
   */
  onMapLoad() {
    // Create a new request object from the updated data
    const request = new ProcessingRequest(this.props.processingRequest);
    const source = new XYZ({ url: request.tiles });
    // Remove the old layer from the map and create a new one and attach it to it
    this.removeCurrentTiles();
    this.tileLayer = new Tile({source: source});
    this.map.addLayer(this.tileLayer);

    // Calculate the polygon and its extent to which the map should be zoomed after loading
    const format = new WKT();
    const feature = format.readFeature(request.geometry);
    feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    const vector = new VectorL({
      source: new Vector({
        features: [feature]
      })
    });
    var extent = vector.getSource().getExtent();
    this.map.getView().fit(extent, this.map.getSize());  
  }

  render() {
    return (
      <div id="map" className="Map"></div>
    );
  }
}

const mapStateToProps = state => ({
  error: getRequestError(state),
  processingRequest: getRequest(state),
  pending: getRequestLoading(state)
});

export default connect(mapStateToProps)(Map);