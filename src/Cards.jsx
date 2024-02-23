import React, { useEffect, useState, useRef } from 'react'

function Cards() {

  const URL = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1` 

  const renderOnce = useRef(true);

  useEffect(() => {

    if(renderOnce.current) {
      const fetchData = async () => {
        const result = await fetch(URL)
        result.json().then(json => {
          console.log(json);
        })
      }
      fetchData();
      renderOnce.current = false;
    }
  }, []);

  return(
    <>
    
    </>
  );
}

export default Cards