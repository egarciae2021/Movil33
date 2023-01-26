package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.MOVEstado;

/**
 *
 * @author lue
 */
public interface MOVEstadoDao {
    
     MOVEstado findById(Integer id);

	 void save( MOVEstado entity); 

	 void update( MOVEstado entity); 

	 void delete( MOVEstado entity);
}
