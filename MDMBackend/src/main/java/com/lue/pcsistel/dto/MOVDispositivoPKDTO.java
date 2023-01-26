package com.lue.pcsistel.dto;

import java.io.Serializable;

/**
 *
 * @author lue
 */
public class MOVDispositivoPKDTO implements Serializable {

	private static final long serialVersionUID = -6222145098876544934L;
	private int finCodCli;
	private String pvcCodIMEI;

	public int getFinCodCli() {
		return finCodCli;
	}

	public void setFinCodCli(int finCodCli) {
		this.finCodCli = finCodCli;
	}

	public String getPvcCodIMEI() {
		return pvcCodIMEI;
	}

	public void setPvcCodIMEI(String pvcCodIMEI) {
		this.pvcCodIMEI = pvcCodIMEI;
	}

	@Override
	public String toString() {
		return "MOVDispositivoPKDTO [finCodCli=" + finCodCli + ", pvcCodIMEI=" + pvcCodIMEI + "]";
	}

}
