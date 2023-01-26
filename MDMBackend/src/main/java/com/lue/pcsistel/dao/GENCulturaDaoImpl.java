package com.lue.pcsistel.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.lue.pcsistel.model.GENCultura;

/**
 *
 * @author lue
 */

@Repository("genCulturaDao")
public class GENCulturaDaoImpl extends AbstractDao<Integer, GENCultura> implements GENCulturaDao {

	@Override
	public GENCultura findById(Integer id) {
		return getByKey(id);
	}

	@Override
	public void save(GENCultura entity) {
		persist(entity);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> getCodCulAndId() {
		return getSession().getNamedQuery("GENCultura.findpinCodCulAndvcNomCul").list();

	}

}
