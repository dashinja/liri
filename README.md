# Liri Assistant
Welcome to Liri!
This program is a command line application and all its features 
are accessed via the command line. This project makes getting information
about your favorite spotify song, movie, dates and venue location for concerts,
and just some fun on the CLI quite accessible.

## Format to Access Application
> `node liri.js [command] {params}`

## Commands:
  [movie]       - Searches OMDB for movie information
  
  [spotify]     - Searches spotify for song information
  
  [concert]     - Searches for upcoming concert dates and locations
  
  [doit]        - An easter egg of sorts, that reads pres-made commands from a text file to execute auto-magic-ally.
  
### Params:
  {params}      - These are the parameters you're searching for (all the Star Wars fans can laugh here). 
  
### Example Usage:
Concert Search for Evanescence
![Concert Search for Evanescence](https://i.gyazo.com/356b666ee20c0c39d8238a48dc144bb3.png)

Song Search for "Not Dead Yet"
![Song Search for "Not Dead Yet"](https://i.gyazo.com/f0fda505757cdb032863f7aa8fdc6b6c.png)

Movie Search for "Independence Day"
![Movie Search for "Independence Day"](https://i.gyazo.com/60daf8c5912d7f782bf90cda0415ef2e.png)

Fun Random Search of my Choosing
![Random Search](https://i.gyazo.com/d112102524ab326d624daddd3991f835.png)

You should try the `doit` command and see what you get - however, customizing the doit command is a developer only option for now.

Enjoy Liri!
