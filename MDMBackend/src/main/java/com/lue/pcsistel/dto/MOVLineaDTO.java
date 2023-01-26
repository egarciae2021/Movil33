package com.lue.pcsistel.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class MOVLineaDTO implements Serializable{

	private static final long serialVersionUID = -7026409552151162980L;
	protected MOVLineaPKDTO mOVLineaPK;
	private Short dcPerFacFin;
	private BigDecimal dcMon;
	private boolean btVig;
	private String rpm;
	private int inMin;
	private Date fechaInicioContrato;
	private Short mesesContrato;
	private Date fechaFinContrato;
	private String nombreCampana;
	private Date fechaHoraCreacion;
	private MEmplDTO mEmpl;
	private MOVDispositivoDTO mOVDispositivo;
	private MOVEstadoDTO finCodEst;

	public MOVLineaPKDTO getmOVLineaPK() {
		return mOVLineaPK;
	}

	public void setmOVLineaPK(MOVLineaPKDTO mOVLineaPK) {
		this.mOVLineaPK = mOVLineaPK;
	}

	public Short getDcPerFacFin() {
		return dcPerFacFin;
	}

	public void setDcPerFacFin(Short dcPerFacFin) {
		this.dcPerFacFin = dcPerFacFin;
	}

	public BigDecimal getDcMon() {
		return dcMon;
	}

	public void setDcMon(BigDecimal dcMon) {
		this.dcMon = dcMon;
	}

	public boolean isBtVig() {
		return btVig;
	}

	public void setBtVig(boolean btVig) {
		this.btVig = btVig;
	}

	public String getRpm() {
		return rpm;
	}

	public void setRpm(String rpm) {
		this.rpm = rpm;
	}

	public int getInMin() {
		return inMin;
	}

	public void setInMin(int inMin) {
		this.inMin = inMin;
	}

	public Date getFechaInicioContrato() {
		return fechaInicioContrato;
	}

	public void setFechaInicioContrato(Date fechaInicioContrato) {
		this.fechaInicioContrato = fechaInicioContrato;
	}

	public Short getMesesContrato() {
		return mesesContrato;
	}

	public void setMesesContrato(Short mesesContrato) {
		this.mesesContrato = mesesContrato;
	}

	public Date getFechaFinContrato() {
		return fechaFinContrato;
	}

	public void setFechaFinContrato(Date fechaFinContrato) {
		this.fechaFinContrato = fechaFinContrato;
	}

	public String getNombreCampana() {
		return nombreCampana;
	}

	public void setNombreCampana(String nombreCampana) {
		this.nombreCampana = nombreCampana;
	}

	public Date getFechaHoraCreacion() {
		return fechaHoraCreacion;
	}

	public void setFechaHoraCreacion(Date fechaHoraCreacion) {
		this.fechaHoraCreacion = fechaHoraCreacion;
	}

	public MEmplDTO getmEmpl() {
		return mEmpl;
	}

	public void setmEmpl(MEmplDTO mEmpl) {
		this.mEmpl = mEmpl;
	}

	public MOVDispositivoDTO getmOVDispositivo() {
		return mOVDispositivo;
	}

	public void setmOVDispositivo(MOVDispositivoDTO mOVDispositivo) {
		this.mOVDispositivo = mOVDispositivo;
	}

	public MOVEstadoDTO getFinCodEst() {
		return finCodEst;
	}

	public void setFinCodEst(MOVEstadoDTO finCodEst) {
		this.finCodEst = finCodEst;
	}

}
