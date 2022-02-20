*** How to install ***
- Install module shortcode of Drupal (V8)  
- Install this module  
- Enable shortcode module in config/text and format  
- 5 types of charts are supported:  
country_conflict_violence_displacement : conflict data, country profile
country_new_displacement: disaster data, country profile
country_events_timeline: event timeline data, country profile
country_latest_grid_stock: latest grid stock, country profile, data challenges
confidence_assessment_table: latest grid table data, country profile, data challenges
database_map: countries map, country profiles

Example:  
[idmcchart type="country_events_timeline" iso3="AFG" /]

[idmcchart type="country_latest_grid_stock" year="2015" iso3="PSE" /]

[idmcchart type="country_conflict_violence_displacement" iso3="AFG" /]

[idmcchart type="country_new_displacement" iso3="AFG" /]

[idmcchart type="confidence_assessment_table" iso3="AFG" /]

*** APIs
https://api.idmcdb.org/api/countries?iso3=AFG&ci=MF005BCOMOCT02

https://api.idmcdb.org/api/overview?iso3=AFG&ci=MF005BCOMOCT02

https://api.idmcdb.org/api/conflict_data?iso3=AFG&ci=MF005BCOMOCT02

https://api.idmcdb.org/api/disaster_events?iso3=AFG&ci=MF005BCOMOCT02

https://api.idmcdb.org/api/strata_data?iso3=AFG&ci=MF005BCOMOCT02

https://api.idmcdb.org/api/confidence_assessment?iso3=AFG&ci=MF005BCOMOCT02

https://api.idmcdb.org/api/displacement_data?iso3=AFG&ci=MF005BCOMOCT02
