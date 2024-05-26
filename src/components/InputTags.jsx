import React, { useEffect } from 'react';
import { TagsInput } from "react-tag-input-component";
import "./InputTags.css"

const InputTags = ({tags, setTags, onChange, disabled}) => {

  return (
    <TagsInput
      value={tags}
      onChange={setTags}
      placeHolder={disabled ? null : "Digite"}
      disabled={disabled}
    />
  );
};


export default InputTags