package com.lue.pcsistel.converter;

import com.lue.pcsistel.model.SEGPerfil;
import com.lue.pcsistel.service.SEGPerfilService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;


/**
 * A converter class used in views to map id's to actual userProfile objects.
 */
@Component
public class RoleToUserProfileConverter implements Converter<Object, SEGPerfil>{

	static final Logger logger = LoggerFactory.getLogger(RoleToUserProfileConverter.class);
	
	@Autowired
	SEGPerfilService sEGPerfilService;

	/**
	 * Gets UserProfile by Id
	 * @see org.springframework.core.convert.converter.Converter#convert(java.lang.Object)
	 */
	public SEGPerfil convert(Object element) {
		Integer id = Integer.parseInt((String)element);
		SEGPerfil profile= sEGPerfilService.findById(id);
		logger.info("Profile : {}",profile);
		return profile;
	}
	
}