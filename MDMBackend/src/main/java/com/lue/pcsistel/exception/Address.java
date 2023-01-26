package com.lue.pcsistel.exception;

public class Address {
	private boolean company;
	private String name;
	private Integer taxId;

	public String getName() {
		return name;
	}

	public boolean isCompany() {
		return company;
	}

	public Object getTaxId() {
		return taxId;
	}

	public void setCompany(boolean company) {
		this.company = company;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setTaxId(Integer taxId) {
		this.taxId = taxId;
	}
	
	
	

}
