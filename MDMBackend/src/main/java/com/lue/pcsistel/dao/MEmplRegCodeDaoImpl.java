package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.MEmplRegCode;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 *
 * @author lue
 */

@Repository("mEmplRegCodeDao")
public class MEmplRegCodeDaoImpl extends AbstractDao<Long, MEmplRegCode>implements MEmplRegCodeDao{

    @Override
    public MEmplRegCode findById(Long id) {
       return  getByKey(id);
    }

    @Override
    public void save(MEmplRegCode entity) {
        saveOrUpdate(entity);
    }
    
    @Override
    public MEmplRegCode checkRegCode(String code) {
        
        Criteria crit = createEntityCriteria();
		 crit.add(Restrictions.eq("regCode", code));
                crit.add(Restrictions.eq("expired",false));
            MEmplRegCode emplRegCode=(MEmplRegCode)crit.uniqueResult();
            return emplRegCode;
    }

    @Override
    public void merge(MEmplRegCode entity) {
        getSession().merge(entity);
    }

    
    
}
