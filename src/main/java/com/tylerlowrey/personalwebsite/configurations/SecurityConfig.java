package com.tylerlowrey.personalwebsite.configurations;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter
{
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        /* Enable HTTPS
        http.requiresChannel()
            .anyRequest()
            .requiresSecure();
         */
        //TODO: Re-enable csrf and cors
        http.csrf().disable().cors().disable().authorizeRequests().anyRequest().permitAll();
    }
}
