package com.lue.pcsistel.service;

import com.lue.pcsistel.model.SEGPerfil;

/**
 *
 * @author lue
 */
public interface SEGPerfilService {
    
    SEGPerfil findById(int id);

	String findRoleByCliIdAndUserId(int finCodCli, int pinCod);
}
