package com.lue.pcsistel.dto;

import java.io.Serializable;
import java.util.Date;

public class PersistentLoginDTO implements Serializable {

	private static final long serialVersionUID = -4040648840569084034L;
	private String series;
	private String username;
	private String token;
	private Date last_used;

	public String getSeries() {
		return series;
	}

	public void setSeries(String series) {
		this.series = series;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Date getLast_used() {
		return last_used;
	}

	public void setLast_used(Date last_used) {
		this.last_used = last_used;
	}

}
