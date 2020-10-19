import React, { useEffect, useRef, useState } from "react";
import fB from "./firebase";
import { Candy } from "./types";

const RequestPage: React.FC = () => {
  let [candies, setCandies] = useState<Candy[]>([]);
  let [checkedCandies, setCheckedCandies] = useState<{
    [candyId: string]: boolean;
  }>({});
  let initialized = useRef(false);
  // useEffect(() => {
  //   candies.forEach((c) => (checkedCandies[c.id] = true));
  // }, [candies]);

  const toggleCheckbox = (candyId:string) => {
    setCheckedCandies(cC => ({...cC, [candyId]: !cC[candyId]}))
  }

  useEffect(() => {
    // if(initialized.current){
     fB.subscribeToCandiesChanged((newCandies) => {
      setCandies(newCandies);
    });
    // initialized.current = true; 
    // }
    

    return () => fB.unSubscribeToCandiesChanged();
  }, []);

  return (
    <div>
      <h2>Choose which candies you would like</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fB.submitOrder(Object.entries(checkedCandies).filter(([_, isChecked]) => isChecked).map(([id, _]) => id));
          setCheckedCandies({});
        }}
      >
        {candies.map((c) => (
          <label key={c.id}>
            <input type="checkbox" checked={checkedCandies[c.id]} onChange={e => toggleCheckbox(c.id)}/>
            {c.name}
          </label>
        ))}
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default RequestPage;
