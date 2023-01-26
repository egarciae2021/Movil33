package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.MEmpl;
import com.lue.pcsistel.model.MEmplPK;

import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

/**
 *
 * @author lue
 */

@Repository("mEmplDao")
public class MEmplDaoImpl extends AbstractDao<MEmplPK,MEmpl> implements MEmplDao{

    @Override
    public MEmpl findById(MEmplPK id) {

    	
    	return getByKey(id);
    }

    @SuppressWarnings("deprecation")
	@Override
    public Boolean save(MEmpl entity) {
    
    	//getSession().saveOrUpdate(entity);
    	
    	Query query = getSession().createSQLQuery("INSERT INTO M_EMPL (F_inCodCli, EMPL_P_vcCODEMP,EMPL_F_inCODINT,EMPL_vcNOMEMP,EMPL_vcUBIFIS,EMPL_vcCORPER,EMPL_vcCORJFT,EMPL_daFECINI,EMPL_btEST,EMPL_CodInt2,EMPL_F_inCODGRUORI) VALUES (:F_inCodCli, :EMPL_P_vcCODEMP,:EMPL_F_inCODINT,"
    			+ "		:EMPL_vcNOMEMP,:EMPL_vcUBIFIS,:EMPL_vcCORPER,:EMPL_vcCORJFT,:EMPL_daFECINI,:EMPL_btEST,:EMPL_CodInt2,:EMPL_F_inCODGRUORI)");
    	query.setParameter("F_inCodCli", entity.getMEmplPK().getFinCodCli());
    	query.setParameter("EMPL_P_vcCODEMP", entity.getMEmplPK().getEMPLPvcCODEMP());
    	query.setParameter("EMPL_F_inCODINT", entity.getMOrga().getMOrgaPK().getORGAPinCODINT());
    	query.setParameter("EMPL_vcNOMEMP", entity.getEMPLvcNOMEMP());
    	query.setParameter("EMPL_vcUBIFIS", entity.getEMPLvcUBIFIS());
    	query.setParameter("EMPL_vcCORPER", entity.getEMPLvcCORPER());
    	query.setParameter("EMPL_vcCORJFT", entity.getEMPLvcCORJFT());
    	query.setParameter("EMPL_daFECINI", entity.getEMPLdaFECINI());
    	query.setParameter("EMPL_btEST", entity.getEMPLbtEST());
    	query.setParameter("EMPL_CodInt2", entity.getEMPLCodInt2());
    	query.setParameter("EMPL_F_inCODGRUORI", entity.getEMPLFinCODGRUORI());
    	
    	
    	if( query.executeUpdate()>0){
    		return true;
    	}else{
    		return false;
    	}
    }

	@Override
	public List<MEmpl> findAdd() {
		
		return null;
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<MEmpl> findAllByMOrgaPK(Integer id) {
		return getSession().getNamedQuery("MEmpl.findAllEMPByMOrga")
				.setInteger("oRGAPinCODINT", id).getResultList();
	}

	@SuppressWarnings("deprecation")
	@Override
	public MEmpl findByIdMEmpl(String emplId) {
		return (MEmpl) getSession().getNamedQuery("MEmpl.findByEMPLPvcCODEMP")
				.setString("eMPLPvcCODEMP", emplId).getSingleResult();
		
	}

	@SuppressWarnings("deprecation")
	@Override
	public void detleteByMEmplPk(String mEmplId) {
		getSession().getNamedQuery("MEmpl.updateeMPLbtESTBymEmplPK")
		.setString("eMPLPvcCODEMP", mEmplId).executeUpdate();
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<MEmpl> findAllIsEST() {
		return getSession().getNamedQuery("MEmpl.findAllIsEST").list();
	}

	@Override
	public Long countMEmpl() {
		return (Long) getSession().getNamedQuery("MEmpl.countMEmplIsEST").getSingleResult();
	}
	
	public void saveOrUpdate(MEmpl mEmpl){
		getSession().saveOrUpdate(mEmpl);
	}
    @SuppressWarnings("unchecked")
	@Override
    public List<MEmpl> findAll() {
    	return getSession().getNamedQuery("MEmpl.findAll").list();
    }

	@SuppressWarnings("deprecation")
	@Override
	public String getMEmplIdById(String id) {
		String idValue="";
		try{
			idValue= (String) getSession()
			.getNamedQuery("MEmpl.findeMPLPvcCODEMPByeMPLPvcCODEMP")
			.setString("eMPLPvcCODEMP", id)
			.getSingleResult();
		}catch(Exception exception){
			idValue="";
		}
		return idValue;
	}
	@Override
	public void saveMEmpl(MEmpl entity) {
		entity.getMOrga().getMOrgaPK().getORGAPinCODINT();
	}
	
	
	@SuppressWarnings({ "deprecation", "unchecked"})
	@Override
	public List<Object[]> findAllAdminEmplIsEST(Integer clientId, Integer mOrga) {
		return	(List<Object[]>) getSession().getNamedQuery("MEmpl.findeMPLPvcCODEMPAndeMPLvcNOMEMPIsESTAndoRGAPinCODINT")
		.setInteger("oRGAPinCODINT", mOrga)//.setInteger("eMPLPvcCODEMP", mOrga)
		.list();
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<Object[]> findMEmplIdAndNameByMorgaId(Integer id) {
		return	(List<Object[]>) getSession().getNamedQuery("MEmpl.findeMPLPvcCODEMPAndeMPLvcNOMEMPIsESTAndoRGAPinCODINT")
				.setInteger("oRGAPinCODINT", id)
				.list();
	}

	@SuppressWarnings("deprecation")
	@Override
	public Long countMEmplByClientFk(Integer clientfk) {
		return (Long) getSession()
				.getNamedQuery("MEmpl.countMEmplByClientFk")
				.setInteger("finCodCli", clientfk)
				.getSingleResult();
	}
	
	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<MEmpl> findAllMEmplByCliId(Integer clientfk) {
		return getSession()
				.getNamedQuery("MEmpl.findAllMEmplByCliId")
				.setInteger("finCodCli", clientfk)
				.list();
	}

	@SuppressWarnings("deprecation")
	@Override
	public MEmpl findMEmplByPKAndCliId(String emplId, Integer clientFk) {
		return (MEmpl) getSession().getNamedQuery("MEmpl.findMEmplByPKAndCliId")
				.setString("eMPLPvcCODEMP", emplId)
				.setInteger("finCodCli", clientFk)
				.getSingleResult();
	}
}
