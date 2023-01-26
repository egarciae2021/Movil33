package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.SEGUsuarioConfiguracion;

/**
 *
 * @author lue
 */
public interface SEGUsuarioConfiguracionDao {
   
      SEGUsuarioConfiguracion getByKey(Integer id);

	 void persist(SEGUsuarioConfiguracion entity); 

	 void update(SEGUsuarioConfiguracion entity); 

	 void delete(SEGUsuarioConfiguracion entity);
}
