import React, { useEffect, useState } from "react";
import fB from "./firebase";
import { Candy, Order } from "./types";

const SendPage: React.FC = () => {
  let [orders, setOrders] = useState<Order[]>([]);
  let [candies, setCandies] = useState<Candy[]>([]);
  let [newCandyName, setNewCandyName] = useState("");

  useEffect(() => {
    //   console.log('subscribing')
    fB.subscribeToCandiesChanged((newCandies) => setCandies(newCandies));

    fB.subscribeToOrderSubmitted((newOrder) =>
      setOrders((currentOrders) => currentOrders.concat([newOrder]))
    );

    return () => {
        // console.log('unsubscribing')
      fB.unSubscribeToCandiesChanged();
      fB.unSubscribeToOrderSubmitted();
    };
  }, []);

  return (
    <>
      <h2>Orders</h2>
      <ul>
        {orders.map((o) => (
          <li key={o.timestamp?.getTime()}>
              <strong>
                {o.timestamp?.getHours()}:{o.timestamp?.getMinutes()}&nbsp;&nbsp;
              </strong>
            {o.candies.map(c => c.name).join(", ")}
          </li>
        ))}
      </ul>
      <h2>Current candies</h2>
      {candies.map((c) => (
        <div key={c.id}>
          {c.name} <button onClick={() => fB.removeCandy(c.id)}>delete</button>
        </div>
      ))}
      add candy:{" "}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fB.addCandy(newCandyName);
          setNewCandyName("");
        }}
      >
        <input
          type="text"
          value={newCandyName}
          onChange={(e) => setNewCandyName(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default SendPage;
