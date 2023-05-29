export const guestMode = {
  middleware: "auth",
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: "/todos" },
};
