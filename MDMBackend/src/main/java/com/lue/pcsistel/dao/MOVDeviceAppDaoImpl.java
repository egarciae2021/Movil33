package com.lue.pcsistel.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.lue.pcsistel.model.MOVDeviceApp;


/**
 *
 * @author lue
 */

@Repository
public class MOVDeviceAppDaoImpl  extends AbstractDao<Integer, MOVDeviceApp> implements MOVDeviceAppDao  {

	@Override
	public Integer save(MOVDeviceApp entity) {
		return (Integer) getSession().save(entity);
	}

	@SuppressWarnings({ "deprecation", "unchecked" })
	@Override
	public List<MOVDeviceApp> findAllApplicationByIEMI(String iMEI) {
		List<MOVDeviceApp> list=null;
		try{
			list= getSession().createNamedQuery("MOVDeviceApp.findAllByIEME2").setString("pvcCodIMEI", iMEI).list();
		
		}catch(Exception e){
			e.printStackTrace();
			System.out.println(e.getMessage());
		}
		return list;
	}

	@SuppressWarnings("deprecation")
	@Override
	public void blockedApplication(Integer id, boolean value) {
		getSession().createNamedQuery("MOVDeviceApp.updateApplicationBlocked")
		.setBoolean("blocked",value).setInteger("id", id).executeUpdate();
	}
	@SuppressWarnings("deprecation")
	@Override
	public void applicationInstallBlocked(Integer id, boolean value) {
		getSession().createNamedQuery("MOVDeviceApp.updateInstallationBlocked")
		.setBoolean("blockInstallation",value).setInteger("id", id).executeUpdate();
	}
	@SuppressWarnings("deprecation")
	@Override
	public void applicationUninstallBlocked(Integer id, boolean value) {
		getSession().createNamedQuery("MOVDeviceApp.updateUninstallationBlocked")
		.setBoolean("blockUninstallation",value).setInteger("id", id).executeUpdate();
	}

	
	@SuppressWarnings("deprecation")
	@Override
	public void applicationBlockedTime(Integer id, String startTime, String endTime) {
		getSession().createNamedQuery("MOVDeviceApp.updateApplicationBlockedTime")
		.setString("starTime",startTime).setString("endTime",endTime)
		.setInteger("id", id).executeUpdate();
		
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<MOVDeviceApp> getAllDeviceAppIsNotBlockByIMEI(String imei) {
		return getSession().createNamedQuery("MOVDeviceApp.findDeviceListByBlockedNotNullByIMEI")
				.setString("pvcCodIMEI", imei)
		.list();
	}
	
	@SuppressWarnings("deprecation")
	@Override
	public Long ifNotExistAppByPackegName(String appPackage,String imei) {
		return (Long) getSession().createNamedQuery("MOVDeviceApp.findAppPackageNameExist")
				.setString("packageName", appPackage)
				.setString("pvcCodIMEI", imei)
				.getSingleResult();
		
	}
        
}
