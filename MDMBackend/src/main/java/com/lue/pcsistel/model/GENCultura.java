package com.lue.pcsistel.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author lue
 */
@Entity
@Table(name = "GEN_Cultura", catalog = "", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "GENCultura.findAll", query = "SELECT g FROM GENCultura g")
    , @NamedQuery(name = "GENCultura.findpinCodCulAndvcNomCul", query = "SELECT g.pinCodCul , g.vcCodCul FROM GENCultura g WHERE g.btVig='true'")
    , @NamedQuery(name = "GENCultura.findByPinCodCul", query = "SELECT g FROM GENCultura g WHERE g.pinCodCul = :pinCodCul")
    , @NamedQuery(name = "GENCultura.findByVcCodCul", query = "SELECT g FROM GENCultura g WHERE g.vcCodCul = :vcCodCul")
    , @NamedQuery(name = "GENCultura.findByVcNomCul", query = "SELECT g FROM GENCultura g WHERE g.vcNomCul = :vcNomCul")
    , @NamedQuery(name = "GENCultura.findByFinCodMon", query = "SELECT g FROM GENCultura g WHERE g.finCodMon = :finCodMon")
    , @NamedQuery(name = "GENCultura.findByFinCodIdi", query = "SELECT g FROM GENCultura g WHERE g.finCodIdi = :finCodIdi")
    , @NamedQuery(name = "GENCultura.findByVcSimDec", query = "SELECT g FROM GENCultura g WHERE g.vcSimDec = :vcSimDec")
    , @NamedQuery(name = "GENCultura.findByDcNumDec", query = "SELECT g FROM GENCultura g WHERE g.dcNumDec = :dcNumDec")
    , @NamedQuery(name = "GENCultura.findByVcSimSepMil", query = "SELECT g FROM GENCultura g WHERE g.vcSimSepMil = :vcSimSepMil")
    , @NamedQuery(name = "GENCultura.findByVcSimNeg", query = "SELECT g FROM GENCultura g WHERE g.vcSimNeg = :vcSimNeg")
    , @NamedQuery(name = "GENCultura.findByVcHorCor", query = "SELECT g FROM GENCultura g WHERE g.vcHorCor = :vcHorCor")
    , @NamedQuery(name = "GENCultura.findByVcHorLar", query = "SELECT g FROM GENCultura g WHERE g.vcHorLar = :vcHorLar")
    , @NamedQuery(name = "GENCultura.findByVcSimAM", query = "SELECT g FROM GENCultura g WHERE g.vcSimAM = :vcSimAM")
    , @NamedQuery(name = "GENCultura.findByVcSimPM", query = "SELECT g FROM GENCultura g WHERE g.vcSimPM = :vcSimPM")
    , @NamedQuery(name = "GENCultura.findByVcFecCor", query = "SELECT g FROM GENCultura g WHERE g.vcFecCor = :vcFecCor")
    , @NamedQuery(name = "GENCultura.findByVcFecLar", query = "SELECT g FROM GENCultura g WHERE g.vcFecLar = :vcFecLar")
    , @NamedQuery(name = "GENCultura.findByBtVig", query = "SELECT g FROM GENCultura g WHERE g.btVig = :btVig")
    , @NamedQuery(name = "GENCultura.findByDcIGV", query = "SELECT g FROM GENCultura g WHERE g.dcIGV = :dcIGV")})
public class GENCultura implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "P_inCodCul", nullable = false)
    private Integer pinCodCul;
    @Size(max = 15)
    @Column(name = "vcCodCul", length = 15)
    private String vcCodCul;
    @Size(max = 100)
    @Column(name = "vcNomCul", length = 100)
    private String vcNomCul;
    @Column(name = "F_inCodMon")
    private Integer finCodMon;
    @Column(name = "F_inCodIdi")
    private Integer finCodIdi;
    @Size(max = 1)
    @Column(name = "vcSimDec", length = 1)
    private String vcSimDec;
    @Column(name = "dcNumDec")
    private Integer dcNumDec;
    @Size(max = 1)
    @Column(name = "vcSimSepMil", length = 1)
    private String vcSimSepMil;
    @Size(max = 1)
    @Column(name = "vcSimNeg", length = 1)
    private String vcSimNeg;
    @Size(max = 15)
    @Column(name = "vcHorCor", length = 15)
    private String vcHorCor;
    @Size(max = 15)
    @Column(name = "vcHorLar", length = 15)
    private String vcHorLar;
    @Size(max = 10)
    @Column(name = "vcSimAM", length = 10)
    private String vcSimAM;
    @Size(max = 10)
    @Column(name = "vcSimPM", length = 10)
    private String vcSimPM;
    @Size(max = 15)
    @Column(name = "vcFecCor", length = 15)
    private String vcFecCor;
    @Size(max = 30)
    @Column(name = "vcFecLar", length = 30)
    private String vcFecLar;
    @Basic(optional = false)
    @NotNull
    @Column(name = "btVig", nullable = false)
    private boolean btVig;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "dcIGV", precision = 4, scale = 2)
    private BigDecimal dcIGV;
    @JoinColumn(name = "F_inCodPai", referencedColumnName = "P_inCodPai")
    @ManyToOne
    private GENPais finCodPai;
    @OneToMany(mappedBy = "inIdCultura")
    private Collection<GENCliente> gENClienteCollection;

    public GENCultura() {
    }

    public GENCultura(Integer pinCodCul) {
        this.pinCodCul = pinCodCul;
    }

    public GENCultura(Integer pinCodCul, boolean btVig) {
        this.pinCodCul = pinCodCul;
        this.btVig = btVig;
    }

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

    public boolean getBtVig() {
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

    public GENPais getFinCodPai() {
        return finCodPai;
    }

    public void setFinCodPai(GENPais finCodPai) {
        this.finCodPai = finCodPai;
    }

    @XmlTransient
    public Collection<GENCliente> getGENClienteCollection() {
        return gENClienteCollection;
    }

    public void setGENClienteCollection(Collection<GENCliente> gENClienteCollection) {
        this.gENClienteCollection = gENClienteCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (pinCodCul != null ? pinCodCul.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof GENCultura)) {
            return false;
        }
        GENCultura other = (GENCultura) object;
        if ((this.pinCodCul == null && other.pinCodCul != null) || (this.pinCodCul != null && !this.pinCodCul.equals(other.pinCodCul))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.GENCultura[ pinCodCul=" + pinCodCul + " ]";
    }
    
}
