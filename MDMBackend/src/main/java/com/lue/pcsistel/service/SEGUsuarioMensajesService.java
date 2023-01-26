package com.lue.pcsistel.service;

import com.lue.pcsistel.model.SEGUsuarioMensajes;

/**
 *
 * @author lue
 */
public interface SEGUsuarioMensajesService {
    
     SEGUsuarioMensajes findById(Integer id);

	 void save(SEGUsuarioMensajes entity); 

	 void update(SEGUsuarioMensajes entity); 

	 void delete(SEGUsuarioMensajes entity);
}
