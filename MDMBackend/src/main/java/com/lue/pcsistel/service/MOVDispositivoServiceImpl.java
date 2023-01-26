package com.lue.pcsistel.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lue.pcsistel.common.UtilService;
import com.lue.pcsistel.dao.MEmplRegCodeDao;
import com.lue.pcsistel.dao.MOVDeviceAppDao;
import com.lue.pcsistel.dao.MOVDispositivoDao;
import com.lue.pcsistel.dao.MOVModeloDispositivoDao;
import com.lue.pcsistel.dto.MOVDeviceAppDTO;
import com.lue.pcsistel.dto.MOVDeviceAppResponseDTO;
import com.lue.pcsistel.dto.MOVDispositivoDTO;
import com.lue.pcsistel.dto.TimeConfig;
import com.lue.pcsistel.model.MEmplRegCode;
import com.lue.pcsistel.model.MOVDeviceApp;
import com.lue.pcsistel.model.MOVDeviceLocation;
import com.lue.pcsistel.model.MOVDispositivo;
import com.lue.pcsistel.model.MOVDispositivoPK;
import com.lue.pcsistel.model.MOVModeloDispositivo;
import com.lue.pcsistel.rest.api.GenericResponseAppList;
import com.lue.pcsistel.rest.request.DeviceLocation;
import com.lue.pcsistel.rest.request.DeviceRegisterRequest;
import com.lue.pcsistel.rest.request.UploadApp;
import com.lue.pcsistel.rest.request.UploadAppRequest;
import com.lue.pcsistel.rest.response.DeviceRegisterResponse;
import com.lue.pcsistel.rest.response.GenericResponse;
import com.lue.pcsistel.utils.BeanCopyUtils;
import com.lue.pcsistel.utils.GCMTokenJson;
import com.lue.pcsistel.utils.GSONUtils;

/**
 *
 * @author lue
 */

@Service("movDispositivoService")
@Transactional
public class MOVDispositivoServiceImpl implements MOVDispositivoService {

	@Autowired
	private MOVDispositivoDao movDispositivoDao;
	@Autowired
	private MOVModeloDispositivoService movModeloDispositivoService;
	@Autowired
	private MOVDeviceAppService mOVDeviceAppService;
	@Autowired
	private MOVDeviceLocationService movDeviceLocationService;
	
	@Autowired
	private MOVDeviceAppDao movDeviceAppDao;
	 @Autowired
	  private MOVModeloDispositivoDao  movModeloDispositivoDao;
	@Autowired
	private MEmplRegCodeDao mEmplRegCodeDao;

	@Override
	public MOVDispositivo findById(Integer id) {
		return movDispositivoDao.findById(id);
	}

	@Override
	public void save(MOVDispositivo entity) {
		// movDispositivoDao.save(entity);
	}

	@Override
	public DeviceRegisterResponse saveDevice(DeviceRegisterRequest request) {
		DeviceRegisterResponse response = new DeviceRegisterResponse();

		MEmplRegCode mEmplRegCode = mEmplRegCodeDao.checkRegCode(request.getRegCode());
		if (mEmplRegCode != null) {
			try {
				Integer modelId = movModeloDispositivoService.findModelPk(request.getDeviceName());
				if(modelId==0){
					modelId=movModeloDispositivoService.saveDeviceModel(request);
				}
				if (modelId != 0) {
				
					if (ifNotExistMOVDispositivoVcCodeEMEI(request.getImeiNumber())) {
						// splitIMeiNumber(request.getImeiNumber());
						String authToken = UtilService.encodeKey(mEmplRegCode.getmEmpl().getMEmplPK().getFinCodCli(),
								request.getImeiNumber());
						movDispositivoDao.updateDispositivo(request.getImeiNumber(), authToken);
						response.setMessage("Sucess");
						response.setStatus(200);
						response.setImei(request.getImeiNumber());
						response.setClientId(mEmplRegCode.getmEmpl().getMEmplPK().getFinCodCli());
						response.setAuthToken(authToken);
						return response;

					} else {

						MOVModeloDispositivo modeloDispositivo = new MOVModeloDispositivo();
						modeloDispositivo.setPinCod(modelId);
						MOVDispositivo movDispositivo = new MOVDispositivo();
						movDispositivo.setMEmpl(mEmplRegCode.getmEmpl());
						movDispositivo.setPushToken(request.getGcmToken());

						// Set PrimaryKey
						MOVDispositivoPK pk = new MOVDispositivoPK(mEmplRegCode.getmEmpl().getMEmplPK().getFinCodCli(),
								request.getImeiNumber());
						movDispositivo.setMOVDispositivoPK(pk);
						movDispositivo.setFechaFactura(new Date());
						movDispositivo.setDtFecIng(new Date());
						movDispositivo.setBtVig(true);
						movDispositivo.setFinCodModDis(modeloDispositivo);
						// Generate Auth Toke for device
						String authToken = UtilService.encodeKey(pk.getFinCodCli(), request.getImeiNumber());
						movDispositivo.setAuthToken(authToken);

						movDispositivoDao.save(movDispositivo);

						response.setMessage("Sucess");
						response.setStatus(200);
						response.setImei(request.getImeiNumber());
						response.setClientId(pk.getFinCodCli());
						response.setAuthToken(authToken);
						return response;
					}
				} /*else {
					response.setMessage("Error");
					response.setStatus(400);
					response.setError("Not valied device name");
					response.setImei(request.getDeviceName());
					return response;
				}*/
			} catch (Exception e) {
				e.printStackTrace();
				response.setMessage("Error");
				response.setStatus(400);
				response.setError("While register device error coming,Try later");
				response.setImei(request.getDeviceName());
				return response;
			}
		} else {
			response.setMessage("Error");
			response.setStatus(400);
			response.setError("Registration Code Not Found");
			return response;
		}
		return null;
	}// saveDevice

	@Override
	public void update(MOVDispositivo entity) {
		movDispositivoDao.update(entity);
	}

	@Override
	public void delete(MOVDispositivo entity) {
		movDispositivoDao.delete(entity);

	}

	@Override
	public List<MOVDispositivoDTO> findAllDevByMemplPK(String mEmplPk) {
		List<MOVDispositivoDTO> dispositivoDTOs = new ArrayList<>();
		List<MOVDispositivo> movDispositivos = null;
		movDispositivos = movDispositivoDao.findAllDevByMemplPK(mEmplPk);
		for (MOVDispositivo movDispositivo : movDispositivos) {
			MOVDispositivoDTO movDispositivoDTO = BeanCopyUtils.mOVDispositivoToMOVDispositivoDTO(movDispositivo);
			dispositivoDTOs.add(movDispositivoDTO);
		}
		return dispositivoDTOs;
	}

	public void deleteByDevicePk(String id) {
		movDispositivoDao.deleteByDevicePk(id);
	}

	@Override
	public MOVDispositivoDTO findByDevicePk(String id) {
		try{
		return BeanCopyUtils.mOVDispositivoToMOVDispositivoDTO(movDispositivoDao.findByDevicePk(id));
		}catch(RuntimeException e){
			e.printStackTrace();
		}
		return null;
	}

	@Override

	public void updateMOVDispositivo(MOVDispositivoDTO dispositivoDTO) {

		movDispositivoDao.updateMOVDispositivo(BeanCopyUtils.mOVDispositivoDTOToMOVDispositivo(dispositivoDTO));
	}

	@Override
	public MOVDispositivo findDeviceByImei(String imei) {
		MOVDispositivo movDev = movDispositivoDao.findByDevicePk(imei);
		movDev.getPushToken();
		return movDev;
	}

	@Override
	public GenericResponse uploadApps(String token, UploadAppRequest request) {
		GenericResponse response = new GenericResponse();
		try {
			String imei = UtilService.getIMEIFromUserKey(token);
			MOVDispositivo device = movDispositivoDao.findByDevicePk(imei);
			if (device != null) {
				for (UploadApp ua : request.getApps()) {
					if (mOVDeviceAppService.ifNotExistAppByPackegName(ua.getAppPackage(), imei)) {
						MOVDeviceApp moapp = new MOVDeviceApp();
						moapp.setDispositivo(device);
						moapp.setAppName(ua.getAppName());
						moapp.setBlocked(true);
						moapp.setBlockInstallation(false);
						moapp.setBlockUninstallation(false);
						moapp.setCreatedDate(new Date());
						moapp.setModifiedDate(new Date());
						moapp.setPackageName(ua.getAppPackage());
						mOVDeviceAppService.save(moapp);
					} // if
				} // for

			} else {
				response.setMessage("Invalid token");
				response.setStatus(403);
				return response;
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			response.setMessage("Un-Authorized, Invalid token");
			response.setStatus(403);
			return response;
		}
		// Loop through the app list and save it to the db
		response.setMessage("Success");
		response.setStatus(200);
		return response;
	}

	@Override
	public GenericResponse updateGCMToken(String token, String gcmTokenJSON) {
		GenericResponse response = new GenericResponse();
		String gcmToken = null;
		String imei = UtilService.getIMEIFromUserKey(token);
		if (ifNotExistMOVDispositivoVcCodeEMEI(imei)) {
			try {
				gcmToken = GSONUtils.getInstance().fromJson(gcmTokenJSON, GCMTokenJson.class).getGcmToken();
			} catch (Exception e) {
				response.setMessage("not valied json data");
				response.setStatus(400);
				return response;
			}
			movDispositivoDao.updateGSMToken(imei, gcmToken.trim());
			response.setMessage("updated successfully");
			response.setStatus(200);
		} else {
			response.setMessage("Un-Authorized, Invalid token");
			response.setStatus(403);
			return response;
		}

		return response;
	}

	public String[] splitIMeiNumber(String imei) {
		try {
			return imei.split(",");
		} catch (Exception e) {
			throw new RuntimeException("Un-Authorized, Invalid token");
		}
	}

	@Override
	public GenericResponseAppList deviceAppList(String token) {
		GenericResponseAppList response = new GenericResponseAppList();
		List<MOVDeviceApp> monDeviceApp = null;
		List<MOVDeviceAppResponseDTO> apps;

		try {
			String imei = UtilService.getIMEIFromUserKey(token);

			MOVDispositivo device = movDispositivoDao.findByDevicePk(imei);
			if (device != null) {
				apps = new ArrayList<>();

				monDeviceApp = movDeviceAppDao.getAllDeviceAppIsNotBlockByIMEI(imei);
				for (MOVDeviceApp movDeviceApp : monDeviceApp) {
					if (movDeviceApp.getStarTime() == null) {
						MOVDeviceAppResponseDTO appResponseDTO = new MOVDeviceAppResponseDTO();
						appResponseDTO.setAppName(movDeviceApp.getAppName());
						appResponseDTO.setBlocked(movDeviceApp.getBlocked());
						appResponseDTO.setId(movDeviceApp.getId());
						appResponseDTO.setIsAppConfig(false);
						appResponseDTO.setPackageName(movDeviceApp.getPackageName());
						apps.add(appResponseDTO);
					} else {
						TimeConfig timeConfig = new TimeConfig();
						MOVDeviceAppResponseDTO appResponseDTO = new MOVDeviceAppResponseDTO();
						appResponseDTO.setAppName(movDeviceApp.getAppName());
						appResponseDTO.setBlocked(movDeviceApp.getBlocked());
						appResponseDTO.setId(movDeviceApp.getId());
						appResponseDTO.setIsAppConfig(true);
						appResponseDTO.setPackageName(movDeviceApp.getPackageName());
						timeConfig.setEndTime(movDeviceApp.getEndTime());
						timeConfig.setStarTime(movDeviceApp.getStarTime());
						appResponseDTO.setTimeConfig(timeConfig);
						apps.add(appResponseDTO);
					}
				}

				response.setApps(apps);
				response.setMessage("success");
			} else {
				response.setMessage("Invalid token");
				response.setStatus(403);
				return response;
			}
		} catch (Exception e) {
			response.setMessage("Invalid token");
			response.setStatus(403);
			return response;
		}
		response.setStatus(200);
		return response;
	}

	@Override
	public GenericResponse uploadLocation(String token, DeviceLocation deviceLocation) {
		GenericResponse response = new GenericResponse();
		try {
			String imei = UtilService.getIMEIFromUserKey(token);

			MOVDispositivo device = movDispositivoDao.findByDevicePk(imei);
			if (device != null) {
				MOVDeviceLocation devLoc = new MOVDeviceLocation();
				devLoc.setCreationDate(new Date());
				devLoc.setLatitude(deviceLocation.getLatitude());
				devLoc.setLongitude(deviceLocation.getLongitude());
				devLoc.setmOVDevice(device);
				movDeviceLocationService.save(devLoc);
			} else {
				response.setMessage("Un-Authorized, Invalid token");
				response.setStatus(403);
				return response;
			}

		} catch (Exception ex) {
			ex.printStackTrace();
			response.setMessage("Un-Authorized, Invalid token");
			response.setStatus(403);
			return response;
		}

		// Loop through the app list and save it to the db
		response.setMessage("Success");
		response.setStatus(200);
		return response;
	}

	@Override
	public List<MOVDispositivoDTO> findAllDevicesIsEST() {
		List<MOVDispositivoDTO> dispositivoDTOs = new ArrayList<>();
		for (MOVDispositivo movDispositivo : movDispositivoDao.findAllDevicesIsEST()) {
			MOVDispositivoDTO movDispositivoDTO = BeanCopyUtils.mOVDispositivoToMOVDispositivoDTO(movDispositivo);
			dispositivoDTOs.add(movDispositivoDTO);
		}
		return dispositivoDTOs;
	}

	public boolean ifNotExistMOVDispositivoVcCodeEMEI(String imeiNumber) {
		if (movDispositivoDao.ifNotExistMOVDispositivoVcCodeEMEI(imeiNumber) > 0) {
			return true;
		} else {
			return false;
		}

	}

	@Override
	public List<MOVDispositivoDTO> findAllDevicesByCliId(Integer clientFk) {
		List<MOVDispositivoDTO> dispositivoDTOs = new ArrayList<>();
		for (MOVDispositivo movDispositivo : movDispositivoDao.findAllDevicesByCliId(clientFk)) {
			MOVDispositivoDTO movDispositivoDTO = BeanCopyUtils.mOVDispositivoToMOVDispositivoDTO(movDispositivo);	
			dispositivoDTOs.add(movDispositivoDTO);
		}
		return dispositivoDTOs;
	}

	@Override
	public String findGCMTokenByImei(String imeiNumber) {
		try {
			return movDispositivoDao.findGCMTokenByImei(imeiNumber);
		} catch (RuntimeException e) {
			e.getMessage();
		}
		return null;
	}

}
