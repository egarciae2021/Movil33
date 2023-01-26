package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.MOVEstado;
import org.springframework.stereotype.Repository;

/**
 *
 * @author lue
 */

@Repository("movEstadoDao")
public class MOVEstadoDaoImpl extends AbstractDao<Integer,MOVEstado> implements MOVEstadoDao{

    @Override
    public MOVEstado findById(Integer id) {
        return   getByKey(id);
    }

    @Override
    public void save(MOVEstado entity) {
        persist(entity);
    }
    
}
