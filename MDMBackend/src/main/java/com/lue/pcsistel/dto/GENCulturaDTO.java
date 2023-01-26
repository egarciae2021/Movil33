package com.lue.pcsistel.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;


public class GENCulturaDTO implements Serializable {

	private static final long serialVersionUID = 1757263271309335040L;
	private Integer pinCodCul;
    private String vcCodCul;
    private String vcNomCul;
    private Integer finCodMon;
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
    private boolean btVig;
    private BigDecimal dcIGV;
    private GENPaisDTO finCodPai;
    private Collection<GENClienteDTO> gENClienteCollection;
	public Integer getPinCodCul() {
		return pinCodCul;
	}
	public void setPinCodCul(Integer pinCodCul) {
		this.pinCodCul = pinCodCul;
	}
	public String getVcCodCul() {
		return vcCodCul;
	}
	public void setVcCodCul(String vcCodCul) {
		this.vcCodCul = vcCodCul;
	}
	public String getVcNomCul() {
		return vcNomCul;
	}
	public void setVcNomCul(String vcNomCul) {
		this.vcNomCul = vcNomCul;
	}
	public Integer getFinCodMon() {
		return finCodMon;
	}
	public void setFinCodMon(Integer finCodMon) {
		this.finCodMon = finCodMon;
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
	public boolean isBtVig() {
		return btVig;
	}
	public void setBtVig(boolean btVig) {
		this.btVig = btVig;
	}
	public BigDecimal getDcIGV() {
		return dcIGV;
	}
	public void setDcIGV(BigDecimal dcIGV) {
		this.dcIGV = dcIGV;
	}
	public GENPaisDTO getFinCodPai() {
		return finCodPai;
	}
	public void setFinCodPai(GENPaisDTO finCodPai) {
		this.finCodPai = finCodPai;
	}
	public Collection<GENClienteDTO> getgENClienteCollection() {
		return gENClienteCollection;
	}
	public void setgENClienteCollection(Collection<GENClienteDTO> gENClienteCollection) {
		this.gENClienteCollection = gENClienteCollection;
	}
	
  
}
