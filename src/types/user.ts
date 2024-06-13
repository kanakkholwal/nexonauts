type UserType = {
  _id: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  createdAt: string;
  profilePicture: string;
  profile: string | null;
  account_type: string;
  verificationToken: string | null;
  verified: boolean;
  __v?: number;
};
type SessionUserType = {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  profilePicture: string;
  profile: string;
  account_type: string;
  verificationToken: string | null;
  verified: boolean;
  additional_info: {
    [key: string]:
      | string
      | number
      | boolean
      | string[]
      | number[]
      | boolean[]
      | URL[]
      | URL;
  };
  // integrations: {
  //     gumroad: {
  //         integrated: boolean;
  //     },
  //     github: {
  //         integrated: boolean;
  //     },
  // }
};

export type { SessionUserType, UserType };
