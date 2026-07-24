
package com.barbershop.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.barbershop.backend.model.Master;
import com.barbershop.backend.repository.MasterRepository;

@RestController
@RequestMapping("/api/masters")
@CrossOrigin(origins = "*")
public class MasterController {

    @Autowired
    private MasterRepository masterRepository;

    @GetMapping
    public List<Master> getAllMasters() {
        return masterRepository.findAll();
    }
}