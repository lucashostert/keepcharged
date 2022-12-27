export class MapOptions {
  clusterOptions: MapOptionsClusterOptions;
  mapOptions: MapOptionsOptions;

  public constructor() {
    this.clusterOptions = new MapOptionsClusterOptions();
    this.mapOptions = new MapOptionsOptions();
  }

  public getTypes(): string[] {
    return ['MAP_TYPE_NORMAL', 'MAP_TYPE_ROADMAP', 'MAP_TYPE_SATELLITE', 'MAP_TYPE_HYBRID', 'MAP_TYPE_TERRAIN', 'MAP_TYPE_NONE'];
  }

  public toLiteral(): any {
    return JSON.parse(JSON.stringify(this));
  }
}

class MapOptionsClusterOptions {
  boundsDraw: boolean;
  gridSize: number;
  icons: MapOptionsClusterOptionsIcons[];
  maxZoomLevel: number;

  public constructor() {
    this.icons = [];
  }
}

export class MapOptionsClusterOptionsIcons {
  label: MapOptionsClusterOptionsIconsLabel;
  max: number;
  min: number;
  url: string;

  public constructor() {
    this.label = new MapOptionsClusterOptionsIconsLabel();
  }
}

class MapOptionsClusterOptionsIconsLabel {
  color: string;
  fontSize: number;
}

//

class MapOptionsOptions {
  camera: MapOptionsOptionsCamera;
  mapType: string;

  public constructor() {
    this.camera = new MapOptionsOptionsCamera();
  }
}

class MapOptionsOptionsCamera {
  target: MapOptionsOptionsCameraTarget;
  tilt: string;
  zoom: string;

  public constructor() {
    this.target = new MapOptionsOptionsCameraTarget();
  }
}

class MapOptionsOptionsCameraTarget {
  lat: number;
  lng: number;
}
