package com.lue.pcsistel.service;

import com.lue.pcsistel.dao.MOVLineaDao;
import com.lue.pcsistel.model.MOVLinea;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author lue
 */

@Service("movLineaService")
@Transactional
public class MOVLineaServiceImpl implements MOVLineaService{

    @Autowired
    private MOVLineaDao movLineaDao;
    
    @Override
    public MOVLinea findById(Integer id) {
        return movLineaDao.getByKey(id);
    }

    @Override
    public void save(MOVLinea entity) {
        movLineaDao.persist(entity);
    }

    @Override
    public void update(MOVLinea entity) {
        movLineaDao.update(entity);
    }

    @Override
    public void delete(MOVLinea entity) {
       movLineaDao.delete(entity);
    }
    
}
