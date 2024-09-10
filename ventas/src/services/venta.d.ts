// venta.d.ts
import { Producto } from './productos'; // Asegúrate de que la ruta sea correcta

export interface LineaVenta {
    nroLinea?: number;
    cantidad: number;
    precioUnitario: number;
    producto: Producto;
}

export interface Venta {
    idVenta?: number;
    fechaCreacion: string; // Asegúrate de que esta propiedad esté aquí y use el mismo nombre
    lineaVentas: LineaVenta[];
}

export interface ReporteVentaDto {
    ventas: Venta[];
    cantidad: number;
    gananciaTotal: number;
}

// Nuevo tipo para LineaVenta
export interface LineaVentaResponse {
    lineasVenta: LineaVenta[];
}

export declare const getVentas: () => Promise<Venta[]>;
export declare const createVenta: (mapeoLineaVentas: Record<string, number>) => Promise<Venta>;
export declare const getGananciasByWeek: () => Promise<ReporteVentaDto>;
export declare const getVentasByWeek: () => Promise<Venta[]>;
export declare const getVentasByMonth: (mes?: number) => Promise<Venta[]>;
export declare const getVentasByYear: () => Promise<Venta[]>;
export declare const getGananciasByMonth: (mes?: number) => Promise<ReporteVentaDto>;
export declare const getGananciasByYear: () => Promise<ReporteVentaDto>;
