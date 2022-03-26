package com.supermercado.repository;
import com.supermercado.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductoRepository extends JpaRepository<Producto,Long> {
}
