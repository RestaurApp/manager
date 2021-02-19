import React, { useCallback, useState, useRef } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';

const AddressInput = ({ setPlaceDetail }) => {
  const [query, setQuery] = useState('');
  const autoCompleteRef = useRef(null);
  const autoComplete = useRef(null);

  const handlePlaceSelect = useCallback(
    (updateQuery) => {
      const addressObject = autoComplete.current.getPlace();
      const query = addressObject?.formatted_address;
      updateQuery(query);
      setPlaceDetail(addressObject);
    },
    [setPlaceDetail]
  );

  const onLoad = useCallback(() => {
    autoComplete.current = new window.google.maps.places.AutoComplete(
      autoCompleteRef.current,
      {
        types: ['geocode'],
        componentRestrictions: { country: 'es' },
      }
    );
    autoComplete.current.setFields([
      'address_components',
      'formatted_address',
      'vicinity',
      'geometry',
      'place_id',
    ]);
    autoComplete.current.addListener('place_changed', () =>
      handlePlaceSelect(setQuery)
    );
  }, [handlePlaceSelect]);

  return (
    <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={handlePlaceSelect}>
      <input
        placeholder="C/ Ejemplo 123"
        className="form-control"
        name="address"
        ref={autoCompleteRef}
        onChange={(event) => setQuery(event.target.value)}
        value={query}
      />
    </StandaloneSearchBox>
  );
};

export default AddressInput;
