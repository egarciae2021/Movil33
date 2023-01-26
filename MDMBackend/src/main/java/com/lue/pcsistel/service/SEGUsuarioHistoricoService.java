package com.lue.pcsistel.service;

import com.lue.pcsistel.model.SEGUsuarioHistorico;

/**
 *
 * @author lue
 */
public interface SEGUsuarioHistoricoService {
    
     SEGUsuarioHistorico findById(Integer id);

	 void save(SEGUsuarioHistorico entity); 

	 void update(SEGUsuarioHistorico entity); 

	 void delete(SEGUsuarioHistorico entity);
}
