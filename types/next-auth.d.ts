import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      admno: string;
      role: string;
      accessToken: string;
    };
  }

  interface User {
    admno: string;
    role: string;
    token: string;
  }
}
