export default {
  methods: {
    getImageUrl(imagePath) {
      const urlRegexp =
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
      if (urlRegexp.test(imagePath)) {
        return imagePath;
      }
      try {
        return require(`@/assets/images/${imagePath}`);
      } catch (err) {
        return "";
      }
    },
  },
};
