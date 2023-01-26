package com.lue.pcsistel.service;

import com.lue.pcsistel.dao.MOrgaDao;
import com.lue.pcsistel.dto.MOrgaDTO;
import com.lue.pcsistel.model.MOrga;
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

@Service("mOrgaService")
@Transactional
public class MOrgaServiceImpl implements MOrgaService {

	@Autowired
	private MOrgaDao mOrgaDao;

	@Override
	public MOrgaDTO findById(Integer id) {
		return BeanCopyUtils.mOrgaToMOrgaDTO(mOrgaDao.getById(id));
	}

	@Override
	public void save(MOrga entity) {
		mOrgaDao.persist(entity);
	}

	@Override
	public void update(MOrga entity) {
		mOrgaDao.update(entity);
	}

	@Override
	public void delete(MOrga entity) {
		mOrgaDao.delete(entity);
	}

	@Override
	public List<MOrgaDTO> findAll() {
		List<MOrgaDTO> mOrgaDTOs = new ArrayList<>();
		for (MOrga mOrga : mOrgaDao.findAll()) {
			mOrgaDTOs.add(BeanCopyUtils.mOrgaToMOrgaDTO(mOrga));
		}
		return mOrgaDTOs;
	}

	@Override
	public void deleteByStatus(Integer id) {
		mOrgaDao.getByid(id);
	}

	@Override
	public MOrgaDTO findByIdIsEST(Integer id) {
		return BeanCopyUtils.mOrgaToMOrgaDTO(mOrgaDao.findByIdIsEST(id));
	}

	@Override
	public void updateBymOrgaPK(MOrgaDTO mOrgaDTO) {
		try {
			mOrgaDao.updateMOrga(BeanCopyUtils.mOrgaDTOToMOrga(mOrgaDTO));
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public void saveMOrga(MOrgaDTO mOrgaDTO) {
		try {
			 mOrgaDao.saveMOrage(BeanCopyUtils.mOrgaDTOToMOrga(mOrgaDTO));
		} catch (Exception e) {
			e.getMessage();
		}
	}

	@Override
	public List<Object[]> findMOrgaIdAndNameIsOREST() {
		return mOrgaDao.findMOrgaIdAndNameIsOREST();
	}

	@Override
	public List<MOrgaDTO> findMOrgaByGENClientId(Integer id) {
		List<MOrgaDTO> orgaDTOs = new ArrayList<>();
		for (MOrga mOrga : mOrgaDao.findMOrgaByGENClientId(id)) {
			orgaDTOs.add(BeanCopyUtils.mOrgaToMOrgaDTO(mOrga));
		}
		return orgaDTOs;
	}

	@Override
	public void updateMEmpl(MOrgaDTO orgaDTO) {
		MOrga entity = BeanCopyUtils.mOrgaDTOToMOrga(orgaDTO);
		mOrgaDao.update(entity);

	}

	@Override
	public Integer ifExistId(int id) {
		return mOrgaDao.ifExistId(id);
	}

	@Override
	public Integer findClientIdByMOrgaId(Integer id) {
	
		return mOrgaDao.findClientIdByMOrgaId(id);
	}

	@Override
	public String findMOrgaIdAndNameByClientId(Integer id) {
		Map<String,String> map=new HashMap<>();
		for (Object[] objects : mOrgaDao.findMOrgaIdAndNameByClientId(id)) {
			map.put(objects[0].toString(), objects[1].toString());
		}
		//System.out.println(map);
		return GSONUtils.getInstance().toJson(map);
	}

	@Override
	public List<Object[]> getMOrgaIdAndNameByCliId(Integer clientFk) {
		
		return mOrgaDao.findMOrgaIdAndNameByClientId(clientFk) ;
	}

	@Override
	public MOrgaDTO findByIdAndCliId(Integer id, Integer clientFk) {
		
		return BeanCopyUtils.mOrgaToMOrgaDTO(mOrgaDao.findByIdAndCliId(id,clientFk));
	}

}
