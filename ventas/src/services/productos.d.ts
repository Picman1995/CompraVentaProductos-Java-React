// productos.d.ts

export interface Producto {
  idProducto?: number;
  name: string;
  stock: number;
  precioActual: number;
  imageUri?: string; // Nuevo campo para la URL de la imagen
}

export declare const getProductos: () => Promise<Producto[]>;
export declare const createProducto: (producto: Producto) => Promise<Producto>;
export declare const updateProducto: (id_producto: number, producto: Producto) => Promise<Producto>;
export declare const deleteProducto: (id_producto: number) => Promise<void>;
export declare const findProductById: (id_producto: number) => Promise<Producto>;
export declare const findProductByName: (nombreProducto: string) => Promise<Producto>;
export declare const uploadImage: (file: File) => Promise<string>; // Añadido para la subida de imágenes
