import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import makeStyles from "@mui/styles/makeStyles";

import "@reach/combobox/styles.css";
import { DoubleByteCharacters, EmojiRegex } from "../../util/helper";
import { getLocationDetails } from "../../util/Location";

const libraries = ["places"];

const useStyles = makeStyles((theme) => ({
  comoboxInput: {
    height: "2.3rem",
    border: "none",
    paddingLeft: "2.2rem",
    [theme.breakpoints.down("lg")]: {
      height: "1.8rem",
    },
    "&::placeholder": {
      fontSize: "1rem",
      color: "#8d8d8d",
      fontWeight: 400,
      opacity: 1,
      [theme.breakpoints.down("lg")]: {
        fontSize: "0.75rem",
      },
    },
    "&:focus": {
      outline: "none",
      border: "1px solid blue",
    },
  },
  iconDiv: {
    position: "relative",
  },
  locationSearchTextField: {
    position: "absolute",
    left: 5,
    top: 10,
    [theme.breakpoints.down("lg")]: {
      top: 5,
    },
    width: "20px",
    height: 20,
    color: "#8d8d8d",
    zIndex: "1",
  },
}));

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDEif-fvOkXkd2iSSfuPUljxDRyzL_uTqI',
    libraries,
  });

  const mapRef = React.useRef();

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return <Search panTo={panTo} />;
}

function Search({ panTo }) {
  const classes = useStyles();
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({});

  /* eslint-disable no-unused-vars */
  const [country, setCountry] = React.useState("");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");
  const [pincode, setPinCode] = React.useState("");
  const [countryShortName, setCountryShortName] = React.useState("");
  const [stateShortName, setStateShortName] = React.useState("");

  const handleInput = (e) => {
    let value = e.target.value;
    if (EmojiRegex.test(value)) {
      return;
    }
    if (DoubleByteCharacters.test(value)) {
      return;
    }
    setValue(value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    let details = getLocationDetails(address);
    setCountry((await details).country.value);
    setState((await details).state.value);
    setCity((await details).city.value);
    setPinCode((await details).pincode.value);
    setCountryShortName((await details).country.country_short_name);
    setStateShortName((await details).state.state_short_name);
  };

  return (
    <>
      <div className={classes.iconDiv}>
        <LocationOnIcon className={`${classes.locationSearchTextField} icon`} />
      </div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="City, State Or Zip Code"
          className={`${classes.comoboxInput} combobox-input inputwithoutRightBorder`}
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </>
  );
}
