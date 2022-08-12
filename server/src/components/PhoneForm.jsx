import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { EDIT_NUMBER } from "./queries";

const PhoneForm = ({setError}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  const submit = (e) => {
    e.preventDefault();
    changeNumber({ variables: { name, phone } });
    setName('')
    setPhone('')
  };

  useEffect(()=>{
    if(result.data && result.data.editNumber === null) {
      setError('person not found')
    }
  }, [result.data])
  return <div>
  <h2>change number</h2>

  <form onSubmit={submit}>
    <div>
      name <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div>
      phone <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>
    <button type='submit'>change number</button>
  </form>
</div>
};

export default PhoneForm;
