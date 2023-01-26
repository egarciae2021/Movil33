package com.lue.pcsistel.service;

import com.lue.pcsistel.dao.SEGUsuarioConfiguracionDao;
import com.lue.pcsistel.model.SEGUsuarioConfiguracion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author lue
 */

@Service("segUsuarioConfiguracionService")
@Transactional
public class SEGUsuarioConfiguracionServiceImpl implements SEGUsuarioConfiguracionService{

    @Autowired
    private SEGUsuarioConfiguracionDao  segUsuarioConfiguracionDao;
    
    @Override
    public SEGUsuarioConfiguracion findById(Integer id) {
        return segUsuarioConfiguracionDao.getByKey(id);
    }

    @Override
    public void save(SEGUsuarioConfiguracion entity) {
       segUsuarioConfiguracionDao.persist(entity);
    }

    @Override
    public void update(SEGUsuarioConfiguracion entity) {
        segUsuarioConfiguracionDao.update(entity);
    }

    @Override
    public void delete(SEGUsuarioConfiguracion entity) {
        segUsuarioConfiguracionDao.delete(entity);
    }
    
}
