import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import fB from "./firebase";
import { Candy } from "./types";

const RequestPage: React.FC = () => {
  let [candies, setCandies] = useState<Candy[]>([]);
  let [checkedCandies, setCheckedCandies] = useState<{
    [candyId: string]: boolean;
  }>({});
  let [showSentMsg, setShowSetMsg] = useState(false)
  let [intervalId, setIntervalId] = useState<NodeJS.Timeout>();


  const toggleCheckbox = (candyId: string) => {
    setCheckedCandies((cC) => ({ ...cC, [candyId]: !cC[candyId] }));
  };

  useEffect(() => {
    fB.subscribeToCandiesChanged((newCandies) => {
      setCandies(newCandies);
    });

    return () => fB.unSubscribeToCandiesChanged();
  }, []);

  return (
    <div className="max-w-md p-2 z-10">
      <h2 className="large-title"> Choose your candy:</h2>
      {/* <div className="w-full h-2 "></div> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fB.submitOrder(
            Object.entries(checkedCandies)
              .filter(([_, isChecked]) => isChecked)
              .map(([id, _]) => id)
          );
          setCheckedCandies({});
          setShowSetMsg(true);
          if(intervalId){
            clearInterval(intervalId);
          }
          setIntervalId(setInterval(() => setShowSetMsg(false), 4000))

        }}
      >
        {candies.map((c) => (
          <div className="inline-block w-1/2 p-1">
            <label
              key={c.id}
              className={
                "flex items-center p-2 border-2 border-white rounded " +
                (checkedCandies[c.id] ? "bg-white text-theme-dark" : "")
              }
            >
              <input
                className="hidden"
                type="checkbox"
                checked={checkedCandies[c.id]}
                onChange={(e) => toggleCheckbox(c.id)}
              />
              <FontAwesomeIcon
                icon={faCheck}
                className={"mr-2 " + (checkedCandies[c.id] ? "" : "opacity-0")}
              />
              {c.name}
            </label>
          </div>
        ))}
        <button
          type="submit"
          className="bg-gradient-to-r from-theme-yellow to-theme-orange mt-4 text-shadow-black w-full py-1 text-lg font-bold italic uppercase tracking-wide rounded"
        >
          submit
        </button>
        <div className={"ml-1 text-xs font-normal " + (showSentMsg ? "" : "opacity-0")}>
            request sent.
        </div>

      </form>
    </div>
  );
};

export default RequestPage;
