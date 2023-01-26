package com.lue.pcsistel.service;

import com.lue.pcsistel.model.MOVLinea;

/**
 *
 * @author lue
 */
public interface MOVLineaService {
    
      MOVLinea findById(Integer id);

	 void save( MOVLinea entity); 

	 void update( MOVLinea entity); 

	 void delete( MOVLinea entity);
}
