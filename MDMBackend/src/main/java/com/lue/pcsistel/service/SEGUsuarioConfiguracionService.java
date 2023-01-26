package com.lue.pcsistel.service;

import com.lue.pcsistel.model.SEGUsuarioConfiguracion;

/**
 *
 * @author lue
 */
public interface SEGUsuarioConfiguracionService {
 
     SEGUsuarioConfiguracion findById(Integer id);

	 void save(SEGUsuarioConfiguracion entity); 

	 void update(SEGUsuarioConfiguracion entity); 

	 void delete(SEGUsuarioConfiguracion entity);
}
