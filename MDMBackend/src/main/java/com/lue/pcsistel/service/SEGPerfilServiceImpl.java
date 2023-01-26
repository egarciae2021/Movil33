package com.lue.pcsistel.service;

import com.lue.pcsistel.dao.SEGPerfilDao;
import com.lue.pcsistel.model.SEGPerfil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author lue
 */

@Service("segPerfilService")
@Transactional
public class SEGPerfilServiceImpl implements SEGPerfilService{
    
    @Autowired
    private SEGPerfilDao sEGPerfilDao;

    @Override
    public SEGPerfil findById(int id) {
        return sEGPerfilDao.findById(id);
    }

	@Override
	public String findRoleByCliIdAndUserId(int finCodCli, int pinCod) {
		return sEGPerfilDao.findRoleByCliIdAndUserId(finCodCli,pinCod);
	}
    
    
}
