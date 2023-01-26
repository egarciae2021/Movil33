
package com.lue.pcsistel.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author lue
 */
@Entity
@Table(name = "MOV_Linea", catalog = "", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MOVLinea.findAll", query = "SELECT m FROM MOVLinea m")
    , @NamedQuery(name = "MOVLinea.findByFinCodCli", query = "SELECT m FROM MOVLinea m WHERE m.mOVLineaPK.finCodCli = :finCodCli")
    , @NamedQuery(name = "MOVLinea.findByPvcNum", query = "SELECT m FROM MOVLinea m WHERE m.mOVLineaPK.pvcNum = :pvcNum")
    , @NamedQuery(name = "MOVLinea.findByDcPerFacIni", query = "SELECT m FROM MOVLinea m WHERE m.dcPerFacIni = :dcPerFacIni")
    , @NamedQuery(name = "MOVLinea.findByDcPerFacFin", query = "SELECT m FROM MOVLinea m WHERE m.dcPerFacFin = :dcPerFacFin")
    , @NamedQuery(name = "MOVLinea.findByDcMon", query = "SELECT m FROM MOVLinea m WHERE m.dcMon = :dcMon")
    , @NamedQuery(name = "MOVLinea.findByBtVig", query = "SELECT m FROM MOVLinea m WHERE m.btVig = :btVig")
    , @NamedQuery(name = "MOVLinea.findByRpm", query = "SELECT m FROM MOVLinea m WHERE m.rpm = :rpm")
    , @NamedQuery(name = "MOVLinea.findByInMin", query = "SELECT m FROM MOVLinea m WHERE m.inMin = :inMin")
    , @NamedQuery(name = "MOVLinea.findByFechaInicioContrato", query = "SELECT m FROM MOVLinea m WHERE m.fechaInicioContrato = :fechaInicioContrato")
    , @NamedQuery(name = "MOVLinea.findByMesesContrato", query = "SELECT m FROM MOVLinea m WHERE m.mesesContrato = :mesesContrato")
    , @NamedQuery(name = "MOVLinea.findByFechaFinContrato", query = "SELECT m FROM MOVLinea m WHERE m.fechaFinContrato = :fechaFinContrato")
    , @NamedQuery(name = "MOVLinea.findByNombreCampana", query = "SELECT m FROM MOVLinea m WHERE m.nombreCampana = :nombreCampana")
    , @NamedQuery(name = "MOVLinea.findByFechaHoraCreacion", query = "SELECT m FROM MOVLinea m WHERE m.fechaHoraCreacion = :fechaHoraCreacion")})
public class MOVLinea implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected MOVLineaPK mOVLineaPK;
    @Column(name = "dcPerFacIni")
    private Short dcPerFacIni;
    @Column(name = "dcPerFacFin")
    private Short dcPerFacFin;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "dcMon", precision = 14, scale = 3)
    private BigDecimal dcMon;
    @Basic(optional = false)
    @NotNull
    @Column(name = "btVig", nullable = false)
    private boolean btVig;
    @Size(max = 20)
    @Column(name = "rpm", length = 20)
    private String rpm;
    @Basic(optional = false)
    @NotNull
    @Column(name = "inMin", nullable = false)
    private int inMin;
    @Column(name = "FechaInicioContrato")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaInicioContrato;
    @Column(name = "MesesContrato")
    private Short mesesContrato;
    @Column(name = "FechaFinContrato")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaFinContrato;
    @Size(max = 100)
    @Column(name = "NombreCampana", length = 100)
    private String nombreCampana;
    @Column(name = "FechaHoraCreacion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaHoraCreacion;
    @JoinColumns({
        @JoinColumn(name = "F_inCodCli", referencedColumnName = "F_inCodCli",insertable = false,updatable = false)
        , @JoinColumn(name = "F_vcCodEmp", referencedColumnName = "EMPL_P_vcCODEMP",insertable = false,updatable = false)})
    @ManyToOne(optional = false,fetch=FetchType.LAZY)
    private MEmpl mEmpl;
    @JoinColumns({
        @JoinColumn(name = "F_inCodCli", referencedColumnName = "F_inCodCli",insertable = false,updatable = false)
        , @JoinColumn(name = "F_vcCodIMEI", referencedColumnName = "P_vcCodIMEI",insertable = false,updatable = false)})
    @ManyToOne(optional = false)
    private MOVDispositivo mOVDispositivo;
    @JoinColumn(name = "F_inCodEst", referencedColumnName = "P_inCod")
    @ManyToOne
    private MOVEstado finCodEst;

    public MOVLinea() {
    }

    public MOVLinea(MOVLineaPK mOVLineaPK) {
        this.mOVLineaPK = mOVLineaPK;
    }

    public MOVLinea(MOVLineaPK mOVLineaPK, boolean btVig, int inMin) {
        this.mOVLineaPK = mOVLineaPK;
        this.btVig = btVig;
        this.inMin = inMin;
    }

    public MOVLinea(int finCodCli, String pvcNum) {
        this.mOVLineaPK = new MOVLineaPK(finCodCli, pvcNum);
    }

    public MOVLineaPK getMOVLineaPK() {
        return mOVLineaPK;
    }

    public void setMOVLineaPK(MOVLineaPK mOVLineaPK) {
        this.mOVLineaPK = mOVLineaPK;
    }

    public Short getDcPerFacIni() {
        return dcPerFacIni;
    }

    public void setDcPerFacIni(Short dcPerFacIni) {
        this.dcPerFacIni = dcPerFacIni;
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

    public boolean getBtVig() {
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

    public MEmpl getMEmpl() {
        return mEmpl;
    }

    public void setMEmpl(MEmpl mEmpl) {
        this.mEmpl = mEmpl;
    }

    public MOVDispositivo getMOVDispositivo() {
        return mOVDispositivo;
    }

    public void setMOVDispositivo(MOVDispositivo mOVDispositivo) {
        this.mOVDispositivo = mOVDispositivo;
    }

    public MOVEstado getFinCodEst() {
        return finCodEst;
    }

    public void setFinCodEst(MOVEstado finCodEst) {
        this.finCodEst = finCodEst;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (mOVLineaPK != null ? mOVLineaPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MOVLinea)) {
            return false;
        }
        MOVLinea other = (MOVLinea) object;
        if ((this.mOVLineaPK == null && other.mOVLineaPK != null) || (this.mOVLineaPK != null && !this.mOVLineaPK.equals(other.mOVLineaPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.MOVLinea[ mOVLineaPK=" + mOVLineaPK + " ]";
    }
    
}
