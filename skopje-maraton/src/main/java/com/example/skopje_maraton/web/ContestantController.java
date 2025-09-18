package com.example.skopje_maraton.web;

import com.example.skopje_maraton.model.Contestant;
import com.example.skopje_maraton.service.ContestantService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173"})
@RestController
@RequestMapping("/api/contestants")
public class ContestantController {
    private final ContestantService contestantService;
    public ContestantController(ContestantService contestantService) {
        this.contestantService = contestantService;
    }

    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<Contestant>> getAllContestants() {
        List<Contestant> contestants = contestantService.findAll();
        return ResponseEntity.ok(contestants);
    }

    @PostMapping
    public ResponseEntity<String> createContestant(@RequestBody Contestant contestant){
        boolean isEmailUsed = contestantService.isEmailUsed(contestant.getEmail());
        if(isEmailUsed){
            return ResponseEntity.badRequest().build();
        }
        Contestant savedContestant = contestantService.create(contestant);
        return ResponseEntity.status(201).body(savedContestant.getRegistrationNum());
    }

    @PutMapping("/payment/{id}")
    public ResponseEntity<Integer> payment(@PathVariable("id") Long id){
        Contestant contestant = contestantService.payment(id);
        return ResponseEntity.ok(contestant.getStartingNum());
    }

    @GetMapping("/getByEmail")
    public ResponseEntity<Contestant> getByEmail(@RequestParam String email){
        Contestant contestant = contestantService.findByEmail(email);
        if (contestant == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(contestant);
    }

    @GetMapping("/getByNumber")
    public ResponseEntity<Contestant> getByRegistrationNumber(@RequestParam String registrationNumber){
        Contestant contestant = contestantService.findByRegistrationNum(registrationNumber);
        if (contestant == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(contestant);
    }

    @GetMapping("/havepayed")
    public ResponseEntity<List<Contestant>> getAllHavePayed(){
        List<Contestant> contestants = contestantService.findAllThatHavePayed();
        return ResponseEntity.ok(contestants);
    }
}
