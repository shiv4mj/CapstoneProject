package com.stackroute.myfavouriteservice.service;

import java.util.List;

import com.stackroute.myfavouriteservice.exception.CountryAlreadyExistsException;
import com.stackroute.myfavouriteservice.exception.CountryNotFoundException;
import com.stackroute.myfavouriteservice.model.Covid;
import com.stackroute.myfavouriteservice.model.User;

import org.springframework.stereotype.Service;


public interface FavouriteService {
	
	public User saveCountryToFavorite(Covid Covid, String username) throws CountryAlreadyExistsException;
	public User deleteCountryFromFavorite(String trackId , String username ) throws CountryNotFoundException;
	public List<Covid> getCountryList(String username ) throws Exception;

}
