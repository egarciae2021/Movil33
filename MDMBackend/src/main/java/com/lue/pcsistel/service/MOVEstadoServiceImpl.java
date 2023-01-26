package com.lue.pcsistel.service;

import com.lue.pcsistel.dao.MOVEstadoDao;
import com.lue.pcsistel.model.MOVEstado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author lue
 */

@Service("movEstadoService")
@Transactional
public class MOVEstadoServiceImpl implements  MOVEstadoService{

   @Autowired
   private MOVEstadoDao movEstadoDao;
    
    @Override
    public MOVEstado findById(Integer id) {
        return movEstadoDao.findById(id);
    }

    @Override
    public void save(MOVEstado entity) {
        movEstadoDao.save(entity);
    }

    @Override
    public void update(MOVEstado entity) {
        movEstadoDao.update(entity);
    }

    @Override
    public void delete(MOVEstado entity) {
       movEstadoDao.delete(entity);
    }
    
}
