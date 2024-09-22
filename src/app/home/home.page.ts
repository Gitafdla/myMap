import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Geolocation } from '@capacitor/geolocation';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //lifecycle hook dalam Angular yang digunakan untuk melakukan inisialisasi setelah komponen dipanggil dan dibuat.
  mapView: MapView | any;
  userLocationGraphic: Graphic | any;
  map: Map | any;
  latitude: number = 39.051576572199785;
  longitude: number = -95.57617101741239;


  constructor() {}

  async ngOnInit() {
    //mengeksekusi logika ketika komponen baru saja diinisialisasi.
    this.map = new Map({
      basemap: 'topo-vector' // Default basemap
    });

    this.mapView = new MapView({
      container: 'container',
      map: this.map,
      zoom: 8,
      center: [this.longitude, this.latitude]
    });

    let weatherServiceFL = new ImageryLayer({ url: WeatherServiceUrl });
    this.map.add(weatherServiceFL);

    this.addMarkerAtLocation(this.latitude, this.longitude);
  }

  // Function to add a marker at the specified coordinates
  addMarkerAtLocation(lat: number, long: number) {
    const point = new Point({ latitude: lat, longitude: long });
    const symbol = new SimpleMarkerSymbol({
      color: [255, 0, 0], // red
      outline: {
        color: [255, 255, 255], // white
        width: 2
      }
    });

    this.userLocationGraphic = new Graphic({
      geometry: point,
      symbol: symbol
    });

    this.mapView.graphics.add(this.userLocationGraphic); // Add the marker to the map
  }

    // await this.updateUserLocationOnMap();
    // this.mapView.center = this.userLocationGraphic.geometry as Point;
    // setInterval(this.updateUserLocationOnMap.bind(this), 10000);


  // async getLocationService(): Promise<number[]> {
  //   return new Promise((resolve, reject) => {
  //     navigator.geolocation.getCurrentPosition((resp) => {
  //       resolve([resp.coords.latitude, resp.coords.longitude]);
  //     });
  //   });
  // }

  // async updateUserLocationOnMap() {
  //   let latLng = await this.getLocationService();
  //   let geom = new Point({ latitude: latLng[0], longitude: latLng[1] });
  //   if (this.userLocationGraphic) {
  //     this.userLocationGraphic.geometry = geom;
  //   } else {
  //     this.userLocationGraphic = new Graphic({
  //       symbol: new SimpleMarkerSymbol(),
  //       geometry: geom,
  //     });
  //     this.mapView.graphics.add(this.userLocationGraphic);
  //   }
  // }

  // Function to handle basemap change
  onBasemapChange(event: any) {
    const selectedBasemap = event.detail.value;
    this.map.basemap = selectedBasemap; // Change the basemap
  }
}

const WeatherServiceUrl = 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity_time/ImageServer';
//NOAA (National Oceanic and Atmospheric Administration) ImageServer

  //constructor() {}
  // private latitude : number | any;
  // private longitude : number | any;

  // public async ngOnInit() {
  //   const position = await Geolocation.getCurrentPosition();
  //  this.latitude = position.coords.latitude;
  // this.longitude = position.coords.longitude;

  //   // this.longitude = 55.94469000765112;
  //   // this.latitude = -3.189273489645877;

  //   const map= new Map({
  //     basemap: "topo-vector" //Reference to the base of the map
  //     });

  //     const view = new MapView({
  //     container: "container", // Reference to the view div created
  //     map: map, // Reference to the map object created before the view
  //     zoom: 14, // Sets zoom level based on level of detail (LOD)
  //     center: [this.longitude, this.latitude] // Sets center point of view using longitude, latitude
  //     });


  //   const customMarkerSymbol = new PictureMarkerSymbol({
  //     url: "https://cdn-icons-png.flaticon.com/512/684/684908.png",  // URL gambar
  //     width: "32px",
  //     height: "32px"
  //   });

  //   //buat object
  //   const point = new Point({
  //     longitude: this.longitude,
  //     latitude: this.latitude
  //   });


  //   const pointGraphic = new Graphic({
  //     geometry: point,
  //     symbol: customMarkerSymbol
  //   });

  //   view.graphics.add(pointGraphic);
  // }
// }
