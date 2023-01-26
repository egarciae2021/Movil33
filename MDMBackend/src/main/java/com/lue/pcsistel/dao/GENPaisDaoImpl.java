package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.GENPais;
import org.springframework.stereotype.Repository;

/**
 *
 * @author lue
 */

@Repository("genPaisDao")
public class GENPaisDaoImpl extends AbstractDao<Integer,GENPais> implements GENPaisDao{

    @Override
    public GENPais findById(Integer id) {
      return  getByKey(id);
    }

    @Override
    public void save(GENPais entity) {
        persist(entity);
    }
    
}
