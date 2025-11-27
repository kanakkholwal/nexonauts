import { SessionUserType } from "./user";
type Session = {
  expires: Date;
  user: SessionUserType;
};

export type { Session };
