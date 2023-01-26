package com.lue.pcsistel.dao;

import java.util.List;

import javax.persistence.Query;

import org.springframework.stereotype.Repository;

import com.lue.pcsistel.model.MOVModeloDispositivo;

/**
 *
 * @author lue
 */

@Repository("movModeloDispositivoDao")
public class MOVModeloDispositivoDaoImpl extends AbstractDao<Integer,MOVModeloDispositivo> implements  MOVModeloDispositivoDao{

	@SuppressWarnings("deprecation")
	@Override
	public Integer findModelPk(String deviceName) {
	 Integer id=0;
		try{
			return (Integer) getSession().createNamedQuery("MOVModeloDispositivo.findPinCodByvcNomModelo")
			.setString("vcNom", deviceName).getSingleResult();
	
	 }catch(Exception e){
		 return id;
	 }
		
	}

	@Override
	public MOVModeloDispositivo getByKey(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void persist(MOVModeloDispositivo entity) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void update(MOVModeloDispositivo entity) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete(MOVModeloDispositivo entity) {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public Integer save(MOVModeloDispositivo entity) {
		return (Integer) getSession().save(entity);
		
	}
    
}
