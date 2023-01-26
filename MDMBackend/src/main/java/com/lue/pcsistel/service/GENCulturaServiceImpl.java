package com.lue.pcsistel.service;

import com.lue.pcsistel.dao.GENCulturaDao;
import com.lue.pcsistel.model.GENCultura;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author lue
 */

@Service("genCulturaService")
@Transactional
public class GENCulturaServiceImpl implements GENCulturaService {

	@Autowired
	private GENCulturaDao genCulturaDao;

	@Override
	public GENCultura findById(Integer id) {
		return genCulturaDao.findById(id);
	}

	@Override
	public void save(GENCultura entity) {
		genCulturaDao.save(entity);
	}

	@Override
	public void update(GENCultura entity) {
		genCulturaDao.update(entity);
	}

	@Override
	public void delete(GENCultura entity) {
		genCulturaDao.delete(entity);
	}

	@Override
	public List<Object[]> getCodCulAndId() {
		return genCulturaDao.getCodCulAndId();
	}

}
