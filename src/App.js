import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import data from "./data.geojson";
import parcele from "./parcele.geojson";
/*import obala from "./obala.geojson";
import obalasjena from "./obalasjena.geojson";
import parcele from "./parcele.geojson";*/

mapboxgl.accessToken = 'pk.eyJ1Ijoib2xpc2hyIiwiYSI6ImNrZjVwZWg5NzBveXozMW9mZ2V1bXl2MHYifQ.aetx6rI5xii820zCaRyYYA';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: 13.629608799339701,
      lat: 45.124076676208524,
      zoom: 9
    };
    this.mapContainer = React.createRef();
  }
  componentDidMount() {
    const {
      lng,
      lat,
      zoom
    } = this.state;
    const map = new mapboxgl.Map({
      container: this.mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    map.on('load', () => {
      map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
      });
      // add the DEM source as a terrain layer with exaggerated height
      map.setTerrain({
        'source': 'mapbox-dem',
        'exaggeration': 1.5
      });

      // add a sky layer that will show when the map is highly pitched
      map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });




    });

    map.once("load", function() {


      map.addSource('data', {
        'type': 'geojson',
        'data': data
      });

      /*map.addSource('obala', {
        'type': 'geojson',
        'data': obala
      });

      map.addSource('obalasjena', {
        'type': 'geojson',
        'data': obalasjena
      });

      map.addSource('parcele', {
        'type': 'geojson',
        'data': parcele
      });*/

      map.addLayer({
        'id': 'maine2',
        'type': 'fill',
        'source': 'data', // reference the data source
        'layout': {},
        'paint': {
          'fill-color': [
            'match',
            ['get', 'class'],
            'more',
            '#cad2d3',
            'obalasjena',
            '#c8cac9',
            'obala',
            '#e6e4e0',
            'obalasjena2',
            '#c4c1ba',
            'cesta',
            '#ffffff',
            'trava',
            '#b6e59e',
            'sivi',
            '#dddddd',
            'objekt',
            '#f44f44',
            'bazen',
            '#75cff0',
            'parcela plava',
            '#66b3d0',
            'parcela zelena',
            '#71e396',
            'parcela narancasta',
            '#ffac35',
            'parcela bez',
            '#e3ad71',
            /* other */
            'transparent'

          ],
          'fill-opacity': 1,
          'fill-outline-color': 'transparent',
        }
      });


      map.addSource('parcele', {
        'type': 'geojson',
        'data': parcele
      });

      map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': 'parcele', // reference the data source
        'layout': {},
        'paint': {
          'fill-color': [
            'match',
            ['get', 'class'],
            'more',
            '#cad2d3',
            'obalasjena',
            '#c8cac9',
            'obala',
            '#e6e4e0',
            'obalasjena2',
            '#c4c1ba',
            'cesta',
            '#ffffff',
            'trava',
            '#b6e59e',
            'sivi',
            '#dddddd',
            'objekt',
            '#f44f44',
            'bazen',
            '#75cff0',
            'parcela plava',
            '#66b3d0',
            'parcela zelena',
            '#71e396',
            'parcela narancasta',
            '#ffac35',
            'parcela bez',
            '#e3ad71',
            /* other */
            'transparent'

          ],
          'fill-opacity': 1,
          'fill-outline-color': 'transparent',
        }
      });



    });


  }
  render() {
    const {
      lng,
      lat,
      zoom
    } = this.state;
    return ( < div >
      <
      div className = "sidebar" >
      Longitude: {
        lng
      } | Latitude: {
        lat
      } | Zoom: {
        zoom
      } < /div> <div ref = {
      this.mapContainer
    }
    className = "map-container" / >
      <
      /div>
  );
}



}
