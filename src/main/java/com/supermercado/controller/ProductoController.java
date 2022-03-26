package com.supermercado.controller;

import com.supermercado.entity.Producto;
import com.supermercado.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class ProductoController {
    @Autowired
    private ProductoRepository productoRepository;

    @RequestMapping(value="api/products/{id}", method = RequestMethod.GET)

    public ResponseEntity<Producto> GetUser(@PathVariable Long id){
        Optional<Producto> foundProduct=productoRepository.findById(id);

        if(foundProduct.isPresent()){
            return ResponseEntity.ok(foundProduct.get());
        }
        Map<String,String> errorResponse = new HashMap<>();
        errorResponse.put("error","NOT FOUND");
        errorResponse.put("message","User NOT FOUND");
        errorResponse.put("status", HttpStatus.NOT_FOUND.toString());
        return new ResponseEntity(errorResponse,HttpStatus.NOT_FOUND );
    }

    @RequestMapping(value = "api/products",method = RequestMethod.POST)

    public Producto createProducto(@RequestBody Producto producto){

        return productoRepository.save(producto);

    }
    @RequestMapping(value="api/products",method=RequestMethod.GET)
    public List<Producto> listUsers(){
        return productoRepository.findAll();
    }
}
