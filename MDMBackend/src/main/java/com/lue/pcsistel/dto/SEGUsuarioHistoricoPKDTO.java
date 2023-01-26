package com.lue.pcsistel.dto;

import java.io.Serializable;

/**
 *
 * @author lue
 */
public class SEGUsuarioHistoricoPKDTO implements Serializable {
	private static final long serialVersionUID = 4197769694890148444L;
	private int finCodCli;
	private int pinId;

	public int getFinCodCli() {
		return finCodCli;
	}

	public void setFinCodCli(int finCodCli) {
		this.finCodCli = finCodCli;
	}

	public int getPinId() {
		return pinId;
	}

	public void setPinId(int pinId) {
		this.pinId = pinId;
	}

}
