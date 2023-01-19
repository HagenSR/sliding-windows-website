import { environment } from 'src/environments/environment';

interface Scripts {
    name: string;
    src: string;
}  
export const ScriptStore: Scripts[] = [
    {name: 'leaflet-geotiff', src: 'http://localhost:4200/assets/leaflet-geotiff.js'},
    {name: 'leaflet-geotiff-plotty', src: 'http://localhost:4200/assets/leaflet-geotiff-plotty.js'}
];