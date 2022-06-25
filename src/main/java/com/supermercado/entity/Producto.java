package com.supermercado.entity;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="Productos")
@Data
public class Producto {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;
    @Column(nullable = false,unique =false,length = 50)
    private String nombre;

    @Column(nullable = false, length = 64)
    private String precio;

    @Column(name="marca", nullable = false,length = 100)
    private String marca;

    @Column(name="disponible", nullable = false,length = 100)
    private String disponible;

    @Column(name="peso", nullable = false,length = 100)
    private String peso;

    @Column(name="usuario", nullable = false,length = 100)
    private String usuario;
}
