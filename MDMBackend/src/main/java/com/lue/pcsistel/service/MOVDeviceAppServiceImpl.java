package com.lue.pcsistel.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Convert;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lue.pcsistel.dao.MOVDeviceAppDao;
import com.lue.pcsistel.dto.MOVDeviceAppDTO;
import com.lue.pcsistel.dto.MOVDispositivoDTO;
import com.lue.pcsistel.dto.MOVDispositivoPKDTO;
import com.lue.pcsistel.model.MOVDeviceApp;
import com.lue.pcsistel.utils.BeanCopyUtils;

/**
 *
 * @author lue
 */

@Service
@Transactional
public class MOVDeviceAppServiceImpl implements MOVDeviceAppService{

	@Autowired
	private MOVDeviceAppDao mOVDeviceAppDao;
	
	@Override
	public MOVDeviceApp getByKey(Integer id) {
		// TODO Auto-generated method stub
		return mOVDeviceAppDao.getByKey(id);
	}

	@Override
	public void persist(MOVDeviceApp entity) {
		mOVDeviceAppDao.persist(entity);
	}

	@Override
	public void update(MOVDeviceApp entity) {
		// TODO Auto-generated method stub
		mOVDeviceAppDao.update(entity);
	}

	@Override
	public void delete(MOVDeviceApp entity) {
		// TODO Auto-generated method stub
		mOVDeviceAppDao.delete(entity);
	}
   
	@Override
	public Integer save(MOVDeviceApp entity) {
		return mOVDeviceAppDao.save(entity);
		 
	}

	@Override
	public List<MOVDeviceAppDTO> findAllApplicationByIEMI(String iMEI) {
		List<MOVDeviceAppDTO>  movDeviceAppDTOs=new ArrayList<>();
		for (MOVDeviceApp movDeviceApp : mOVDeviceAppDao.findAllApplicationByIEMI(iMEI)) {
			MOVDeviceAppDTO deviceAppDTO=BeanCopyUtils.movDeviceAppToMOVDeviceAppDTO(movDeviceApp);
			MOVDispositivoDTO dispositivo=new MOVDispositivoDTO();
			MOVDispositivoPKDTO mOVDispositivoPK=new MOVDispositivoPKDTO();
			mOVDispositivoPK.setPvcCodIMEI(iMEI);
			dispositivo.setmOVDispositivoPK(mOVDispositivoPK);
			deviceAppDTO.setDispositivo(dispositivo);
			movDeviceAppDTOs.add(deviceAppDTO);
		}
		return movDeviceAppDTOs;
	}
	 
	@Override
	public String blockedApplication(Integer id,boolean value) {
		try{
			mOVDeviceAppDao.blockedApplication(id,value);
			return "true";
		}catch(Exception e){
			return "false";
		}
	}

	@Override
	public String applicationInstallBlocked(Integer id, boolean value) {
		try{
			mOVDeviceAppDao.applicationInstallBlocked(id,value);
			return "true";
		}catch(Exception e){
			return "false";
		}
	}

	@Override
	public String applicationUninstallBlocked(Integer id, boolean value) {
		try{
			mOVDeviceAppDao.applicationUninstallBlocked(id,value);
			return "true";
		}catch(Exception e){
			return "false";
		}
	}

	@Override
	public String applicationBlockedTime(Integer id, String startTime, String endTime) {
		try{
			mOVDeviceAppDao.applicationBlockedTime(id,startTime,endTime);
			return "true";
		}catch(Exception e){
			e.printStackTrace();
			return "false";
		}
	}
   
	@Override
	public boolean ifNotExistAppByPackegName(String appPackage,String imei) {
		if(mOVDeviceAppDao.ifNotExistAppByPackegName(appPackage,imei)>0){
			return false;
		}else{
			return true;
		}
		
	}

	@Override
	public String blockedApplicationAll(String imei, boolean value) {
		try{
			
			String ids ="";
			for (MOVDeviceApp movDeviceApp : mOVDeviceAppDao.findAllApplicationByIEMI(imei)) {
				MOVDeviceAppDTO deviceAppDTO=BeanCopyUtils.movDeviceAppToMOVDeviceAppDTO(movDeviceApp);
				ids+= ";" + deviceAppDTO.getId().toString();
			}			
			if (ids.length()>0)
				 ids = ids.substring(1);
			
			
			String[] listaIds = ids.split(";");
			for (String id : listaIds) {
				if (id != "") {
					mOVDeviceAppDao.blockedApplication(Integer.parseInt(id),value);
				}
			}
			return "true";
		}catch(Exception e){
			return "false";
		}
	}

}
