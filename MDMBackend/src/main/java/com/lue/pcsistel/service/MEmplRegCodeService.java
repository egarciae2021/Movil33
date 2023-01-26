package com.lue.pcsistel.service;

import com.lue.pcsistel.model.MEmplRegCode;

/**
 *
 * @author lue
 */
public interface MEmplRegCodeService {
    
     MEmplRegCode findById(Long id);

	 void save(MEmplRegCode entity); 

	 void update(MEmplRegCode entity); 

	 void delete(MEmplRegCode entity);
         
     MEmplRegCode checkRegCode(String code);

	String geTDeviceCode(String id);
}
