
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
@Table(name = "M_ORGA", catalog = "", schema = "")
@XmlRootElement
@NamedQueries({ @NamedQuery(name = "MOrga.findAll", query = "SELECT m FROM MOrga m"),
		@NamedQuery(name = "MOrga.findMOrgaByoRGAPinCODINT", query = "SELECT m FROM MOrga m where m.mOrgaPK.oRGAPinCODINT=:oRGAPinCODINT"),
		@NamedQuery(name = "MOrga.findAllisORGAbtEST", query = "SELECT m FROM MOrga m join m.gENCliente as c where c.btEst=1 and m.oRGAbtEST=true"),
		@NamedQuery(name = "MOrga.updateByORGAbtEST", query = "update MOrga m set m.oRGAbtEST='false' where  m.mOrgaPK.oRGAPinCODINT = :oRGAPinCODINT"),
		@NamedQuery(name = "MOrga.findByFinCodCli", query = "SELECT m FROM MOrga m WHERE m.mOrgaPK.finCodCli = :finCodCli"),
		@NamedQuery(name = "MOrga.findByORGAPinCODINT", query = "SELECT m FROM MOrga m WHERE m.mOrgaPK.oRGAPinCODINT = :oRGAPinCODINT"),
		@NamedQuery(name = "MOrga.findByORGAPinCODINTisEST", query = "SELECT m FROM MOrga m WHERE  m.mOrgaPK.oRGAPinCODINT = :oRGAPinCODINT"),
		@NamedQuery(name = "MOrga.findByORGAvcCODORG", query = "SELECT m FROM MOrga m WHERE m.oRGAvcCODORG = :oRGAvcCODORG"),
		@NamedQuery(name = "MOrga.findByORGAvcNOMORG", query = "SELECT m FROM MOrga m WHERE m.oRGAvcNOMORG = :oRGAvcNOMORG"),
		@NamedQuery(name = "MOrga.findByORGAvcCORPER", query = "SELECT m FROM MOrga m WHERE m.oRGAvcCORPER = :oRGAvcCORPER"),
		@NamedQuery(name = "MOrga.findByORGAvcCORJFT", query = "SELECT m FROM MOrga m WHERE m.oRGAvcCORJFT = :oRGAvcCORJFT"),
		@NamedQuery(name = "MOrga.findByORGAdaFECINI", query = "SELECT m FROM MOrga m WHERE m.oRGAdaFECINI = :oRGAdaFECINI"),
		@NamedQuery(name = "MOrga.findByORGAdaFECFIN", query = "SELECT m FROM MOrga m WHERE m.oRGAdaFECFIN = :oRGAdaFECFIN"),
		@NamedQuery(name = "MOrga.findByORGAbtEST", query = "SELECT m FROM MOrga m WHERE m.oRGAbtEST = :oRGAbtEST"),
		@NamedQuery(name = "MOrga.findByORGACodInt2", query = "SELECT m FROM MOrga m WHERE m.oRGACodInt2 = :oRGACodInt2"),
		@NamedQuery(name = "MOrga.findmOrgaPKAndoRGAvcCODORGByoRGAbtEST", query = "SELECT m.mOrgaPK.oRGAPinCODINT,m.oRGAvcNOMORG FROM MOrga m WHERE m.oRGAbtEST = true"),
		@NamedQuery(name = "MOrga.findMOrgaByGENClintPK", query = "SELECT m FROM MOrga as m join m.gENCliente as c WHERE  c.pinCodCli=:pinCodCli"),
		@NamedQuery(name = "MOrga.countMOrgaIsEST", query = "SELECT count(*) FROM MOrga m"),
		@NamedQuery(name = "MOrga.findPkifExistIdByPk", query = "SELECT m.mOrgaPK.oRGAPinCODINT FROM MOrga m WHERE m.mOrgaPK.oRGAPinCODINT =:oRGAPinCODINT"),
		@NamedQuery(name = "MOrga.findClientIdByMOrgaId", query = "SELECT m.mOrgaPK.finCodCli FROM MOrga m WHERE m.mOrgaPK.oRGAPinCODINT =:oRGAPinCODINT"),
		@NamedQuery(name = "MOrga.findMOrgaIdAndNameByClientIdEST", query = "SELECT m.mOrgaPK.oRGAPinCODINT,m.oRGAvcNOMORG FROM MOrga m WHERE m.oRGAbtEST=true and m.mOrgaPK.finCodCli =:finCodCli"),
		@NamedQuery(name = "MOrga.countMOrgaByClientFk", query = "SELECT count(*) FROM MOrga m WHERE m.mOrgaPK.finCodCli =:finCodCli"),
		@NamedQuery(name = "MOrga.findByIdAndCliId", query = "SELECT m FROM MOrga m where m.mOrgaPK.oRGAPinCODINT=:oRGAPinCODINT AND m.mOrgaPK.finCodCli=:finCodCli"),

})
public class MOrga implements Serializable {

	private static final long serialVersionUID = 1L;
	@EmbeddedId
	protected MOrgaPK mOrgaPK;

	@Basic(optional = true)
	@Size(min = 1, max = 15)
	@Column(name = "ORGA_vcCODORG", nullable = true, length = 15)
	private String oRGAvcCODORG;

	@Size(max = 100)
	@Column(name = "ORGA_vcNOMORG", length = 100)
	private String oRGAvcNOMORG;

	@Basic(optional = true)
	@Size(min = 1, max = 250)
	@Column(name = "ORGA_vcCORPER", nullable = true, length = 250)
	private String oRGAvcCORPER;

	@Basic(optional = true)
	@Size(min = 1, max = 250)
	@Column(name = "ORGA_vcCORJFT", nullable = true, length = 250)
	private String oRGAvcCORJFT;

	@Basic(optional = true)
	@Column(name = "ORGA_daFECINI", nullable = true)
	@Temporal(TemporalType.TIMESTAMP)
	private Date oRGAdaFECINI;

	@Column(name = "ORGA_daFECFIN")
	@Temporal(TemporalType.TIMESTAMP)
	private Date oRGAdaFECFIN;

	@Basic(optional = true)
	@Column(name = "ORGA_btEST", nullable = true)
	private boolean oRGAbtEST;

	@Basic(optional = true)
	@Size(min = 1, max = 800)
	@Column(name = "ORGA_CodInt2", nullable = true, length = 800)
	private String oRGACodInt2;

	@JoinColumn(name = "F_inCodCli", referencedColumnName = "P_inCodCli", nullable = true, insertable = false, updatable = false)
	@ManyToOne(optional = true)
	private GENCliente gENCliente;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY ,mappedBy = "mOrga")
	private Collection<MEmpl> mEmplCollection;// =new ArrayList<MEmpl>();

	public MOrga() {
	}

	public MOrga(MOrgaPK mOrgaPK) {
		this.mOrgaPK = mOrgaPK;
	}

	public MOrga(MOrgaPK mOrgaPK, String oRGAvcCODORG, String oRGAvcCORPER, String oRGAvcCORJFT, Date oRGAdaFECINI,
			boolean oRGAbtEST, String oRGACodInt2) {
		this.mOrgaPK = mOrgaPK;
		this.oRGAvcCODORG = oRGAvcCODORG;
		this.oRGAvcCORPER = oRGAvcCORPER;
		this.oRGAvcCORJFT = oRGAvcCORJFT;
		this.oRGAdaFECINI = oRGAdaFECINI;
		this.oRGAbtEST = oRGAbtEST;
		this.oRGACodInt2 = oRGACodInt2;
	}

	public MOrga(int finCodCli, int oRGAPinCODINT) {
		this.mOrgaPK = new MOrgaPK(finCodCli, oRGAPinCODINT);
	}

	public MOrgaPK getMOrgaPK() {
		return mOrgaPK;
	}

	public void setMOrgaPK(MOrgaPK mOrgaPK) {
		this.mOrgaPK = mOrgaPK;
	}

	public String getORGAvcCODORG() {
		return oRGAvcCODORG;
	}

	public void setORGAvcCODORG(String oRGAvcCODORG) {
		this.oRGAvcCODORG = oRGAvcCODORG;
	}

	public String getORGAvcNOMORG() {
		return oRGAvcNOMORG;
	}

	public void setORGAvcNOMORG(String oRGAvcNOMORG) {
		this.oRGAvcNOMORG = oRGAvcNOMORG;
	}

	public String getORGAvcCORPER() {
		return oRGAvcCORPER;
	}

	public void setORGAvcCORPER(String oRGAvcCORPER) {
		this.oRGAvcCORPER = oRGAvcCORPER;
	}

	public String getORGAvcCORJFT() {
		return oRGAvcCORJFT;
	}

	public void setORGAvcCORJFT(String oRGAvcCORJFT) {
		this.oRGAvcCORJFT = oRGAvcCORJFT;
	}

	public Date getORGAdaFECINI() {
		return oRGAdaFECINI;
	}

	public void setORGAdaFECINI(Date oRGAdaFECINI) {
		this.oRGAdaFECINI = oRGAdaFECINI;
	}

	public Date getORGAdaFECFIN() {
		return oRGAdaFECFIN;
	}

	public void setORGAdaFECFIN(Date oRGAdaFECFIN) {
		this.oRGAdaFECFIN = oRGAdaFECFIN;
	}

	public boolean getORGAbtEST() {
		return oRGAbtEST;
	}

	public void setORGAbtEST(boolean oRGAbtEST) {
		this.oRGAbtEST = oRGAbtEST;
	}

	public String getORGACodInt2() {
		return oRGACodInt2;
	}

	public void setORGACodInt2(String oRGACodInt2) {
		this.oRGACodInt2 = oRGACodInt2;
	}

	public GENCliente getGENCliente() {
		return gENCliente;
	}

	public void setGENCliente(GENCliente gENCliente) {
		this.gENCliente = gENCliente;
	}

	@XmlTransient
	public Collection<MEmpl> getMEmplCollection() {
		return mEmplCollection;
	}

	public void setMEmplCollection(Collection<MEmpl> mEmplCollection) {
		this.mEmplCollection = mEmplCollection;
	}

	@Override
	public int hashCode() {
		int hash = 0;
		hash += (mOrgaPK != null ? mOrgaPK.hashCode() : 0);
		return hash;
	}

	@Override
	public boolean equals(Object object) {
		// TODO: Warning - this method won't work in the case the id fields are
		// not set
		if (!(object instanceof MOrga)) {
			return false;
		}
		MOrga other = (MOrga) object;
		if ((this.mOrgaPK == null && other.mOrgaPK != null)
				|| (this.mOrgaPK != null && !this.mOrgaPK.equals(other.mOrgaPK))) {
			return false;
		}
		return true;
	}

	@Override
	public String toString() {
		return "com.lue.model.MOrga[ mOrgaPK=" + mOrgaPK + " ]";
	}

}
