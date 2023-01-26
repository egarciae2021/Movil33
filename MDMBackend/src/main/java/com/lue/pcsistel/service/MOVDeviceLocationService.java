package com.lue.pcsistel.service;

import com.lue.pcsistel.model.MOVDeviceLocation;

/**
 *
 * @author lue
 */
public interface MOVDeviceLocationService {
    
     MOVDeviceLocation findById(Long id);

	 void save(MOVDeviceLocation entity); 

	 void update(MOVDeviceLocation entity); 

	 void delete(MOVDeviceLocation entity);

}
