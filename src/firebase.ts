import firebase from "firebase";
import { firebaseConfig } from "./config";
import { Candy, Order } from "./types";

export class FB {
  rootRef: firebase.database.Reference;

  constructor() {
    console.log(`initializing firebase app.`);
    firebase.initializeApp(firebaseConfig);
    this.rootRef = firebase.database().ref();
  }

  getCandies = (): Promise<Candy[]> => {
    return new Promise((resolve, reject) => {
      this.rootRef.child("candies").once("value", (snp) => {
        resolve(
          Object.entries(snp.val()).map(([id, name]) => ({
            id: id,
            name: name as string,
          }))
        );
      });
    });
  };

  // getOrders = (): Promise<Order[]> => {
  //   return new Promise((resolve, reject) => {
  //     this.rootRef.child("orders").once("value", (snp) => {
  //       resolve(snp.val());
  //     });
  //   });
  // };

  subscribeToCandiesChanged = (callback: (newVal: Candy[]) => void) => {
    this.rootRef.child("candies").on("value", (snp) =>
      callback(
        Object.entries(snp.val()).map(([id, name]) => ({
          id: id,
          name: name as string,
        }))
      )
    );
  };

  unSubscribeToCandiesChanged = () => {
    this.rootRef.child("candies").off("value");
  };

  subscribeToOrderSubmitted = (callback: (order: Order) => void) => {
    this.rootRef.child("orders").on("child_added", async (snp, _) => {
      const candies = await this.rootRef.child("candies").once('value')
      // console.log(`new order is ${JSON.stringify(newOrder)}`);
      callback({
        timestamp: new Date(+snp.key!),
        candies: snp.val().split(",").map((candyId:string) => ({id: candyId, name: candies.val()[candyId] || 'no longer available'})),
      });
    });
  };

  unSubscribeToOrderSubmitted = () => {
    this.rootRef.child("orders").off("child_added");
  };

  addCandy = (candyName: string) => {
    const key = this.rootRef.child("candies").push().key!;
    this.rootRef.child("candies").update({ [key]: candyName });
  };

  removeCandy = (candyId: string) => {
    this.rootRef.child(`candies/${candyId}`).remove();
  };

  submitOrder = (candyIds: string[]) => {
    // const key = this.rootRef.child("orders").push().key!;
    this.rootRef.child("orders").update({
      [new Date().getTime()]: candyIds.join(","),
    });
  };
}

let fB = new FB();
export default fB;
