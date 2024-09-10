package com.sistema.ventas.Repositories;

import com.sistema.ventas.Entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto,Long> {

   Optional<Producto> findByName(String name);
}
