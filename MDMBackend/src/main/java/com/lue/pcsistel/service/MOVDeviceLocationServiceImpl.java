package com.lue.pcsistel.service;

import com.lue.pcsistel.dao.MOVDeviceLocationDao;
import com.lue.pcsistel.model.MOVDeviceLocation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author lue
 */

@Service("movDeviceLocationService")
@Transactional
public class MOVDeviceLocationServiceImpl implements MOVDeviceLocationService{

    @Autowired
    private MOVDeviceLocationDao movDeviceLocationDao;
    
    @Override
    public MOVDeviceLocation findById(Long id) {
        return movDeviceLocationDao.findById(id);
    }

    @Override
    public void save(MOVDeviceLocation entity) {
        movDeviceLocationDao.save(entity);
    }

    @Override
    public void update(MOVDeviceLocation entity) {
       movDeviceLocationDao.update(entity);
    }

    @Override
    public void delete(MOVDeviceLocation entity) {
        movDeviceLocationDao.delete(entity);      
    }

	
    
}
