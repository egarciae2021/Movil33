package com.lue.pcsistel.dao;

import java.util.List;

import com.lue.pcsistel.model.GENCultura;

/**
 *
 * @author lue
 */
public interface GENCulturaDao {
    
    GENCultura findById(Integer id);

	 void save(GENCultura entity); 

	 void update(GENCultura entity); 

	 void delete(GENCultura entity);

	 List<Object[]>  getCodCulAndId();
}
