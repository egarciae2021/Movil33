package com.lue.pcsistel.dao;

import com.lue.pcsistel.model.SEGUsuario;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository("userDao")
public class SEGUsuarioDaoImpl extends AbstractDao<Integer, SEGUsuario> implements SEGUsuarioDao {

	static final Logger logger = LoggerFactory.getLogger(SEGUsuarioDaoImpl.class);

	public SEGUsuario findById(int id) {

		SEGUsuario user = getByKey(id);
		// if(user!=null){
		// Hibernate.initialize(user.getUserProfiles());
		// }
		return user;
	}

	@SuppressWarnings("deprecation")
	public SEGUsuario findByUserName(String sso) {
		SEGUsuario user = null;
		/*
		 * //user=(SEGUsuario)
		 * getSession().getNamedQuery("SEGUsuario.findByVcUsu").setString(
		 * "vcUsu", sso).list(); logger.info("SSO : {}", sso); Criteria crit =
		 * createEntityCriteria(); crit.add(Restrictions.eq("vcUsu", sso)); user
		 * = (SEGUsuario)crit.uniqueResult();
		 */

		user = (SEGUsuario) getSession().getNamedQuery("SEGUsuario.findSEGUsuAndSEGProfiByVcUsu")
				.setString("vcUsu", sso).getSingleResult();

		return user;
	}

	@SuppressWarnings("unchecked")
	public List<SEGUsuario> findAllUsers() {
		Criteria criteria = createEntityCriteria().addOrder(Order.asc("vcUsu"));
		criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);// To avoid
																		// duplicates.
		List<SEGUsuario> users = (List<SEGUsuario>) criteria.list();

		// No need to fetch userProfiles since we are not showing them on list
		// page. Let them lazy load.
		// Uncomment below lines for eagerly fetching of userProfiles if you
		// want.
		/*
		 * for(User user : users){ Hibernate.initialize(user.getUserProfiles());
		 * }
		 */
		return users;
	}

	@SuppressWarnings("deprecation")
	public void save(SEGUsuario user) {
		persist(user);
		getSession().getNamedQuery("SEGUsuario.updateMEmpleByUserPK")
		.setString("eMPLPvcCODEMP", user.getMEmpl().getMEmplPK().getEMPLPvcCODEMP())
		.setString("vcUsu", user.getVcUsu())
		.executeUpdate();
	}

	public void deleteByUserName(String sso) {
		Criteria crit = createEntityCriteria();
		crit.add(Restrictions.eq("ssoId", sso));
		SEGUsuario user = (SEGUsuario) crit.uniqueResult();
		delete(user);
	}

	@SuppressWarnings({ "unchecked" })
	@Override
	public List<SEGUsuario> findAllAdminUsers() {
		return getSession().getNamedQuery("SEGUsuario.findAllByAdminClientId").list();
	}

	@Override
	public Long countUsuarioEST() {
		return (Long) getSession().getNamedQuery("SEGUsuario.countSEGUsuarioIsbtEst").getSingleResult();
	}

	@SuppressWarnings("deprecation")
	@Override
	public Long countByIdAndvcUsu(Integer id, String userName) {
		Long count = 0l;
		try {
			count = (Long) getSession().getNamedQuery("SEGUsuario.countByIdAndvcUsu").setInteger("pinCod", id)
					.setString("vcUsu", userName).getSingleResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return count;
	}

	@SuppressWarnings("deprecation")
	@Override
	public void updateSEGUsESTByPK(Integer pinCod) {
		getSession().getNamedQuery("SEGUsuario.updateSEGUsESTByPK")
		.setInteger("pinCod", pinCod).executeUpdate();

	}

	@SuppressWarnings("deprecation")
	@Override
	public SEGUsuario findSEGUsuariByPK(Integer pinCod) {
		return (SEGUsuario) getSession().getNamedQuery("SEGUsuario.findByPinCod").setInteger("pinCod", pinCod)
				.getSingleResult();
	}
	
	@Override
	public void updateSEGUsuari(SEGUsuario segUsuario) {
		getSession().update(segUsuario);
	}
	
	@SuppressWarnings("deprecation")
	@Override
	public Integer findClientIdByUserName(String userName) {
		Integer id=0;
		try{
			id= (Integer) getSession().getNamedQuery("SEGUsuario.findClientIdByUserName")
			.setString("vcUsu", userName)
			.getSingleResult();
			return id;
		}catch(Exception e){
			e.printStackTrace();
			return 0;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<SEGUsuario> findAllClientUsers() {
		return getSession()
				.getNamedQuery("SEGUsuario.findAllClientUsersNotEqulyAdminCliId")
				.list();
	}

	@SuppressWarnings("deprecation")
	@Override
	public Long ifExistUserNameAndEmail(String userName, String email) {
		return (Long) getSession()
				.getNamedQuery("SEGUsuario.ifExistUserNameAndEmail")
				.setString("vcUsu", userName)
				.setString("correo", email)
				.getSingleResult();
	}

	
	@SuppressWarnings("deprecation")
	@Override
	public void forgotPassword(String userName, String password) {
		getSession()
		.getNamedQuery("SEGUsuario.forgotPassword")
		.setString("vcPas", password)
		.setString("vcUsu", userName)
		.executeUpdate();
		
	}

	@SuppressWarnings("deprecation")
	@Override
	public Long countUsuarioByClientFk(Integer clientFk) {
		return (Long) getSession()
				.getNamedQuery("SEGUsuario.countUsuarioByClientFk")
				.setInteger("finCodCli", clientFk)
				.getSingleResult();
	}

	@SuppressWarnings({ "unchecked", "deprecation" })
	@Override
	public List<SEGUsuario> findAllClientUsersByCliId(Integer clientFk) {
		return getSession()
				.getNamedQuery("SEGUsuario.findAllClientUsersByCliId")
				.setInteger("finCodCli", clientFk)
				.list();
	}

	@SuppressWarnings("deprecation")
	@Override
	public void uploadImage(Integer id, byte[] bytes) {
		getSession()
		.getNamedQuery("SEGUsuario.uploadImage")
		.setInteger("pinCod", id)
		.setBinary("imImagen", bytes)
		.executeUpdate();
		
	}

	@SuppressWarnings("deprecation")
	@Override
	public byte[] findImageByUserPk(Integer id) {
		byte[] byteArr=null;
		try{
			byteArr=(byte[]) getSession()
			.getNamedQuery("SEGUsuario.findImageByUserPk")
			.setInteger("pinCod", id)
			.getSingleResult();
		}catch(Exception e){
			byteArr=null;
		}
		return byteArr;
	}
}
