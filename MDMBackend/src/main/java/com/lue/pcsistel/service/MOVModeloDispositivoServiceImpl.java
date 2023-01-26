package com.lue.pcsistel.service;

import com.lue.pcsistel.dao.MOVModeloDispositivoDao;
import com.lue.pcsistel.model.MOVModeloDispositivo;
import com.lue.pcsistel.rest.request.DeviceRegisterRequest;

import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author lue
 */

@Service("movModeloDispositivoService")
@Transactional
public class MOVModeloDispositivoServiceImpl implements MOVModeloDispositivoService{

    @Autowired
    private MOVModeloDispositivoDao  movModeloDispositivoDao;
    
    @Override
    public MOVModeloDispositivo findById(Integer id) {
       return movModeloDispositivoDao.getByKey(id);
    }

    @Override
    @Transactional
    public Integer save(MOVModeloDispositivo entity) {
        return  movModeloDispositivoDao.save(entity);
    }

    @Override
    public void update(MOVModeloDispositivo entity) {
        movModeloDispositivoDao.update(entity);
    }

    @Override
    public void delete(MOVModeloDispositivo entity) {
        movModeloDispositivoDao.delete(entity);
    }

	@Override
	public Integer findModelPk(String deviceName) {
		
		return movModeloDispositivoDao.findModelPk(deviceName);
	}

	@Override
	@Transactional(readOnly = false,rollbackFor=SQLException.class)
	public Integer saveDeviceModel(DeviceRegisterRequest request) {
		MOVModeloDispositivo entity=new MOVModeloDispositivo();
		entity.setVcNom(request.getDeviceName());
		entity.setVcDes(request.getDeviceDesc());
		entity.setVcMarcaModelo(request.getDeviceBrand());
		entity.setBtVig(true);
		entity.setFinCodTipSer(10);
		entity.setBtSopLin(true);
		entity.setBtMosEnSol(true);
		entity.setVcTipoChip("2");
		return movModeloDispositivoDao.save(entity);
	}
    
}
