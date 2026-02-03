package net.ai.webabackend.modal;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@Table(name="contactform")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactForm {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Integer id;

    @Column(name="name", nullable = false, unique = true, length = 45)
	private String name;

    @Column(name="email", nullable = false, unique = true, length = 45)
	private String email;

    @Column(name="message", nullable = false, unique = true, length = 300)
	private String message;


    



    

}
