export interface IProperties {
  nbf: number;
  exp: number;
  lang: string;
}

export class RoomProperties {
  privacy: string;
  properties: IProperties;

  constructor(nbf: number, exp: number) {
    this.privacy = "private";
    this.properties = {
      nbf: nbf,
      exp: exp,
      lang: "es",
    };
  }
}
