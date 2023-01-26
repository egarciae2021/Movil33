package com.lue.pcsistel.dto;

public class ImageUploadJSON {
	private String cToken;
	private String userName;
	private String image;

	public String getcToken() {
		return cToken;
	}

	public void setcToken(String cToken) {
		this.cToken = cToken;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "ImageUploadJSON [cToken=" + cToken + ", userName=" + userName + ", image=" + image + "]";
	}

}
