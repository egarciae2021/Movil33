package com.lue.pcsistel.firebase.utils;

import com.google.gson.annotations.SerializedName;

public class PayloadFirebase {
	 /*private String data_param_1;
	    private String user_id;
*/
	
	@SerializedName("data_param_1")
	private String dataParam;
	@SerializedName("user_id")
	private String userId;

	public String getDataParam() {
		return dataParam;
	}

	public void setDataParam(String dataParam) {
		this.dataParam = dataParam;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "PayloadFirebase [dataParam=" + dataParam + ", userId=" + userId + "]";
	}

}
