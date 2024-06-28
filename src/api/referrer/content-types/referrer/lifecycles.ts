import randomString from "../../../../helpers/random-string";

export default {
  beforeCreate(event) {
    event.params.data.referenceCode = `${randomString(15)}${
      event.params.data.userId
    }`;
  },
};
