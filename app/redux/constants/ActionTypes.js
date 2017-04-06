import { generateConstants } from '../utils';

export default generateConstants([
  'USERS_SHOW',
  'USERS_CLEAR_ERROR',
  'USERS_INDEX(ASYNC)',

  'README_LOAD(ASYNC)',

  'SESSION_CREATE(ASYNC)',
  'SESSION_DESTROY',
  'SESSION_INVALIDATE',

  'PROJECT_INDEX(ASYNC)',
  'PROJECT_CREATE(ASYNC)',
  'PROJECT_SHOW(ASYNC)',
  'PROJECT_RECENTS(ASYNC)',

  'MYPROJECT_INDEX(ASYNC)',
  'MYPROJECT_CREATE(ASYNC)',
  'MYPROJECT_EDIT(ASYNC)',
  'MYPROJECT_CLOSE(ASYNC)',
  'MYPROJECT_REOPEN(ASYNC)',
  'MYPROJECT_SHOW',
  'MYPROJECT_MORE(ASYNC)',

  'TYPE_INDEX(ASYNC)',
  'TYPE_INIT',
  'TYPE_CREATE(ASYNC)',
  'TYPE_SHOW',
  'TYPE_EDIT(ASYNC)',
  'TYPE_DELETE(ASYNC)',
  'TYPE_SET_SORT(ASYNC)',
  'TYPE_SET_DEFAULT(ASYNC)',

  'MODULE_INDEX(ASYNC)',
  'MODULE_CREATE(ASYNC)',
  'MODULE_SHOW',
  'MODULE_EDIT(ASYNC)',
  'MODULE_DELETE(ASYNC)',

  'VERSION_INDEX(ASYNC)',
  'VERSION_CREATE(ASYNC)',
  'VERSION_SHOW',
  'VERSION_EDIT(ASYNC)',
  'VERSION_DELETE(ASYNC)',

  'FIELD_INDEX(ASYNC)',
  'FIELD_CREATE(ASYNC)',
  'FIELD_SHOW(ASYNC)',
  'FIELD_EDIT(ASYNC)',
  'FIELD_DELETE(ASYNC)',

  'SCREEN_INDEX(ASYNC)',
  'SCREEN_CREATE(ASYNC)',
  'SCREEN_SHOW',
  'SCREEN_EDIT(ASYNC)',
  'SCREEN_DELETE(ASYNC)',

  'WORKFLOW_INDEX(ASYNC)',
  'WORKFLOW_CREATE(ASYNC)',
  'WORKFLOW_SHOW',
  'WORKFLOW_PREVIEW(ASYNC)',
  'WORKFLOW_EDIT(ASYNC)',
  'WORKFLOW_DELETE(ASYNC)',

  'WFCONFIG_INDEX(ASYNC)',
  'WFCONFIG_SAVE(ASYNC)',
  'WFCONFIG_STEP_CREATE',
  'WFCONFIG_STEP_EDIT',
  'WFCONFIG_STEP_DELETE',
  'WFCONFIG_ACTION_ADD',
  'WFCONFIG_ACTION_EDIT',
  'WFCONFIG_ACTION_DELETE',

  'STATE_INDEX(ASYNC)',
  'STATE_CREATE(ASYNC)',
  'STATE_SHOW',
  'STATE_EDIT(ASYNC)',
  'STATE_DELETE(ASYNC)',

  'RESOLUTION_INDEX(ASYNC)',
  'RESOLUTION_CREATE(ASYNC)',
  'RESOLUTION_SHOW',
  'RESOLUTION_EDIT(ASYNC)',
  'RESOLUTION_DELETE(ASYNC)',
  'RESOLUTION_SET_SORT(ASYNC)',
  'RESOLUTION_SET_DEFAULT(ASYNC)',

  'PRIORITY_INDEX(ASYNC)',
  'PRIORITY_CREATE(ASYNC)',
  'PRIORITY_SHOW',
  'PRIORITY_EDIT(ASYNC)',
  'PRIORITY_DELETE(ASYNC)',
  'PRIORITY_SET_SORT(ASYNC)',
  'PRIORITY_SET_DEFAULT(ASYNC)',

  'ROLE_INDEX(ASYNC)',
  'ROLE_CREATE(ASYNC)',
  'ROLE_SHOW',
  'ROLE_EDIT(ASYNC)',
  'ROLE_DELETE(ASYNC)',

  'ROLEACTOR_INDEX(ASYNC)',
  'ROLEACTOR_EDIT(ASYNC)',

  'EVENTS_INDEX(ASYNC)',
  'EVENTS_CREATE(ASYNC)',
  'EVENTS_SHOW',
  'EVENTS_EDIT(ASYNC)',
  'EVENTS_RESET(ASYNC)',
  'EVENTS_DELETE(ASYNC)',

  'ISSUE_INDEX(ASYNC)',
  'ISSUE_CREATE(ASYNC)',
  'ISSUE_OPTIONS(ASYNC)',
  'ISSUE_SHOW(ASYNC)',
  'ISSUE_EDIT(ASYNC)',
  'ISSUE_SET_ASSIGNEE(ASYNC)',
  'ISSUE_DELETE(ASYNC)',

  'ISSUE_SEARCHER_ADD(ASYNC)',
  'ISSUE_SEARCHER_DELETE(ASYNC)',
  'ISSUE_SEARCHER_CONFIG(ASYNC)',

  'ISSUE_FILE_DELETE(ASYNC)',
  'ISSUE_FILE_ADD',
  'ISSUE_COMMENTS_INDEX(ASYNC)',
  'ISSUE_COMMENTS_ADD(ASYNC)',
  'ISSUE_COMMENTS_EDIT(ASYNC)',
  'ISSUE_COMMENTS_DELETE(ASYNC)',

  'ISSUE_HISTORY_INDEX(ASYNC)',

  'ISSUE_RECORD',
  'ISSUE_FORWARD',
  'ISSUE_CLEAN_RECORD',

  'ISSUE_WORKLOG_INDEX(ASYNC)',
  'ISSUE_WORKLOG_ADD(ASYNC)',
  'ISSUE_WORKLOG_EDIT(ASYNC)',
  'ISSUE_WORKLOG_DELETE(ASYNC)',

  'ISSUE_LINK_CREATE(ASYNC)',
  'ISSUE_LINK_DELETE(ASYNC)',

  'ISSUE_STATE_RESET(ASYNC)',
  'ISSUE_MOVE(ASYNC)',
  'ISSUE_CONVERT(ASYNC)',
  'ISSUE_COPY(ASYNC)',
  'ISSUE_WORKFLOW_ACTION(ASYNC)',

  'ISSUE_WATCHING(ASYNC)',

  'ACTIVITY_INDEX(ASYNC)',
  'ACTIVITY_MORE(ASYNC)',

  'USER_INFO_FETCH(ASYNC)',

  'LOCALE_INITIALIZE',
  'LOCALE_CHANGE(ASYNC)'
]);
