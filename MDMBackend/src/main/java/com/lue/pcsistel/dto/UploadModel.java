package com.lue.pcsistel.dto;
import org.springframework.web.multipart.MultipartFile;
public class UploadModel {
	private String extraField;

    private MultipartFile[] file;

	public String getExtraField() {
		return extraField;
	}

	public void setExtraField(String extraField) {
		this.extraField = extraField;
	}

	public MultipartFile[] getFile() {
		return file;
	}

	public void setFile(MultipartFile[] file) {
		this.file = file;
	}
    
    
}
