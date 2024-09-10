package com.sistema.ventas.Services;

import com.sistema.ventas.Entities.LineaCompra;
import com.sistema.ventas.Entities.LineaVenta;
import com.sistema.ventas.Entities.Producto;
import com.sistema.ventas.Repositories.LineaCompraRepository;
import com.sistema.ventas.Repositories.LineaVentaRepository;
import com.sistema.ventas.Repositories.ProductoRepository;
import com.sistema.ventas.exception.ServiceException;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Service
@Slf4j
public class LineaCompraService {


    //inyeccion de dependecias
    private LineaCompraRepository lineaCompraRepository;
    private ProductoRepository productoRepository;


    public LineaCompraService(LineaCompraRepository lineaCompraRepository, ProductoRepository productoRepository){
        this.lineaCompraRepository=lineaCompraRepository;
        this.productoRepository=productoRepository;
    }



    public List<LineaCompra> getLineaCompra(){
        try {
            log.info("LineaCompraService:getLineaCompra ejecucion iniciada.");
            log.debug("Mostrando los productos");
            return lineaCompraRepository.findAll();
        }
        catch (Exception ex) {
            log.error("error lanzado:", ex);
            throw new ServiceException("Ha ocurrido un problema al mostrar los productos");
        }
    }


    @Transactional
public LineaCompra crearLineaCompra(Long productoId, Integer cantidad) throws ServiceException {
    log.info("LineaCompra:crearLineaCompra ejecucion iniciada.");

    Optional<Producto> findProducto = productoRepository.findById(productoId);
    
    log.debug("Producto encontrado: " + findProducto.orElse(null));

    if (findProducto.isPresent()) {
        Producto producto = findProducto.get();

        // Actualizar stock y fecha
        producto.setStock(producto.getStock() + cantidad);
        producto.setFechaActualizacion(LocalDateTime.now());
        productoRepository.save(producto);

        // Crear la línea de compra
        LineaCompra lineaCompra = new LineaCompra();
        lineaCompra.setProducto(producto);
        lineaCompra.setCantidad(cantidad);
        lineaCompra.setPrecioUnitario(producto.getPrecioActual());

        log.info("LineaCompra:crearLineaCompra ejecucion finalizada.\n");

        return lineaCompraRepository.save(lineaCompra);
    } else {
        throw new ServiceException("El producto con el ID solicitado no existe");
    }
}

    
    public List<LineaCompra> crearLineaCompras(Map<String, Integer> mapeoProducto) {
        List<LineaCompra> lineaCompras = new ArrayList<>();
    
        for (Map.Entry<String, Integer> entry : mapeoProducto.entrySet()) {
            Long productoId = Long.parseLong(entry.getKey()); // Convertir ID a Long
            Integer cantidadProducto = entry.getValue();
            
            log.debug("Procesando productoId: " + productoId + ", cantidad: " + cantidadProducto);
            
            LineaCompra lineaCompra = crearLineaCompra(productoId, cantidadProducto);
            lineaCompras.add(lineaCompra);
        }
    
        return lineaCompras;
    }
    

}
