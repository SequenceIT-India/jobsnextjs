import React, { useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import makeStyles from "@mui/styles/makeStyles";

import { comboboxInput } from "./glLocationSearch.module.scss";
import colors from "../../vars.module.scss";

import {
  NumericRegex,
  validateField,
  AtleastOneNumberRegex,
} from "../../util/helper";
import { getLocationDetails } from "../../util/Location";

const libraries = ["places"];

const useStyles = makeStyles((theme) => ({
  comboInputSmall: {
    paddingLeft: "2.75rem",
    height: "2.3rem",
    font: "inherit",
    "&::placeholder": {
      fontSize: 16,
      color: colors.textLightColor,
      fontWeight: 400,
      opacity: 1,
      [theme.breakpoints.down("lg")]: {
        fontSize: "0.67rem",
      },
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.67rem",
      height: "1.4rem",
      paddingTop: "2.5px",
      paddingBottom: "2.5px",
    },
  },
  comoboxInput: {
    height: "3.3rem",
    paddingLeft: "2.75rem",
    font: "inherit",
    "&::placeholder": {
      fontSize: 16,
      color: colors.textLightColor,
      fontWeight: 400,
      opacity: 1,
    },
  },
  iconDiv: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    left: 14,
    top: 18,
    width: 20,
    height: 20,
    color: colors.textLightColor,
  },
  iconSmall: {
    position: "absolute",
    top: "0.6rem",
    left: "0.8rem",
    width: "1.2rem",
    height: "1.2rem",
    color: colors.textLightColor,
    [theme.breakpoints.down("lg")]: {
      top: "0.5rem",
      left: "0.6rem",
      width: "1.0rem",
      height: "1.0rem",
    },
  },
  popover: {
    border: "none",
  },
  options: {
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    "&:last-child": {
      borderBottom: "1px solid black",
    },
  },
}));

export default function GlLocationSearch({
  fieldValue,
  icon,
  placeholder,
  id,
  setPinCode,
  setCity,
  setState,
  setCountry,
  city,
  setErrors,
  errors,
  name,
  size,
  setCountryShortName,
  setStateShortName,
}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
    libraries,
  });

  const mapRef = React.useRef();

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <Search
      panTo={panTo}
      fieldValue={fieldValue}
      icon={icon}
      placeholder={placeholder}
      id={id}
      city={city}
      setPinCode={setPinCode}
      setCity={setCity}
      setState={setState}
      setCountry={setCountry}
      setErrors={setErrors}
      errors={errors}
      name={name}
      size={size}
      setCountryShortName={setCountryShortName}
      setStateShortName={setStateShortName}
    />
  );
}

function Search({
  fieldValue,
  icon,
  id,
  placeholder,
  setPinCode,
  setCity,
  setState,
  setCountry,
  setErrors,
  errors,
  setCountryShortName,
  setStateShortName,
  name,
  size,
}) {
  const classes = useStyles();
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({});

  const handleInput = (e) => {
    setState("");
    setPinCode("");
    setCountry("");
    setCity("");
    let value = e.target.value;
    if (value === "") {
      setValue("");
      setErrors({ ...errors, [id]: "" });
      return;
    }
    switch (id) {
      case "pincode":
        setErrors({
          ...errors,
          [id]: validateField(name, value, "text", false, false),
        });
        if (!AtleastOneNumberRegex.test(value)) {
          setErrors({ ...errors, [id]: "Invalid Zip code" });
        }
        if (AtleastOneNumberRegex.test(value)) {
          setValue(value);
        }
        setPinCode(value);
        break;
      case "city":
        setErrors({
          ...errors,
          [id]: validateField(name, value, "text", false, false),
        });
        if (NumericRegex.test(value)) {
          return;
        }
        setValue(value);
        setCity(value);
        break;
      default:
        return;
    }
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    let details = getLocationDetails(address);
    setCountry((await details).country.value);
    setState((await details).state.value);
    setCity((await details).city.value);
    setPinCode((await details).pincode.value);
    if(setCountryShortName){
      setCountryShortName((await details).country.country_short_name);
    }
    if(setStateShortName){
      setStateShortName((await details).state.state_short_name);
    }
    
  };

  useEffect(() => {
    if (!fieldValue) {
      setValue("");
    }
  }, [fieldValue, setValue]);

  return (
    <>
      <div className={classes.iconDiv}>
        <img
          src={icon}
          alt=""
          className={`${
            size === "small" ? classes.iconSmall : classes.icon
          } icon`}
        />
      </div>
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          onChange={handleInput}
          value={fieldValue !== "" ? fieldValue : value}
          disabled={!ready}
          name={name}
          maxLength={id === "pincode" ? "15" : "false"}
          placeholder={placeholder}
          className={`${
            size === "small" ? classes.comboInputSmall : classes.comoboxInput
          } ${comboboxInput} `}
        />
        <ComboboxPopover className={classes.popover}>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  className={classes.options}
                  key={place_id}
                  value={description}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </>
  );
}
