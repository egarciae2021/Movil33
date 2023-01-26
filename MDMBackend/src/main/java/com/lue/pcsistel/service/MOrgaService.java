package com.lue.pcsistel.service;

import java.util.List;

import com.lue.pcsistel.dto.MOrgaDTO;
import com.lue.pcsistel.model.MOrga;

/**
 *
 * @author lue
 */
public interface MOrgaService {
    
	MOrgaDTO findById(Integer id);

	 void save(MOrga entity); 

	 void update(MOrga entity); 

	 void delete(MOrga entity);

	public  List<MOrgaDTO> findAll();

	void deleteByStatus(Integer id);

	MOrgaDTO findByIdIsEST(Integer id);

	void updateBymOrgaPK(MOrgaDTO mOrgaDTO);

	void saveMOrga(MOrgaDTO mOrgaDTO);

	List<Object[]> findMOrgaIdAndNameIsOREST();

	List<MOrgaDTO> findMOrgaByGENClientId(Integer id);

	void updateMEmpl(MOrgaDTO orgaDTO);

	Integer ifExistId(int getoRGAPinCODINT);

	Integer findClientIdByMOrgaId(Integer id);

	String findMOrgaIdAndNameByClientId(Integer id);

	List<Object[]> getMOrgaIdAndNameByCliId(Integer clientFk);

	MOrgaDTO findByIdAndCliId(Integer id, Integer clientFk);


}
