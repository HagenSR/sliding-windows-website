// in the global namesapce "L"
declare module "src/assets/leaflet-geotiff-2/dist/leaflet-geotiff.js";
declare module "leaflet-geotiff-rgb";
declare namespace L {
   namespace LeafletGeotiff{
    export function rgb() : Renderer
  }

  // there is a child namespace "vectorGrid"
  export function leafletGeotiff(url: string, options: any): TileLayer;
}