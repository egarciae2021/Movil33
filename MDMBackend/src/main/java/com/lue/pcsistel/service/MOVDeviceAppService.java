package com.lue.pcsistel.service;

import java.util.List;

import com.lue.pcsistel.dto.MOVDeviceAppDTO;
import com.lue.pcsistel.model.MOVDeviceApp;

/**
 *
 * @author lue
 */
public interface MOVDeviceAppService {
   
	 MOVDeviceApp getByKey(Integer  id);

	 void persist(MOVDeviceApp entity); 

	 void update(MOVDeviceApp entity); 

	 void delete(MOVDeviceApp entity);
	 Integer save(MOVDeviceApp entity);

	List<MOVDeviceAppDTO> findAllApplicationByIEMI(String iMEI);

	String blockedApplication(Integer id,boolean value);
	
	String blockedApplicationAll(String imei,boolean value);

	String applicationInstallBlocked(Integer id, boolean value);

	String applicationUninstallBlocked(Integer id, boolean value);

	String applicationBlockedTime(Integer id, String startTime, String endTime);

	boolean ifNotExistAppByPackegName(String appPackage,String imei);
   
        
}
