package com.example.skopje_maraton.service;

import com.example.skopje_maraton.model.Contestant;

import java.util.List;

public interface ContestantService {
    List<Contestant> findAll();
    Contestant create(Contestant contestant);
    Contestant findByEmail(String email);
    Contestant findByRegistrationNum(String registrationNum);
    Contestant payment(Long id);
    List<Contestant> findAllThatHavePayed();
    boolean isEmailUsed(String email);
}
