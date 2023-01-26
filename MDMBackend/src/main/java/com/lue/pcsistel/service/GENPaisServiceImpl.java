package com.lue.pcsistel.service;

import com.lue.pcsistel.dao.GENPaisDao;
import com.lue.pcsistel.model.GENPais;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author lue
 */

@Service("genPaisService")
@Transactional
public class GENPaisServiceImpl implements GENPaisService{
    
    @Autowired
    private GENPaisDao genPaisDao;

    @Override
    public GENPais findById(Integer id) {
        return genPaisDao.findById(id);
    }

    @Override
    public void save(GENPais entity) {
       genPaisDao.save(entity);
    }

    @Override
    public void update(GENPais entity) {
      genPaisDao.update(entity);
    }

    @Override
    public void delete(GENPais entity) {
       genPaisDao.delete(entity);
    }
    
}
