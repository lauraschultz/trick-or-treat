export interface Candy {
  id: string;
  name: string;
}

export interface Order {
  timestamp?: Date;
  candies: Candy[];
}