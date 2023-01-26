package com.lue.pcsistel.common;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.crypto.codec.Base64;

public class Encryptor {
    
    // SESSION ENCRYPTION KEYS
 public static final String SECURITY_ENCRIPTION_KEY = "LUEINFO@^&#@PATN";
 public static final String SECURITY_INIT_VECTOR = "KUNDAN@KKSCWCD@P";
    
	public static String encrypt(String str) {
		try {
			IvParameterSpec iv = new IvParameterSpec(SECURITY_INIT_VECTOR.getBytes("UTF-8"));
			SecretKeySpec skeySpec = new SecretKeySpec(SECURITY_ENCRIPTION_KEY.getBytes("UTF-8"),
					"AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
			cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);

			byte[] encrypted = cipher.doFinal(str.getBytes());

			return new String(Base64.encode(encrypted));
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return null;
	}

	public static String decrypt(String str) {
		try {
			IvParameterSpec iv = new IvParameterSpec(SECURITY_INIT_VECTOR.getBytes("UTF-8"));
			SecretKeySpec skeySpec = new SecretKeySpec(SECURITY_ENCRIPTION_KEY.getBytes("UTF-8"),
					"AES");

			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
			cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);

			byte[] original = cipher.doFinal(Base64.decode(str.getBytes()));

			return new String(original);
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return null;
	}
}