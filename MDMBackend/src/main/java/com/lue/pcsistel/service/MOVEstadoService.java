package com.lue.pcsistel.service;

import com.lue.pcsistel.model.MOVEstado;

/**
 *
 * @author lue
 */
public interface MOVEstadoService {
    
      MOVEstado findById(Integer id);

	 void save( MOVEstado entity); 

	 void update( MOVEstado entity); 

	 void delete( MOVEstado entity);
}
