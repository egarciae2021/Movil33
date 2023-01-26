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
public class MEmplPKDTO implements Serializable {

	private static final long serialVersionUID = 1672893559170973668L;
	private int finCodCli;
	private String eMPLPvcCODEMP;

	public int getFinCodCli() {
		return finCodCli;
	}

	public void setFinCodCli(int finCodCli) {
		this.finCodCli = finCodCli;
	}

	public String geteMPLPvcCODEMP() {
		return eMPLPvcCODEMP;
	}

	public void seteMPLPvcCODEMP(String eMPLPvcCODEMP) {
		this.eMPLPvcCODEMP = eMPLPvcCODEMP;
	}

	@Override
	public String toString() {
		return "MEmplPKDTO [finCodCli=" + finCodCli + ", eMPLPvcCODEMP=" + eMPLPvcCODEMP + "]";
	}

}
