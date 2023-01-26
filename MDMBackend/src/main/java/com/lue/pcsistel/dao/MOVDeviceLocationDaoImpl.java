package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.MOVDeviceLocation;
import org.springframework.stereotype.Repository;

/**
 *
 * @author lue
 */

@Repository("movDeviceLocationDao")
public class MOVDeviceLocationDaoImpl extends AbstractDao<Long,MOVDeviceLocation>implements MOVDeviceLocationDao{

    @Override
    public MOVDeviceLocation findById(Long id) {
       return  getByKey(id);
    }

    @Override
    public void save(MOVDeviceLocation entity) {
       persist(entity);
    }

	
    
}
