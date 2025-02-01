package com.szedou.domain.service;

import com.szedou.domain.dto.CountryDTO;
import com.szedou.domain.exception.ResourceNotFoundException;
import com.szedou.domain.mapper.CountryMapper;
import com.szedou.domain.repository.CountryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CountryService {
    private final CountryRepository countryRepository;
    private final CountryMapper countryMapper;

    public List<CountryDTO> getAllCountries() {
        return countryRepository.findAll()
                .stream()
                .map(countryMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CountryDTO getCountryById(Long id) {
        return countryRepository.findById(id)
                .map(countryMapper::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Country not found"));
    }
}