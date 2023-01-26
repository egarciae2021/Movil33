
package com.lue.pcsistel.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 *
 * @author lue
 */
@Embeddable
public class SEGPerfilPK implements Serializable {
	private static final long serialVersionUID = -7509043936553572506L;
	@Basic(optional = false)
    @Column(name = "F_inCodCli")
    private int finCodCli;
    @Basic(optional = false)
    @Column(name = "P_inCod")
    private int pinCod;

    public SEGPerfilPK() {
    }

    public SEGPerfilPK(int finCodCli, int pinCod) {
        this.finCodCli = finCodCli;
        this.pinCod = pinCod;
    }

    public int getFinCodCli() {
        return finCodCli;
    }

    public void setFinCodCli(int finCodCli) {
        this.finCodCli = finCodCli;
    }

    public int getPinCod() {
        return pinCod;
    }

    public void setPinCod(int pinCod) {
        this.pinCod = pinCod;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) finCodCli;
        hash += (int) pinCod;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof SEGPerfilPK)) {
            return false;
        }
        SEGPerfilPK other = (SEGPerfilPK) object;
        if (this.finCodCli != other.finCodCli) {
            return false;
        }
        if (this.pinCod != other.pinCod) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.SEGPerfilPK[ finCodCli=" + finCodCli + ", pinCod=" + pinCod + " ]";
    }
    
}
