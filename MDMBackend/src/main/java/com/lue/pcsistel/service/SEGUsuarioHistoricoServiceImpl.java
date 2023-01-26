package com.lue.pcsistel.service;

import com.lue.pcsistel.dao.SEGUsuarioHistoricoDao;
import com.lue.pcsistel.model.SEGUsuarioHistorico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author lue
 */

@Service("segUsuarioHistoricoService")
@Transactional
public class SEGUsuarioHistoricoServiceImpl implements SEGUsuarioHistoricoService{

    
    @Autowired
    private SEGUsuarioHistoricoDao segUsuarioHistoricoDao;
    
    @Override
    public SEGUsuarioHistorico findById(Integer id) {
        return segUsuarioHistoricoDao.getByKey(id);
    }

    @Override
    public void save(SEGUsuarioHistorico entity) {
        segUsuarioHistoricoDao.persist(entity);
    }

    @Override
    public void update(SEGUsuarioHistorico entity) {
       segUsuarioHistoricoDao.update(entity);
    }

    @Override
    public void delete(SEGUsuarioHistorico entity) {
        segUsuarioHistoricoDao.delete(entity);
    }
    
}
