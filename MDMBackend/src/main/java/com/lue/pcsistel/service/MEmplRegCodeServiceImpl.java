package com.lue.pcsistel.service;

import com.lue.pcsistel.dao.MEmplDao;
import com.lue.pcsistel.dao.MEmplRegCodeDao;
import com.lue.pcsistel.model.MEmpl;
import com.lue.pcsistel.model.MEmplPK;
import com.lue.pcsistel.model.MEmplRegCode;
import com.lue.pcsistel.utils.RandomNumber;
import com.lue.pcsistel.utils.SplitDateUtils;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author lue
 */

@Service("mEmplRegCodeService")
@Transactional
public class MEmplRegCodeServiceImpl implements MEmplRegCodeService{

    
    @Autowired
    private  MEmplRegCodeDao mEmplRegCodeDao;
    
    
    @Autowired
    private MEmplDao  mEmplDao;
    
    @Override
    public MEmplRegCode findById(Long id) {
       return mEmplRegCodeDao.findById(id);
    }

    @Override
    @Transactional
    public void save(MEmplRegCode entity) {
    
        
        MEmpl empl= mEmplDao.findById(entity.getmEmpl().getMEmplPK());
        entity.setmEmpl(empl);
        
         System.out.println("-- "+empl.toString());
         mEmplRegCodeDao.save(entity);
    }

    @Override
    public void update(MEmplRegCode entity) {
       mEmplRegCodeDao.update(entity);
    }

    @Override
    public void delete(MEmplRegCode entity) {
       mEmplRegCodeDao.delete(entity);
    }

    @Override
    public MEmplRegCode checkRegCode(String code) {       
        return mEmplRegCodeDao.checkRegCode(code);
    }

	@Override
	public synchronized String geTDeviceCode(String id) {
			String [] strArr=SplitDateUtils.splitData(id);
		
		 Integer randomNumber=RandomNumber.getNumber();
		 
		 MEmplRegCode mEmplRegCode=new MEmplRegCode();
		 MEmpl mEmpl=new MEmpl();
		 
		 MEmplPK emplPK=new MEmplPK();
		 
		 emplPK.setEMPLPvcCODEMP(strArr[0]);
		 emplPK.setFinCodCli(Integer.parseInt(strArr[1]));;
		 mEmpl.setMEmplPK(emplPK);
		 
		 mEmplRegCode.setUpdationDate(new Date());
		 mEmplRegCode.setCreationDate(new Date());
		 mEmplRegCode.setExpired(false);
		 mEmplRegCode.setmEmpl(mEmpl);
		 mEmplRegCode.setRegCode(randomNumber.toString());
		 mEmplRegCodeDao.save(mEmplRegCode);
		  
		return  randomNumber.toString();
	}
	
	
	
    
	
    
}
