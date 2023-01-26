package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.SEGUsuarioHistorico;

/**
 *
 * @author lue
 */
public interface SEGUsuarioHistoricoDao {
    
     SEGUsuarioHistorico getByKey(Integer id);

	 void persist(SEGUsuarioHistorico entity); 

	 void update(SEGUsuarioHistorico entity); 

	 void delete(SEGUsuarioHistorico entity);
}
