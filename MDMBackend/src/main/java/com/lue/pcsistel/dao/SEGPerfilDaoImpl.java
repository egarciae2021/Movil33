package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.SEGPerfil;
import org.springframework.stereotype.Repository;

/**
 *
 * @author lue
 */
@Repository("segPerfilDao")
public class SEGPerfilDaoImpl extends AbstractDao<Integer,SEGPerfil> implements  SEGPerfilDao {

    @Override
    public SEGPerfil findById(int id) {
        return findById(id);
    }

	@SuppressWarnings("deprecation")
	@Override
	public String findRoleByCliIdAndUserId(int finCodCli, int pinCod) {
		String role=null;
		try{
			role=(String) getSession().getNamedQuery("SEGPerfil.findRoleByCliIdAndUserId")
			.setInteger("finCodCli", finCodCli)
			.setInteger("pinCod", pinCod)
			.getSingleResult();
		}catch(Exception e){
			e.printStackTrace();
			role=null;
		}
		return role;
	}
    
}
