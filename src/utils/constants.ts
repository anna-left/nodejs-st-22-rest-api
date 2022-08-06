const HTTP_RESPONS_MESSAGES = {
  INVALID_UUID_FORMAT: 'Invalid uuid format',
  USER_NOT_FOUND: "User does'n exist",
  USER_EXISTS: 'User with this login already exists in the database',
  USER_EXISTS_DELETED:
    'User with this login already exists in the database (softly deleted)',
  GROUP_NOT_FOUND: "Group does'n exist",
  GROUP_EXISTS: 'Group with this name already exists in the database',
};

enum PermissionsENUM {
  read = 'READ',
  write = 'WRITE',
  delete = 'DELETE',
  share = 'SHARE',
  upload = 'UPLOAD_FILES',
}
const permissionsTypes = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

export { HTTP_RESPONS_MESSAGES, PermissionsENUM, permissionsTypes };
