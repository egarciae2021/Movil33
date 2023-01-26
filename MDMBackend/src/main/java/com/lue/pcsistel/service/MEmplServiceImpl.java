package com.lue.pcsistel.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.lue.pcsistel.dao.MEmplDao;
import com.lue.pcsistel.dao.MOrgaDao;
import com.lue.pcsistel.dto.MEmplDTO;
import com.lue.pcsistel.model.MEmpl;
import com.lue.pcsistel.model.MEmplPK;
import com.lue.pcsistel.model.MOrga;
import com.lue.pcsistel.utils.BeanCopyUtils;
import com.lue.pcsistel.utils.GSONUtils;

/**
 *
 * @author lue
 */

@Service("mEmplService")
@Transactional
public class MEmplServiceImpl implements MEmplService {

	@Autowired
	private MEmplDao mEmplDao;
	
	@Autowired
	private MOrgaDao mOrgaDao;

	@Override
	public MEmpl findById(MEmplPK id) {
		return mEmplDao.findById(id);
	}

	@Override
	public void save(MEmpl entity) {
		mEmplDao.save(entity);
	}

	@Override
	public void update(MEmpl entity) {
		mEmplDao.update(entity);
	}

	@Override
	public void delete(MEmpl entity) {
		mEmplDao.delete(entity);
	}

	@Override
	public List<MEmplDTO> findAllByMOrgaPK(final Integer id) {
		List<MEmplDTO> emplDTOs = new ArrayList<>();
		for (MEmpl mEmpl : mEmplDao.findAllByMOrgaPK(id)) {
			emplDTOs.add(BeanCopyUtils.mEmplToMEmplDTO(mEmpl));
		}
		return emplDTOs;
	}

	@Override
	public MEmplDTO findByMEmplId(final String mEmplId) {
		MEmpl mEmpl = mEmplDao.findByIdMEmpl(mEmplId);
		return BeanCopyUtils.mEmplToMEmplDTO(mEmpl);
	}

	
	@Override
	public void detleteByMEmplPk(final String mEmplId) {
		mEmplDao.detleteByMEmplPk(mEmplId);
	}

	@Override
	public MEmplDTO findMEmplByPK(final String id) {
		return BeanCopyUtils.mEmplToMEmplDTO(mEmplDao.findByIdMEmpl(id));
	}

	@Override
	public List<MEmplDTO> findAllIsEST() {
		List<MEmplDTO>  emplDTOs=new ArrayList<>();
		for (MEmpl mEmpl : mEmplDao.findAllIsEST()) {
			emplDTOs.add(BeanCopyUtils.mEmplToMEmplDTO(mEmpl));
		}
		return emplDTOs;
	}

	@Override
	public void updateMEmpl(MEmplDTO emplDTO) {
		
		mEmplDao.update(BeanCopyUtils.mEmplDTOToMEmpl(emplDTO));
	}

	@Override
	public Boolean addNewAdminMempl(MEmplDTO emplDTO) {
		MOrga mOrga=mOrgaDao.findByIdIsEST(8);
		MEmpl empl=BeanCopyUtils.mEmplDTOToMEmpl(emplDTO);
		empl.setMOrga(mOrga);
		
		MEmplPK emplPK= empl.getMEmplPK();
		emplPK.setFinCodCli(mOrga.getMOrgaPK().getFinCodCli());
		empl.setMEmplPK(emplPK);
		return mEmplDao.save(empl);
	}

	@Override
	public List<MEmplDTO> findAll() {
		List<MEmplDTO>  emplDTOs=new ArrayList<>();
		for (MEmpl mEmpl : mEmplDao.findAll()) {
			emplDTOs.add(BeanCopyUtils.mEmplToMEmplDTO(mEmpl));
		}
		return emplDTOs;
	}

	@Override
	public Long saveMEmpl(MEmplDTO emplDTO) {
		mEmplDao.save(BeanCopyUtils.mEmplDTOToMEmpl(emplDTO));
		return null;
	}

	@Override
	public String getMEmplIdById(String id) {
		return mEmplDao.getMEmplIdById(id);
	}

	@Override
	public List<Object[]> findAllAdminEmplIsEST(Integer clientId, Integer mOrga) {
		return mEmplDao.findAllAdminEmplIsEST(clientId,mOrga);
	}

	@Override
	public String findMEmplIdAndNameByMorgaId(Integer id) {
		if(id!=null){
			Map<String,String> map=new HashMap<>();
			for (Object[] objects : mEmplDao.findMEmplIdAndNameByMorgaId(id)) {
				map.put(objects[0].toString(), objects[1].toString());
			}
			return GSONUtils.getInstance().toJson(map);
		}else{
			return null;
		}
		
	}

	@Override
	public List<MEmplDTO> findAllMEmplByCliId(Integer clientId) {
		List<MEmplDTO> emplDTOs = new ArrayList<>();
		for (MEmpl mEmpl : mEmplDao.findAllMEmplByCliId(clientId)) {
			emplDTOs.add(BeanCopyUtils.mEmplToMEmplDTO(mEmpl));
		}
		return emplDTOs;
	}

	@Override
	public MEmplDTO findMEmplByPKAndCliId(String id, Integer clientFk) {
		return BeanCopyUtils.mEmplToMEmplDTO(mEmplDao.findMEmplByPKAndCliId(id,clientFk));
	}
	
	
	
}
