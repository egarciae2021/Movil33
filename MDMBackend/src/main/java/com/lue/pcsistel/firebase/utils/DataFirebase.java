package com.lue.pcsistel.firebase.utils;

import com.google.gson.annotations.SerializedName;

public class DataFirebase {
	@SerializedName("timestamp")
	private String timestamp;

	@SerializedName("message")
	private String message;

	@SerializedName("title")
	private String title;

	@SerializedName("payload")
	private PayloadFirebase payload;

	@SerializedName("image")
	private String image;

	@SerializedName("is_background")
	private String isBackground;

	public String getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public PayloadFirebase getPayload() {
		return payload;
	}

	public void setPayload(PayloadFirebase payload) {
		this.payload = payload;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getIsBackground() {
		return isBackground;
	}

	public void setIsBackground(String isBackground) {
		this.isBackground = isBackground;
	}

	@Override
	public String toString() {
		return "DataFirebase [timestamp=" + timestamp + ", message=" + message + ", title=" + title + ", payload="
				+ payload + ", image=" + image + ", isBackground=" + isBackground + "]";
	}

}
