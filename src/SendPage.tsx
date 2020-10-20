import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import fB from "./firebase";
import { Candy, Order } from "./types";
const doorbell = require("./assets/doorbell.mp3");

const SendPage: React.FC = () => {
  let [orders, setOrders] = useState<Order[]>([]);
  let [candies, setCandies] = useState<Candy[]>([]);
  let [newCandyName, setNewCandyName] = useState("");
  let [playDoorbell] = useSound(doorbell);

  useEffect(() => {
    // hack so that it doesnt scream when opening the app for the first time
    let canPlay = false;
    setInterval(() => (canPlay = true), 900);
    fB.subscribeToCandiesChanged((newCandies) => setCandies(newCandies));

    fB.subscribeToOrderSubmitted((newOrder: Order) => {
      if (canPlay) {
        playDoorbell();
      }
      setOrders((currentOrders) => [newOrder].concat(currentOrders));
    });

    return () => {
      fB.unSubscribeToCandiesChanged();
      fB.unSubscribeToOrderSubmitted();
    };
  }, [playDoorbell]);

  const getTimeString = (time?: Date): string => {
    if (!time) {
      return "";
    }
    const padZeros = (n: number) => ("00" + n).slice(-2);
    return `${padZeros(time.getHours())}:${padZeros(time.getMinutes())}`;
  };

  return (
    <div className="max-w-md p-2 z-10">
      <h2 className="large-title">Orders:</h2>
      <ul className="divide-y divide-white divide-opacity-25 ml-2">
        {orders.map((o) => (
          <li key={o.timestamp?.getTime()} className="px-2 py-1">
            <strong>{getTimeString(o.timestamp)}&nbsp;&nbsp;</strong>
            {o.candies.map((c) => c.name).join(", ")}
          </li>
        ))}
      </ul>
      <h2 className="large-title"> Current candies:</h2>
      <ul className="divide-y divide-white divide-opacity-25 ml-2">
        {candies.map((c) => (
          <li key={c.id} className="px-2 py-1 flex items-center">
            {c.name}{" "}
            <button
              onClick={() => fB.removeCandy(c.id)}
              className="text-red-600 border border-red-800 px-1 ml-3 text-xs rounded"
            >
              <FontAwesomeIcon icon={faTrash} className="mr-1" />
              delete
            </button>
          </li>
        ))}
      </ul>
      <span className="mt-2 ml-2 font-bold">Add candy:</span>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fB.addCandy(newCandyName);
          setNewCandyName("");
        }}
      >
        <input
          className="rounded-l px-2 py-1 ml-4 text-theme-dark"
          type="text"
          value={newCandyName}
          onChange={(e) => setNewCandyName(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-r py-1 px-2 bg-theme-green uppercase italic font-bold tracking-wide text-white text-shadow-black"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default SendPage;
