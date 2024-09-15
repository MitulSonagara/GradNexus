export interface UserToken {
  iat?: string;
  exp?: string;
}

export interface UserInfo {
  iat: number;
  user: {
    collegeId?: string;
    currCompany?: string;
    currRole?: string;
    department?: string;
    email: string;
    isVerified: false;
    mobileNumber?: string;
    name: string;
    gradutionYear?: string;
    profilePicture?: string;
    role?: string;
  };
}
