package net.ai.webabackend.dto;

import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import net.ai.webabackend.modal.CompanySize;
import net.ai.webabackend.modal.HousingType;
import net.ai.webabackend.modal.Pack;
import net.ai.webabackend.modal.Role;
import net.ai.webabackend.modal.SecteurActivite;

import java.io.Serializable;
import java.util.Date;

@Data
@RequiredArgsConstructor
public class UserDto implements Serializable {
	
	private Long id;
	private String email;
	private String firstName;
	private String lastName;
	private Role role;
	private Boolean actif;
	private HousingType housingType;
	private SecteurActivite secteurActivite;
	private int phoneNumber;
	private CompanySize companySize;
	private Date creationDate;
	private Date activationDate;

	@ManyToOne
	@JoinColumn(name="pack_id", nullable=false)
	private Pack pack;

}
