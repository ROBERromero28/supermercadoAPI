package com.supermercado.producto;

import com.supermercado.entity.Producto;
import com.supermercado.repository.ProductoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import org.springframework.test.annotation.Rollback;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(value = false)


class ProductApplicationTests {
	@Autowired
	private TestEntityManager entityManager;
	@Autowired
	private ProductoRepository repository;

	@Test
	public void testCreateProduct(){
		Producto producto= new Producto();
		producto.setNombre("salsa mayonesa");
		producto.setMarca("bary");
		producto.setPrecio("2500");
		producto.setPeso("22g");

		Producto savedProduct = repository.save(producto);
		Producto exitsProduct = entityManager.find(Producto.class, savedProduct.getId());

		assertEquals(producto.getNombre(), exitsProduct.getNombre());


	}

}
