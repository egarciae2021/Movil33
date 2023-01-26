package com.lue.pcsistel.firebase.utils;

import com.google.gson.annotations.SerializedName;

public class FirebaseJSON {

	@SerializedName("data")
	private DataFirebase data;

	public DataFirebase getData() {
		return data;
	}

	public void setData(DataFirebase data) {
		this.data = data;
	}

	@Override
	public String toString() {
		return "FirebaseJSON [data=" + data + "]";
	}

}
