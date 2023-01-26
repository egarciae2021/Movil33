package com.lue.pcsistel.service;

import com.lue.pcsistel.dao.SEGUsuarioMensajesDao;
import com.lue.pcsistel.model.SEGUsuarioMensajes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author lue
 */

@Service("segUsuarioMensajesService")
@Transactional
public class SEGUsuarioMensajesServiceImpl implements SEGUsuarioMensajesService{

    @Autowired
     private SEGUsuarioMensajesDao segUsuarioMensajesDao;
    
    @Override
    public SEGUsuarioMensajes findById(Integer id) {
      return  segUsuarioMensajesDao.getByKey(id);
    }

    @Override
    public void save(SEGUsuarioMensajes entity) {
        segUsuarioMensajesDao.persist(entity);
    }

    @Override
    public void update(SEGUsuarioMensajes entity) {
        segUsuarioMensajesDao.update(entity);
    }

    @Override
    public void delete(SEGUsuarioMensajes entity) {
        segUsuarioMensajesDao.delete(entity);
    }
    
}
