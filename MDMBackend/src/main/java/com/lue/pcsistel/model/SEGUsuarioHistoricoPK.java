package com.lue.pcsistel.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;

/**
 *
 * @author lue
 */
@Embeddable
public class SEGUsuarioHistoricoPK implements Serializable {
	private static final long serialVersionUID = 3223219765989628537L;
	@Basic(optional = false)
    @NotNull
    @Column(name = "F_inCodCli", nullable = false)
    private int finCodCli;
    @Basic(optional = false)
    @NotNull
    @Column(name = "P_inId", nullable = false)
    private int pinId;

    public SEGUsuarioHistoricoPK() {
    }

    public SEGUsuarioHistoricoPK(int finCodCli, int pinId) {
        this.finCodCli = finCodCli;
        this.pinId = pinId;
    }

    public int getFinCodCli() {
        return finCodCli;
    }

    public void setFinCodCli(int finCodCli) {
        this.finCodCli = finCodCli;
    }

    public int getPinId() {
        return pinId;
    }

    public void setPinId(int pinId) {
        this.pinId = pinId;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) finCodCli;
        hash += (int) pinId;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof SEGUsuarioHistoricoPK)) {
            return false;
        }
        SEGUsuarioHistoricoPK other = (SEGUsuarioHistoricoPK) object;
        if (this.finCodCli != other.finCodCli) {
            return false;
        }
        if (this.pinId != other.pinId) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.SEGUsuarioHistoricoPK[ finCodCli=" + finCodCli + ", pinId=" + pinId + " ]";
    }
    
}
