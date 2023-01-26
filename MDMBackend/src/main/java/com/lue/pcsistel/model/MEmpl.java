package com.lue.pcsistel.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author lue
 */
@Entity
@Table(name = "M_EMPL", catalog = "", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MEmpl.findAll", query = "SELECT m FROM MEmpl m")
    , @NamedQuery(name = "MEmpl.findAllIsEST", query = "SELECT m FROM MEmpl m WHERE m.eMPLbtEST='TRUE'")
    , @NamedQuery(name = "MEmpl.findByFinCodCli", query = "SELECT m FROM MEmpl m WHERE m.mEmplPK.finCodCli = :finCodCli")
    , @NamedQuery(name = "MEmpl.updateeMPLbtESTBymEmplPK", query = "update MEmpl m  set m.eMPLbtEST='false' where m.mEmplPK.eMPLPvcCODEMP = :eMPLPvcCODEMP")
    , @NamedQuery(name = "MEmpl.findByEMPLPvcCODEMP", query = "SELECT m FROM MEmpl m WHERE m.mEmplPK.eMPLPvcCODEMP = :eMPLPvcCODEMP")
    , @NamedQuery(name = "MEmpl.findByEMPLvcNOMEMP", query = "SELECT m FROM MEmpl m WHERE m.eMPLvcNOMEMP = :eMPLvcNOMEMP")
    , @NamedQuery(name = "MEmpl.findByEMPLvcUBIFIS", query = "SELECT m FROM MEmpl m WHERE m.eMPLvcUBIFIS = :eMPLvcUBIFIS")
    , @NamedQuery(name = "MEmpl.findByEMPLvcCORPER", query = "SELECT m FROM MEmpl m WHERE m.eMPLvcCORPER = :eMPLvcCORPER")
    , @NamedQuery(name = "MEmpl.findByEMPLvcCORJFT", query = "SELECT m FROM MEmpl m WHERE m.eMPLvcCORJFT = :eMPLvcCORJFT")
    , @NamedQuery(name = "MEmpl.findByEMPLdaFECINI", query = "SELECT m FROM MEmpl m WHERE m.eMPLdaFECINI = :eMPLdaFECINI")
    , @NamedQuery(name = "MEmpl.findByEMPLdaFECFIN", query = "SELECT m FROM MEmpl m WHERE m.eMPLdaFECFIN = :eMPLdaFECFIN")
    , @NamedQuery(name = "MEmpl.findByEMPLbtEST", query = "SELECT m FROM MEmpl m WHERE m.eMPLbtEST = :eMPLbtEST")
    , @NamedQuery(name = "MEmpl.findByEMPLCodInt2", query = "SELECT m FROM MEmpl m WHERE m.eMPLCodInt2 = :eMPLCodInt2")
    , @NamedQuery(name = "MEmpl.findAllEMPByMOrga", query = "SELECT m FROM MEmpl as m join m.mOrga as o WHERE  m.eMPLbtEST='true' and o.mOrgaPK.oRGAPinCODINT = :oRGAPinCODINT")
    , @NamedQuery(name = "MEmpl.countMEmplIsEST", query = "SELECT count(*) FROM MEmpl m")
    , @NamedQuery(name = "MEmpl.findeMPLPvcCODEMPByeMPLPvcCODEMP", query = "SELECT m.mEmplPK.eMPLPvcCODEMP FROM MEmpl m WHERE   m.mEmplPK.eMPLPvcCODEMP=:eMPLPvcCODEMP")
    , @NamedQuery(name = "MEmpl.findeMPLPvcCODEMPAndeMPLvcNOMEMPIsESTAndoRGAPinCODINT", query = "SELECT m.mEmplPK.eMPLPvcCODEMP,m.eMPLvcNOMEMP FROM MEmpl as m  join m.mOrga as o WHERE  m.eMPLbtEST='true' and o.mOrgaPK.oRGAPinCODINT = :oRGAPinCODINT")
    , @NamedQuery(name = "MEmpl.countMEmplByClientFk", query = "SELECT count(*) FROM MEmpl m WHERE  m.mEmplPK.finCodCli=:finCodCli")
    , @NamedQuery(name = "MEmpl.findAllMEmplByCliId", query = "SELECT m FROM MEmpl m WHERE m.mEmplPK.finCodCli=:finCodCli")
    , @NamedQuery(name = "MEmpl.findMEmplByPKAndCliId", query = "SELECT m FROM MEmpl m WHERE m.mEmplPK.finCodCli=:finCodCli AND m.mEmplPK.eMPLPvcCODEMP=:eMPLPvcCODEMP")

})//
public class MEmpl implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected MEmplPK mEmplPK;
   
    @Size(max = 100)
    @Column(name = "EMPL_vcNOMEMP", length = 100)
    private String eMPLvcNOMEMP;
   
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 35)
    @Column(name = "EMPL_vcUBIFIS", nullable = false, length = 35)
    private String eMPLvcUBIFIS;
   
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 250)
    @Column(name = "EMPL_vcCORPER", nullable = false, length = 250)
    private String eMPLvcCORPER;
   
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 250)
    @Column(name = "EMPL_vcCORJFT", nullable = false, length = 250)
    private String eMPLvcCORJFT;
   
    @Basic(optional = false)
    @NotNull
    @Column(name = "EMPL_daFECINI", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date eMPLdaFECINI;
   
    @Column(name = "EMPL_daFECFIN")
    @Temporal(TemporalType.TIMESTAMP)
    private Date eMPLdaFECFIN;
   
    
    @Basic(optional = true)
    @Column(name = "EMPL_F_inCODGRUORI", nullable = true)
    private int eMPLFinCODGRUORI;
    
    @Basic(optional = false)
    @NotNull
    @Column(name = "EMPL_btEST", nullable = false)
    private boolean eMPLbtEST;
   
    @Size(max = 500)
    @Column(name = "EMPL_CodInt2", length = 500)
    private String eMPLCodInt2;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "mEmpl")
    private Collection<MOVLinea> mOVLineaCollection;
   
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "mEmpl")
    private Collection<SEGUsuario> sEGUsuarioCollection;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "mEmpl")
    private Collection<MOVDispositivo> mOVDispositivoCollection;
    
    
     @ManyToOne(optional = false,fetch = FetchType.LAZY)
       @JoinColumns({
        @JoinColumn(name = "F_inCodCli", referencedColumnName = "F_inCodCli",insertable = false,updatable = false)
        ,@JoinColumn(name = "EMPL_F_inCODINT", referencedColumnName = "ORGA_P_inCODINT",insertable = false,updatable = false)})  
    private MOrga mOrga;

    public MEmpl() {
    }

    public MEmpl(MEmplPK mEmplPK) {
        this.mEmplPK = mEmplPK;
    }

    public MEmpl(MEmplPK mEmplPK, String eMPLvcUBIFIS, String eMPLvcCORPER, String eMPLvcCORJFT, Date eMPLdaFECINI, boolean eMPLbtEST) {
        this.mEmplPK = mEmplPK;
        this.eMPLvcUBIFIS = eMPLvcUBIFIS;
        this.eMPLvcCORPER = eMPLvcCORPER;
        this.eMPLvcCORJFT = eMPLvcCORJFT;
        this.eMPLdaFECINI = eMPLdaFECINI;
        this.eMPLbtEST = eMPLbtEST;
    }

    public MEmpl(int finCodCli, String eMPLPvcCODEMP) {
        this.mEmplPK = new MEmplPK(finCodCli, eMPLPvcCODEMP);
    }

    public MEmplPK getMEmplPK() {
        return mEmplPK;
    }

    public void setMEmplPK(MEmplPK mEmplPK) {
        this.mEmplPK = mEmplPK;
    }

    public String getEMPLvcNOMEMP() {
        return eMPLvcNOMEMP;
    }

    public void setEMPLvcNOMEMP(String eMPLvcNOMEMP) {
        this.eMPLvcNOMEMP = eMPLvcNOMEMP;
    }
    
    public int getEMPLFinCODGRUORI() {
        return eMPLFinCODGRUORI;
    }

    public void setEMPLFinCODGRUORI(int eMPLFinCODGRUORI) {
        this.eMPLFinCODGRUORI = eMPLFinCODGRUORI;
    }

    public String getEMPLvcUBIFIS() {
        return eMPLvcUBIFIS;
    }

    public void setEMPLvcUBIFIS(String eMPLvcUBIFIS) {
        this.eMPLvcUBIFIS = eMPLvcUBIFIS;
    }

    public String getEMPLvcCORPER() {
        return eMPLvcCORPER;
    }

    public void setEMPLvcCORPER(String eMPLvcCORPER) {
        this.eMPLvcCORPER = eMPLvcCORPER;
    }

    public String getEMPLvcCORJFT() {
        return eMPLvcCORJFT;
    }

    public void setEMPLvcCORJFT(String eMPLvcCORJFT) {
        this.eMPLvcCORJFT = eMPLvcCORJFT;
    }

    public Date getEMPLdaFECINI() {
        return eMPLdaFECINI;
    }

    public void setEMPLdaFECINI(Date eMPLdaFECINI) {
        this.eMPLdaFECINI = eMPLdaFECINI;
    }

    public Date getEMPLdaFECFIN() {
        return eMPLdaFECFIN;
    }

    public void setEMPLdaFECFIN(Date eMPLdaFECFIN) {
        this.eMPLdaFECFIN = eMPLdaFECFIN;
    }

    public boolean getEMPLbtEST() {
        return eMPLbtEST;
    }

    public void setEMPLbtEST(boolean eMPLbtEST) {
        this.eMPLbtEST = eMPLbtEST;
    }

    public String getEMPLCodInt2() {
        return eMPLCodInt2;
    }

    public void setEMPLCodInt2(String eMPLCodInt2) {
        this.eMPLCodInt2 = eMPLCodInt2;
    }

    @XmlTransient
    public Collection<MOVLinea> getMOVLineaCollection() {
        return mOVLineaCollection;
    }

    public void setMOVLineaCollection(Collection<MOVLinea> mOVLineaCollection) {
        this.mOVLineaCollection = mOVLineaCollection;
    }

    @XmlTransient
    public Collection<SEGUsuario> getSEGUsuarioCollection() {
        return sEGUsuarioCollection;
    }

    public void setSEGUsuarioCollection(Collection<SEGUsuario> sEGUsuarioCollection) {
        this.sEGUsuarioCollection = sEGUsuarioCollection;
    }

    @XmlTransient
    public Collection<MOVDispositivo> getMOVDispositivoCollection() {
        return mOVDispositivoCollection;
    }

    public void setMOVDispositivoCollection(Collection<MOVDispositivo> mOVDispositivoCollection) {
        this.mOVDispositivoCollection = mOVDispositivoCollection;
    }

    public MOrga getMOrga() {
        return mOrga;
    }

    public void setMOrga(MOrga mOrga) {
        this.mOrga = mOrga;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (mEmplPK != null ? mEmplPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MEmpl)) {
            return false;
        }
        MEmpl other = (MEmpl) object;
        if ((this.mEmplPK == null && other.mEmplPK != null) || (this.mEmplPK != null && !this.mEmplPK.equals(other.mEmplPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.MEmpl[ mEmplPK=" + mEmplPK + " ]";
    }
    
    
    
}
