package com.lue.pcsistel.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author lue
 */
@Entity
@Table(name = "MOV_Dispositivo", catalog = "", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MOVDispositivo.findAll", query = "SELECT m FROM MOVDispositivo m")
    , @NamedQuery(name = "MOVDispositivo.findAllIsbtVig", query = "SELECT m FROM MOVDispositivo m")
    , @NamedQuery(name = "MOVDispositivo.findByFinCodCli", query = "SELECT m FROM MOVDispositivo m WHERE m.mOVDispositivoPK.finCodCli = :finCodCli")
    , @NamedQuery(name = "MOVDispositivo.findByPvcCodIMEI", query = "SELECT m FROM MOVDispositivo m WHERE m.mOVDispositivoPK.pvcCodIMEI = :pvcCodIMEI")
    , @NamedQuery(name = "MOVDispositivo.findByVcDes", query = "SELECT m FROM MOVDispositivo m WHERE m.vcDes = :vcDes")
    , @NamedQuery(name = "MOVDispositivo.findByDtFecIng", query = "SELECT m FROM MOVDispositivo m WHERE m.dtFecIng = :dtFecIng")
    , @NamedQuery(name = "MOVDispositivo.findByVcObs", query = "SELECT m FROM MOVDispositivo m WHERE m.vcObs = :vcObs")
    , @NamedQuery(name = "MOVDispositivo.findByBtVig", query = "SELECT m FROM MOVDispositivo m WHERE m.btVig = :btVig")
    , @NamedQuery(name = "MOVDispositivo.findByBtSopLin", query = "SELECT m FROM MOVDispositivo m WHERE m.btSopLin = :btSopLin")
    , @NamedQuery(name = "MOVDispositivo.findByGrupo", query = "SELECT m FROM MOVDispositivo m WHERE m.grupo = :grupo")
    , @NamedQuery(name = "MOVDispositivo.findByFechaInicioContrato", query = "SELECT m FROM MOVDispositivo m WHERE m.fechaInicioContrato = :fechaInicioContrato")
    , @NamedQuery(name = "MOVDispositivo.findByFechaFinContrato", query = "SELECT m FROM MOVDispositivo m WHERE m.fechaFinContrato = :fechaFinContrato")
    , @NamedQuery(name = "MOVDispositivo.findByVcDesModelo", query = "SELECT m FROM MOVDispositivo m WHERE m.vcDesModelo = :vcDesModelo")
    , @NamedQuery(name = "MOVDispositivo.findBySerie", query = "SELECT m FROM MOVDispositivo m WHERE m.serie = :serie")
    , @NamedQuery(name = "MOVDispositivo.findByMarca", query = "SELECT m FROM MOVDispositivo m WHERE m.marca = :marca")
    , @NamedQuery(name = "MOVDispositivo.findByNroFactura", query = "SELECT m FROM MOVDispositivo m WHERE m.nroFactura = :nroFactura")
    , @NamedQuery(name = "MOVDispositivo.findByFechaFactura", query = "SELECT m FROM MOVDispositivo m WHERE m.fechaFactura = :fechaFactura")
    , @NamedQuery(name = "MOVDispositivo.findByMontoFactura", query = "SELECT m FROM MOVDispositivo m WHERE m.montoFactura = :montoFactura")
    , @NamedQuery(name = "MOVDispositivo.findByDcMonto", query = "SELECT m FROM MOVDispositivo m WHERE m.dcMonto = :dcMonto")
    , @NamedQuery(name = "MOVDispositivo.findAllByMEmplPkAndbtVig", query = "SELECT m FROM MOVDispositivo as m join m.mEmpl as e WHERE m.btVig='true' and e.mEmplPK.eMPLPvcCODEMP = :eMPLPvcCODEMP")
    , @NamedQuery(name = "MOVDispositivo.updatebtVig", query = "update  MOVDispositivo m  set m.btVig='false' WHERE m.mOVDispositivoPK.pvcCodIMEI = :pvcCodIMEI")
    , @NamedQuery(name = "MOVDispositivo.findByPvcCodIMEIAndIsbtVig", query = "SELECT m FROM MOVDispositivo m WHERE  m.mOVDispositivoPK.pvcCodIMEI = :pvcCodIMEI")
    , @NamedQuery(name = "MOVDispositivo.countMOVDispositivoIsbtVig", query = "SELECT count(*) FROM MOVDispositivo m")
    , @NamedQuery(name = "MOVDispositivo.findByPKFKMOVDispositivo", query = "SELECT m FROM MOVDispositivo m WHERE  m.mOVDispositivoPK.pvcCodIMEI=:pvcCodIMEI and m.mOVDispositivoPK.finCodCli=:finCodCli")
    , @NamedQuery(name = "MOVDispositivo.countMOVDispositivoByIMEINumber", query = "SELECT count(*) FROM MOVDispositivo m WHERE  m.mOVDispositivoPK.pvcCodIMEI=:pvcCodIMEI")
    , @NamedQuery(name = "MOVDispositivo.countMOVDispositivoByClientFk", query = "SELECT count(*) FROM MOVDispositivo m WHERE  m.mOVDispositivoPK.finCodCli=:finCodCli")
    , @NamedQuery(name = "MOVDispositivo.findAllDevicesByCliId", query = "SELECT m FROM MOVDispositivo m WHERE  m.mOVDispositivoPK.finCodCli=:finCodCli")
    , @NamedQuery(name = "MOVDispositivo.updategcmTokenByIEMI", query =  "update  MOVDispositivo m  set m.pushToken=:pushToken WHERE m.mOVDispositivoPK.pvcCodIMEI = :pvcCodIMEI")
    , @NamedQuery(name = "MOVDispositivo.updateauthTokenByIEMI", query =  "update  MOVDispositivo m  set m.authToken=:authToken WHERE m.mOVDispositivoPK.pvcCodIMEI = :pvcCodIMEI")
    , @NamedQuery(name = "MOVDispositivo.findGCMTokenByImei", query =  "SELECT m.pushToken FROM MOVDispositivo m WHERE  m.mOVDispositivoPK.pvcCodIMEI=:pvcCodIMEI")
    
    , @NamedQuery(name = "MOVDispositivo.updateDeviceDetailsByImei", query =  "update  MOVDispositivo m  set m.btVig=:btVig, m.finCodModDis.pinCod=:pinCod,m.dtFecIng=:dtFecIng WHERE m.mOVDispositivoPK.pvcCodIMEI =:pvcCodIMEI")
    
})
public class MOVDispositivo implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected MOVDispositivoPK mOVDispositivoPK;
    @Size(max = 100)
    @Column(name = "vcDes", length = 100)
    private String vcDes;
    @Column(name = "dtFecIng")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dtFecIng;
    @Size(max = 300)
    @Column(name = "vcObs", length = 300)
    private String vcObs;
    @Column(name = "btVig")
    private Boolean btVig;
    @Column(name = "btSopLin")
    private Boolean btSopLin;
    @Size(max = 1)
    @Column(name = "Grupo", length = 1)
    private String grupo;
    @Column(name = "FechaInicioContrato")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaInicioContrato;
    @Column(name = "FechaFinContrato")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaFinContrato;
    @Size(max = 8000)
    @Column(name = "vcDesModelo", length = 8000)
    private String vcDesModelo;
    @Size(max = 50)
    @Column(name = "Serie", length = 50)
    private String serie;
    @Size(max = 80)
    @Column(name = "Marca", length = 80)
    private String marca;
    @Size(max = 50)
    @Column(name = "NroFactura", length = 50)
    private String nroFactura;
    @Column(name = "FechaFactura")
    @Temporal(TemporalType.TIMESTAMP)
    private Date fechaFactura;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "MontoFactura", precision = 8, scale = 2)
    private BigDecimal montoFactura;
    @Column(name = "dcMonto", precision = 14, scale = 3)
    private BigDecimal dcMonto;
    
     @Column(name = "PushToken", length = 256)
     private String pushToken;
 
     @Column(name = "AuthToken", length = 256)
     private String authToken;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "mOVDispositivo")
    private Collection<MOVLinea> mOVLineaCollection;
    @JoinColumns({
        @JoinColumn(name = "F_inCodCli", referencedColumnName = "F_inCodCli",insertable = false,updatable = false)
        , @JoinColumn(name = "F_vcCodEmp", referencedColumnName = "EMPL_P_vcCODEMP",insertable = false,updatable = false)})
    @ManyToOne(fetch=FetchType.EAGER,cascade=CascadeType.ALL)
    private MEmpl mEmpl;
   
    @JoinColumn(name = "F_inEst", referencedColumnName = "P_inCod")
    @ManyToOne (cascade = CascadeType.ALL)
    private MOVEstado finEst;
   
    @JoinColumn(name = "F_inCodModDis", referencedColumnName = "P_inCod")
    @ManyToOne(optional = false,fetch=FetchType.EAGER)
    private MOVModeloDispositivo finCodModDis;

    @OneToMany(cascade=CascadeType.ALL,mappedBy="dispositivo")
    private Collection<MOVDeviceApp> movDeviceApps; 
    
    
    public Collection<MOVDeviceApp> getMovDeviceApps() {
		return movDeviceApps;
	}

	public void setMovDeviceApps(Collection<MOVDeviceApp> movDeviceApps) {
		this.movDeviceApps = movDeviceApps;
	}

	public MOVDispositivo() {
    }

    public MOVDispositivo(MOVDispositivoPK mOVDispositivoPK) {
        this.mOVDispositivoPK = mOVDispositivoPK;
    }

    public MOVDispositivo(int finCodCli, String pvcCodIMEI) {
        this.mOVDispositivoPK = new MOVDispositivoPK(finCodCli, pvcCodIMEI);
    }

    public MOVDispositivoPK getMOVDispositivoPK() {
        return mOVDispositivoPK;
    }

    public void setMOVDispositivoPK(MOVDispositivoPK mOVDispositivoPK) {
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

    @XmlTransient
    public Collection<MOVLinea> getMOVLineaCollection() {
        return mOVLineaCollection;
    }

    public void setMOVLineaCollection(Collection<MOVLinea> mOVLineaCollection) {
        this.mOVLineaCollection = mOVLineaCollection;
    }

    public MEmpl getMEmpl() {
        return mEmpl;
    }

    public void setMEmpl(MEmpl mEmpl) {
        this.mEmpl = mEmpl;
    }

    public MOVEstado getFinEst() {
        return finEst;
    }

    public void setFinEst(MOVEstado finEst) {
        this.finEst = finEst;
    }

    public MOVModeloDispositivo getFinCodModDis() {
        return finCodModDis;
    }

    public void setFinCodModDis(MOVModeloDispositivo finCodModDis) {
        this.finCodModDis = finCodModDis;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (mOVDispositivoPK != null ? mOVDispositivoPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MOVDispositivo)) {
            return false;
        }
        MOVDispositivo other = (MOVDispositivo) object;
        if ((this.mOVDispositivoPK == null && other.mOVDispositivoPK != null) || (this.mOVDispositivoPK != null && !this.mOVDispositivoPK.equals(other.mOVDispositivoPK))) {
            return false;
        }
        return true;
    }

    public String getPushToken() {
        return pushToken;
    }

    public void setPushToken(String pushToken) {
        this.pushToken = pushToken;
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authToken) {
        this.authToken = authToken;
    }
    
    

    @Override
    public String toString() {
        return "com.lue.model.MOVDispositivo[ mOVDispositivoPK=" + mOVDispositivoPK + " ]";
    }
    
}
