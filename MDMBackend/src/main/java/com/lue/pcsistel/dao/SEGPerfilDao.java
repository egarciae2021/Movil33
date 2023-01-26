package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.SEGPerfil;

/**
 *
 * @author lue
 */
public interface SEGPerfilDao {
    
     SEGPerfil findById(int id);

	String findRoleByCliIdAndUserId(int finCodCli, int pinCod);
}
