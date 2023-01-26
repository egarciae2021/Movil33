package com.lue.pcsistel.dto;

import java.io.Serializable;

public class SEGUsuarioConfiguracionDTO implements Serializable {
	private static final long serialVersionUID = -3942410368197126304L;
	protected SEGUsuarioConfiguracionPKDTO sEGUsuarioConfiguracionPK;
	private Integer finCodIdi;
	private String vcSimDec;
	private Integer dcNumDec;
	private String vcSimSepMil;
	private String vcSimNeg;
	private String vcHorCor;
	private String vcHorLar;
	private String vcSimAM;
	private String vcSimPM;
	private String vcFecCor;
	private String vcFecLar;
	private String vcTem;
	private SEGUsuarioDTO sEGUsuario;
	public SEGUsuarioConfiguracionPKDTO getsEGUsuarioConfiguracionPK() {
		return sEGUsuarioConfiguracionPK;
	}
	public void setsEGUsuarioConfiguracionPK(SEGUsuarioConfiguracionPKDTO sEGUsuarioConfiguracionPK) {
		this.sEGUsuarioConfiguracionPK = sEGUsuarioConfiguracionPK;
	}
	public Integer getFinCodIdi() {
		return finCodIdi;
	}
	public void setFinCodIdi(Integer finCodIdi) {
		this.finCodIdi = finCodIdi;
	}
	public String getVcSimDec() {
		return vcSimDec;
	}
	public void setVcSimDec(String vcSimDec) {
		this.vcSimDec = vcSimDec;
	}
	public Integer getDcNumDec() {
		return dcNumDec;
	}
	public void setDcNumDec(Integer dcNumDec) {
		this.dcNumDec = dcNumDec;
	}
	public String getVcSimSepMil() {
		return vcSimSepMil;
	}
	public void setVcSimSepMil(String vcSimSepMil) {
		this.vcSimSepMil = vcSimSepMil;
	}
	public String getVcSimNeg() {
		return vcSimNeg;
	}
	public void setVcSimNeg(String vcSimNeg) {
		this.vcSimNeg = vcSimNeg;
	}
	public String getVcHorCor() {
		return vcHorCor;
	}
	public void setVcHorCor(String vcHorCor) {
		this.vcHorCor = vcHorCor;
	}
	public String getVcHorLar() {
		return vcHorLar;
	}
	public void setVcHorLar(String vcHorLar) {
		this.vcHorLar = vcHorLar;
	}
	public String getVcSimAM() {
		return vcSimAM;
	}
	public void setVcSimAM(String vcSimAM) {
		this.vcSimAM = vcSimAM;
	}
	public String getVcSimPM() {
		return vcSimPM;
	}
	public void setVcSimPM(String vcSimPM) {
		this.vcSimPM = vcSimPM;
	}
	public String getVcFecCor() {
		return vcFecCor;
	}
	public void setVcFecCor(String vcFecCor) {
		this.vcFecCor = vcFecCor;
	}
	public String getVcFecLar() {
		return vcFecLar;
	}
	public void setVcFecLar(String vcFecLar) {
		this.vcFecLar = vcFecLar;
	}
	public String getVcTem() {
		return vcTem;
	}
	public void setVcTem(String vcTem) {
		this.vcTem = vcTem;
	}
	public SEGUsuarioDTO getsEGUsuario() {
		return sEGUsuario;
	}
	public void setsEGUsuario(SEGUsuarioDTO sEGUsuario) {
		this.sEGUsuario = sEGUsuario;
	}

	
}
