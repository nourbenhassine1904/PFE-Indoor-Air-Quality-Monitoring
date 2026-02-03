package net.ai.webabackend.modal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails, Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name="email", nullable = false, unique = true, length = 45)
	private String email;
	
	@Column(name="password", nullable = false, length = 64)
	private String password;
	
	@Column(name = "first_name", nullable = false, length = 20)
	private String firstName;
	
	@Column(name = "last_name", nullable = false, length = 20)
	private String lastName;

	@Column(name = "role")
	@Enumerated(EnumType.STRING)
	private Role role;

	@OneToMany(mappedBy = "user")
	private List<Token> tokens;

	@Column(name = "actif", nullable = false)
	private Boolean actif;

	@Column(name = "housing_type")
	@Enumerated(EnumType.STRING)
	private HousingType housingType;

	@Column(name = "secteur_activite")
	@Enumerated(EnumType.STRING)
	private SecteurActivite secteurActivite;

	@Column(name = "phone_number", nullable = false, length = 8)
	private int phoneNumber;

	@Column(name = "company_size")
	@Enumerated(EnumType.STRING)
	private CompanySize companySize;

	@Column(name = "creation_date")
	private LocalDateTime creationDate;

	@Column(name = "activation_date")
	private LocalDateTime activationDate;

	@ManyToOne
	@JoinColumn(name="pack_id", nullable=false)
	private Pack pack;


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return role.getAuthorities();
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return actif;
	}
	

}
