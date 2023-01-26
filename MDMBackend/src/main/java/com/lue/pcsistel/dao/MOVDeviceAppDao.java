package com.lue.pcsistel.dao;

import java.util.List;

import com.lue.pcsistel.model.MOVDeviceApp;

/**
 *
 * @author lue
 */
public interface MOVDeviceAppDao {
   
	 MOVDeviceApp getByKey(Integer  id);

	 void persist(MOVDeviceApp entity); 

	 void update(MOVDeviceApp entity); 

	 void delete(MOVDeviceApp entity);

	Integer save(MOVDeviceApp entity);

	List<MOVDeviceApp> findAllApplicationByIEMI(String iMEI);

	void blockedApplication(Integer id, boolean value);

	void applicationInstallBlocked(Integer id, boolean value);

	void applicationUninstallBlocked(Integer id, boolean value);

	void applicationBlockedTime(Integer id, String startTime, String endTime);

	List<MOVDeviceApp> getAllDeviceAppIsNotBlockByIMEI(String imei);

	Long ifNotExistAppByPackegName(String appPackage,String imei);
   
        
}
