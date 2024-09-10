// compra.d.ts

export interface LineaCompra {
    nroLinea?: number;
    cantidad: number;
    precioUnitario: number;
    producto: Producto;
}

export interface Compra {
    idCompra?: number;
    fechaCreacion: string; // Usa string para fechas en formato ISO
    lineaCompras: LineaCompra[];
}

export interface ReporteCompraDto {
    compras: Compra[];
    cantidad: number;
    gastoTotal: number;
}

// Nuevo tipo para LineaCompra
export interface LineaCompraResponse {
    lineasCompra: LineaCompra[];
}

export declare const getCompras: () => Promise<Compra[]>;
export declare const createCompra: (mapeoLineaCompras: Record<string, number>) => Promise<Compra>;
export declare const getGananciasByWeek: () => Promise<ReporteCompraDto>;

// Nueva declaración para obtener LineaCompra
export declare const getLineaCompras: () => Promise<LineaCompraResponse>;
