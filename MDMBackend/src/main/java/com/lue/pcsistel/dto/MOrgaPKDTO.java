package com.lue.pcsistel.dto;

import java.io.Serializable;

public class MOrgaPKDTO implements Serializable {
	private static final long serialVersionUID = -2686677804064947406L;
	private int finCodCli;
	private int oRGAPinCODINT;
	
	public MOrgaPKDTO(){}
	public MOrgaPKDTO(int finCodCli, int oRGAPinCODINT) {
		this.finCodCli = finCodCli;
		this.oRGAPinCODINT = oRGAPinCODINT;
	}

	public int getFinCodCli() {
		return finCodCli;
	}

	public void setFinCodCli(int finCodCli) {
		this.finCodCli = finCodCli;
	}

	public int getoRGAPinCODINT() {
		return oRGAPinCODINT;
	}

	public void setoRGAPinCODINT(int oRGAPinCODINT) {
		this.oRGAPinCODINT = oRGAPinCODINT;
	}

}
