import mock from "./mock";

import "./db/calendar-db";
import "./db/auth-db";
import "./db/contacts-db";
import "./db/project-dashboard-db";
import "./db/profile-db";

mock.onAny().passThrough();
