/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lue.pcsistel.dto;

import java.io.Serializable;

/**
 *
 * @author lue
 */
public class SEGUsuarioConfiguracionPKDTO implements Serializable {

	private static final long serialVersionUID = -8210105640042558615L;
	private int finCodCli;
	private int finCodUsu;

	public int getFinCodCli() {
		return finCodCli;
	}

	public void setFinCodCli(int finCodCli) {
		this.finCodCli = finCodCli;
	}

	public int getFinCodUsu() {
		return finCodUsu;
	}

	public void setFinCodUsu(int finCodUsu) {
		this.finCodUsu = finCodUsu;
	}

}
