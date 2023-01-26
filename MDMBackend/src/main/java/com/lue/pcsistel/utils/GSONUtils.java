package com.lue.pcsistel.utils;

import com.google.gson.Gson;

public class GSONUtils {
	private static Gson gson = null;
	public static Gson getInstance() {
		if (gson == null) {
			gson = new Gson();
		} else {
			return gson;
		}
		return gson;
	}
}
