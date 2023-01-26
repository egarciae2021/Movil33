package com.lue.pcsistel.service;

import com.lue.pcsistel.dao.GENClienteDao;
import com.lue.pcsistel.dao.MEmplDao;
import com.lue.pcsistel.dao.MOVDispositivoDao;
import com.lue.pcsistel.dao.MOrgaDao;
import com.lue.pcsistel.dao.SEGUsuarioDao;
import com.lue.pcsistel.dto.GENClienteDTO;
import com.lue.pcsistel.model.GENCliente;
import com.lue.pcsistel.utils.BeanCopyUtils;
import com.lue.pcsistel.utils.GSONUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author lue
 */

@Service("genClienteService")
@Transactional
public class GENClienteServiceImpl implements GENClienteService {

	@Autowired
	private GENClienteDao genClienteDao;
	
	@Autowired
	private SEGUsuarioDao segUsuarioDao;
	
	@Autowired
	private MOVDispositivoDao movDispositivoDao; 
	
	@Autowired
	private MEmplDao mEmplDao;
	
	@Autowired
	private MOrgaDao mOrgaDao;

	@Override
	public GENClienteDTO findById(Integer id) {
		return
		BeanCopyUtils.genClientToGENClientDTO(genClienteDao.findById(id));
	}

	@Override
	public void save(GENCliente entity) {
		genClienteDao.save(entity);
	}

	@Override
	public void update(GENCliente entity) {
		genClienteDao.update(entity);
	}

	@Override
	public void delete(GENCliente entity) {
		genClienteDao.delete(entity);
	}

	@Override
	public void saveClient(GENClienteDTO genClienteDTO) {
		GENCliente genCliente = null;
		genCliente = BeanCopyUtils.genCClienteDTOToGENCliente(genClienteDTO);
		genClienteDao.save(genCliente);
	}
	
	@Override
	public List<Object[]> getCliNameIsBtEST() {
		return genClienteDao.getCliNameIsBtEST();
		
	}

	@Override
	public GENClienteDTO findByIdIsEST(Integer id) {
		return 
		BeanCopyUtils.genClientToGENClientDTO(genClienteDao.findByIdIsEST(id));
		
	}

	@Override
	public void deleteGENClientByPK(Integer id) {
		genClienteDao.deleteGENClientByPK(id);
	}

	@Override
	public byte[] getLogo(Integer id) {
		return genClienteDao.getLogo(id);
		
	}

	@Override
	public String getClientId() {
		Map<String, String> map=new HashMap<>();
		List<Object[]> clients=genClienteDao.getClientId();
		for (Object object[]: clients) {
			map.put(object[0].toString(), object[1].toString());
		}
		return GSONUtils.getInstance().toJson(map); 
		
	}

	@Override
	public Map<String, Long> getAdminPanelDetails() {
		Map<String, Long> map=new HashMap<>();
		map.put("clients",genClienteDao.countGenClientEST());
		map.put("users",segUsuarioDao.countUsuarioEST());
		map.put("devices",movDispositivoDao.countMOVDispositivoEST());
		map.put("mepls",mEmplDao.countMEmpl());
		map.put("orga",mOrgaDao.countMOrgaEST());
		return map;
	}

	@Override
	public List<GENClienteDTO> findAllClientIsEST() {
		List<GENClienteDTO> genclienteDTOs=new ArrayList<>();
		for (GENCliente genCliente : genClienteDao.findAllClientIsEST()) {
			genclienteDTOs.add(BeanCopyUtils.genClientToGENClientDTO(genCliente));
		}
		return genclienteDTOs;
	}

	@Override
	public void updateGenClient(GENClienteDTO genClienteDTO) {
		genClienteDao.update(BeanCopyUtils.genCClienteDTOToGENCliente(genClienteDTO));
		
	}

	@Override
	public Integer getClientIdById(int id) {
		return genClienteDao.getClientIdById(id);
	}

	@Override
	public Map<String, Long> clientPanelDetailsByCliId(Integer clientfk) {
		Map<String, Long> map=new HashMap<>();
		map.put("users",segUsuarioDao.countUsuarioByClientFk(clientfk));
		map.put("devices",movDispositivoDao.countMOVDispositivoByClientFk(clientfk));
		map.put("mepls",mEmplDao.countMEmplByClientFk(clientfk));
		map.put("orga",mOrgaDao.countMOrgaByClientFk(clientfk));
		return map;
	}

	@Override
	public void updateClientLogo(byte[] logo, Integer clientPk) {
		genClienteDao.updateClientLogo(logo,clientPk);
	}
	
	@Override
	public Integer countAllClient() {
		return Integer.parseInt(genClienteDao.countGenClientEST().toString());
	}
}
