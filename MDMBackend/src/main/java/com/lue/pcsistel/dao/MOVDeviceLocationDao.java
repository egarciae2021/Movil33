package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.MOVDeviceLocation;

/**
 *
 * @author lue
 */
public interface MOVDeviceLocationDao {
    
     MOVDeviceLocation findById(Long id);

	 void save(MOVDeviceLocation entity); 

	 void update(MOVDeviceLocation entity); 

	 void delete(MOVDeviceLocation entity);

}
