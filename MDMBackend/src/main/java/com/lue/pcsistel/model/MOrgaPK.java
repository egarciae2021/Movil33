
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
public class MOrgaPK implements Serializable {
	private static final long serialVersionUID = -7091482444107673901L;

	@Basic(optional = false)
    @NotNull
    @Column(name = "F_inCodCli", nullable = false)
    private int finCodCli;
   
    @Basic(optional = false)
    @NotNull
    @Column(name = "ORGA_P_inCODINT", nullable = false)
    private int oRGAPinCODINT;

    public MOrgaPK() {
    }

    public MOrgaPK(int finCodCli, int oRGAPinCODINT) {
        this.finCodCli = finCodCli;
        this.oRGAPinCODINT = oRGAPinCODINT;
    }

    public int getFinCodCli() {
        return finCodCli;
    }

    public void setFinCodCli(int finCodCli) {
        this.finCodCli = finCodCli;
    }

    public int getORGAPinCODINT() {
        return oRGAPinCODINT;
    }

    public void setORGAPinCODINT(int oRGAPinCODINT) {
        this.oRGAPinCODINT = oRGAPinCODINT;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) finCodCli;
        hash += (int) oRGAPinCODINT;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MOrgaPK)) {
            return false;
        }
        MOrgaPK other = (MOrgaPK) object;
        if (this.finCodCli != other.finCodCli) {
            return false;
        }
        if (this.oRGAPinCODINT != other.oRGAPinCODINT) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.MOrgaPK[ finCodCli=" + finCodCli + ", oRGAPinCODINT=" + oRGAPinCODINT + " ]";
    }
    
}
