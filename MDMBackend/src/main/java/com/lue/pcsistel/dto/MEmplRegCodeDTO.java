package com.lue.pcsistel.dto;

import java.io.Serializable;
import java.util.Date;

/**
 * @author lue
 *
 */
public class MEmplRegCodeDTO implements Serializable {
	private static final long serialVersionUID = 1193649800170846496L;
	private Long id;
	private String regCode;
	private Date creationDate;
	private Date updationDate;
	private boolean expired = Boolean.FALSE;
	private MEmplDTO mEmpl;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getRegCode() {
		return regCode;
	}
	public void setRegCode(String regCode) {
		this.regCode = regCode;
	}
	public Date getCreationDate() {
		return creationDate;
	}
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	public Date getUpdationDate() {
		return updationDate;
	}
	public void setUpdationDate(Date updationDate) {
		this.updationDate = updationDate;
	}
	public boolean isExpired() {
		return expired;
	}
	public void setExpired(boolean expired) {
		this.expired = expired;
	}
	public MEmplDTO getmEmpl() {
		return mEmpl;
	}
	public void setmEmpl(MEmplDTO mEmpl) {
		this.mEmpl = mEmpl;
	}
	
	

}
