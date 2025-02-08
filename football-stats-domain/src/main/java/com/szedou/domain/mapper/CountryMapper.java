package com.szedou.domain.mapper;

import com.szedou.domain.dto.CountryDTO;
import com.szedou.domain.model.Country;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class CountryMapper {

    private final LeagueMapper leagueMapper;

    public CountryMapper(LeagueMapper leagueMapper) {
        this.leagueMapper = leagueMapper;
    }

    public CountryDTO toDTO(Country country) {
        return CountryDTO.builder()
                .id(country.getId())
                .name(country.getName())
                .code(country.getCode())
                .flagUrl(country.getFlagUrl())
                .leagues(country.getLeagues().stream()
                        .map(leagueMapper::toDTO)
                        .collect(Collectors.toList()))
                .build();
    }

    public Country toEntity(CountryDTO countryDTO) {
        Country country = new Country();
        country.setId(countryDTO.getId());
        country.setName(countryDTO.getName());
        country.setCode(countryDTO.getCode());
        country.setFlagUrl(countryDTO.getFlagUrl());
        // Set other fields as necessary
        return country;
    }
}