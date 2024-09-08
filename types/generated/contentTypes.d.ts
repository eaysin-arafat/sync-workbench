import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    avatar: Attribute.Media<'images'>;
    first_name: Attribute.String & Attribute.Required;
    last_name: Attribute.String & Attribute.Required;
    position_name: Attribute.String & Attribute.Required;
    address: Attribute.String;
    state: Attribute.String;
    city: Attribute.String;
    country: Attribute.String;
    date_of_birth: Attribute.Date & Attribute.Required;
    phone: Attribute.Integer & Attribute.Required;
    zip_code: Attribute.Integer;
    employee_skill: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::employee-skill.employee-skill'
    >;
    employee_certification: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::employee-certification.employee-certification'
    >;
    work_experiences: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::work-experience.work-experience'
    >;
    designation: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'api::designation.designation'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAccessControlAccessControl extends Schema.CollectionType {
  collectionName: 'access_controls';
  info: {
    singularName: 'access-control';
    pluralName: 'access-controls';
    displayName: 'AccessControl';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    access_control_name: Attribute.String &
      Attribute.Required &
      Attribute.Unique;
    description: Attribute.Text;
    employee_access_control: Attribute.Relation<
      'api::access-control.access-control',
      'manyToOne',
      'api::employee-access-control.employee-access-control'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::access-control.access-control',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::access-control.access-control',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAttendanceAttendance extends Schema.CollectionType {
  collectionName: 'attendances';
  info: {
    singularName: 'attendance';
    pluralName: 'attendances';
    displayName: 'Attendance';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    date: Attribute.Date & Attribute.Required;
    check_in_time: Attribute.String & Attribute.Required;
    check_out_time: Attribute.String & Attribute.Required;
    status: Attribute.String & Attribute.Required;
    employee: Attribute.Relation<
      'api::attendance.attendance',
      'manyToOne',
      'api::employee.employee'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::attendance.attendance',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::attendance.attendance',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCertificationCertification extends Schema.CollectionType {
  collectionName: 'certifications';
  info: {
    singularName: 'certification';
    pluralName: 'certifications';
    displayName: 'Certification';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    certification_name: Attribute.String &
      Attribute.Required &
      Attribute.Unique;
    issuing_organization: Attribute.String & Attribute.Required;
    issue_date: Attribute.Date & Attribute.Required;
    expiry_date: Attribute.Date;
    employee_certifications: Attribute.Relation<
      'api::certification.certification',
      'oneToMany',
      'api::employee-certification.employee-certification'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::certification.certification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::certification.certification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDepartmentDepartment extends Schema.CollectionType {
  collectionName: 'departments';
  info: {
    singularName: 'department';
    pluralName: 'departments';
    displayName: 'Department';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    department_name: Attribute.String & Attribute.Required & Attribute.Unique;
    location: Attribute.String;
    description: Attribute.String;
    photo: Attribute.Media<'images', true>;
    manager: Attribute.Relation<
      'api::department.department',
      'oneToOne',
      'api::employee.employee'
    >;
    projects: Attribute.Relation<
      'api::department.department',
      'oneToMany',
      'api::project.project'
    >;
    employees: Attribute.Relation<
      'api::department.department',
      'oneToMany',
      'api::employee.employee'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::department.department',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::department.department',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDesignationDesignation extends Schema.CollectionType {
  collectionName: 'designations';
  info: {
    singularName: 'designation';
    pluralName: 'designations';
    displayName: 'Designation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required & Attribute.Unique;
    description: Attribute.Text;
    users: Attribute.Relation<
      'api::designation.designation',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::designation.designation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::designation.designation',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDocumentDocument extends Schema.CollectionType {
  collectionName: 'documents';
  info: {
    singularName: 'document';
    pluralName: 'documents';
    displayName: 'Document';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    document_type: Attribute.String & Attribute.Required;
    document_name: Attribute.String & Attribute.Required;
    document_url: Attribute.String & Attribute.Required;
    upload_date: Attribute.Date & Attribute.Required;
    employee: Attribute.Relation<
      'api::document.document',
      'manyToOne',
      'api::employee.employee'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::document.document',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::document.document',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEmployeeEmployee extends Schema.CollectionType {
  collectionName: 'employees';
  info: {
    singularName: 'employee';
    pluralName: 'employees';
    displayName: 'Employee';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    date_of_hire: Attribute.Date & Attribute.Required;
    salary: Attribute.BigInteger & Attribute.Required;
    is_internship: Attribute.Boolean & Attribute.Required;
    attendances: Attribute.Relation<
      'api::employee.employee',
      'oneToMany',
      'api::attendance.attendance'
    >;
    documents: Attribute.Relation<
      'api::employee.employee',
      'oneToMany',
      'api::document.document'
    >;
    reporting_employees: Attribute.Relation<
      'api::employee.employee',
      'oneToMany',
      'api::employee.employee'
    >;
    manager: Attribute.Relation<
      'api::employee.employee',
      'manyToOne',
      'api::employee.employee'
    >;
    leaves: Attribute.Relation<
      'api::employee.employee',
      'oneToMany',
      'api::leave.leave'
    >;
    performance_reviews: Attribute.Relation<
      'api::employee.employee',
      'oneToMany',
      'api::performance-review.performance-review'
    >;
    payrolls: Attribute.Relation<
      'api::employee.employee',
      'oneToMany',
      'api::payroll.payroll'
    >;
    user_info: Attribute.Relation<
      'api::employee.employee',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    manager_of_departments: Attribute.Relation<
      'api::employee.employee',
      'oneToMany',
      'api::document.document'
    >;
    employee_of_departments: Attribute.Relation<
      'api::employee.employee',
      'oneToOne',
      'api::department.department'
    >;
    employee_status: Attribute.Relation<
      'api::employee.employee',
      'oneToOne',
      'api::employee-status.employee-status'
    >;
    identity: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '^[A-Za-z0-9]{5}$';
        'disable-regenerate': true;
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '^[A-Za-z0-9]{5}$';
          'disable-regenerate': true;
        }
      >;
    employment_status: Attribute.Relation<
      'api::employee.employee',
      'oneToOne',
      'api::employment-status.employment-status'
    >;
    department: Attribute.Relation<
      'api::employee.employee',
      'manyToOne',
      'api::department.department'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::employee.employee',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::employee.employee',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEmployeeAccessControlEmployeeAccessControl
  extends Schema.CollectionType {
  collectionName: 'employee_access_controls';
  info: {
    singularName: 'employee-access-control';
    pluralName: 'employee-access-controls';
    displayName: 'EmployeeAccessControl';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    access_controls: Attribute.Relation<
      'api::employee-access-control.employee-access-control',
      'oneToMany',
      'api::access-control.access-control'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::employee-access-control.employee-access-control',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::employee-access-control.employee-access-control',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEmployeeCertificationEmployeeCertification
  extends Schema.CollectionType {
  collectionName: 'employee_certifications';
  info: {
    singularName: 'employee-certification';
    pluralName: 'employee-certifications';
    displayName: 'EmployeeCertification';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    certification_id: Attribute.Relation<
      'api::employee-certification.employee-certification',
      'manyToOne',
      'api::certification.certification'
    >;
    obtained_date: Attribute.Date & Attribute.Required;
    expiry_date: Attribute.Date & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::employee-certification.employee-certification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::employee-certification.employee-certification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEmployeeSkillEmployeeSkill extends Schema.CollectionType {
  collectionName: 'employee_skills';
  info: {
    singularName: 'employee-skill';
    pluralName: 'employee-skills';
    displayName: 'EmployeeSkill';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    proficiency_level: Attribute.String;
    skill_id: Attribute.Relation<
      'api::employee-skill.employee-skill',
      'manyToOne',
      'api::skill.skill'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::employee-skill.employee-skill',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::employee-skill.employee-skill',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEmployeeStatusEmployeeStatus extends Schema.CollectionType {
  collectionName: 'employee_statuses';
  info: {
    singularName: 'employee-status';
    pluralName: 'employee-statuses';
    displayName: 'EmployeeStatus';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    description: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::employee-status.employee-status',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::employee-status.employee-status',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEmploymentStatusEmploymentStatus
  extends Schema.CollectionType {
  collectionName: 'employment_statuses';
  info: {
    singularName: 'employment-status';
    pluralName: 'employment-statuses';
    displayName: 'EmploymentStatus';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::employment-status.employment-status',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::employment-status.employment-status',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLeaveLeave extends Schema.CollectionType {
  collectionName: 'leaves';
  info: {
    singularName: 'leave';
    pluralName: 'leaves';
    displayName: 'Leave';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    leave_type: Attribute.String & Attribute.Required;
    start_date: Attribute.Date & Attribute.Required;
    end_date: Attribute.Date & Attribute.Required;
    reason: Attribute.Text & Attribute.Required;
    status: Attribute.String;
    employee: Attribute.Relation<
      'api::leave.leave',
      'manyToOne',
      'api::employee.employee'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::leave.leave',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::leave.leave',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPayrollPayroll extends Schema.CollectionType {
  collectionName: 'payrolls';
  info: {
    singularName: 'payroll';
    pluralName: 'payrolls';
    displayName: 'Payroll';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    salary_date: Attribute.Date & Attribute.Required;
    gross_salary: Attribute.BigInteger & Attribute.Required;
    tax_deduction: Attribute.BigInteger & Attribute.Required;
    net_salary: Attribute.Integer & Attribute.Required;
    status: Attribute.String & Attribute.Required;
    employee: Attribute.Relation<
      'api::payroll.payroll',
      'manyToOne',
      'api::employee.employee'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::payroll.payroll',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::payroll.payroll',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPerformanceReviewPerformanceReview
  extends Schema.CollectionType {
  collectionName: 'performance_reviews';
  info: {
    singularName: 'performance-review';
    pluralName: 'performance-reviews';
    displayName: 'PerformanceReview';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    review_date: Attribute.Date & Attribute.Required;
    review_period_start: Attribute.Date;
    review_period_end: Attribute.Date & Attribute.Required;
    overall_rating: Attribute.Integer & Attribute.Required;
    comments: Attribute.Text;
    employee: Attribute.Relation<
      'api::performance-review.performance-review',
      'manyToOne',
      'api::employee.employee'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::performance-review.performance-review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::performance-review.performance-review',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectProject extends Schema.CollectionType {
  collectionName: 'projects';
  info: {
    singularName: 'project';
    pluralName: 'projects';
    displayName: 'Project';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    project_name: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    start_date: Attribute.Date & Attribute.Required;
    end_date: Attribute.Date & Attribute.Required;
    department: Attribute.Relation<
      'api::project.project',
      'manyToOne',
      'api::department.department'
    >;
    status: Attribute.String & Attribute.Required;
    budget: Attribute.BigInteger;
    project_manager_id: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'api::employee.employee'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectTeamProjectTeam extends Schema.CollectionType {
  collectionName: 'project_teams';
  info: {
    singularName: 'project-team';
    pluralName: 'project-teams';
    displayName: 'ProjectTeam';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    project: Attribute.Relation<
      'api::project-team.project-team',
      'oneToOne',
      'api::project.project'
    >;
    team_id: Attribute.Relation<
      'api::project-team.project-team',
      'oneToOne',
      'api::team.team'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-team.project-team',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-team.project-team',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectTeamLeaderProjectTeamLeader
  extends Schema.CollectionType {
  collectionName: 'project_team_leaders';
  info: {
    singularName: 'project-team-leader';
    pluralName: 'project-team-leaders';
    displayName: 'ProjectTeamLeader';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    project_id: Attribute.Relation<
      'api::project-team-leader.project-team-leader',
      'oneToOne',
      'api::project.project'
    >;
    team_leader_id: Attribute.Relation<
      'api::project-team-leader.project-team-leader',
      'oneToOne',
      'api::team-leader.team-leader'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project-team-leader.project-team-leader',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project-team-leader.project-team-leader',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSkillSkill extends Schema.CollectionType {
  collectionName: 'skills';
  info: {
    singularName: 'skill';
    pluralName: 'skills';
    displayName: 'Skill';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    skill_name: Attribute.String & Attribute.Required & Attribute.Unique;
    description: Attribute.Text;
    employee_skills: Attribute.Relation<
      'api::skill.skill',
      'oneToMany',
      'api::employee-skill.employee-skill'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::skill.skill',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::skill.skill',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTaskTask extends Schema.CollectionType {
  collectionName: 'tasks';
  info: {
    singularName: 'task';
    pluralName: 'tasks';
    displayName: 'Task';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    task_name: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    status: Attribute.String & Attribute.Required;
    due_date: Attribute.Date;
    project_id: Attribute.Relation<
      'api::task.task',
      'oneToOne',
      'api::project.project'
    >;
    start_date: Attribute.Date;
    priority: Attribute.String;
    assigned_to: Attribute.Relation<
      'api::task.task',
      'oneToOne',
      'api::employee.employee'
    >;
    parent_task_id: Attribute.Relation<
      'api::task.task',
      'oneToMany',
      'api::task.task'
    >;
    subtask_ids: Attribute.Relation<
      'api::task.task',
      'manyToOne',
      'api::task.task'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::task.task', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::task.task', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTeamTeam extends Schema.CollectionType {
  collectionName: 'teams';
  info: {
    singularName: 'team';
    pluralName: 'teams';
    displayName: 'Team';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    team_name: Attribute.String & Attribute.Required & Attribute.Unique;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiTeamLeaderTeamLeader extends Schema.CollectionType {
  collectionName: 'team_leaders';
  info: {
    singularName: 'team-leader';
    pluralName: 'team-leaders';
    displayName: 'TeamLeader';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    team_id: Attribute.Relation<
      'api::team-leader.team-leader',
      'oneToOne',
      'api::team.team'
    >;
    employee_id: Attribute.Relation<
      'api::team-leader.team-leader',
      'oneToOne',
      'api::employee.employee'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::team-leader.team-leader',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::team-leader.team-leader',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTeamMemberTeamMember extends Schema.CollectionType {
  collectionName: 'team_members';
  info: {
    singularName: 'team-member';
    pluralName: 'team-members';
    displayName: 'TeamMember';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    team: Attribute.Relation<
      'api::team-member.team-member',
      'oneToOne',
      'api::team.team'
    >;
    employee: Attribute.Relation<
      'api::team-member.team-member',
      'oneToOne',
      'api::employee.employee'
    >;
    team_role: Attribute.Relation<
      'api::team-member.team-member',
      'oneToOne',
      'api::team-role.team-role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::team-member.team-member',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::team-member.team-member',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTeamRoleTeamRole extends Schema.CollectionType {
  collectionName: 'team_roles';
  info: {
    singularName: 'team-role';
    pluralName: 'team-roles';
    displayName: 'TeamRole';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    role_name: Attribute.String & Attribute.Required & Attribute.Unique;
    description: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::team-role.team-role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::team-role.team-role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWorkExperienceWorkExperience extends Schema.CollectionType {
  collectionName: 'work_experiences';
  info: {
    singularName: 'work-experience';
    pluralName: 'work-experiences';
    displayName: 'WorkExperience';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    company_name: Attribute.String & Attribute.Required;
    job_title: Attribute.String & Attribute.Required;
    start_date: Attribute.Date;
    end_date: Attribute.Date;
    description: Attribute.Text;
    user: Attribute.Relation<
      'api::work-experience.work-experience',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::work-experience.work-experience',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::work-experience.work-experience',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::access-control.access-control': ApiAccessControlAccessControl;
      'api::attendance.attendance': ApiAttendanceAttendance;
      'api::certification.certification': ApiCertificationCertification;
      'api::department.department': ApiDepartmentDepartment;
      'api::designation.designation': ApiDesignationDesignation;
      'api::document.document': ApiDocumentDocument;
      'api::employee.employee': ApiEmployeeEmployee;
      'api::employee-access-control.employee-access-control': ApiEmployeeAccessControlEmployeeAccessControl;
      'api::employee-certification.employee-certification': ApiEmployeeCertificationEmployeeCertification;
      'api::employee-skill.employee-skill': ApiEmployeeSkillEmployeeSkill;
      'api::employee-status.employee-status': ApiEmployeeStatusEmployeeStatus;
      'api::employment-status.employment-status': ApiEmploymentStatusEmploymentStatus;
      'api::leave.leave': ApiLeaveLeave;
      'api::payroll.payroll': ApiPayrollPayroll;
      'api::performance-review.performance-review': ApiPerformanceReviewPerformanceReview;
      'api::project.project': ApiProjectProject;
      'api::project-team.project-team': ApiProjectTeamProjectTeam;
      'api::project-team-leader.project-team-leader': ApiProjectTeamLeaderProjectTeamLeader;
      'api::skill.skill': ApiSkillSkill;
      'api::task.task': ApiTaskTask;
      'api::team.team': ApiTeamTeam;
      'api::team-leader.team-leader': ApiTeamLeaderTeamLeader;
      'api::team-member.team-member': ApiTeamMemberTeamMember;
      'api::team-role.team-role': ApiTeamRoleTeamRole;
      'api::work-experience.work-experience': ApiWorkExperienceWorkExperience;
    }
  }
}
