package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.MOVModeloDispositivo;

/**
 *
 * @author lue
 */
public interface MOVModeloDispositivoDao {
    
     MOVModeloDispositivo getByKey(Integer id);

	 void persist(MOVModeloDispositivo entity); 

	 void update(MOVModeloDispositivo entity); 

	 void delete(MOVModeloDispositivo entity);

	 Integer findModelPk(String deviceName);
	 Integer save(MOVModeloDispositivo entity); 
}
