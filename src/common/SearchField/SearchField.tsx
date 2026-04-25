import {
  NAME_FIELD_LABEL_PROPS,
  NAME_FIELD_INPUT_PROPS,
} from "./input-styles-config";
import { SearchFieldStyled } from "./SearchField.styled";

export const SearchField = ({ ...props }) => (
  <SearchFieldStyled
    {...props}
    InputProps={NAME_FIELD_INPUT_PROPS}
    InputLabelProps={NAME_FIELD_LABEL_PROPS}
  />
);
