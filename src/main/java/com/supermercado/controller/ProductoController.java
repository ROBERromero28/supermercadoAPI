package com.supermercado.controller;

import com.supermercado.entity.Producto;
import com.supermercado.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.supermercado.util.Message;

import java.util.*;

@RestController
public class ProductoController {
    @Autowired
    private ProductoRepository productoRepository;
    private Message message = new Message();
    @RequestMapping(value="api/products/{id}", method = RequestMethod.GET)

    public ResponseEntity<Producto> GetProduct(@PathVariable Long id){
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


    @RequestMapping(value="api/users/{id}",method = RequestMethod.PUT)
    public ResponseEntity<Optional> editProduct(@RequestBody Producto newProduct , @PathVariable Long id){
        Map<String, String> response = new HashMap<>();
        try{
            Producto producto = productoRepository.findById(id).get();
            producto.setNombre(newProduct.getNombre());
            producto.setPrecio(newProduct.getPrecio());
            producto.setMarca(newProduct.getMarca());
            producto.setPeso(newProduct.getPeso());
            response.put("Success","Product edit");
            response.put("message","Product edit success");
            response.put("status",HttpStatus.OK.toString());
            productoRepository.save(producto);
            return message.viewMessage(HttpStatus.OK,"success","user edit success!!");

        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","User not found!");
        }


    }


    @RequestMapping(value="api/products",method=RequestMethod.GET)
    public List<Producto> listProduct(){

        return productoRepository.findAll();
    }

    @RequestMapping(value = "api/products",method = RequestMethod.POST)
    public ResponseEntity<Optional> createProduct(@RequestBody Producto producto){
        Map<String, String> response = new LinkedHashMap<>();
        try{

            productoRepository.save(producto);
            return message.viewMessage(HttpStatus.OK,"success","registered user success!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.INTERNAL_SERVER_ERROR,"error","An error occurred while registering the user!");
        }


    }



    @RequestMapping(value="api/products/{id}",method=RequestMethod.DELETE)
    public ResponseEntity<Optional> deleteProduct(@PathVariable Long id){
        Map<String, String> response = new HashMap<>();
        try{
            Producto producto=productoRepository.findById(id).get();
            productoRepository.delete(producto);


            return message.viewMessage(HttpStatus.OK,"success","Product delete success!!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND,"error","User not found!");
        }
    }
}
