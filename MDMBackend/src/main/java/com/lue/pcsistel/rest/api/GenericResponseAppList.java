package com.lue.pcsistel.rest.api;

import java.util.List;

import com.lue.pcsistel.dto.MOVDeviceAppResponseDTO;

public class GenericResponseAppList {

	private String message;
	private int status;
	private String error;
	List<MOVDeviceAppResponseDTO> apps;
	
	

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

	public List<MOVDeviceAppResponseDTO> getApps() {
		return apps;
	}

	public void setApps(List<MOVDeviceAppResponseDTO> apps) {
		this.apps = apps;
	}

	
}
