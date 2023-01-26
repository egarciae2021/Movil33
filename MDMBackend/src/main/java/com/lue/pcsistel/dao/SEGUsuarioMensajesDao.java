package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.SEGUsuarioMensajes;

/**
 *
 * @author lue
 */
public interface SEGUsuarioMensajesDao {
    
     SEGUsuarioMensajes getByKey(Integer id);

	 void persist(SEGUsuarioMensajes entity); 

	 void update(SEGUsuarioMensajes entity); 

	 void delete(SEGUsuarioMensajes entity);
}
