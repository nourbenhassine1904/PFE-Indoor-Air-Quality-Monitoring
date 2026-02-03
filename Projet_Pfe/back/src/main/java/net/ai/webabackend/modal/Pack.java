package net.ai.webabackend.modal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "packs")
public class Pack {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

    @Column(name = "pack_name", nullable = false, length = 20)
	private String packtName;

    @Column(name = "is_co2", nullable = false)
	private Boolean isCo2;

    @Column(name = "is_humidity", nullable = false)
	private Boolean isHumidity;

    @Column(name = "is_temperature", nullable = false)
	private Boolean isTemperature;

    @Column(name = "is_pression", nullable = false)
	private Boolean isPression;

    @Column(name = "is_no2", nullable = false)
	private Boolean isNo2;

    @Column(name = "is_o3", nullable = false)
	private Boolean isO3;
    
}
