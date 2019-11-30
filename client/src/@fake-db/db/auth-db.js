import mock from "./../mock";
import _ from "@lodash";
import { FuseUtils } from "@fuse";
import jwt from "jsonwebtoken";

const jwtConfig = {
  secret: "2FE4284BC29D8F73A7EA1636FFC4449CCC99DB9E0A4E840840A6872FB4D2FA48",
  expiresIn: "24 hours" // A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc)
};

let authDB = {
  users: [
    {
      uuid: "XgbuVEXBU5gtSKdbQRP1Zbbby1i1",
      from: "custom-db",
      password: "admin",
      role: "admin",
      data: {
        displayName: "Adeel Tahir",
        photoURL: "assets/images/avatars/Abbott.jpg",
        email: "admin",
        shortcuts: ["calendar"]
      }
    },
    {
      uuid: "XgbuVEXBU6gtSKdbTYR1Zbbby1i3",
      from: "custom-db",
      password: "trainer",
      role: "trainer",
      data: {
        displayName: "Arjun",
        photoURL: "assets/images/avatars/Arnold.jpg",
        email: "trainer",
        shortcuts: ["calendar"]
      }
    },
    {
      uuid: "XgbuVEXBU6gtSKdbTYR1Zbbby1i3",
      from: "custom-db",
      password: "trainee",
      role: "trainee",
      data: {
        displayName: "Hamza",
        photoURL: "assets/images/avatars/Velazquez.jpg",
        email: "trainee",
        shortcuts: ["calendar"]
      }
    }
  ]
};

mock.onGet("/api/auth").reply(config => {
  const data = JSON.parse(config.data);
  const { email, password } = data;

  const user = _.cloneDeep(
    authDB.users.find(_user => _user.data.email === email)
  );

  const error = {
    email: user ? null : "Check your username/email",
    password: user && user.password === password ? null : "Check your password"
  };

  if (!error.email && !error.password && !error.displayName) {
    delete user["password"];

    const access_token = jwt.sign({ id: user.uuid }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });

    const response = {
      user: user,
      access_token: access_token
    };

    return [200, response];
  } else {
    return [200, { error }];
  }
});

mock.onGet("/api/auth/access-token").reply(config => {
  try {
    // const { id } = jwt.verify(access_token, jwtConfig.secret);

    // const user = _.cloneDeep(authDB.users.find(_user => _user.uuid === id));
    // delete user["password"];

    // const updatedAccessToken = jwt.sign({ id: user.uuid }, jwtConfig.secret, {
    //   expiresIn: jwtConfig.expiresIn
    // });

    const response = {
      user: {
        role: "trainee",
        data: {
          displayName: "adeeltahir",
          photoURL: "assets/images/avatars/Abbott.jpg",
          email: "adeeltahir19@gmail.com",
          settings: {},
          shortcuts: []
        }
      },
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkZWVsdGFoaXIiLCJ1c2VyRW1haWwiOiJhZGVlbHRhaGlyMTlAZ21haWwuY29tIiwidXNlclJvbGUiOiJ0cmFpbmVlIiwiaWF0IjoxNTY2MDgwNDkxLCJleHAiOjE1NjYxNjY4OTF9.-3VcrcnVBgeWgIHckzxa9u6bqmvdUQ6rbGrh_zgB4MQ"
    };

    // const response = { user:
    //   { role: 'trainee',
    //     data:
    //      { displayName: 'adeeltahir',
    //        photoURL: 'assets/images/avatars/Abbott.jpg',
    //        email: 'adeeltahir19@gmail.com',
    //        settings: {},
    //        shortcuts: [] } },
    //  access_token:
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkZWVsdGFoaXIiLCJ1c2VyRW1haWwiOiJhZGVlbHRhaGlyMTlAZ21haWwuY29tIiwidXNlclJvbGUiOiJ0cmFpbmVlIiwiaWF0IjoxNTY2MDgwNDkxLCJleHAiOjE1NjYxNjY4OTF9.-3VcrcnVBgeWgIHckzxa9u6bqmvdUQ6rbGrh_zgB4MQ' }

    return [200, response];
  } catch (e) {
    const error = "Invalid access token detected";
    return [401, { error }];
  }
});

mock.onPost("/api/auth/register").reply(request => {
  const data = JSON.parse(request.data);
  const { displayName, password, email, type } = data;
  const isEmailExists = authDB.users.find(_user => _user.data.email === email);
  const error = {
    email: isEmailExists ? "The email is already in use" : null,
    displayName: displayName !== "" ? null : "Enter display name",
    password: null
  };
  if (!error.displayName && !error.password && !error.email) {
    const newUser = {
      uuid: FuseUtils.generateGUID(),
      from: "custom-db",
      password: password,
      role: type,
      data: {
        displayName: displayName,
        photoURL: "assets/images/avatars/Abbott.jpg",
        email: email,
        settings: {},
        shortcuts: []
      }
    };

    authDB.users = [...authDB.users, newUser];

    const user = _.cloneDeep(newUser);
    delete user["password"];

    const access_token = jwt.sign({ id: user.uuid }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });

    const response = {
      user: user,
      access_token: access_token
    };

    return [200, response];
  } else {
    return [200, { error }];
  }
});

mock.onPost("/api/auth/user/update").reply(config => {
  const data = JSON.parse(config.data);
  const { user } = data;

  authDB.users = authDB.users.map(_user => {
    if (user.uuid === user.id) {
      return _.merge(_user, user);
    }
    return _user;
  });

  return [200, user];
});
