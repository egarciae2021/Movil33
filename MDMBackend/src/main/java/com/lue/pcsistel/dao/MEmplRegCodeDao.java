package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.MEmplRegCode;

/**
 *
 * @author lue
 */
public interface MEmplRegCodeDao {
    
     
         MEmplRegCode findById(Long id);

	 void save(MEmplRegCode entity); 

	 void update(MEmplRegCode entity); 

	 void delete(MEmplRegCode entity);
         
          void merge(MEmplRegCode entity);
         
          MEmplRegCode checkRegCode(String code);
}
