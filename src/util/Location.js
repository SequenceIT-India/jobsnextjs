import { getGeocode } from "use-places-autocomplete";

const placeAddresCompoponent = {
  ZIP_CODE: "postal_code",
  COUNTRY: "country",
  STATE: "administrative_area_level_1",
  CITY: "administrative_area_level_2",
  TOWN: "sublocality_level_1",
  AREA: "sublocality_level_2",
  NEAREST_ROAD: "route",
  LOCALITY: "locality",
};

const getAddressComponent = (address_components, key) => {
  let results = {
    value: "",
    country_short_name: "",
    state_short_name: "",
  };
  let details = address_components.filter((addressComponent) =>
    addressComponent.types.some((typesItem) => typesItem === key)
  );
  if (details != null && details.length > 0)
    results.value = details[0].long_name;
  if (details != null && details.length > 0 && key === "country")
    results.country_short_name = details[0].short_name;
  if (
    details != null &&
    details.length > 0 &&
    key === "administrative_area_level_1"
  )
    results.state_short_name = details[0].short_name;
  return results;
};

export const getLocationDetails = async (address) => {
  try {
    const results = await getGeocode({ address });
    let pincode = getAddressComponent(
      results[0].address_components,
      placeAddresCompoponent.ZIP_CODE
    );
    let city = getAddressComponent(
      results[0].address_components,
      placeAddresCompoponent.LOCALITY
    );
    let state = getAddressComponent(
      results[0].address_components,
      placeAddresCompoponent.STATE
    );
    let country = getAddressComponent(
      results[0].address_components,
      placeAddresCompoponent.COUNTRY
    );
    if (!city) {
      city = getAddressComponent(
        results[0].address_components,
        placeAddresCompoponent.CITY
      );
    }
    if (!city) {
      city = getAddressComponent(
        results[0].address_components,
        placeAddresCompoponent.TOWN
      );
    }
    return {
      country: country,
      state: state,
      city: city,
      pincode: pincode,
    };
  } catch (error) {
    console.log("😱 Error: ", error);
  }
};
