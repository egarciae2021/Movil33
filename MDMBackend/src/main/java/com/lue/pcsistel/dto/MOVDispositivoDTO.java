package com.lue.pcsistel.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

public class MOVDispositivoDTO implements Serializable {
	private static final long serialVersionUID = 4148538821406030795L;
	protected MOVDispositivoPKDTO mOVDispositivoPK;
	private String vcDes;
	private Date dtFecIng;
	private String vcObs;
	private Boolean btVig;
	private Boolean btSopLin;
	private String grupo;
	private Date fechaInicioContrato;
	private Date fechaFinContrato;
	private String vcDesModelo;
	private String serie;
	private String marca;
	private String nroFactura;
	private Date fechaFactura;
	private BigDecimal montoFactura;
	private BigDecimal dcMonto;
	private String pushToken;
	//private String authToken;
	private Collection<MOVLineaDTO> mOVLineaCollection=new ArrayList<>();
	private MEmplDTO mEmpl=new MEmplDTO();
	private MOVEstadoDTO finEst=new MOVEstadoDTO();
	private MOVModeloDispositivoDTO finCodModDis=new MOVModeloDispositivoDTO();

	public MOVDispositivoPKDTO getmOVDispositivoPK() {
		return mOVDispositivoPK;
	}

	public void setmOVDispositivoPK(MOVDispositivoPKDTO mOVDispositivoPK) {
		this.mOVDispositivoPK = mOVDispositivoPK;
	}

	public String getVcDes() {
		return vcDes;
	}

	public void setVcDes(String vcDes) {
		this.vcDes = vcDes;
	}

	public Date getDtFecIng() {
		return dtFecIng;
	}

	public void setDtFecIng(Date dtFecIng) {
		this.dtFecIng = dtFecIng;
	}

	public String getVcObs() {
		return vcObs;
	}

	public void setVcObs(String vcObs) {
		this.vcObs = vcObs;
	}

	public Boolean getBtVig() {
		return btVig;
	}

	public void setBtVig(Boolean btVig) {
		this.btVig = btVig;
	}

	public Boolean getBtSopLin() {
		return btSopLin;
	}

	public void setBtSopLin(Boolean btSopLin) {
		this.btSopLin = btSopLin;
	}

	public String getGrupo() {
		return grupo;
	}

	public void setGrupo(String grupo) {
		this.grupo = grupo;
	}

	public Date getFechaInicioContrato() {
		return fechaInicioContrato;
	}

	public void setFechaInicioContrato(Date fechaInicioContrato) {
		this.fechaInicioContrato = fechaInicioContrato;
	}

	public Date getFechaFinContrato() {
		return fechaFinContrato;
	}

	public void setFechaFinContrato(Date fechaFinContrato) {
		this.fechaFinContrato = fechaFinContrato;
	}

	public String getVcDesModelo() {
		return vcDesModelo;
	}

	public void setVcDesModelo(String vcDesModelo) {
		this.vcDesModelo = vcDesModelo;
	}

	public String getSerie() {
		return serie;
	}

	public void setSerie(String serie) {
		this.serie = serie;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}

	public String getNroFactura() {
		return nroFactura;
	}

	public void setNroFactura(String nroFactura) {
		this.nroFactura = nroFactura;
	}

	public Date getFechaFactura() {
		return fechaFactura;
	}

	public void setFechaFactura(Date fechaFactura) {
		this.fechaFactura = fechaFactura;
	}

	public BigDecimal getMontoFactura() {
		return montoFactura;
	}

	public void setMontoFactura(BigDecimal montoFactura) {
		this.montoFactura = montoFactura;
	}

	public BigDecimal getDcMonto() {
		return dcMonto;
	}

	public void setDcMonto(BigDecimal dcMonto) {
		this.dcMonto = dcMonto;
	}

	public String getPushToken() {
		return pushToken;
	}

	public void setPushToken(String pushToken) {
		this.pushToken = pushToken;
	}

	/*public String getAuthToken() {
		return authToken;
	}

	public void setAuthToken(String authToken) {
		this.authToken = authToken;
	}*/

	public Collection<MOVLineaDTO> getmOVLineaCollection() {
		return mOVLineaCollection;
	}

	public void setmOVLineaCollection(Collection<MOVLineaDTO> mOVLineaCollection) {
		this.mOVLineaCollection = mOVLineaCollection;
	}

	public MEmplDTO getmEmpl() {
		return mEmpl;
	}

	public void setmEmpl(MEmplDTO mEmpl) {
		this.mEmpl = mEmpl;
	}

	public MOVEstadoDTO getFinEst() {
		return finEst;
	}

	public void setFinEst(MOVEstadoDTO finEst) {
		this.finEst = finEst;
	}

	public MOVModeloDispositivoDTO getFinCodModDis() {
		return finCodModDis;
	}

	public void setFinCodModDis(MOVModeloDispositivoDTO finCodModDis) {
		this.finCodModDis = finCodModDis;
	}

}
