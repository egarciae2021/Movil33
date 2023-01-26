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
public class SEGUsuarioPK implements Serializable {

	private static final long serialVersionUID = 7792690580471943095L;
	@Basic(optional = false)
    @NotNull
    @Column(name = "F_inCodCli", nullable = false)
    private int finCodCli;
    @Basic(optional = false)
    @NotNull
    @Column(name = "P_inCod", nullable = false)
    private int pinCod;

    public SEGUsuarioPK() {
    }

    public SEGUsuarioPK(int finCodCli, int pinCod) {
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
        if (!(object instanceof SEGUsuarioPK)) {
            return false;
        }
        SEGUsuarioPK other = (SEGUsuarioPK) object;
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
        return "com.lue.model.SEGUsuarioPK[ finCodCli=" + finCodCli + ", pinCod=" + pinCod + " ]";
    }
    
}
