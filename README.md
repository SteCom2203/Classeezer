----------
**Classeezer**
----------

--> **Quick overview**

This repository hosts a side project file on smart music category recognition. Based on Deezer's API, it gets BPMs of playlist track and 
log the category (Dance/Chill) of the track in the console.

In the first place, this project was made to easily categorize a long wedding playlist.

--> **Technical overview**

This repository uses: 
  - Javascript (axios)
  - Deezer API


Following is the project structure:
  || Users enter sets the playlistId variable to their Deezer playlist ID (can be found in Deezer's URL to acess the playlist) -> 
  The script fetches all the tracks in the playlist -> All tracks BPM are analyzed -> 
  Two arrays (Chill/Dance) are created with the relevant tracks -> The arrays' contents are logged to the console (Track titles).

⚠️ The Deezer playlist must have a public visibility! ⚠️


---
_ASC coded this_
