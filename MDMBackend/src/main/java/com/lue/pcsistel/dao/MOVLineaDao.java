package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.MOVLinea;

/**
 *
 * @author lue
 */
public interface MOVLineaDao {
    
     MOVLinea getByKey(Integer id);

	 void persist( MOVLinea entity); 

	 void update( MOVLinea entity); 

	 void delete( MOVLinea entity);
}
