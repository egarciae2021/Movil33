package com.lue.pcsistel.exception;

import java.util.Date;

public class ErrorDetails {
	private String authToken;
	private int clientId;
	private String imei;
	private Date date;
	private String message;
	private int status;
	private String error;
	public String getAuthToken() {
		return authToken;
	}
	public void setAuthToken(String authToken) {
		this.authToken = authToken;
	}
	public int getClientId() {
		return clientId;
	}
	public void setClientId(int clientId) {
		this.clientId = clientId;
	}
	public String getImei() {
		return imei;
	}
	public void setImei(String imei) {
		this.imei = imei;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	
	
}
