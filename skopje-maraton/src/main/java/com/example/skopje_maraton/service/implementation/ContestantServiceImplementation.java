package com.example.skopje_maraton.service.implementation;

import com.example.skopje_maraton.model.Contestant;
import com.example.skopje_maraton.repository.ContestantRepository;
import com.example.skopje_maraton.service.ContestantService;

import java.util.List;
import java.util.Optional;

import com.example.skopje_maraton.utils.GenerateRandomString;
import org.springframework.stereotype.Service;

@Service
public class ContestantServiceImplementation implements ContestantService {

    private final ContestantRepository contestantRepository;

    public ContestantServiceImplementation(ContestantRepository contestantRepository) {
        this.contestantRepository = contestantRepository;
    }

    @Override
    public List<Contestant> findAll() {
        return contestantRepository.findAll();
    }

    @Override
    public Contestant create(Contestant contestant) {
        Optional<Contestant> emailExists = contestantRepository.findAll().stream()
                .filter(e -> e.getEmail().equals(contestant.getEmail())).findFirst();

        if (emailExists.isPresent()) {
            try {
                throw new Exception("Е-поштата веќе постои.");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        if (contestant.getAge() < 16) {
            try {
                throw new Exception("Возраста мора да биде над 16");
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        contestant.setRegistrationNum(GenerateRandomString.generateRandomString());
        return contestantRepository.save(contestant);
    }

    @Override
    public Contestant findByEmail(String email) {
        return contestantRepository.findByEmail(email).orElse(null);
    }

    @Override
    public Contestant findByRegistrationNum(String registrationNum) {
        return contestantRepository.findByRegistrationNum(registrationNum).orElse(null);
    }

    @Override
    public Contestant payment(Long id) {
        Contestant contestant = contestantRepository.findById(id).get();
        contestant.setStartingNum(contestant.getId().intValue() + 1);
        return contestantRepository.save(contestant);
    }

    @Override
    public List<Contestant> findAllThatHavePayed() {
        return contestantRepository.findByStartingNumIsNotNull();
    }

    @Override
    public boolean isEmailUsed(String email) {
        return contestantRepository.findByEmail(email).isPresent();
    }

}
