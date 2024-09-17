import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Geolocation } from '@capacitor/geolocation';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  constructor() {}
  private latitude : number | any;
  private longitude : number | any;

  public async ngOnInit() {
    const position = await Geolocation.getCurrentPosition();
   this.latitude = position.coords.latitude;
  this.longitude = position.coords.longitude;

    // this.longitude = 55.94469000765112;
    // this.latitude = -3.189273489645877;

    const map= new Map({
      basemap: "topo-vector" //Reference to the base of the map
      });

      const view = new MapView({
      container: "container", // Reference to the view div created
      map: map, // Reference to the map object created before the view
      zoom: 14, // Sets zoom level based on level of detail (LOD)
      center: [this.longitude, this.latitude] // Sets center point of view using longitude, latitude
      });


    const customMarkerSymbol = new PictureMarkerSymbol({
      url: "https://cdn-icons-png.flaticon.com/512/684/684908.png",  // URL gambar
      width: "32px",
      height: "32px"
    });

    //buat object
    const point = new Point({
      longitude: this.longitude,
      latitude: this.latitude
    });


    const pointGraphic = new Graphic({
      geometry: point,
      symbol: customMarkerSymbol
    });

    view.graphics.add(pointGraphic);
  }
}
