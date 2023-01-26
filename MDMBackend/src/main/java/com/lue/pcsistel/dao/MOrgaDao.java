package com.lue.pcsistel.dao;

import java.util.List;

import com.lue.pcsistel.model.MOrga;

/**
 *
 * @author lue
 */
public interface MOrgaDao {
    
	public  MOrga getByKey(Integer id);

	public void persist(MOrga entity); 

	public void update(MOrga entity); 

	public void delete(MOrga entity);

	public List<MOrga> findAll();

	public void getByid(Integer id);

	public MOrga getById(Integer id);

	public MOrga findByIdIsEST(Integer id);

	public void updateMOrga(MOrga mOrga);

	public void saveMOrage(MOrga mOrgaDTOToMOrga);

	public List<Object[]> findMOrgaIdAndNameIsOREST();

	public List<MOrga> findMOrgaByGENClientId(Integer id);

	public Long countMOrgaEST();

	public Integer ifExistId(int id);

	public Integer findClientIdByMOrgaId(Integer id);
	public MOrga findMOrgaByoRGAPinCODINTPK(Integer id);

	public List<Object[]> findMOrgaIdAndNameByClientId(Integer id);

	public Long countMOrgaByClientFk(Integer clientfk);

	public MOrga findByIdAndCliId(Integer id, Integer clientFk);

}
