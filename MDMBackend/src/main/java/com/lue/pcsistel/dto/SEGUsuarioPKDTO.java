package com.lue.pcsistel.dto;

import java.io.Serializable;

/**
 *
 * @author lue
 */
public class SEGUsuarioPKDTO implements Serializable {

	private static final long serialVersionUID = 4251162188736966373L;
	private int finCodCli;
	private int pinCod;

	public int getFinCodCli() {
		return finCodCli;
	}

	public void setFinCodCli(int finCodCli) {
		this.finCodCli = finCodCli;
	}

	public int getPinCod() {
		return pinCod;
	}

	public void setPinCod(int pinCod) {
		this.pinCod = pinCod;
	}

}
