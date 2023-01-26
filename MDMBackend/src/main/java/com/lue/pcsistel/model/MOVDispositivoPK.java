package com.lue.pcsistel.model;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author lue
 */
@Embeddable
public class MOVDispositivoPK implements Serializable {
	private static final long serialVersionUID = -7529358117027191913L;
	@Basic(optional = false)
    @NotNull
    @Column(name = "F_inCodCli", nullable = false)
    private int finCodCli;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 50)
    @Column(name = "P_vcCodIMEI", nullable = false, length = 50)
    private String pvcCodIMEI;

    public MOVDispositivoPK() {
    }

    public MOVDispositivoPK(int finCodCli, String pvcCodIMEI) {
        this.finCodCli = finCodCli;
        this.pvcCodIMEI = pvcCodIMEI;
    }

    public int getFinCodCli() {
        return finCodCli;
    }

    public void setFinCodCli(int finCodCli) {
        this.finCodCli = finCodCli;
    }

    public String getPvcCodIMEI() {
        return pvcCodIMEI;
    }

    public void setPvcCodIMEI(String pvcCodIMEI) {
        this.pvcCodIMEI = pvcCodIMEI;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) finCodCli;
        hash += (pvcCodIMEI != null ? pvcCodIMEI.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MOVDispositivoPK)) {
            return false;
        }
        MOVDispositivoPK other = (MOVDispositivoPK) object;
        if (this.finCodCli != other.finCodCli) {
            return false;
        }
        if ((this.pvcCodIMEI == null && other.pvcCodIMEI != null) || (this.pvcCodIMEI != null && !this.pvcCodIMEI.equals(other.pvcCodIMEI))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.lue.model.MOVDispositivoPK[ finCodCli=" + finCodCli + ", pvcCodIMEI=" + pvcCodIMEI + " ]";
    }
    
}
