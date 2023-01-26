package com.lue.pcsistel.dto;

import java.io.Serializable;

public class MOVLineaPKDTO implements Serializable {
	private static final long serialVersionUID = 58757763635908390L;
	private int finCodCli;
	private String pvcNum;

	public int getFinCodCli() {
		return finCodCli;
	}

	public void setFinCodCli(int finCodCli) {
		this.finCodCli = finCodCli;
	}

	public String getPvcNum() {
		return pvcNum;
	}

	public void setPvcNum(String pvcNum) {
		this.pvcNum = pvcNum;
	}

}
