package com.lue.pcsistel.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.context.MessageSource;
import org.springframework.security.authentication.AuthenticationTrustResolver;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.rememberme.PersistentTokenBasedRememberMeServices;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import com.lue.pcsistel.dto.VerifyUserDettail;
import com.lue.pcsistel.dto.ForgotPassword;
import com.lue.pcsistel.dto.GENClienteDTO;
import com.lue.pcsistel.dto.MEmplDTO;
import com.lue.pcsistel.dto.MOVDispositivoDTO;
import com.lue.pcsistel.dto.MOrgaDTO;
import com.lue.pcsistel.dto.SEGUsuarioDTO;
import com.lue.pcsistel.dto.SEGUsuarioHistoricoDTO;
import com.lue.pcsistel.model.SEGUsuario;
import com.lue.pcsistel.service.GENClienteService;
import com.lue.pcsistel.service.GENCulturaService;
import com.lue.pcsistel.service.MEmplRegCodeService;
import com.lue.pcsistel.service.MEmplService;
import com.lue.pcsistel.service.MOVDeviceAppService;
import com.lue.pcsistel.service.MOVDispositivoService;
import com.lue.pcsistel.service.MOrgaService;
import com.lue.pcsistel.service.SEGPerfilService;
import com.lue.pcsistel.service.SEGUsuarioService;
import com.lue.pcsistel.utils.GSONUtils;

@Controller
@RequestMapping("/")
@SessionAttributes("roles")
public class AppController {

	@Autowired
	SEGUsuarioService userService;

	@Autowired
	SEGPerfilService sEGPerfilService;

	@Autowired
	private MOrgaService mOrgaService;

	@Autowired
	MessageSource messageSource;

	@Autowired
	PersistentTokenBasedRememberMeServices persistentTokenBasedRememberMeServices;

	@Autowired
	AuthenticationTrustResolver authenticationTrustResolver;

	@Autowired
	private MEmplRegCodeService mEmplRegCodeService;

	@Autowired
	private MEmplService mEmplService;

	@Autowired
	private GENCulturaService genCulturaService;

	@Autowired
	private GENClienteService genClienteService;

	@Autowired
	private MOVDispositivoService movDispositivoService;

	@Autowired
	private SEGUsuarioService segUsuarioService;
	@Autowired
	private MOVDeviceAppService movDeviceAppService;

	/**
	 * This method will list all existing users.
	 */
	@RequestMapping(value = { "welcome" }, method = RequestMethod.GET)
	public String welcome(ModelMap model) {
		model.addAttribute("pageName", "welcome");
		return "welcome";
	}

	@RequestMapping(value = { "admin" }, method = RequestMethod.GET)
	public String admin(ModelMap model, HttpServletRequest req) {
		setUserDetailsinSession(req);
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			Map<String, Long> map = genClienteService.getAdminPanelDetails();
			model.addAttribute("adminPanel", map);
			model.addAttribute("pageName", "admindasboard.jsp");
			return "admin";
		} else {
			return "loginpage";
		}

	}

	@RequestMapping(value = { "client" }, method = RequestMethod.GET)
	public String client(ModelMap model, HttpServletRequest req) {
		setUserDetailsinSession(req);
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			
			Map<String, Long> map = genClienteService.clientPanelDetailsByCliId((Integer)req.getSession(false).getAttribute("ClientId"));
			map.remove("clients");
			model.addAttribute("adminPanel", map);
			model.addAttribute("pageName", "clientdasboarddata.jsp");

			return "client";
		} else {
			return "sessionexpire";
		}

	}

	@RequestMapping(value = { "/list" }, method = RequestMethod.GET)
	public String listUsers(HttpServletRequest req, ModelMap model) {
		List<SEGUsuario> users = userService.findAllUsers();
		model.addAttribute("users", users);
		model.addAttribute("adminBody", "emp_list");
		return "admin";
	}

	/**
	 * This method will provide the medium to add a new user.
	 */
	@RequestMapping(value = { "/newuser" }, method = RequestMethod.GET)
	public String newUser(HttpServletRequest req, ModelMap model) {
		SEGUsuario user = new SEGUsuario();
		model.addAttribute("user", user);
		model.addAttribute("edit", false);
		return "registration";
	}

	/**
	 * This method will be called on form submission, handling POST request for
	 * saving user in database. It also validates the user input
	 */
	@RequestMapping(value = { "/newuser" }, method = RequestMethod.POST)
	public String saveUser(HttpServletRequest req, @Valid @ModelAttribute("user") SEGUsuario user, BindingResult result,
			ModelMap model) {
		if (result.hasErrors()) {
			return "registration";
		}

		/*
		 * Preferred way to achieve uniqueness of field [sso] should be
		 * implementing custom @Unique annotation and applying it on field [sso]
		 * of Model class [User].
		 * 
		 * Below mentioned peace of code [if block] is to demonstrate that you
		 * can fill custom errors outside the validation framework as well while
		 * still using internationalized messages.
		 * 
		 */
		if (!userService.isUserSSOUnique(user.getSEGUsuarioPK().getPinCod(), user.getVcUsu())) {
			FieldError ssoError = new FieldError("user", "ssoId", messageSource.getMessage("non.unique.ssoId",
					new String[] { user.getVcUsu() }, Locale.getDefault()));
			result.addError(ssoError);
			return "registration";
		}
		userService.saveUser(user);
		model.addAttribute("success", "User " + user.getVcNom() + " registered successfully");
		return "registrationsuccess";
	}

	/**
	 * This method will provide the medium to update an existing user.
	 */
	@RequestMapping(value = { "/edit-user-{ssoId}" }, method = RequestMethod.GET)
	public String editUser(HttpServletRequest req, @PathVariable String ssoId, ModelMap model) {
		SEGUsuario user = userService.findByUserName(ssoId);
		model.addAttribute("user", user);
		model.addAttribute("adminBody", "edit-user");
		if (getRole().equalsIgnoreCase("admin"))
			return "admin";
		else {
			return "client";
		}
	}

	/**
	 * This method will be called on form submission, handling POST request for
	 * updating user in database. It also validates the user input
	 */
	@RequestMapping(value = { "/edit-user-{ssoId}" }, method = RequestMethod.POST)
	public String updateUser(HttpServletRequest req, @Valid SEGUsuario user, BindingResult result, ModelMap model,
			@PathVariable String ssoId) {
		if (result.hasErrors()) {
			return "registration";
		}

		/*
		 * //Uncomment below 'if block' if you WANT TO ALLOW UPDATING SSO_ID in
		 * UI which is a unique key to a User.
		 * if(!userService.isUserSSOUnique(user.getId(), user.getSsoId())){
		 * FieldError ssoError =new
		 * FieldError("user","ssoId",messageSource.getMessage(
		 * "non.unique.ssoId", new String[]{user.getSsoId()},
		 * Locale.getDefault())); result.addError(ssoError); return
		 * "registration"; }
		 */

		userService.updateUser(user);
		model.addAttribute("success", "User " + user.getVcNom() + " updated successfully");
		return "registrationsuccess";
	}

	/**
	 * This method will delete an user by it's SSOID value.
	 */
	@RequestMapping(value = { "/delete-user-{ssoId}" }, method = RequestMethod.GET)
	public String deleteUser(HttpServletRequest req, @PathVariable String ssoId) {
		userService.deleteUserByUserName(ssoId);
		return "redirect:/list";
	}

	/**
	 * This method handles Access-Denied redirect.
	 */
	@RequestMapping(value = "/Access_Denied", method = RequestMethod.GET)
	public String accessDeniedPage(HttpServletRequest req, ModelMap model) {
		return "accessDenied";
	}

	/**
	 * This method handles login GET requests. If users is already logged-in and
	 * tries to goto login page again, will be redirected to list page.
	 */
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String loginPage(ModelMap model, HttpServletRequest req) {
		if (isCurrentAuthenticationAnonymous()) {
			model.addAttribute("pageName", "login");
			return "loginpage";
		} else {
			return "redirect:/logout";
		}
	}

	/**
	 * This method handles logout requests. Toggle the handlers if you are
	 * RememberMe functionality is useless in your app.
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			persistentTokenBasedRememberMeServices.logout(request, response, auth);
			SecurityContextHolder.getContext().setAuthentication(null);
		}
		return "redirect:/login?logout";
	}

	@RequestMapping(value = { "/all-morga-id" }, method = RequestMethod.GET)
	public String getAllMOrgaByCliPk(HttpServletRequest req, ModelMap model, @RequestParam("id") Integer id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("MOrga", mOrgaService.findMOrgaByGENClientId(id));
			model.addAttribute("pageName", "allmorga.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/all-morga" }, method = RequestMethod.GET)
	public String getAllOrga(HttpServletRequest req, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("pageName", "allmorga.jsp");
			if (getRole().equalsIgnoreCase("admin")){
				model.addAttribute("MOrga", mOrgaService.findAll());
				return "admin";
			}else {
				model.addAttribute("MOrga", mOrgaService.findMOrgaByGENClientId((Integer)req.getSession(false).getAttribute("ClientId")));
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/edit-morga" }, method = RequestMethod.GET)
	public String editMOrgaGet(HttpServletRequest req, ModelMap model, @RequestParam("id") Integer id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			MOrgaDTO mOrga = mOrgaService.findById(id);
			model.addAttribute("edit_morga", mOrga);
			model.addAttribute("pageName", "editmorga.jsp");
			model.addAttribute("mOrgaDTO", new MOrgaDTO());
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/edit-morga" }, method = RequestMethod.POST)
	public String editMOrgaPost(HttpServletRequest req, ModelMap model, @ModelAttribute("mOrgaDTO") MOrgaDTO orgaDTO) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			mOrgaService.updateMEmpl(orgaDTO);
			model.addAttribute("MOrga", "test");
			model.addAttribute("pageName", "updatesuccessmessage.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/delete-morga" }, method = RequestMethod.GET)
	public String deleteById(HttpServletRequest req, ModelMap model, @RequestParam("id") Integer id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			mOrgaService.deleteByStatus(id);
			model.addAttribute("pageName", "deletesuccessmessage.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/search-by-id-morga-p" }, method = RequestMethod.GET)
	public String searchByIdOrgaPage(HttpServletRequest req, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("pageName", "morga.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/search-by-id-morga" }, method = RequestMethod.GET)
	public String searchByIdOrga(HttpServletRequest req, ModelMap model, @RequestParam("mOrgaId") Integer id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			String message = null;
			MOrgaDTO mOrgaDTO = null;
			model.addAttribute("pageName", "morga.jsp");
			if (getRole().equalsIgnoreCase("admin")){
				try {
					mOrgaDTO = mOrgaService.findByIdIsEST(id);
				} catch (NumberFormatException e) {
					message = "Ingrese un Id válido.";
				} catch (Exception e) {
					message = "Registro no encontrado! Por favor, intente con un códido diferente.";
				}
				model.addAttribute("MOrgaMessage", message);
				model.addAttribute("searchByIdOrga", mOrgaDTO);
				
				return "admin";
			}else {
				try {
					mOrgaDTO = mOrgaService.findByIdAndCliId(id,(Integer)req.getSession(false).getAttribute("ClientId"));
				} catch (NumberFormatException e) {
					message = "Ingrese un Id válido.";
				} catch (Exception e) {
					message = "Registro no encontrado! Por favor, intente con un códido diferente.";
				}
				model.addAttribute("MOrgaMessage", message);
				model.addAttribute("searchByIdOrga", mOrgaDTO);
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/all-mempl-id" }, method = RequestMethod.GET)
	public String findAllMEmplByMOrga(HttpServletRequest req, ModelMap model, @RequestParam("id") Integer id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			List<MEmplDTO> emplDTOs = mEmplService.findAllByMOrgaPK(id);
			model.addAttribute("allMEmpl", emplDTOs);
			model.addAttribute("pageName", "allmempl.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/edit-memplp" }, method = RequestMethod.GET)
	public String editMEmplPage(HttpServletRequest req, ModelMap model, @RequestParam("id") String id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			MEmplDTO editMEmplp = mEmplService.findByMEmplId(id);
			model.addAttribute("editMEmplp", editMEmplp);
			model.addAttribute("mEmplCmd", new MEmplDTO());
			model.addAttribute("pageName", "editmempl.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/edit-mempl" }, method = RequestMethod.POST)
	public String editMEmplPost(HttpServletRequest req, ModelMap model, @ModelAttribute("mEmplCmd") MEmplDTO emplDTO) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			try {
				mEmplService.updateMEmpl(emplDTO);
			} catch (Exception e) {

			}
			model.addAttribute("pageName", "updatesuccessmessage.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/delete-mempl" }, method = RequestMethod.GET)
	public String deleteMEmpl(HttpServletRequest req, ModelMap model, @RequestParam("id") String id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			mEmplService.detleteByMEmplPk(id);
			model.addAttribute("pageName", "deletesuccessmessage.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/all-devices-id" }, method = RequestMethod.GET)
	public String findAllDevicesByMEmplPK(HttpServletRequest req, ModelMap model, @RequestParam("id") String id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("allDevicesList", movDispositivoService.findAllDevByMemplPK(id));
			model.addAttribute("pageName", "alldevices.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/all-devices" }, method = RequestMethod.GET)
	public String findAllDevicesIsEST(HttpServletRequest req, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("pageName", "alldevices.jsp");
			if (getRole().equalsIgnoreCase("admin")){
				model.addAttribute("allDevicesList", movDispositivoService.findAllDevicesIsEST());
				return "admin";
			}else {
				model.addAttribute("allDevicesList", movDispositivoService.findAllDevicesByCliId((Integer) req.getSession(false).getAttribute("ClientId")));
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/all-client" }, method = RequestMethod.GET)
	public String findAllClientIsEST(HttpServletRequest req, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			
			model.addAttribute("allClientList", genClienteService.findAllClientIsEST());
			model.addAttribute("pageName", "allclient.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/edit-device-page" }, method = RequestMethod.GET)
	public String editDevicePage(HttpServletRequest req, ModelMap model, @RequestParam("id") String id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("editDeviceData", movDispositivoService.findByDevicePk(id));
			model.addAttribute("editDeviceCmd", new MOVDispositivoDTO());
			model.addAttribute("pageName", "editdevice.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/edit-device" }, method = RequestMethod.POST)
	public String editDevicePost(HttpServletRequest req, ModelMap model,
			@ModelAttribute("editDeviceCmd") MOVDispositivoDTO dispositivoDTO) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			try {
				movDispositivoService.updateMOVDispositivo(dispositivoDTO);
			} catch (Exception e) {
				e.printStackTrace();
			}
			model.addAttribute("pageName", "updatesuccessmessage.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/delete-device" }, method = RequestMethod.GET)
	public String deleteDevice(HttpServletRequest req, ModelMap model, @RequestParam("id") String id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			movDispositivoService.deleteByDevicePk(id);
			model.addAttribute("pageName", "deletesuccessmessage.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	private Map<String, String> getCodCulAndId() {
		Map<String, String> genCulturaList = new HashMap<>();
		for (Object[] obj : genCulturaService.getCodCulAndId()) {
			genCulturaList.put(obj[0].toString(), obj[1].toString());
		}
		return genCulturaList;
	}

	/*
	 * This method is use for getting culture and storing select box in add
	 * client page and return in map.
	 */
	@RequestMapping(value = { "/add-client" }, method = RequestMethod.GET)
	public String addClientPage(HttpServletRequest req, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("genCulturaList", getCodCulAndId());
			model.addAttribute("genClienteCmd", new GENClienteDTO());
			model.addAttribute("pageName", "addclient.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	private Integer getClientIdById(int id) {
		return genClienteService.getClientIdById(id);
	}

	/*
	 * This method is use for saving client details in post request.
	 */
	@RequestMapping(value = { "/add-client" }, method = RequestMethod.POST)
	public String addClient(HttpServletRequest req, ModelMap model,
			@ModelAttribute("genClienteCmd") GENClienteDTO clienteDTO) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			if (getClientIdById(clienteDTO.getPinCodCli()).toString().equals(clienteDTO.getPinCodCli().toString())) {
				model.addAttribute("genCulturaList", getCodCulAndId());
				model.addAttribute("pageName", "addclient.jsp");
				model.addAttribute("responseMessage", "El Id del Cliente ya existe, intente con otro valor.");
			} else {
				genClienteService.saveClient(clienteDTO);
				model.addAttribute("pageName", "successmessage.jsp");
			}
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/add-morga" }, method = RequestMethod.GET)
	public String addMOrga(HttpServletRequest req, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("currentDate", getCurrentDate());
			model.addAttribute("morgaCmd", new MOrgaDTO());
			if (getRole().equalsIgnoreCase("admin")){
				model.addAttribute("clientlist", getCliNameIsBtEST());
				model.addAttribute("pageName", "addmorga.jsp");
				return "admin";
			}else {
				model.addAttribute("pageName", "addmorga.jsp");
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	private Map<String, String> getCliNameIsBtEST() {
		Map<String, String> genCulturaList = new HashMap<>();
		for (Object[] objects : genClienteService.getCliNameIsBtEST()) {
			genCulturaList.put(objects[0].toString(), objects[1].toString());
		}
		return genCulturaList;
	}

	@RequestMapping(value = { "/add-morga" }, method = RequestMethod.POST)
	public String addMOrgaPost(HttpServletRequest req, ModelMap model, @ModelAttribute("morgaCmd") MOrgaDTO mOrgaDTO) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			Integer id = mOrgaService.ifExistId(mOrgaDTO.getmOrgaPK().getoRGAPinCODINT());
			if (id != mOrgaDTO.getmOrgaPK().getoRGAPinCODINT()) {
				mOrgaDTO.getmOrgaPK().setFinCodCli(mOrgaDTO.getgENCliente().getPinCodCli());
				mOrgaService.saveMOrga(mOrgaDTO);
				model.addAttribute("pageName", "successmessage.jsp");
			} else {
				model.addAttribute("clientlist", getCliNameIsBtEST());
				model.addAttribute("responseMessage", "El Id ya existe, intente con otro Id. ");
				model.addAttribute("pageName", "addmorga.jsp");
			}
			
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	private Map<String, String> getMOrgaIdAndName() {
		Map<String, String> morgaList = new HashMap<>();
		for (Object[] objects : mOrgaService.findMOrgaIdAndNameIsOREST()) {
			morgaList.put(objects[0].toString(), objects[1].toString());
		}
		return morgaList;
	}

	@RequestMapping(value = { "/add-mempl" }, method = RequestMethod.GET)
	public String addMEmpl(HttpServletRequest req, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("currentDate", getCurrentDate());
			model.addAttribute("memplCmdAdd", new MEmplDTO());
			if (getRole().equalsIgnoreCase("admin")){
				model.addAttribute("pageName", "addmempl.jsp");
				model.addAttribute("clientlist", getCliNameIsBtEST());
				return "admin";
			}else {
				model.addAttribute("pageName", "addclientmempl.jsp");
				model.addAttribute("morgatlist", getMOrgaIdAndNameByCliId((Integer)req.getSession(false).getAttribute("ClientId")));
				return "client";
			}
		} else {
			//add-mempl
			return "sessionexpire";
		}
	}


	private Map<String,String> getMOrgaIdAndNameByCliId(Integer clientFk) {
		Map<String, String> genCulturaList = new HashMap<>();
		List<Object[]> lists = mOrgaService.getMOrgaIdAndNameByCliId(clientFk);
		for (Object[] obj : lists) {
			genCulturaList.put(obj[0].toString(), obj[1].toString());
		}
		return genCulturaList;
	}

	private String getMEmplIdById(String id) {
		return mEmplService.getMEmplIdById(id);
	}

	private Integer findClientIdByMOrgaId(Integer id) {
		return mOrgaService.findClientIdByMOrgaId(id);
	}

	@RequestMapping(value = { "/add-mempl" }, method = RequestMethod.POST)
	public String addMEmplPost(HttpServletRequest req, ModelMap model,
			@ModelAttribute("memplCmdAdd") MEmplDTO emplDTO) {
		
		boolean envioOK = false;
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
//			if (emplDTO.getmEmplPK().geteMPLPvcCODEMP().startsWith("E")) {
				if (getMEmplIdById(emplDTO.getmEmplPK().geteMPLPvcCODEMP())
						.equalsIgnoreCase(emplDTO.getmEmplPK().geteMPLPvcCODEMP())) {
					model.addAttribute("currentDate", getCurrentDate());
					model.addAttribute("morgatlist", getMOrgaIdAndName());
					model.addAttribute("responseMessage", "El código de empleado ya existe, ingrese otro.");
					
				} else {

					
					
					int  IdOrganizacion = emplDTO.getmOrga().getmOrgaPK().getoRGAPinCODINT();
					int CodCli = findClientIdByMOrgaId(IdOrganizacion);					
					emplDTO.getmEmplPK().setFinCodCli(CodCli);
					emplDTO.getmOrga().getmOrgaPK().setFinCodCli(CodCli);
					
					//findMOrgaByoRGAPinCODINT
					MOrgaDTO mOrgaDTO = mOrgaService.findByIdAndCliId(IdOrganizacion,CodCli);
					String CodInt2 = mOrgaDTO.getoRGACodInt2();
					
					emplDTO.seteMPLFinCODGRUORI(1);
					emplDTO.seteMPLCodInt2(CodInt2);
					
					mEmplService.saveMEmpl(emplDTO);
					envioOK = true;
					model.addAttribute("pageName", "successmessage.jsp");
				}
//			} else {
//				model.addAttribute("currentDate", getCurrentDate());
//				model.addAttribute("clientlist", getCliNameIsBtEST());
//				model.addAttribute("responseMessage", "Enter valied id Pattern Ex. E004.");
//			}
			if (getRole().equalsIgnoreCase("admin")){
				if (!envioOK)
					model.addAttribute("pageName", "addmempl.jsp");
				return "admin";
			}else {
				model.addAttribute("morgatlist", getMOrgaIdAndNameByCliId((Integer)req.getSession(false).getAttribute("ClientId")));
				if (!envioOK)
					model.addAttribute("pageName", "addclientmempl.jsp");
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/search-by-id-client-p" }, method = RequestMethod.GET)
	public String searchByIdClientP(HttpServletRequest req, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("pageName", "searchbyidclient.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/search-by-id-client" }, method = RequestMethod.GET)
	public String searchByIdClient(HttpServletRequest req, ModelMap model, @RequestParam("id") String id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			GENClienteDTO clienteDTO = null;
			String message = "";
			try {
				clienteDTO = genClienteService.findByIdIsEST(Integer.parseInt(id));
			} catch (NumberFormatException e) {
				message = "Ingrese un número válido";
			} catch (Exception e) {
				message = "Registro no encontrado! Por favor, intente con otro Id.";
			}
			model.addAttribute("responseMessage", message);
			model.addAttribute("genClientData", clienteDTO);
			model.addAttribute("pageName", "searchbyidclient.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/search-by-id-mempl-p" }, method = RequestMethod.GET)
	public String searchByIdMemplP(HttpServletRequest req, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("pageName", "searchmempl.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/delete-genclient" }, method = RequestMethod.GET)
	public String deleteGENClient(HttpServletRequest req, ModelMap model, @RequestParam("id") Integer id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			genClienteService.deleteGENClientByPK(id);
			model.addAttribute("pageName", "deletesuccessmessage.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/edit-genclient" }, method = RequestMethod.GET)
	public String editGENClient(HttpServletRequest req, ModelMap model, @RequestParam("id") Integer id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			GENClienteDTO clienteDTO = genClienteService.findById(id);
			model.addAttribute("genClientRes", clienteDTO);
			model.addAttribute("genClientCmd", new GENClienteDTO());
			model.addAttribute("pageName", "editgenclient.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/edit-genclient" }, method = RequestMethod.POST)
	public String editGENClientPost(HttpServletRequest req, ModelMap model,
			@ModelAttribute("genClientCmd") GENClienteDTO genClienteDTO) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			genClienteService.updateGenClient(genClienteDTO);
			model.addAttribute("genClientCmd", new GENClienteDTO());
			model.addAttribute("pageName", "updatesuccessmessage.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}//

	@RequestMapping(value = { "/search-by-id-mempl" }, method = RequestMethod.GET)
	public String searchByIdMempl(HttpServletRequest req, ModelMap model, @RequestParam("id") String id) {
		MEmplDTO emplDTO = null;
		String message = "";

		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
		
			model.addAttribute("mEmplCmd", new MEmplDTO());
			model.addAttribute("pageName", "searchmempl.jsp");
			if (getRole().equalsIgnoreCase("admin")){
				
				try {
					emplDTO = mEmplService.findMEmplByPK(id);
				} catch (Exception e) {
					message = "Registro no encontrado! Por favor, intente con otro Id.";
				}
				model.addAttribute("responseMessage", message);
				model.addAttribute("mEmplRes", emplDTO);
				
				return "admin";
			}else {
				try {
					emplDTO = mEmplService.findMEmplByPKAndCliId(id,(Integer)req.getSession(false).getAttribute("ClientId"));
				} catch (Exception e) {
					message = "Registro no encontrado! Por favor, intente con otro Id.";
				}
				model.addAttribute("responseMessage", message);
				model.addAttribute("mEmplRes", emplDTO);
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/all-mempl" }, method = RequestMethod.GET)
	public String allMEmpl(HttpServletRequest req, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("pageName", "allmempl.jsp");
			if (getRole().equalsIgnoreCase("admin")){
				model.addAttribute("allMEmpl", mEmplService.findAll());
				return "admin";
			}else {
				model.addAttribute("allMEmpl", mEmplService.findAllMEmplByCliId((Integer)req.getSession(false).getAttribute("ClientId")));
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/generate-device-code" }, method = RequestMethod.GET)
	public String generateDeviceCode(HttpServletRequest req, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("pageName", "generatedevicecode.jsp");
			if (getRole().equalsIgnoreCase("admin")){
				model.addAttribute("allMEmpl",  mEmplService.findAllIsEST());
				return "admin";
			}else {
				model.addAttribute("allMEmpl",  mEmplService.findAllMEmplByCliId((Integer)req.getSession(false).getAttribute("ClientId") ));
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/get-client-id" }, method = RequestMethod.GET)
	public @ResponseBody String getClientId(HttpServletRequest req) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			return genClienteService.getClientId();
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/get-device-code" }, method = RequestMethod.GET)
	public @ResponseBody String getDeviceCode(HttpServletRequest req, @RequestParam("id") String id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			return mEmplRegCodeService.geTDeviceCode(id);
		} else {
			return "redirect:/login";
		}
	}

	private Map<String, String> findAllAdminEmplIsEST() {
		Map<String, String> genCulturaList = new HashMap<>();
		List<Object[]> lists = mEmplService.findAllAdminEmplIsEST(2, 8);
		for (Object[] obj : lists) {
			genCulturaList.put(obj[0].toString(), obj[1].toString());
		}
		return genCulturaList;
	}

	@RequestMapping(value = { "/add-admin-user" }, method = RequestMethod.GET)
	public String addAdminUser(HttpServletRequest req, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("SEGUsuarioDTOCmd", new SEGUsuarioDTO());
			model.addAttribute("mEmplName", findAllAdminEmplIsEST());
			model.addAttribute("pageName", "registeruser.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	private Long countByIdAndvcUsu(Integer id, String userName) {
		return segUsuarioService.countByIdAndvcUsu(id, userName);
	}

	@SuppressWarnings("unused")
	private SEGUsuarioHistoricoDTO getUsuarioHistorico(HttpServletRequest req,
			SEGUsuarioHistoricoDTO segUsuarioHistoricoDTO) {
		segUsuarioHistoricoDTO.setIp(req.getRemoteAddr());
		segUsuarioHistoricoDTO.setNavegador("test");
		segUsuarioHistoricoDTO.setServidor(req.getServerName());
		segUsuarioHistoricoDTO.setDaFecAut(new Date());
		// segUsuarioHistoricoDTO.
		return segUsuarioHistoricoDTO;
	}

	@RequestMapping(value = { "/add-admin-user" }, method = RequestMethod.POST)
	public String addAdminUserPost(HttpServletRequest req, ModelMap model,
			@ModelAttribute("SEGUsuarioDTOCmd") SEGUsuarioDTO segUsuarioDTO) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			if (countByIdAndvcUsu(segUsuarioDTO.getsEGUsuarioPK().getPinCod(), segUsuarioDTO.getVcUsu()) == 0) {
				segUsuarioDTO.getmEmpl().getmEmplPK().setFinCodCli(2);
				segUsuarioDTO.getsEGUsuarioPK().setFinCodCli(2);
				/*
				 * SEGUsuarioHistoricoDTO
				 * segUsuarioHistoricoDTO=getUsuarioHistorico(req,new
				 * SEGUsuarioHistoricoDTO()); SEGUsuarioHistoricoPKDTO
				 * segUsuarioHistoricoPKDTO=segUsuarioHistoricoDTO.
				 * getsEGUsuarioHistoricoPK();
				 * segUsuarioHistoricoPKDTO.setFinCodCli(2);
				 * segUsuarioHistoricoPKDTO.setPinId(segUsuarioDTO.
				 * getsEGUsuarioPK().getPinCod());
				 * segUsuarioDTO.getsEGUsuarioHistoricoCollection().add(
				 * getUsuarioHistorico(req,segUsuarioHistoricoDTO));
				 */
				segUsuarioService.saveAdminUser(segUsuarioDTO);
				model.addAttribute("pageName", "successmessage.jsp");
			} else {
				model.addAttribute("mEmplName", findAllAdminEmplIsEST());
				model.addAttribute("pageName", "registeruser.jsp");
				model.addAttribute("responseMessage",
						"Los datos del usuario ya existe! Ingrese otros datos.");
			}
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/add-admin-mempl" }, method = RequestMethod.GET)
	public String addNewAdminMempl(HttpServletRequest req, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("mEmplCmd", new MEmplDTO());
			model.addAttribute("currentDate", getCurrentDate());
			model.addAttribute("pageName", "registermempl.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/add-admin-mempl" }, method = RequestMethod.POST)
	public String addAdminMemplPost(HttpServletRequest req, ModelMap model,
			@ModelAttribute("mEmplCmd") MEmplDTO emplDTO) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			if(mEmplService.addNewAdminMempl(emplDTO)==true){
				model.addAttribute("pageName", "successmessage.jsp");
			}else{
				model.addAttribute("mEmplCmd", new MEmplDTO());
				model.addAttribute("currentDate", getCurrentDate());
				model.addAttribute("pageName", "registermempl.jsp");
				model.addAttribute("responseMessage", "Please try later");
			}
			
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/all-admin-user" }, method = RequestMethod.GET)
	public String findAllAdminUsers(HttpServletRequest req, HttpServletResponse res, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("pageName", "alladminusers.jsp");
			model.addAttribute("allUsers", userService.findAllAdminUsers());
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/edit-user" }, method = RequestMethod.GET)
	public String updateUser(HttpServletRequest req, ModelMap model, @RequestParam("id") Integer id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("pageName", "edituser.jsp");
			model.addAttribute("segUsuario", segUsuarioService.findSEGUsuariByPK(id));
			model.addAttribute("editSEGUsuarioCmd", new SEGUsuarioDTO());
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/edit-user" }, method = RequestMethod.POST)
	public String updateSEGUsuari(HttpServletRequest req, ModelMap model,
			@ModelAttribute("editSEGUsuarioCmd") SEGUsuarioDTO segUsuarioDTO) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {

			segUsuarioService.updateSEGUsuari(segUsuarioDTO);
			model.addAttribute("pageName", "updatesuccessmessage.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}//

	@RequestMapping(value = { "/delete-user" }, method = RequestMethod.GET)
	public String deleteUser(HttpServletRequest req, ModelMap model, @RequestParam("id") Integer pinCod) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {

			userService.updateSEGUsESTByPK(pinCod);

			model.addAttribute("pageName", "deletesuccessmessage.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/add-client-user" }, method = RequestMethod.GET)
	public String addClientUser(HttpServletRequest req, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("SEGUsuarioDTOCmd", new SEGUsuarioDTO());
			if (getRole().equalsIgnoreCase("admin")){
				model.addAttribute("clientName", getCliNameIsBtEST());
				model.addAttribute("pageName", "registerclientuser.jsp");
				return "admin";
			}else {

				model.addAttribute("morgatlist", getMOrgaIdAndNameByCliId((Integer)req.getSession(false).getAttribute("ClientId")));
				model.addAttribute("pageName", "registerclientuserdash.jsp");
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/add-client-user" }, method = RequestMethod.POST)
	public String addClientUserPost(HttpServletRequest req, ModelMap model,
			@ModelAttribute("SEGUsuarioDTOCmd") SEGUsuarioDTO segUsuarioDTO) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {

			if (countByIdAndvcUsu(segUsuarioDTO.getsEGUsuarioPK().getPinCod(), segUsuarioDTO.getVcUsu()) == 0) {
				segUsuarioService.saveClientUser(segUsuarioDTO);
				model.addAttribute("pageName", "successmessage.jsp");
				if (getRole().equalsIgnoreCase("admin")){
					return "admin";
				}else{
					return "client";
				}
			} else {
				
				model.addAttribute("responseMessage",
						"El usuario ya existe! Ingrese otro dato de usuario.");
			}
			if (getRole().equalsIgnoreCase("admin")){
				model.addAttribute("clientName", getCliNameIsBtEST());
				model.addAttribute("pageName", "registerclientuser.jsp");
				return "admin";
			}else {
				model.addAttribute("morgatlist", getMOrgaIdAndNameByCliId((Integer)req.getSession(false).getAttribute("ClientId")));
				model.addAttribute("pageName", "registerclientuserdash.jsp");
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/all-application" }, method = RequestMethod.GET)
	public String findAllApplicationByIEMI(HttpServletRequest req, ModelMap model, @RequestParam("IMEI") String IMEI) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("allApplicationRes", movDeviceAppService.findAllApplicationByIEMI(IMEI));
			model.addAttribute("pageName", "allapplication.jsp");
			if (getRole().equalsIgnoreCase("admin"))
				return "admin";
			else {
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	@RequestMapping(value = { "/blocked-application-chacked" }, method = RequestMethod.GET)
	public @ResponseBody String blockedApplication(@RequestParam("id") Integer id,
			@RequestParam("value") boolean value) {
		return movDeviceAppService.blockedApplication(id, value);
	}
	
	@RequestMapping(value = { "/blocked-application-checked-all" }, method = RequestMethod.GET)
	public @ResponseBody String blockedApplicationAll(@RequestParam("imei") String imei,
			@RequestParam("value") boolean value) {
		return movDeviceAppService.blockedApplicationAll(imei, value);
	}

	@RequestMapping(value = { "/application-installation-blocked" }, method = RequestMethod.GET)
	public @ResponseBody String applicationInstallBlocked(@RequestParam("id") Integer id,
			@RequestParam("value") boolean value) {
		return movDeviceAppService.applicationInstallBlocked(id, value);
	}

	@RequestMapping(value = { "/application-uninstallation-blocked" }, method = RequestMethod.GET)
	public @ResponseBody String applicationUninstallBlocked(@RequestParam("id") Integer id,
			@RequestParam("value") boolean value) {
		return movDeviceAppService.applicationUninstallBlocked(id, value);
	}

	@RequestMapping(value = { "/application-blocked-time" }, method = RequestMethod.GET)
	public @ResponseBody String applicationBlockedTime(@RequestParam("id") Integer id,
			@RequestParam("startTime") String startTime, @RequestParam("endTime") String endTime) {
		return movDeviceAppService.applicationBlockedTime(id, startTime, endTime);

	}

	@RequestMapping(value = "/imageDisplay", method = RequestMethod.GET)
	public String showUserImage(HttpServletResponse response,@RequestParam("id") Integer id)
			throws ServletException, IOException {
		byte[] byteArr=userService.findImageByUserPk(id);
		/*response.setContentType("image/jpeg");
		
		String b64=	DatatypeConverter.printBase64Binary(byteArr);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);*/
		
		/*response.setContentType("image/*");
		response.setHeader(HttpHeaders.CACHE_CONTROL, "no-cache");*/
		// spring-core's FileCopyUtils
		if(byteArr==null){
			return null;
		}else{
			return DatatypeConverter.printBase64Binary(byteArr);
		}
	}
	
	@RequestMapping(value = "/upload-user-image", method = RequestMethod.POST)
	public @ResponseBody String uploadUserImage(HttpServletRequest req,@RequestParam("file") MultipartFile file,@RequestParam("userIdPK")Integer id) throws IOException, ServletException {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			  
			userService.uploadImage(id,file.getBytes());
			   return "seccess";
		} else {
			return "<h1>Sesión finalizada! Intente de nuevo. <a href='login'>Login</a> </h1>";
		}
	}
	

	//
	
	
	@RequestMapping(value = "/upload-client-long", method = RequestMethod.POST)
	public @ResponseBody String uploadClientLogo(HttpServletRequest req,@RequestParam("file") MultipartFile file,@RequestParam("clientId")Integer clientPk) throws IOException, ServletException {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			  
			genClienteService.updateClientLogo(file.getBytes(),clientPk);
		
			   return "seccess";
		} else {
			return "<h1>Sesión finalizada! Intente de nuevo. <a href='login'>Login</a> </h1>";
		}
	}
	
	
	
	@RequestMapping(value = "get-morga-by-cli-id", method = RequestMethod.GET)
	public @ResponseBody String findMOrgaIdAndNameByClientId(HttpServletRequest req, @RequestParam Integer id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			return mOrgaService.findMOrgaIdAndNameByClientId(id);
		} else {
			return "<h1>Sesión finalizada! Intente de nuevo. <a href='login'>Login</a> </h1>";
		}
	}

	@RequestMapping(value = "get-mempl-by-morga-id", method = RequestMethod.GET)
	public @ResponseBody String findMEmplIdAndNameByMorgaId(HttpServletRequest req, @RequestParam Integer id) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			return mEmplService.findMEmplIdAndNameByMorgaId(id);
		} else {
			return "<h1>Sesión finalizada! Intente de nuevo. <a href='login'>Login</a> </h1>";
		}
	}
	
	@RequestMapping(value = "/verify-username-email", method = RequestMethod.POST)
	public @ResponseBody String ifExistUserNameAndEmail(HttpServletRequest req, @RequestBody String data) {
		VerifyUserDettail verify=GSONUtils.getInstance().fromJson(data, VerifyUserDettail.class);
		if (userService.ifExistUserNameAndEmail(verify) == 0) {
			return "false";
		} else {
			tempSessionUserDetails(req,verify.getUserName());
			return "true";
		}
	}
	@RequestMapping(value = "/forgot-password", method = RequestMethod.POST)
	public @ResponseBody String forgotPassword(HttpServletRequest req, @RequestBody String data) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("tempUserName")!= null) {
			userService.forgotPassword(GSONUtils.getInstance().fromJson(data, ForgotPassword.class));
			return "true";
		} else {
			return "<h1>Sesión finalizada! Intente con otra contraseña. <a href='login'>Olvido contraseña</a> </h1>";
		}
	}

	private String getCurrentDate() {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
		return dateFormat.format(new Date());
	}

	@InitBinder
	private void dateBinder(WebDataBinder binder) {
		// The date format to parse or output your dates
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
		// Create a new CustomDateEditor
		CustomDateEditor editor = new CustomDateEditor(dateFormat, true);
		// Register it as custom editor for the Date type
		binder.registerCustomEditor(Date.class, editor);
	}

	/*
	 * This method is use for getting use role who are login that user role name
	 * return.
	 */
	private String getRole() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return authentication.getAuthorities().iterator().next().getAuthority()
				.substring(authentication.getAuthorities().iterator().next().getAuthority().indexOf('_') + 1,
						authentication.getAuthorities().iterator().next().getAuthority().length())
				.toLowerCase();
	}

	/**
	 * This method returns true if users is already authenticated [logged-in],
	 * else false.
	 */
	private boolean isCurrentAuthenticationAnonymous() {
		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return authenticationTrustResolver.isAnonymous(authentication);
	}

	private void tempSessionUserDetails(HttpServletRequest req,String userName){
		HttpSession session = req.getSession();
		session.setAttribute("tempUserName",userName);
	}
	/**
	 * This method returns the principal[user-name] of logged-in user.
	 */
	private void setUserDetailsinSession(HttpServletRequest req) {
		HttpSession session = req.getSession();
		String userName = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof UserDetails) {
			userName = ((UserDetails) principal).getUsername();
		} else {
			userName = principal.toString();
		}
		if (userName.equalsIgnoreCase("anonymousUser")) {
			session.setAttribute("userNamePrincipal", null);
		} else {
			session.setAttribute("ClientId", findClientIdByUserName(userName));
			session.setAttribute("userNamePrincipal", userName);
			session.setAttribute("brandurl", getRole());
		}
	}

	@RequestMapping(value = { "/all-client-user" }, method = RequestMethod.GET)
	public String findAllClientUser(HttpServletRequest req, HttpServletResponse res, ModelMap model) {
		if (req.getSession(false) != null && req.getSession(false).getAttribute("userNamePrincipal") != null) {
			model.addAttribute("pageName", "allclientusers.jsp");
			if (getRole().equalsIgnoreCase("admin")){
				model.addAttribute("allUsers", userService.findAllClientUsers());
				return "admin";
			}else {
				model.addAttribute("allUsers", userService.findAllClientUsersByCliId((Integer)req.getSession(false).getAttribute("ClientId")));
				return "client";
			}
		} else {
			return "sessionexpire";
		}
	}

	private Integer findClientIdByUserName(String userName) {
		return segUsuarioService.findClientIdByUserName(userName);
	}
}