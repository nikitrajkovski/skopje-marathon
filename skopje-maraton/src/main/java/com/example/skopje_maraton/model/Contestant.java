package com.example.skopje_maraton.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
@Entity
public class Contestant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "age")
    @Min(value = 16, message = "Возраста мора да биде 16 или повеќе")
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(name="category")
    private Category category;

    @Column(name = "registration_num")
    private String registrationNum;

    @Column
    private Integer startingNum;
}
