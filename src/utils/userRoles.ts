enum UserRoles {
  None,
  User,
  Admin
}

const useRole = () => UserRoles.User;

export { UserRoles, useRole };
