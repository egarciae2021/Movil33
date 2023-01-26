
package com.lue.pcsistel.model;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
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
@Table(name = "GEN_Cliente", catalog = "", schema = "")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "GENCliente.findAll", query = "SELECT g FROM GENCliente g")
    , @NamedQuery(name = "GENCliente.findByPinCodCli", query = "SELECT g FROM GENCliente g WHERE g.pinCodCli = :pinCodCli")
    , @NamedQuery(name = "GENCliente.findByPinCodCliisEst", query = "SELECT g FROM GENCliente g WHERE  g.pinCodCli = :pinCodCli")
    , @NamedQuery(name = "GENCliente.findByVcNomCli", query = "SELECT g FROM GENCliente g WHERE g.vcNomCli = :vcNomCli")
    , @NamedQuery(name = "GENCliente.findByBtEst", query = "SELECT g FROM GENCliente g WHERE g.btEst = :btEst")
    , @NamedQuery(name = "GENCliente.findByVcRuc", query = "SELECT g FROM GENCliente g WHERE g.vcRuc = :vcRuc")
    , @NamedQuery(name = "GENCliente.findByVcDireccion", query = "SELECT g FROM GENCliente g WHERE g.vcDireccion = :vcDireccion")
    , @NamedQuery(name = "GENCliente.findvcNomCliISbtEst", query = "SELECT g.pinCodCli, g.vcNomCli FROM GENCliente g WHERE g.btEst = 1")   
    , @NamedQuery(name = "GENCliente.updategenCliISbtEst", query = "update GENCliente g set g.btEst = 0 where  g.pinCodCli = :pinCodCli")    
    , @NamedQuery(name = "GENCliente.findLogById", query = "SELECT g.imLogo from GENCliente g where g.pinCodCli = :pinCodCli")
    , @NamedQuery(name = "GENCliente.findpinCodCli", query = "SELECT g.pinCodCli,g.vcNomCli from GENCliente g where g.btEst=1")
    , @NamedQuery(name = "GENCliente.countgenClientIsEST", query = "SELECT count(*) from GENCliente g")
    , @NamedQuery(name = "GENCliente.findClientIDById", query = "SELECT g.pinCodCli from GENCliente g where g.pinCodCli=:pinCodCli")

    , @NamedQuery(name = "GENCliente.updateClientLogo", query = "update GENCliente g set g.imLogo =:imLogo where  g.pinCodCli = :pinCodCli")

})//updateClientLogo
public class GENCliente implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Basic(optional = false)
    @NotNull
    @Column(name = "P_inCodCli", nullable = false)
    private Integer pinCodCli;
    @Size(max = 50)
    @Column(name = "vcNomCli", length = 50)
    private String vcNomCli;
    @Column(name = "btEst")
    private Integer btEst;
    @Size(max = 25)
    @Column(name = "vcRuc", length = 25)
    private String vcRuc;
    @Size(max = 250)
    @Column(name = "vcDireccion", length = 250)
    private String vcDireccion;
    @Lob
    @Column(name = "imLogo",columnDefinition="varbinary")
    private byte[] imLogo;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "gENCliente",fetch=FetchType.EAGER)
    private Collection<MOrga> mOrgaCollection;
    @JoinColumn(name = "inIdCultura", referencedColumnName = "P_inCodCul")
    @ManyToOne(fetch=FetchType.EAGER)
    private GENCultura inIdCultura;

    public GENCliente() {
    }

    public GENCliente(Integer pinCodCli) {
        this.pinCodCli = pinCodCli;
    }

    public Integer getPinCodCli() {
        return pinCodCli;
    }

    public void setPinCodCli(Integer pinCodCli) {
        this.pinCodCli = pinCodCli;
    }

    public String getVcNomCli() {
        return vcNomCli;
    }

    public void setVcNomCli(String vcNomCli) {
        this.vcNomCli = vcNomCli;
    }

    public Integer getBtEst() {
        return btEst;
    }

    public void setBtEst(Integer btEst) {
        this.btEst = btEst;
    }

    public String getVcRuc() {
        return vcRuc;
    }

    public void setVcRuc(String vcRuc) {
        this.vcRuc = vcRuc;
    }

    public String getVcDireccion() {
        return vcDireccion;
    }

    public void setVcDireccion(String vcDireccion) {
        this.vcDireccion = vcDireccion;
    }

    public byte[] getImLogo() {
        return imLogo;
    }

    public void setImLogo(byte[] imLogo) {
        this.imLogo = imLogo;
    }

    @XmlTransient
    public Collection<MOrga> getMOrgaCollection() {
        return mOrgaCollection;
    }

    public void setMOrgaCollection(Collection<MOrga> mOrgaCollection) {
        this.mOrgaCollection = mOrgaCollection;
    }

    public GENCultura getInIdCultura() {
        return inIdCultura;
    }

    public void setInIdCultura(GENCultura inIdCultura) {
        this.inIdCultura = inIdCultura;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (pinCodCli != null ? pinCodCli.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof GENCliente)) {
            return false;
        }
        GENCliente other = (GENCliente) object;
        if ((this.pinCodCli == null && other.pinCodCli != null) || (this.pinCodCli != null && !this.pinCodCli.equals(other.pinCodCli))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.GENCliente[ pinCodCli=" + pinCodCli + " ]";
    }
    
}
