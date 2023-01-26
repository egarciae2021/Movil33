package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.MOrga;

import java.util.List;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author lue
 */

@Repository("mOrgaDao")
public class MOrgaDaoImpl extends AbstractDao<Integer, MOrga> implements MOrgaDao {

	@SuppressWarnings("unchecked")
	@Override
	public List<MOrga> findAll() {
		return getSession().getNamedQuery("MOrga.findAll").getResultList();
	}

	@SuppressWarnings("deprecation")
	@Transactional
	@Override
	public void getByid(Integer id) {
		getSession().getNamedQuery("MOrga.updateByORGAbtEST").setInteger("oRGAPinCODINT", id).executeUpdate();
	}

	@SuppressWarnings("deprecation")
	@Override
	public MOrga getById(Integer id) {
		return (MOrga) getSession().getNamedQuery("MOrga.findByORGAPinCODINT").setInteger("oRGAPinCODINT", id)
				.getSingleResult();
	}

	@SuppressWarnings("deprecation")
	@Override
	public MOrga findByIdIsEST(Integer id) {
		return (MOrga) getSession().getNamedQuery("MOrga.findByORGAPinCODINTisEST").setInteger("oRGAPinCODINT", id)
				.getSingleResult();
	}

	@Override
	public void updateMOrga(MOrga mOrga) {
		getSession().update(mOrga);

	}

	@Override
	public void saveMOrage(MOrga mOrga) {
		getSession().save(mOrga);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Object[]> findMOrgaIdAndNameIsOREST() {
		return getSession().getNamedQuery("MOrga.findmOrgaPKAndoRGAvcCODORGByoRGAbtEST").list();
	}

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<MOrga> findMOrgaByGENClientId(Integer genclientPk) {
		return getSession().getNamedQuery("MOrga.findMOrgaByGENClintPK").setInteger("pinCodCli", genclientPk).list();
	}

	@Override
	public Long countMOrgaEST() {
		return (Long) getSession().getNamedQuery("MOrga.countMOrgaIsEST").getSingleResult();
	}

	@SuppressWarnings("deprecation")
	@Override
	public Integer ifExistId(int id) {
		Integer idValue=0;
		try{
			idValue= (Integer) getSession().getNamedQuery("MOrga.findPkifExistIdByPk")
					.setInteger("oRGAPinCODINT", id)
					.getSingleResult();
		}catch(Exception e){
			e.getMessage();
		}
		return idValue;
		
	}

	@SuppressWarnings("deprecation")
	@Override
	public Integer findClientIdByMOrgaId(Integer id) {
		Integer idValue=0;
		try{
			idValue= (Integer) getSession().getNamedQuery("MOrga.findClientIdByMOrgaId")
					.setInteger("oRGAPinCODINT", id)
					.getSingleResult();
		}catch(Exception e){
			e.getMessage();
		}
		return idValue;
	}

	@SuppressWarnings("deprecation")
	public MOrga findMOrgaByoRGAPinCODINTPK(Integer id) {
	return (MOrga) getSession().getNamedQuery("MOrga.findMOrgaByoRGAPinCODINT")
			.setInteger("oRGAPinCODINT", id).getSingleResult();
	}

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<Object[]> findMOrgaIdAndNameByClientId(Integer id) {
		return getSession().getNamedQuery("MOrga.findMOrgaIdAndNameByClientIdEST")
		.setInteger("finCodCli", id).list();
		 
	}

	@SuppressWarnings("deprecation")
	@Override
	public Long countMOrgaByClientFk(Integer clientFk) {
		return (Long) getSession().getNamedQuery("MOrga.countMOrgaByClientFk")
				.setInteger("finCodCli", clientFk).getSingleResult();
	}

	@SuppressWarnings("deprecation")
	@Override
	public MOrga findByIdAndCliId(Integer id, Integer clientFk) {
		return (MOrga) getSession().getNamedQuery("MOrga.findByIdAndCliId")
		.setInteger("oRGAPinCODINT", id)
		.setInteger("finCodCli", clientFk).getSingleResult();
	}

	
}
