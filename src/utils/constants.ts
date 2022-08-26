const HTTP_RESPONSE_MESSAGES = {
  USER_NOT_FOUND: "User doesn't exist",
  USER_EXISTS: 'User with this login already exists in the database',
  USER_EXISTS_DELETED:
    'User with this login already exists in the database (softly deleted)',
  GROUP_NOT_FOUND: "Group doesn't exist",
  GROUP_EXISTS: 'Group with this name already exists in the database',
  WRONG_LOGIN_PASSWORD: 'Wrong login or password',
  INVALID_TOKEN: 'Please register or sign in',
  FORBIDDEN: "You don't have permission to access this resource",
};

enum PermissionsENUM {
  read = 'READ',
  write = 'WRITE',
  delete = 'DELETE',
  share = 'SHARE',
  upload = 'UPLOAD_FILES',
}

const permissionsTypes = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

const HASH_SALT = 5;

export { HTTP_RESPONSE_MESSAGES, PermissionsENUM, permissionsTypes, HASH_SALT };
