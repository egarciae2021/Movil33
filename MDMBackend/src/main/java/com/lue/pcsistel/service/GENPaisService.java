package com.lue.pcsistel.service;

import com.lue.pcsistel.model.GENPais;

/**
 *
 * @author lue
 */
public interface GENPaisService {
    
      GENPais findById(Integer id);

	 void save( GENPais entity); 

	 void update( GENPais entity); 

	 void delete( GENPais entity);
}
