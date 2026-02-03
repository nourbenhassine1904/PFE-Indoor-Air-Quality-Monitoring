package net.ai.webabackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.ai.webabackend.modal.CompanySize;
import net.ai.webabackend.modal.HousingType;
import net.ai.webabackend.modal.Pack;
import net.ai.webabackend.modal.Role;
import net.ai.webabackend.modal.SecteurActivite;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  private String firstName;
  private String lastName;
  private String email;
  private String password;
  private Role role;
	private HousingType housingType;
	private SecteurActivite secteurActivite;
	private int phoneNumber;
	private CompanySize companySize;
  private Pack pack;
}
