package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.GENPais;

/**
 *
 * @author lue
 */
public interface GENPaisDao {
    
    GENPais findById(Integer id);

	 void save( GENPais entity); 

	 void update( GENPais entity); 

	 void delete( GENPais entity);
}
